import os
import re
import ipaddress
import logging
import time
from pathlib import Path
from typing import Annotated, Optional, Literal
from datetime import datetime, timezone
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse

import httpx
from bson import ObjectId
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException, Request
from pydantic import BaseModel, Field, EmailStr, ConfigDict, BeforeValidator, field_validator
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

MONGO_URL = os.environ['MONGO_URL']
DB_NAME = os.environ['DB_NAME']
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

app = FastAPI(title="Nivoram API")
api_router = APIRouter(prefix="/api")

# ---- Emergent managed email (Resend proxy) ----
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
ENQUIRY_EMAIL = os.environ.get("ENQUIRY_EMAIL", "")

logger = logging.getLogger(__name__)

# ---- Mongo helpers (ObjectId-safe) ----
def _coerce_oid(v):
    if v is None or v == "":
        return str(ObjectId())
    return str(v)

PyObjectId = Annotated[str, BeforeValidator(_coerce_oid)]

class EnquiryDocument(BaseModel):
    id: PyObjectId = Field(alias="_id", default_factory=lambda: str(ObjectId()))
    model_config = ConfigDict(populate_by_name=True)

    type: str
    name: str
    email: str
    phone: str
    message: str = ""
    company: str = ""
    occasion: str = ""
    quantity: str = ""
    budget: str = ""
    delivery_date: str = ""
    product_interests: str = ""
    source_page: str = ""
    created_at: str = ""

    def to_mongo(self):
        d = self.model_dump(by_alias=True)
        d["_id"] = ObjectId(d["_id"])
        return d

    @classmethod
    def from_mongo(cls, doc):
        doc = dict(doc)
        doc["_id"] = str(doc["_id"])
        return cls(**doc)

# ---- Input model ----
class EnquiryCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")

    type: Literal["general", "bulk"]
    name: str
    email: EmailStr
    phone: str
    message: str = ""
    company: str = ""
    occasion: str = ""
    quantity: str = ""
    budget: str = ""
    delivery_date: str = ""
    product_interests: str = ""
    website: str = ""  # honeypot — bots fill this, humans never see it
    source_page: str = ""

    @field_validator("name")
    @classmethod
    def name_len(cls, v):
        v = v.strip()
        if len(v) < 2 or len(v) > 120:
            raise ValueError("Please enter your full name.")
        return v

    @field_validator("phone")
    @classmethod
    def phone_digits(cls, v):
        digits = re.sub(r"\D", "", v)
        if not (7 <= len(digits) <= 15):
            raise ValueError("Please enter a valid phone number.")
        return v.strip()

    @field_validator("message")
    @classmethod
    def message_len(cls, v):
        if len(v) > 4000:
            raise ValueError("Message is too long.")
        return v.strip()

    @field_validator("company", "occasion", "quantity", "budget", "delivery_date", "product_interests", "source_page")
    @classmethod
    def short_fields(cls, v):
        return v.strip()[:300]

# ---- Simple in-memory rate limit (per IP, 60s window) ----
_RATE: dict = {}

def _rate_ok(ip: str) -> bool:
    now = time.time()
    hits = [t for t in _RATE.get(ip, []) if now - t < 60]
    if len(hits) >= 8:
        _RATE[ip] = hits
        return False
    hits.append(now)
    _RATE[ip] = hits
    return True

# ---- Email guardrail gate (G2/G3 structural defense-in-depth) ----
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)

def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)

def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)

class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []
    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []
    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)
    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []

def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan(); scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} ≠ real link host {real!r} (G3)")

async def send_email(*, to: str, subject: str, html: str) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    try:
        async with httpx.AsyncClient(timeout=30) as http:
            resp = await http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send enquiry email")
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send enquiry email")

# ---- Server-side enquiry email template (fixed subject/recipient — G4) ----
def _enquiry_email_html(data: EnquiryCreate) -> str:
    label = "Bulk / Corporate Gifting" if data.type == "bulk" else "General Enquiry"
    rows = [
        ("Name", data.name), ("Email", data.email), ("Phone", data.phone),
        ("Company / Organisation", data.company), ("Occasion or event", data.occasion),
        ("Approximate quantity", data.quantity), ("Budget per gift", data.budget),
        ("Preferred delivery date", data.delivery_date),
        ("Product interests", data.product_interests), ("Message", data.message),
    ]
    trs = "".join(
        f'<tr>'
        f'<td style="padding:8px 14px 8px 0;font-size:13px;color:#8a838f;text-transform:uppercase;letter-spacing:1px;vertical-align:top;white-space:nowrap">{escape(k)}</td>'
        f'<td style="padding:8px 0;font-size:14px;color:#302B32;line-height:1.5">{escape(v)}</td>'
        f'</tr>'
        for k, v in rows if v
    )
    return (
        f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F8F3EB;padding:32px 0">'
        f'<tr><td align="center">'
        f'<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #E5DCD0">'
        f'<tr><td style="padding:28px 32px 8px 32px;border-bottom:1px solid #E5DCD0">'
        f'<p style="margin:0;font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;color:#6B2D91;text-transform:uppercase">Nivoram website enquiry</p>'
        f'<p style="margin:10px 0 20px 0;font-family:Georgia,serif;font-size:22px;color:#302B32">{escape(label)}</p>'
        f'</td></tr>'
        f'<tr><td style="padding:20px 32px 28px 32px">'
        f'<table role="presentation" width="100%" cellpadding="0" cellspacing="0">{trs}</table>'
        f'</td></tr>'
        f'<tr><td style="padding:14px 32px;background:#F8F3EB;border-top:1px solid #E5DCD0">'
        f'<p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#8a838f">Sent by {escape(EMAIL_FROM_NAME)} via the website enquiry form. We never ask for your password or card details by email.</p>'
        f'</td></tr>'
        f'</table></td></tr></table>'
    )

# ---- Routes ----
@api_router.get("/")
async def root():
    return {"status": "ok", "service": "nivoram-api"}

@api_router.get("/health")
async def health():
    return {"status": "ok"}

@api_router.post("/enquiries")
async def create_enquiry(input: EnquiryCreate, request: Request):
    ip = request.client.host if request.client else "unknown"
    if not _rate_ok(ip):
        raise HTTPException(status_code=429, detail="Too many enquiries. Please try again shortly.")

    if input.website:  # honeypot filled — silently drop
        logger.info("Honeypot enquiry dropped")
        return {"status": "received", "email_notified": False}

    required_bulk = [input.company, input.occasion, input.quantity]
    if input.type == "bulk" and any(not f for f in required_bulk):
        raise HTTPException(status_code=400, detail="Please fill in company, occasion and approximate quantity.")
    if input.type == "general" and len(input.message) < 10:
        raise HTTPException(status_code=400, detail="Please tell us a little about your enquiry.")

    doc = EnquiryDocument(
        type=input.type,
        name=input.name,
        email=str(input.email),
        phone=input.phone,
        message=input.message,
        company=input.company,
        occasion=input.occasion,
        quantity=input.quantity,
        budget=input.budget,
        delivery_date=input.delivery_date,
        product_interests=input.product_interests,
        source_page=input.source_page,
        created_at=datetime.now(timezone.utc).isoformat(),
    )
    await db.enquiries.insert_one(doc.to_mongo())

    email_notified = False
    if ENQUIRY_EMAIL:
        subject = f"New Nivoram enquiry — {'Bulk / Corporate Gifting' if input.type == 'bulk' else 'General'}"
        await send_email(to=ENQUIRY_EMAIL, subject=subject, html=_enquiry_email_html(input))
        email_notified = True

    return {"status": "received", "email_notified": email_notified}

# ---- Instagram Graph API feed (token stays server-side) ----
META_ACCESS_TOKEN = os.environ.get("META_ACCESS_TOKEN", "")
IG_USER_ID = os.environ.get("IG_USER_ID", "")
META_GRAPH_API_VERSION = os.environ.get("META_GRAPH_API_VERSION", "v21.0")
IG_CACHE_TTL = int(os.environ.get("INSTAGRAM_CACHE_TTL_SECONDS", "600"))

IG_FIELDS = (
    "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,"
    "children{id,media_type,media_url,thumbnail_url}"
)

def _ig_normalize(item: dict) -> dict:
    # Carousels have no top-level media_url — use the first child image.
    media_url = item.get("media_url")
    thumb = item.get("thumbnail_url")
    children = item.get("children", {}).get("data", [])
    if item.get("media_type") == "CAROUSEL_ALBUM" and children:
        first = children[0]
        media_url = first.get("media_url") or media_url
        thumb = first.get("thumbnail_url") or thumb or media_url
    return {
        "id": item.get("id", ""),
        "caption": item.get("caption", ""),
        "media_type": item.get("media_type", "IMAGE"),
        "media_url": media_url,
        "thumbnail_url": thumb or media_url,
        "permalink": item.get("permalink", "https://www.instagram.com/nivoram.shop/"),
        "timestamp": item.get("timestamp", ""),
    }

async def _ig_cached():
    doc = await db.instagram_feed_cache.find_one({"_id": "nivoram.shop"})
    if not doc:
        return [], True
    age = (datetime.now(timezone.utc) - doc["updated_at"]).total_seconds()
    return doc.get("posts", []), age > IG_CACHE_TTL

async def _ig_fetch_and_cache() -> list:
    url = f"https://graph.facebook.com/{META_GRAPH_API_VERSION}/{IG_USER_ID}/media"
    params = {"fields": IG_FIELDS, "limit": 12, "access_token": META_ACCESS_TOKEN}
    async with httpx.AsyncClient(timeout=10) as http:
        resp = await http.get(url, params=params)
        if resp.status_code != 200:
            # log a redacted status only — never the URL (it carries the token)
            logger.error(f"Instagram feed fetch failed with status {resp.status_code}")
            raise ValueError("instagram_fetch_failed")
        raw = resp.json().get("data", [])
    posts = [_ig_normalize(x) for x in raw if x.get("permalink")]
    await db.instagram_feed_cache.replace_one(
        {"_id": "nivoram.shop"},
        {"_id": "nivoram.shop", "updated_at": datetime.now(timezone.utc), "posts": posts},
        upsert=True,
    )
    return posts

@api_router.get("/instagram/feed")
async def instagram_feed():
    old, expired = await _ig_cached()
    if not META_ACCESS_TOKEN or not IG_USER_ID:
        return {"configured": False, "stale": bool(old), "posts": old}
    if not expired and old:
        return {"configured": True, "stale": False, "posts": old}
    try:
        fresh = await _ig_fetch_and_cache()
        return {"configured": True, "stale": False, "posts": fresh}
    except Exception:
        # Meta down, token expired or rate-limited — serve cache, never break the homepage
        return {"configured": True, "stale": bool(old), "posts": old}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()