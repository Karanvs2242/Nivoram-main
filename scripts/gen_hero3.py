import asyncio, os, base64
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")

async def main():
    prompt = ("Editorial hero photograph for a premium Indian home decor brand, tall 4:5 portrait composition: "
              "a beautifully styled cream console vignette showing MULTIPLE silver-plated decor pieces together — "
              "a small Ganesha idol, a pair of carved silver vases, a round silver wall clock above, an ornate "
              "silver bowl and a pair of silver elephant figurines — arranged as a curated collection, warm cream "
              "plaster wall, soft morning window light, marigold-orange accent cushions below, luxurious magazine "
              "styling, every piece clearly visible, photorealistic, no text, no watermark")
    chat = LlmChat(api_key=os.getenv("EMERGENT_LLM_KEY"), session_id="hero-image-v3", system_message="You are a commercial photographer creating hero artwork for a luxury Indian decor brand. Answer with the image only.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
    if not images: raise RuntimeError("no image")
    with open("/tmp/hero_v3.png", "wb") as f: f.write(base64.b64decode(images[0]["data"]))
    print("OK", os.path.getsize("/tmp/hero_v3.png")//1024, "KB")

asyncio.run(main())
