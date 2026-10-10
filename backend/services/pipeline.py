import asyncio
import json

from services.claim_extractor import extract_claims
from services.web_search import search_evidence
from services.fact_check import (
    search_fact_checks,
    normalize_fact_checks,
)
from services.verifier import verify_claim
from schemas.verification import (
    ClaimVerification,
    ArticleVerificationResponse,
)


async def verify_article(article_text: str) -> ArticleVerificationResponse:
    # 1. Extract factual claims from the article
    claims = await asyncio.to_thread(
        extract_claims,
        article_text,
    )

    if not claims:
        return ArticleVerificationResponse(
            verdict="INSUFFICIENT_EVIDENCE",
            claims_checked=0,
            claims=[],
        )

    # 2. Search Tavily and Google Fact Check for each claim
    async def collect_evidence(claim: str) -> list[dict]:
        tavily_task = asyncio.to_thread(
            search_evidence,
            claim,
        )

        google_task = search_fact_checks(claim)

        tavily_evidence, google_claims = await asyncio.gather(
            tavily_task,
            google_task,
            return_exceptions=True,
        )

        evidence = []

        if not isinstance(tavily_evidence, Exception):
            evidence.extend(tavily_evidence) # type: ignore

        if not isinstance(google_claims, Exception):
            evidence.extend(normalize_fact_checks(google_claims))

        return evidence

    # 3. Collect evidence for all claims
    evidence_results = await asyncio.gather(
        *(collect_evidence(claim) for claim in claims)
    )

    # 4. Verify each claim using the LLM
    async def verify_one(
        claim: str,
        evidence: list[dict],
    ) -> ClaimVerification:
        return await asyncio.to_thread(
            verify_claim,
            claim,
            evidence
        )

    claim_results = await asyncio.gather(
        *(
            verify_one(claim, evidence)
            for claim, evidence in zip(claims, evidence_results)
        )
    )

    # 5. Calculate a conservative overall verdict
    verdicts = [result.verdict for result in claim_results]

    if all(v == "SUPPORTED" for v in verdicts):
        overall_verdict = "SUPPORTED"
    elif all(v == "REFUTED" for v in verdicts):
        overall_verdict = "REFUTED"
    elif all(v == "INSUFFICIENT_EVIDENCE" for v in verdicts):
        overall_verdict = "INSUFFICIENT_EVIDENCE"
    else:
        overall_verdict = "PARTIALLY_SUPPORTED"

    return ArticleVerificationResponse(
        verdict=overall_verdict,
        claims_checked=len(claim_results),
        claims=claim_results,
    )