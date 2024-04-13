from fastapi import FastAPI
from openai import OpenAI
import os

# api_key = os.getenv("OPENAI_API_KEY")
# print(api_key)


client = OpenAI(
    # This is the default and can be omitted
    api_key="<KEY HERE>"
)

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/generate_headlines/{year}", response_model=list[str])
async def generate_headlines(year: int):
    # prompt = f"Generate five different news headlines for the year {year}:"
    # try:
    #     response = openai.Completion.create(
    #         engine="text-davinci-002",  # Or another suitable model
    #         prompt=prompt,
    #         max_tokens=100,
    #         n=5,
    #         stop="\n",
    #     )
    #     headlines = [choice["text"].strip() for choice in response.choices]
    #     return headlines
    # except Exception as e:
    #     raise HTTPException(status_code=500, detail=str(e))
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": "Say this is a test",
            }
        ],
        model="gpt-3.5-turbo",
    )
    return chat_completion
