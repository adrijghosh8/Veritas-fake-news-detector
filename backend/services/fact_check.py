import os
import httpx


def normalize_fact_checks(claims):
    reviews = []

    for claim in claims:
        for review in claim.get("claimReview", []):
            publisher = review.get("publisher", {})
            url = review.get("url", "").strip()

            if not url:
                continue

            reviews.append({
                "source_type": "fact_check",
                "title": review.get("title", ""),
                "url": url,
                "content": "",
                "relevance": 0,
                "matched_claim": claim.get("text", ""),
                "claimant": claim.get("claimant", ""),
                "claim_date": claim.get("claimDate"),
                "publisher": publisher.get("name", ""),
                "rating": review.get("textualRating", ""),
                "review_date": review.get("reviewDate"),
                "language": review.get("languageCode", "")
            })

    return reviews


async def search_fact_checks(claim: str):
    api_key = os.getenv("GOOGLE_FACT_CHECK_API_KEY")

    if not api_key:
        raise RuntimeError("Google Fact Check API key is missing")

    url = (
        "https://factchecktools.googleapis.com/"
        "v1alpha1/claims:search"
    )

    params = {
        "query": claim,
        "languageCode": "en",
        "pageSize": 5,
        "key": api_key
    }

    async with httpx.AsyncClient(timeout=15) as client:
        response = await client.get(url, params=params)
        response.raise_for_status()
        data = response.json()

    return data.get("claims", [])
