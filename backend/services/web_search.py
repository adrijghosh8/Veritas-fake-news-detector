from tavily import TavilyClient
from dotenv import load_dotenv
import os

load_dotenv()

TAVILY_API_KEY = os.getenv("TAVILY_CLIENT_API")

if not TAVILY_API_KEY:
    raise RuntimeError("TAVILY_API_KEY is missing")

tavily = TavilyClient(api_key=TAVILY_API_KEY)


def normalize_tavily_results(response):
    evidence = []

    for result in response.get("results", []):
        url = result.get("url", "").strip()
        content = result.get("content", "").strip()

        # Skip results without useful evidence
        if not url or not content:
            continue

        evidence.append({
            "source_type": "web_search",
            "title": result.get("title", ""),
            "url": url,
            "content": content,
            "relevance": result.get("score", 0)
        })

    return evidence


def search_evidence(claim: str):
    response = tavily.search(query=claim,search_depth='advanced',max_results=5)
    
    evidence = normalize_tavily_results(response=response)

    return evidence