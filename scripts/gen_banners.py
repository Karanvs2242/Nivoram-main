import asyncio, os, base64
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")

BANNERS = {
  "sacred-elegance": "Wide panoramic editorial photograph for a premium Indian decor brand: a silver-plated Ganesha idol on a carved pedestal, fresh marigold and lotus flowers, small glowing diyas, soft warm cream backdrop, gentle morning light, luxurious minimalist styling, silver and warm gold tones, photorealistic, no text, no watermark",
  "statement-decor": "Wide panoramic editorial photograph: a sculptural silver showpiece centrepiece on a console table in an elegant modern living room, cream walls, warm ambient lamps, editorial interior magazine styling, luxurious and serene, no people, photorealistic, no text",
  "auspicious-living": "Wide panoramic editorial photograph: silver elephant figurines and auspicious Indian motifs styled on a wooden shelf with soft greenery, warm cream tones, soft daylight, premium home decor magazine look, photorealistic, no text",
  "divine-grace": "Wide panoramic editorial photograph: silver-plated devotional idols glowing softly beside brass lanterns and candles on a dark wood console, serene warm evening mood, premium editorial styling, photorealistic, no text",
  "thoughtful-gifting": "Wide panoramic editorial photograph: elegant silver-tone gift boxes with silk ribbons and a silver showpiece being wrapped, scattered marigold petals, warm cream festive styling, premium gifting magazine look, photorealistic, no text",
}

STYLE = "You are a commercial photographer creating banner artwork for a luxury Indian decor brand. Answer with the image only."

async def gen(slug, prompt):
    chat = LlmChat(api_key=os.getenv("EMERGENT_LLM_KEY"), session_id=f"banner-{slug}", system_message=STYLE)
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
    if not images:
        raise RuntimeError(f"{slug}: no image returned (text: {str(text)[:80]})")
    raw = f"/tmp/banner_{slug}.png"
    with open(raw, "wb") as f:
        f.write(base64.b64decode(images[0]["data"]))
    print(f"OK {slug} ({os.path.getsize(raw)//1024} KB)")
    return raw

async def main():
    for slug, prompt in BANNERS.items():
        await gen(slug, prompt)

asyncio.run(main())
