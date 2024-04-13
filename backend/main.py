from typing import Annotated
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session

from db.models import User
from db.session import SessionLocal
from fastapi import (
    Cookie,
    Depends,
    FastAPI,
    Query,
    WebSocket,
    WebSocketException,
    status,
)


def get_db():
    """
    Dependency that provides a SQLAlchemy session for interacting with the database.
    It automatically handles session closing.

    Yields:
        Session: SQLAlchemy session.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()

connected_users = {}

@app.get("/")
async def root():
    return {"message": "Hello World"}

messages = []

@app.websocket("/ws/{user_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    user_id: str
):
    await websocket.accept()
    connected_users[user_id] = websocket
    print("You're connected to a websocket")

    while True:
        data = await websocket.receive_text()
        messages.append({"user_id": user_id, "message": data})
        await websocket.send_text(f"Message text was: {data}, for item ID: {user_id}")

@app.get("/allUsers")
async def get_all_users(db: Session = Depends(get_db)):

    db_response = db.query(User).all()
    return db_response

if __name__ == "__main__":
    import uvicorn

