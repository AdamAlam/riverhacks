from fastapi import FastAPI
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
import requests
from core.config import settings


origins = ["http://localhost:3000"]


client = OpenAI(
    # This is the default and can be omitted
    api_key=settings.OPEN_AI_KEY,
)


def start_application() -> FastAPI:
    """
    Initialize and configure the FastAPI application, including creating database tables
    and setting up CORS middleware.

    Returns:
        FastAPI: The configured FastAPI application.
    """
    app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app


app = start_application()


@app.get("/news/{year}")
async def generate_headlines(year: int, count: int = 5):
    count = min(count, 10)
    count = max(count, 1)

    chat_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": f"Generate {count} different news headlines for the year {year}. Give me the response in a json object. Do not number the response. Return a response with the key being 'headlines' and the value being the array of headlines.",
            },
        ],
    )
    return chat_completion.choices[0].message.content


@app.get("/entertainment/{year}")
async def generate_entertainment(year: int, count: int = 4):
    count = min(count, 10)
    count = max(count, 1)
    chat_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": f"Generate {count} different news headlines pertaining to entertainment and media for the year {year}. Give me the response in a json object. Do not number the response. Return a response with the key being 'headlines' and the value being the array of headlines.",
            },
        ],
    )
    return chat_completion.choices[0].message.content


@app.get("/sports/{year}")
async def generate_sports(year: int, count: int = 6):
    count = min(count, 10)
    count = max(count, 1)
    chat_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": f"Generate {count} different news headlines pertaining to sports for the year {year}. Give me the response in a json object. Do not number the response. Return a response with the key being 'headlines' and the value being the array of headlines.",
            },
        ],
    )
    return chat_completion.choices[0].message.content


@app.get("/elaborate")
async def elaborate_on_topic(topic: str, year: int):
    chat_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": f"Write an article elaborating on the headline: {topic}. I would like the response to be like it was written when the event happened, like a news article. If the headline is gossip related, write it in a gossip tone. You should write it in the tone appropriate for the headline. Give me the response in a JSON object. The key should be 'article' and the value should be the article. The second key should be 'date' and the value should be a plausible date that that this article would be published. The article date should be in the year {year}. I want the date in the format 'YYYY-MM-DD'. The article should be at least 2 paragraphs long but can be as long as 5 paragraphs.",
            },
        ],
    )
    return chat_completion.choices[0].message.content


@app.get("/get-image")
async def get_image(headline: str, year: int):
    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "q": headline + " " + str(year),
        "cx": "e44cc2530369a4c11",
        "searchType": "image",
        "key": settings.GCP_KEY,
        "num": 5,
    }
    response = requests.get(url, params=params)
    if response.status_code == 200:
        data = response.json()
        return [item["link"] for item in data.get("items", [])]
    else:
        return None


@app.get("/music/{year}")
async def generate_music(year: int, count: int = 6):
    count = min(count, 10)
    count = max(count, 1)
    chat_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": f"Give me the most popular songs for the year {year}. Give me the response in a json object. Do not number the response. Return a response with the key being 'songs' and the value being the array of song titles.",
            },
        ],
    )
    return chat_completion.choices[0].message.content


# @app.get("/process-text/")
# def process_text(text: str):
#     response = client.images.generate(
#         model="dall-e-3",
#         prompt="Give me an image of this text: " + text,
#         size="1024x1024",
#         quality="standard",
#         n=1,
#     )

#     image_url = response.data[0].url
#     return image_url
