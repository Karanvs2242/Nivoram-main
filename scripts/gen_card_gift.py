import asyncio, os, base64
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")

async def main():
    prompt = "Editorial photograph, 4:3 composition: elegant silver-tone gift boxes with silk ribbons and a silver showpiece being wrapped, scattered marigold petals, warm cream festive styling, premium gifting magazine look, photorealistic, no text, no watermark"
    chat = LlmChat(api_key=os.getenv("EMERGENT_LLM_KEY"), session_id="card-thoughtful-gifting", system_message="You are a commercial photographer creating artwork for a luxury Indian decor brand. Answer with the image only.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
    if not images: raise RuntimeError("no image")
    raw = "/tmp/cards/thoughtful-gifting.png"
    with open(raw, "wb") as f: f.write(base64.b64decode(images[0]["data"]))
    print("OK", os.path.getsize(raw)//1024, "KB")

asyncio.run(main())
