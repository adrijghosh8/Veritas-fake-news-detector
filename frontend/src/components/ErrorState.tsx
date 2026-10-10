import { AlertTriangle, RotateCw } from "lucide-react";
import { motion } from "framer-motion";
import type { ApiError } from "../services/api";

interface Props {
  error: ApiError;
  onRetry: () => void;
}

const TITLES: Record<ApiError["kind"], string> = {
  network: "Server unavailable",
  timeout: "Request timed out",
  validation: "Article rejected",
  server: "Server error",
  http: "Request failed",
  malformed: "Unexpected response",
};

const HINTS: Record<ApiError["kind"], string> = {
  network: "Check that the backend is running and that this site's origin is allowed by its CORS settings.",
  timeout: "Verification took longer than expected. Your article is still here.",
  validation: "Edit the article and try again.",
  server: "Something went wrong while verifying. Your article is still here.",
  http: "Your article is still here.",
  malformed: "The response could not be read, so no result is shown.",
};

export default function ErrorState({ error, onRetry }: Props) {
  // Retrying an unchanged article is pointless when the server rejected its content.
  const canRetry = error.kind !== "validation";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      role="alert"
      className="flex flex-col gap-3 border border-bad-fg/40 bg-bad-bg/50 p-4 sm:flex-row sm:items-start sm:justify-between"
    >
      <div className="flex gap-3">
        <AlertTriangle size={18} className="mt-0.5 shrink-0 text-bad-fg" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold text-bad-fg">{TITLES[error.kind]}</p>
          <p className="mt-1 text-sm">{error.message}</p>
          <p className="mt-1 text-xs text-mute">{HINTS[error.kind]}</p>
        </div>
      </div>
      {canRetry && (
        <button type="button" onClick={onRetry} className="btn-ghost shrink-0 bg-paper">
          <RotateCw size={14} aria-hidden="true" /> Try again
        </button>
      )}
    </motion.div>
  );
}
