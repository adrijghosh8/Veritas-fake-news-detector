# 📰 Fake News Detection

<p align="center">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white">
  <img src="https://img.shields.io/badge/Scikit--Learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white">
  <img src="https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white">
  <img src="https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white">
  <img src="https://img.shields.io/badge/Joblib-3776AB?style=for-the-badge&logo=python&logoColor=white">
</p>

<p align="center">
  <b>AI-powered news classification using NLP and Machine Learning.</b>
</p>

---

## 🔎 Overview

This project detects whether a news headline is **FAKE** or **TRUE** using a trained machine-learning pipeline.

The model is exposed through a **FastAPI REST API**, allowing users or applications to submit a headline and receive a prediction with its confidence score.

```text
News Headline
      ↓
 Text Cleaning
      ↓
 TF-IDF / ML Pipeline
      ↓
   Classifier
      ↓
 FAKE / TRUE
      ↓
 Confidence %
```

The API accepts a `title` field and performs text preprocessing before passing the text to the trained pipeline.

---

## 🛠️ Tech Stack

| Category | Technologies  |
| -------- | ------------- |
| Language | Python        |
| API      | FastAPI       |
| NLP      | TF-IDF        |
| ML       | Scikit-learn  |
| Data     | Pandas, NumPy |
| Model    | Joblib        |
| Server   | Uvicorn       |

---

## ⚡ API Usage

### Health Check

```http
GET /
```

```json
{
  "API": "Running Healthy"
}
```

### Prediction

```http
POST /news/
```

**Request:**

```json
{
  "title": "Example news headline"
}
```

**Response:**

```json
{
  "prediction": "TRUE",
  "confidence": 94.52
}
```

The prediction endpoint loads `fake_news_pipeline.pkl`, generates the class prediction and obtains its probability using `predict_proba()`.

---

## 🚀 Run Locally

```bash
git clone https://github.com/YOUR_USERNAME/Fake-News-Detection.git
cd Fake-News-Detection

python -m venv venv
venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Open:

```text
http://127.0.0.1:8000/docs
```

to test the API using FastAPI's interactive documentation.

---

## 📁 Project Structure

```text
Fake-News-Detection/
│
├── frontend/
├── main.py
├── fake_news_pipeline.pkl
├── requirements.txt
└── README.md
```

---

## ✨ Highlights

* 📰 Fake/True news classification
* 🧹 Automated text preprocessing
* 🔤 NLP-based text representation
* 🤖 Machine-learning prediction
* 📊 Confidence score
* ⚡ FastAPI REST API
* 📖 Interactive Swagger documentation

---

## 🔮 Future Improvements

* 🌐 Web frontend
* 📄 Full article analysis
* 📊 Model comparison dashboard
* 🧠 Explainable AI
* 📈 Prediction history
* ☁️ Cloud deployment

---

## 👨‍💻 Author

**Adrij Ghosh**

BTech CSE | AI/ML • Backend • DSA

---

<p align="center">
  ⭐ If you found this project useful, consider starring the repository!
</p>
