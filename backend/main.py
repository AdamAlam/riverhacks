from typing import Annotated, Dict
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles

from db.models import User
from db.session import SessionLocal
from fastapi import (
    Cookie,
    Depends,
    Request,
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

@app.get("/allUsers")
async def get_all_users(db: Session = Depends(get_db)):

    db_response = db.query(User).all()
    return db_response

if __name__ == "__main__":
    import uvicorn

