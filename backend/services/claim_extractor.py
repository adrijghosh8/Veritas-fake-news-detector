import json
from langchain_core.messages import HumanMessage, SystemMessage

from services.llm import llm

def extract_claims(article: str) -> list[str]:
    messages = [
        SystemMessage(content="""
You are a factual claim extraction assistant.

Extract at most 5 important, independently verifiable
factual claims from the supplied news article.

CRITICAL RULES:
1. Preserve the exact meaning of every claim in the article.
2. NEVER remove or reverse negation, including "not", "no longer",
   "no more", "never", "did not", and "isn't".
3. Preserve qualifiers such as "allegedly", "possibly", "only",
   dates, quantities, and comparisons.
4. Do not convert a negative claim into a positive claim.
5. Do not correct, rewrite, or fact-check claims during extraction.
6. Extract claims faithfully, even when they sound false.
7. Before returning each claim, check that its meaning matches
   the original article sentence.
8. Return only valid JSON in this format:
   {"claims": ["claim 1", "claim 2"]}


Rules:
1. Extract factual assertions, not opinions or predictions.
2. Preserve dates, numbers, locations and context.
3. Make each claim understandable on its own.
4. Keep each claim atomic: one main factual assertion.
5. Do not invent facts or add information.
6. Prefer important claims over minor details.
7. If there are no verifiable claims, return an empty list.

Return ONLY valid JSON in this format:
{
  "claims": [
    "First factual claim",
    "Second factual claim"
  ]
}
"""),
        HumanMessage(content=f"Article to analyze:\n{article}")
    ]
    
    response = llm.invoke(messages)
    output = response.content

    try:
        if isinstance(output, list):
            output = "".join(
                part if isinstance(part, str)
                else part.get("text", "")
                for part in output
                if isinstance(part, str)
                or (isinstance(part, dict) and part.get("type") == "text")
            )

        output = output.strip()

        if output.startswith("```"):
            output = output.split("\n", 1)[1].rsplit("```", 1)[0].strip()

        data = json.loads(output)
        claims = data.get("claims", [])

        return [
            claim.strip()
            for claim in claims[:5]
            if isinstance(claim, str) and claim.strip()
        ] if isinstance(claims, list) else []

    except (json.JSONDecodeError, TypeError, AttributeError) as exc:
        print("CLAIM EXTRACTION ERROR:", repr(exc))
        return []