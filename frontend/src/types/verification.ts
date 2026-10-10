export const VERDICTS = [
  "SUPPORTED",
  "REFUTED",
  "PARTIALLY_SUPPORTED",
  "INSUFFICIENT_EVIDENCE",
] as const;

export type Verdict = (typeof VERDICTS)[number];

export interface ClaimResult {
  claim: string;
  verdict: Verdict;
  explanation: string;
  supporting_sources: string[];
  contradicting_sources: string[];
}

/** Mirrors the backend's ArticleVerificationResponse. */
export interface VerificationResponse {
  verdict: Verdict;
  claims_checked: number;
  claims: ClaimResult[];
}

export type ApiErrorKind =
  | "network" // backend unreachable / CORS / offline
  | "timeout" // request exceeded client timeout
  | "validation" // HTTP 422
  | "server" // HTTP 5xx
  | "http" // any other non-2xx
  | "malformed"; // 2xx but unexpected body
