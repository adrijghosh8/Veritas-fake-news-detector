import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import type { VerificationResponse, Verdict } from "../types/verification";
import { RESULTS_ID } from "../constants";
import ClaimCard from "./ClaimCard";
import VerdictBadge, { VERDICT_META } from "./VerdictBadge";

interface Props {
  result: VerificationResponse;
  onReset: () => void;
}

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

/** Tally derived from the returned claims; nothing here is invented. */
function tally(result: VerificationResponse): string {
  const counts = new Map<Verdict, number>();
  result.claims.forEach((c) => counts.set(c.verdict, (counts.get(c.verdict) ?? 0) + 1));
  return [...counts.entries()].map(([v, n]) => `${n} ${VERDICT_META[v].label.toLowerCase()}`).join(" · ");
}

export default function VerificationResults({ result, onReset }: Props) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isEmpty = result.claims.length === 0;

  // Move focus to the report so keyboard and screen-reader users land on the result.
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    document.getElementById(RESULTS_ID)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  }, []);

  return (
    <motion.section
      id={RESULTS_ID}
      aria-labelledby="results-heading"
      aria-live="polite"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mx-auto max-w-6xl border-t border-line px-5 py-14 sm:px-8"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Evidence report</p>
          <h2
            id="results-heading"
            ref={headingRef}
            tabIndex={-1}
            className="mt-2 text-3xl font-extrabold tracking-tight focus:outline-none sm:text-4xl"
          >
            Verification Results
          </h2>
        </div>
        <button type="button" onClick={onReset} className="btn-ghost self-start sm:self-auto">
          <RotateCcw size={14} aria-hidden="true" /> Check another article
        </button>
      </div>

      {isEmpty ? (
        <div className="mt-8 border border-line bg-paper p-8">
          <p className="text-lg font-semibold">No verifiable claims were found.</p>
          <p className="mt-2 max-w-xl text-sm text-mute">
            The article may be opinion, too short, or lack concrete factual statements. Try a longer news article.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 flex flex-col gap-4 border border-ink bg-paper p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">Overall verdict</p>
              <div className="mt-2">
                <VerdictBadge verdict={result.verdict} />
              </div>
            </div>
            <div className="sm:text-right">
              <p className="text-sm font-semibold">
                {result.claims_checked} {result.claims_checked === 1 ? "claim" : "claims"} checked
              </p>
              <p className="mt-1 font-mono text-xs text-mute">{tally(result)}</p>
            </div>
          </div>

          {result.verdict === "INSUFFICIENT_EVIDENCE" && (
            <p className="mt-4 border-l-2 border-ink pl-3 text-sm">
              Overall, there was not enough evidence to reach a conclusion. Review each claim below.
            </p>
          )}

          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="mt-6 space-y-4"
            aria-label="Claims"
          >
            {result.claims.map((claim, i) => (
              <ClaimCard key={`${i}-${claim.claim}`} claim={claim} index={i} />
            ))}
          </motion.ul>
        </>
      )}
    </motion.section>
  );
}
