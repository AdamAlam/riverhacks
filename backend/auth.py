from datetime import datetime, timedelta, timezone
from jwt import PyJWTError, decode, encode
from core.config import settings

def generate_jwt(user_id: int) -> str:
    payload = {
        "user_id": user_id,
        "exp" : datetime.now(timezone.utc) + timedelta(days=1),
    }
    
    JWT = encode(payload, settings.JWT_SECRET, algorithm="HS256")
    return JWT

def validate_jwt(token: str):
    try:
        payload = decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        return payload
    except PyJWTError:
        return None