import joblib

pipeline = joblib.load("fake_news_pipeline.pkl")

tests = [
    "Scientists confirm that drinking bleach can cure every disease.",
    "The government announced a new education policy today.",
    "NASA successfully launched a new satellite into orbit.",
    "Aliens have landed in India and taken control of the government."
]

for text in tests:
    prediction = pipeline.predict([text])[0]
    probability = pipeline.predict_proba([text])[0]

    print("\nText:", text)
    print("Prediction:", prediction)
    print("Probability:", probability)