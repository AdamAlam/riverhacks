from pydantic import BaseSettings

class Settings(BaseSettings):
    JWT_SECRET: str = "secret_key123" 
settings = Settings()