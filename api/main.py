"""
Entry point for the FastAPI Application
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import (
    auth_router,
    tasks_router,
    external_api_router,
    comments_router,
    users_router,
)
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:5173")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(tasks_router.router)
app.include_router(external_api_router.router)
app.include_router(comments_router.router)
app.include_router(users_router.router)
