from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import re


class NewsInput(BaseModel):
    title: str
    
def clean_text(text: str) -> str:
    text = text.lower()
    
    # Remove URLs
    text = re.sub(r"http\S+|www\S+", "", text)

    # Keep letters, numbers, spaces and apostrophes
    text = re.sub(r"[^a-z0-9'\s]", "", text)

    # Remove extra spaces
    text = re.sub(r"\s+", " ", text)
    return text.strip()


app = FastAPI()


@app.get("/")
async def greet():
    return {"API":"Running Healthy"}


@app.post("/news/")
async def news_prediction(news: NewsInput):
    text = clean_text(news.title)
    
    try:
        pipeline = joblib.load("fake_news_pipeline.pkl")
    except Exception as e:
        print("MODEL ERROR:", repr(e))
        raise HTTPException(
            status_code=500,
            detail=f"Model couldn't load: {str(e)}"
        )
    print(pipeline.classes_)
    try:
        prediction = pipeline.predict([text])[0]
        probability = pipeline.predict_proba([text])[0]
        
        result = "TRUE" if prediction == 1 else "FAKE"
        
        return{
            "prediction": result,
            "confidence": round(float(probability[prediction]) * 100, 2)
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
    