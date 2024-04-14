from datetime import UTC, datetime, timedelta

from core.config import settings
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jwt import PyJWTError, decode, encode

from models import User

security = HTTPBearer()

def generate_jwt(user_id: int) -> str:
    payload = {
        "user_id": User.user_id,
        "exp" : datetime.now(UTC) + timedelta(days=1),
    }
    
    JWT = encode(payload, settings.JWT_SECRET, algorithm = "HS256")
    return JWT  

def validate_jwt(token: str = Security(security)):
    credentials: HTTPAuthorizationCredentials = token
    jwt_token = credentials.credentials
    try:
        payload = decode(jwt_token,settings.JWT_SECRET, algorithms=["HS256"])
        return payload
    except PyJWTError:
        raise HTTPException(
            status_code=403,
            detail = "Could not validate credentials. Please log in."
        )