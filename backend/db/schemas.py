from pydantic import BaseModel

class UserSchema(BaseModel):
    user_id: int
    username: str
    password_hash: str
    first_name: str
    last_name: str
    profile_picture_url: str

    class Config:
        orm_mode = True

class MessageSchema(BaseModel):
    message_id: int
    from_user_id: int
    to_user_id: int
    content: str

    class Config:
        orm_mode = True

class UserResponse(BaseModel):
    user_id: int
    username: str
    profile_picture_url: str

class MessageCreate(BaseModel):
    from_user_id: int
    to_user_id: int
    content: str

class MessageResponse(BaseModel):
    message_id: int
    from_user_id: int
    to_user_id: int
    content: str