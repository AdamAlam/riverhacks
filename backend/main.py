from typing import List
import bcrypt
from fastapi import FastAPI
from fastapi import Depends, FastAPI, Header, HTTPException, Query, status
from requests import Session
from db.models import *
from schema import UserCreate
from db.session import SessionLocal
from db.models import User

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/signup/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    existing_user= db.query(User).filter(User.username == user.username).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f'User with username {user.username} already exists.'
        )
        
    hashed_pass = bcrypt.hashpw(user.Password.encode("utf-8"), bcrypt.gensalt()).decode(
        "utf-8"
    )
    new_user = User(
        username = user.username,
        hash = hashed_pass,
        created_at = user.created_at,
        first_name = user.first_name,
        last_name = user.last_name,
        profile_picture_url = user.profile_picture_url
    )
    
@app.post("/login/")
def login_user(
    username: str = Header(None),
    password: str = Header(None),
    db: Session = Depends(get_db)
):
    if username is None or password is None:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail=f"User with {username} not found.",
        )
    user = db.query(User).filter(User.username == username).first()
    if not user:
        raise HTTPException(
            status_code = status.HTTP_404_NOT_FOUND,
            detail = f"User with username {username} not found."
        )
        
    if not bcrypt.checkpw(password.encode("utf-8"), user.password_hash.encode("utf-8")):
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED
        )
    JWT = generate_jwt(user.id)  # type: ignore
    return {"jwt": JWT}

@app.post("/friends")
def friendship_request(user_id:str, friend_id:str, db:Session = Depends(get_db)):
    user = db.query(User).filter(User.userid==user_id).first()
    friend = db.query(User).filter(User.userid==friend_id).first()
    
    if not user or not friend:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User or friend not found."
        )
        
    if friend_id in user.friend:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"User {user.username} already friend with {friend.username}.",
        )
    
    user.friends.append(friend_id)
    db.commit()
    
    return {"message":f"{user.username}, friendship with {friend.username} succesfuly created."}