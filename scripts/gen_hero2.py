import asyncio, os, base64
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")

async def main():
    prompt = ("Editorial hero photograph for a premium Indian home decor brand, tall 4:5 portrait composition: "
              "an elegant living-room corner at golden hour — a silver-plated Ganesha idol on a floating wooden "
              "shelf above a brass diya lamp, a tall green plant casting soft leaf shadows on a warm lime-plaster "
              "wall, a hint of cream linen sofa below, silver and marigold-orange accents, calm luxurious "
              "atmosphere, subject placed in the lower third with airy wall space above, photorealistic, "
              "no text, no watermark")
    chat = LlmChat(api_key=os.getenv("EMERGENT_LLM_KEY"), session_id="hero-image-v2", system_message="You are a commercial photographer creating hero artwork for a luxury Indian decor brand. Answer with the image only.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
    if not images: raise RuntimeError("no image")
    with open("/tmp/hero_v2.png", "wb") as f: f.write(base64.b64decode(images[0]["data"]))
    print("OK", os.path.getsize("/tmp/hero_v2.png")//1024, "KB")

asyncio.run(main())
