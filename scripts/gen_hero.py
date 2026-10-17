import asyncio, os, base64
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")

async def main():
    prompt = ("Editorial hero photograph for a premium Indian home decor brand, tall 4:5 portrait composition: "
              "a beautiful silver-plated Ganesha idol styled on a carved dark-wood console against a warm cream "
              "plaster wall, fresh marigold garlands, lotus flowers and small glowing diyas, soft golden window "
              "light from the left, luxurious minimalist Indian interior, generous calm space around the subject, "
              "subject centred with breathing room, photorealistic, no text, no watermark")
    chat = LlmChat(api_key=os.getenv("EMERGENT_LLM_KEY"), session_id="hero-image", system_message="You are a commercial photographer creating hero artwork for a luxury Indian decor brand. Answer with the image only.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
    if not images: raise RuntimeError("no image")
    with open("/tmp/hero.png", "wb") as f: f.write(base64.b64decode(images[0]["data"]))
    print("OK", os.path.getsize("/tmp/hero.png")//1024, "KB")

asyncio.run(main())
