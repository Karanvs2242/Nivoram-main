import asyncio, os, base64
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")

CARDS = {
  "sacred-elegance": "Editorial photograph for a premium Indian decor brand, 4:3 composition: a silver-plated Ganesha idol on a carved wooden pedestal with fresh marigold and lotus flowers and glowing diyas, warm cream backdrop, soft morning light, luxurious minimalist styling, photorealistic, no text, no watermark",
  "statement-decor": "Editorial photograph, 4:3 composition: a sculptural silver showpiece centrepiece on a console table in an elegant modern living room, cream walls, warm lamp glow, interior magazine styling, no people, photorealistic, no text",
  "auspicious-living": "Editorial photograph, 4:3 composition: silver elephant figurines and auspicious Indian motifs arranged on a wooden shelf with soft greenery, warm cream tones, soft daylight, premium home decor magazine look, photorealistic, no text",
  "divine-grace": "Editorial photograph, 4:3 composition: a set of silver-plated devotional idols glowing beside brass lanterns and candles on dark wood, serene warm evening mood, premium editorial styling, photorealistic, no text",
}

STYLE = "You are a commercial photographer creating artwork for a luxury Indian decor brand. Answer with the image only."

async def main():
    os.makedirs("/tmp/cards", exist_ok=True)
    for slug, prompt in CARDS.items():
        chat = LlmChat(api_key=os.getenv("EMERGENT_LLM_KEY"), session_id=f"card-{slug}", system_message=STYLE)
        chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
        text, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
        if not images:
            raise RuntimeError(f"{slug}: no image returned")
        raw = f"/tmp/cards/{slug}.png"
        with open(raw, "wb") as f:
            f.write(base64.b64decode(images[0]["data"]))
        print(f"OK {slug} ({os.path.getsize(raw)//1024} KB)")

asyncio.run(main())
