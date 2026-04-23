from typing import Dict, List, Any
from fastapi import WebSocket

class ConnectionManager:
    def __init__(self):
        # Maps race_id to a list of active WebSocket connections
        self.active_rooms: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, race_id: str):
        await websocket.accept()
        if race_id not in self.active_rooms:
            self.active_rooms[race_id] = []
        self.active_rooms[race_id].append(websocket)

    def disconnect(self, websocket: WebSocket, race_id: str):
        if race_id in self.active_rooms:
            self.active_rooms[race_id].remove(websocket)
            if not self.active_rooms[race_id]:
                del self.active_rooms[race_id]

    async def broadcast_to_race(self, race_id: str, message: dict):
        """Pushes state updates to all participants in a specific race."""
        if race_id in self.active_rooms:
            for connection in self.active_rooms[race_id]:
                try:
                    await connection.send_json(message)
                except Exception:
                    # Handle broken pipes without crashing the broadcast loop
                    pass

    async def send_personal_message(self, websocket: WebSocket, message: dict):
        """Sends targeted feedback, such as individual test suite results."""
        await websocket.send_json(message)

manager = ConnectionManager()