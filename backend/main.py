from fastapi import FastAPI
from openai import OpenAI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings


# api_key = os.getenv("OPENAI_API_KEY")
# print(api_key)

origins = ["http://localhost:3000"]


client = OpenAI(
    # This is the default and can be omitted
    api_key="AI KEY HERE"
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


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/generate_headlines/{year}")
async def generate_headlines(year: int):
    chat_completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "user",
                "content": f"Generate five different news headlines for the year {year}. Give me the response in a json object. Do not number the response. Return a response with the key being 'headlines' and the value being the array of headlines.",
            },
        ],
    )
    return chat_completion.choices[0].message.content
