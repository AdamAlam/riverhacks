from datetime import datetime
from typing import Annotated, Dict, List
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

from db import schemas

from db.models import User, Message
from db.session import SessionLocal
from fastapi import (
    Cookie,
    Depends,
    Request,
    FastAPI,
    Query,
    WebSocket,
    WebSocketException,
    status, HTTPException,
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

html = '''
<!DOCTYPE html>
<html>
<head>
    <title>WebSocket Example</title>
</head>
<body>
    <h1>WebSocket Example</h1>
    <div>
        <input type="text" id="messageInput" placeholder="Type a message">
        <button onclick="sendMessage()">Send</button>
    </div>
    <div id="output"></div>

    <script>
        const userId = prompt("Enter your user ID (e.g., user1, user2):"); // Prompt the user for their user ID

        const ws = new WebSocket(`ws://localhost:8000/ws/${userId}`);

        ws.onmessage = function (event) {
            const outputDiv = document.getElementById("output");
            outputDiv.innerHTML += `<p>${event.data}</p>`;
        };

        function sendMessage() {
            const messageInput = document.getElementById("messageInput");
            const message = messageInput.value;
            ws.send(message);
            messageInput.value = "";
        }
    </script>
</body>
</html>
'''

me = "user1"

class ConnectionManager:
    def __init__(self):
        self.ws_connections: Dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, user_id: str):
        await websocket.accept()
        uuid = me + user_id
        self.ws_connections[uuid] = websocket

    def disconnect(self, websocket: WebSocket, user_id: str):
        uuid = me + user_id
        del self.ws_connections[uuid]
    async def send_personal_message(self, message: str, user_id: str):
        uuid = me + user_id
        if uuid in self.ws_connections:
            await self.ws_connections[uuid].send_text(message)
        else:
            print("User not connected")

    # async def broadcast(self, message: str):
    #     for connection in self.active_connections:
    #         await connection.send_text(message)

app = FastAPI()

connected_users: Dict[str, WebSocket] = {}

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/chatting")
async def chatting():
    return HTMLResponse(html)

@app.post("/messages/", response_model=schemas.MessageCreate)
async def create_message(message: schemas.MessageCreate, db: Session = Depends(get_db)):
    new_message = Message(
        from_user_id=message.from_user_id,
        to_user_id=message.to_user_id,
        content=message.content,
        sent_time=datetime.now()
    )
    db.add(new_message)
    try:
        db.commit()
        db.refresh(new_message)
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        ) from e
    return new_message


@app.get("/user_id/{username}", response_model=schemas.UserResponse)
def get_userid_by_username(username: str, db: Session = Depends(get_db)):
    user_id = db.query(User.user_id).filter(User.username == username).one_or_none()
    if user_id is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user_id

def generate_session_id(user_id1: str, user_id2: str) -> str:
    # Sort user IDs alphabetically and concatenate them to form the session ID
    sorted_ids = sorted([user_id1, user_id2])
    return "_".join(sorted_ids)

# read messages
@app.get("/messages/", response_model=List[schemas.MessageResponse])
def get_message_by_user_id(to_user_id: str, from_user_id: str, db: Session = Depends(get_db)):
    messages = db.query(Message).filter(((Message.from_user_id == from_user_id) & (Message.to_user_id == to_user_id)) | (Message.to_user_id == from_user_id) & (Message.from_user_id == to_user_id)).all()
    return messages

@app.get("/allUsers")
async def get_all_users(db: Session = Depends(get_db)):

    db_response = db.query(User).all()
    return db_response


messages = []

manager = ConnectionManager()
@app.websocket("/ws/{user_id}")
# user_id sent from the client will be used for combination of user_id in current user (cookie...)
# it's going to create unique web socket for two people
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await manager.connect(websocket, user_id)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_personal_message(f"You wrote: {data}", user_id)
            # await manager.broadcast(f"{user_id} says: {data}")
    except WebSocketException:
        manager.disconnect(websocket)
        # await manager.broadcast(f"{user_id} disconnected")




    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message was sent: {data}")
