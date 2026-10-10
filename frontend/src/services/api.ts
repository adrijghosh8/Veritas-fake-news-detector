import {
  VERDICTS,
  type ApiErrorKind,
  type ClaimResult,
  type Verdict,
  type VerificationResponse,
} from "../types/verification";

const API_URL = (import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000").replace(/\/+$/, "");

/** Verification runs a multi-step pipeline, so allow a generous client timeout. */
const REQUEST_TIMEOUT_MS = 180_000;

export class ApiError extends Error {
  kind: ApiErrorKind;
  status?: number;

  constructor(kind: ApiErrorKind, message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.kind = kind;
    this.status = status;
  }
}

const isVerdict = (value: unknown): value is Verdict =>
  typeof value === "string" && (VERDICTS as readonly string[]).includes(value);

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

function parseClaim(raw: unknown): ClaimResult {
  const c = raw as Record<string, unknown> | null;
  if (
    !c ||
    typeof c !== "object" ||
    typeof c.claim !== "string" ||
    !isVerdict(c.verdict) ||
    typeof c.explanation !== "string" ||
    !isStringArray(c.supporting_sources) ||
    !isStringArray(c.contradicting_sources)
  ) {
    throw new ApiError("malformed", "The server returned a claim in an unexpected format.");
  }
  return {
    claim: c.claim,
    verdict: c.verdict,
    explanation: c.explanation,
    supporting_sources: c.supporting_sources,
    contradicting_sources: c.contradicting_sources,
  };
}

function parseResponse(raw: unknown): VerificationResponse {
  const r = raw as Record<string, unknown> | null;
  if (
    !r ||
    typeof r !== "object" ||
    !isVerdict(r.verdict) ||
    typeof r.claims_checked !== "number" ||
    !Array.isArray(r.claims)
  ) {
    throw new ApiError("malformed", "The server returned an unexpected response.");
  }
  return {
    verdict: r.verdict,
    claims_checked: r.claims_checked,
    claims: r.claims.map(parseClaim),
  };
}

/** Turns FastAPI's 422 `detail` (string or list of {msg}) into one readable line. */
function describeValidationError(body: unknown): string {
  const detail = (body as { detail?: unknown } | null)?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    const msgs = detail
      .map((d) => (d && typeof d === "object" && "msg" in d ? String((d as { msg: unknown }).msg) : ""))
      .filter(Boolean);
    if (msgs.length) return msgs.join("; ");
  }
  return "The article was rejected by the server's validation rules.";
}

export async function verifyArticle(articleText: string): Promise<VerificationResponse> {
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${API_URL}/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ article_text: articleText }),
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ApiError("timeout", "The request took too long and was cancelled.");
    }
    throw new ApiError("network", "Could not reach the verification server.");
  } finally {
    window.clearTimeout(timer);
  }

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    if (response.ok) throw new ApiError("malformed", "The server returned a response that is not valid JSON.");
  }

  if (!response.ok) {
    if (response.status === 422) {
      throw new ApiError("validation", describeValidationError(body), 422);
    }
    if (response.status >= 500) {
      throw new ApiError("server", "The verification server ran into an error.", response.status);
    }
    throw new ApiError("http", `The server responded with status ${response.status}.`, response.status);
  }

  return parseResponse(body);
}
