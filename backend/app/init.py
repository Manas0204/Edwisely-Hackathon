from __future__ import annotations

import os
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = BASE_DIR.parent.parent

APP_NAME = os.getenv("APP_NAME", "Edwisely Debugging Race")
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

API_PREFIX = os.getenv("API_PREFIX", "/api")
WEBSOCKET_CHANNEL = os.getenv("WEBSOCKET_CHANNEL", "race:events")

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")
REDIS_PORT = int(os.getenv("REDIS_PORT", "6379"))
REDIS_URL = os.getenv("REDIS_URL", f"redis://{REDIS_HOST}:{REDIS_PORT}/0")

DEFAULT_LANGUAGE = os.getenv("DEFAULT_LANGUAGE", "python")
SUPPORTED_LANGUAGES = ("python", "javascript")

MAX_CODE_SIZE = int(os.getenv("MAX_CODE_SIZE", "50000"))
MAX_OUTPUT_CHARS = int(os.getenv("MAX_OUTPUT_CHARS", "12000"))
DEFAULT_TIMEOUT_SECONDS = int(os.getenv("DEFAULT_TIMEOUT_SECONDS", "3"))

CORS_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:3000,http://localhost:5173",
    ).split(",")
    if origin.strip()
]