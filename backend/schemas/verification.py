from typing import Literal
from pydantic import BaseModel, Field, HttpUrl


ClaimVerdictType = Literal[
    "SUPPORTED",
    "REFUTED",
    "PARTIALLY_SUPPORTED",
    "INSUFFICIENT_EVIDENCE"
]


class ClaimVerification(BaseModel):
    claim: str

    verdict: ClaimVerdictType

    explanation: str

    supporting_sources: list[HttpUrl] = Field(
        default_factory=list
    )

    contradicting_sources: list[HttpUrl] = Field(
        default_factory=list
    )


class ArticleVerificationResponse(BaseModel):
    verdict: ClaimVerdictType

    claims_checked: int = Field(ge=0)

    claims: list[ClaimVerification] = Field(
        default_factory=list
    )