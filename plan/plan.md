# NIVORAM Website — Complete Architecture & How It Works

A premium, animated brand showcase and enquiry-led catalogue website for NIVORAM, a silver-plated décor and gifting brand serving India & UAE. The site presents the full real catalogue and turns every visit into a WhatsApp chat, form enquiry, or email.

**Who it's for:** Nivoram's owner (to understand, run and extend the site) and its shoppers (to browse, discover, and enquire). This document is the owner's plain-language explanation of everything under the hood.

---

## 1. The Tools (Tech Stack)

**Frontend (what visitors see)**

| Tool | What it does for the site |
|---|---|
| React (Create React App) | The single-page app framework — every page is a fast client-side view |
| React Router | Page navigation without reloads (/, /shop, /collections/..., /products/..., /gift-finder, etc.) |
| Tailwind CSS | The styling system — all colours, spacing, responsive layouts |
| shadcn/ui | Pre-built accessible components (buttons, accordions, toasts) |
| Framer Motion | All animations — hero reveals, card hovers, page transitions, dropdowns |
| Lenis | Buttery smooth momentum scrolling |
| Sonner | The small toast notifications (e.g., fallback messages) |

**Backend (the invisible worker)**
| Tool | What it does |
|---|---|
| FastAPI (Python) | The API server — receives form enquiries, health checks, Instagram feed proxy |
| MongoDB | The database — permanently stores every enquiry submitted |
| Resend (Emergent-managed) | Sends the owner an email for every enquiry |
| Instagram Graph API (pending token) | Will sync real @nivoram.shop posts to the homepage |

**Platform & infrastructure**
| Layer | Detail |
|---|---|
| Emergent platform | Hosts everything; preview URL for development, Deploy button publishes live |
| Supervisor | Keeps frontend (port 3000) and backend (port 8001) always running |
| Routing rule | Any URL starting with `/api` goes to the backend; everything else goes to the React app |

---

## 2. Codebase Map (what lives where)

```
/app
├── frontend/                      ← everything visitors see
│   ├── public/
│   │   ├── products/              ← 88 real catalogue photos (from your PDF)
│   │   ├── logo.png, mandala.png  ← official transparent logo assets
│   │   ├── favicon.*, apple-touch-icon
│   │   ├── robots.txt             ← tells Google what to crawl
│   │   ├── sitemap.xml            ← lists all pages for Google
│   │   └── llms.txt               ← helps AI assistants cite the site
│   ├── src/
│   │   ├── App.js                 ← router + global setup (fonts, lenis, festive mode)
│   │   ├── config/site.js         ← ONE place for phone, email, socials, support strip text
│   │   ├── config/festive.js      ← Diwali calendar windows (2025–2030)
│   │   ├── data/catalog.js        ← THE CATALOGUE: 59 products, 6 collections,
│   │   │                             gift occasions, journal, photos, badges
│   │   ├── lib/seo.js             ← page titles, meta tags, Google structured data
│   │   ├── lib/whatsapp.js        ← builds wa.me links with pre-filled messages
│   │   ├── lib/motion.js          ← shared animation presets
│   │   ├── components/            ← Header, Footer, Logo, ProductCard, CollectionCard,
│   │   │                             NavDropdown, FramedImage, SectionHeading, WhatsAppButton…
│   │   ├── components/ui/         ← shadcn/ui primitives
│   │   └── pages/                 ← Home, Shop, ProductDetail, Collections, CollectionDetail,
│   │                                  OccasionGifts, GiftFinder, OurStory, WhyNivoram,
│   │                                  Craftsmanship, CorporateGifting, Contact, CustomOrders,
│   │                                  FAQs, Journal, JournalArticle, Privacy, Terms, NotFound
│   └── tailwind.config.js         ← the brand palette (cream, ink, flame, royal, lav, sand…)
├── backend/
│   ├── server.py                  ← the API: /api/contact, /api/corporate-enquiry,
│   │                                 /api/instagram-feed, /api/health
│   ├── requirements.txt           ← Python dependencies
│   └── .env                       ← MONGO_URL, DB_NAME, secrets (never touched by hand)
└── memory/PRD.md                  ← living record of every feature decision
```

**Key principle:** the entire catalogue is a single editable file (`catalog.js`). Add a product entry there and it instantly appears in shop grids, filters, collection pages, occasion pages, the gift finder, and search — no other code changes.

---

## 3. Architecture — How the Pieces Talk

```
                        ┌────────────────────────────────────┐
                        │          VISITOR'S BROWSER         │
                        │   (phone, tablet, or desktop)      │
                        └──────────────┬─────────────────────┘
                                       │ loads the site
                                       ▼
        ┌──────────────────────────────────────────────────────────┐
        │                 REACT FRONTEND (port 3000)               │
        │  • Renders every page from one codebase                  │
        │  • Reads products/collections from data/catalog.js       │
        │  • Reads brand settings from config/site.js              │
        │  • Animations via Framer Motion, scroll via Lenis        │
        └──────┬───────────────────────┬───────────────────────────┘
               │ forms POST /api/...   │ clicks WhatsApp button
               ▼                       ▼
   ┌───────────────────────┐   ┌──────────────────────────┐
   │  FASTAPI (port 8001)  │   │  wa.me / 917760511222    │
   │  • validates enquiry  │   │  opens the visitor's     │
   │  • stores in MongoDB  │   │  WhatsApp chat with a    │
   │  • emails via Resend  │   │  pre-filled message      │
   └───────┬─────────┬─────┘   └──────────────────────────┘
           │         │
           ▼         ▼
   ┌──────────┐  ┌─────────────────────────┐
   │ MONGODB  │  │ RESEND → owner's inbox  │
   │(enquiries│  │ (every enquiry emailed) │
   └──────────┘  └─────────────────────────┘
```

---

## 4. Flowcharts of the Main Journeys

**A. A shopper browsing to an enquiry**
```
Visitor opens site
      │
      ▼
Home ──► picks a path:
      │        ├── Shop All / New Arrivals / Bestsellers
      │        ├── Collections (6 themed collections)
      │        ├── Occasions (Wedding, Housewarming, Festive, Return, Corporate)
      │        └── Gift Finder quiz (3 questions → matched products)
      ▼
Product grid (square photo cards, badges: NEW / BESTSELLER)
      │
      ▼
Product detail page ── full photo, gallery, specs, price-on-enquiry
      │
      ├──► "Enquire" (orange header button / green page button)
      │        └── WhatsApp opens with: product name + SKU pre-typed
      └──► Contact / Custom Orders form
               └── FastAPI validates → MongoDB saves → Resend emails owner
```

**B. Enquiry form flow (contact & corporate)**
```
Visitor fills form ──► submit ──► POST /api/contact (or /api/corporate-enquiry)
                                        │
                              valid? ───┼── no → friendly error, stay on form
                                        └── yes → saved to MongoDB
                                                → Resend emails the owner
                                                → visitor sees confirmation
```

**C. Festive Diwali mode (automatic)**
```
Visitor loads any page
      │
      ▼
App.js checks: is today inside a Diwali window in config/festive.js?
      │                          (also honours ?festive=1 / ?festive=0 overrides)
      ├── YES → "festive" class on <html>
      │          • flame gradients warm up (coral → orange → gold tip)
      │          • gold hairlines on badges, gold ring on CTAs
      │          • hero glow + banner gradients animate slowly
      └── NO  → standard look, byte-for-byte
```

**D. Image fitting system**
```
Product photo (any shape, 0.5–3.4 ratio)
      │
      ├── product card (square frame) ──► photo centre-cropped to fit,
      │        │                          wide sets opt into blur-fill instead
      │        └── contain: true → FramedImage (full photo floats over
      │                             blurred copy of itself — nothing cut)
      └── product detail page ──► photo shown at its natural shape,
                                  never cropped, never stretched
```

---

## 5. How Each Key Feature Works

- **Catalogue:** All 59 products live in `data/catalog.js` with name, SKU, description, photos, collection, occasions, and optional badges (5 New Arrivals, 6 Bestsellers — randomised at your request, changeable anytime). Everything is "Price on enquiry" — no prices anywhere, by design.
- **WhatsApp everywhere:** One phone number in `config/site.js` (+91 77605 11222) powers the floating bubble, orange header ENQUIRE, product page buttons, card quick-enquire, contact/corporate/gift-finder flows — each opens a chat pre-filled with the relevant product name and SKU.
- **Gift Finder:** A 3-step quiz (who / occasion / budget taste) filters the catalogue client-side and shows matched products instantly — no server needed.
- **Festive mode:** Fully automatic by calendar (next window: 4–11 Nov 2026); preview anytime by adding `?festive=1` to any URL.
- **SEO:** Every page sets its own title/description/structured data (`lib/seo.js`); `sitemap.xml`, `robots.txt`, and `llms.txt` are pre-written. Once your final domain is set, the site is Google-ready.
- **Emails:** Every form enquiry lands in MongoDB and is emailed through Resend. The enquiry inbox address is still a **placeholder test address — the one pending launch item**.

---

## 6. Current Status & What's Left

| Item | Status |
|---|---|
| Full catalogue + real photography | ✅ Live |
| WhatsApp (+91 77605 11222) | ✅ Configured |
| Forms + database + email notifications | ✅ Working (test email address) |
| Festive Diwali mode (auto-calendar) | ✅ Live, next window Nov 2026 |
| Brand system (flame + orchid + purple strip + gradient CTA) | ✅ Live |
| **Owner email address** | ⏳ Replace placeholder in site config |
| **Instagram token** | ⏳ Optional — until then homepage shows catalogue-photo tiles linking to @nivoram.shop |
| **Production domain** | ⏳ Set at Deploy time |

---

## 7. Assumptions (decisions made without asking)

1. This document is informational — no code changes are proposed in it.
2. The explanation targets the owner, so technical depth is moderate and jargon is explained.
3. Flowcharts are text/ASCII so they render anywhere; they can be turned into drawn diagrams on request.
4. Product count (59) reflects the current catalogue file; the photo count (88) reflects the extracted PDF images.
5. The old tagline "Elegance That Lasts." is fully retired in favour of "Timeless Elegance for Every Space & Celebration."
