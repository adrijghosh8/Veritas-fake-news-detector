from pydantic import BaseModel, Field, field_validator


class NewsInput(BaseModel):
    article_text: str = Field(
        ...,
        min_length=20,
        max_length=20000,
        description="News article text to fact-check",
    )

    @field_validator("article_text")
    @classmethod
    def validate_article_text(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Article text cannot be empty")
        return value
