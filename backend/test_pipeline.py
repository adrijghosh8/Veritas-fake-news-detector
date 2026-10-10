
import asyncio
import json

from services.pipeline import verify_article
from services.claim_extractor import extract_claims


# Test the exact article entered in your Veritas website.
ARTICLE = """
Narendra Modi is no more the Prime Minister of India.
"""


def print_section(title: str):
    print("\n" + "=" * 70)
    print(title)
    print("=" * 70)


async def main():
    print_section("VERITAS - FAKE NEWS DETECTION PIPELINE TEST")

    # Step 1: Display the article being tested
    print("\n[1] INPUT ARTICLE")
    print(ARTICLE.strip())

    # Step 2: Test claim extraction separately
    print_section("[2] CLAIM EXTRACTION TEST")

    try:
        extracted_claims = await asyncio.to_thread(
            extract_claims, ARTICLE
        )

        if not extracted_claims:
            print("ERROR: No claims were extracted.")
            print("Check services/claim_extractor.py")
            return

        for index, claim in enumerate(extracted_claims, start=1):
            print(f"\nClaim {index}: {claim}")

    except Exception as exc:
        print(f"CLAIM EXTRACTION FAILED: {type(exc).__name__}: {exc}")
        raise

    # Step 3: Run the complete verification pipeline
    print_section("[3] FULL PIPELINE TEST")

    try:
        result = await verify_article(ARTICLE)

    except Exception as exc:
        print(f"PIPELINE FAILED: {type(exc).__name__}: {exc}")
        raise

    # Step 4: Display the overall verdict
    print_section("[4] OVERALL RESULT")

    print(f"Overall verdict : {result.verdict}")
    print(f"Claims checked  : {result.claims_checked}")

    # Step 5: Inspect each claim's verdict and explanation
    print_section("[5] CLAIM-LEVEL VERIFICATION")

    for index, item in enumerate(result.claims, start=1):
        print(f"\nClaim {index}")
        print("-" * 50)

        print(f"Claim    : {item.claim}")
        print(f"Verdict  : {item.verdict}")
        print(f"Reason   : {item.explanation}")

        print("\nSupporting sources:")
        if item.supporting_sources:
            for url in item.supporting_sources:
                print(f"  - {url}")
        else:
            print("  None returned")

        print("\nContradicting sources:")
        if item.contradicting_sources:
            for url in item.contradicting_sources:
                print(f"  - {url}")
        else:
            print("  None returned")

    # Step 6: Print the complete structured response
    print_section("[6] COMPLETE JSON RESPONSE")

    output = result.model_dump(mode="json")
    print(json.dumps(output, indent=2, ensure_ascii=False))

    print_section("TEST COMPLETED")


if __name__ == "__main__":
    asyncio.run(main())
