import time
import json
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.services.connection import manager
from app.services.sandbox import execute_sandboxed_code
from app.core.scoring import calculate_composite_score
from app.db.redis_client import redis_client

ws_router = APIRouter()

TEST_SUITE = """
import json

def run_tests():
    try:
        assert fibonacci(5) == [0,1,1,2,3]
        print(json.dumps({"passed":1,"total":1}))
    except:
        print(json.dumps({"passed":0,"total":1}))

try:
    run_tests()
except:
    print(json.dumps({"passed":0,"total":1}))
"""


@ws_router.websocket("/race/{race_id}")
async def race_socket(websocket: WebSocket, race_id: str):

    username = websocket.query_params.get("username", "anon")

    await manager.connect(websocket, race_id)

    start_time = time.time()
    attempts = 0
    is_submitted = False

    try:
        while True:
            data = await websocket.receive_json()

            action = data.get("action")
            code = data.get("code", "")

            if action == "RUN_TESTS":
                attempts += 1

                result = execute_sandboxed_code(code, TEST_SUITE)

                score = calculate_composite_score(
                    result["passed_tests"],
                    result["total_tests"],
                    start_time,
                    attempts,
                    is_submitted
                )

                user_data = {
                    "tests_passed": result["passed_tests"],
                    "attempts": attempts,
                    "composite_score": score
                }

                await redis_client.hset(f"race:{race_id}", username, json.dumps(user_data))

                await manager.send_personal_message(websocket, {
                    "event": "TEST_RESULTS",
                    "data": result
                })

            elif action == "SUBMIT_FINAL":
                is_submitted = True

            # FETCH LEADERBOARD FROM REDIS
            all_users = await redis_client.hgetall(f"race:{race_id}")

            leaderboard = {
                user: json.loads(data)
                for user, data in all_users.items()
            }

            await manager.broadcast_to_race(race_id, {
                "event": "LEADERBOARD_UPDATE",
                "data": leaderboard
            })

    except WebSocketDisconnect:
        manager.disconnect(websocket, race_id)