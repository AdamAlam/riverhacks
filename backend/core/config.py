import os
from pathlib import Path

from dotenv import load_dotenv

env_path = Path(".") / ".env"
load_dotenv(dotenv_path=env_path)


class Settings:
    PROJECT_NAME: str = "nostalgia"
    PROJECT_VERSION: str = "1.0.0"

    DATABASE_URL = os.getenv("SUPABASE_URL")
    OPEN_AI_KEY = os.getenv("OPENAI_API_KEY")
    GCP_KEY = os.getenv("GCP_KEY")


settings = Settings()
