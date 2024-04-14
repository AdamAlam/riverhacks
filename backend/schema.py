from typing import Optional
from pydantic import BaseModel


class UserCreate(BaseModel):
    username: str
    password_hash: str
    first_name: str
    last_name: Optional[str]=None
    profile_picture_url: Optional[str]=None
    
    