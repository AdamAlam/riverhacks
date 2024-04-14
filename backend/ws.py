import asyncio
import websockets

async def send_messages():
    async with websockets.connect('ws://localhost:8000/ws/user1') as websocket:
        # Send messages to the server
        await websocket.send("Hello, User1")
        await websocket.send("How are you?")

        # Receive messages from the server
        while True:
            message = await websocket.recv()
            print(message)

asyncio.run(send_messages())