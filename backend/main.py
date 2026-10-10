from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from schemas.news import NewsInput
from schemas.verification import ArticleVerificationResponse
from services.pipeline import verify_article

import os
from dotenv import load_dotenv
load_dotenv()

app = FastAPI(title="Fake News Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://fake-news-detector-frontend-rj97.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def greet():
    return {"API": "Running Healthy"}

@app.post("/verify",response_model=ArticleVerificationResponse)

async def verify_news(news: NewsInput):
    result = await verify_article(news.article_text)
    return result
