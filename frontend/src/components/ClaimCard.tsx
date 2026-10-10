import { motion } from "framer-motion";
import type { ClaimResult } from "../types/verification";
import VerdictBadge from "./VerdictBadge";
import SourceList from "./SourceList";

export default function ClaimCard({ claim, index }: { claim: ClaimResult; index: number }) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      }}
      className="grid border border-line bg-paper md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]"
    >
      <article className="p-5 md:border-r md:border-line" aria-label={`Claim ${index + 1}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-xs uppercase tracking-wider text-mute">Claim {index + 1}</p>
          <VerdictBadge verdict={claim.verdict} />
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-snug">{claim.claim}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-mute">{claim.explanation}</p>
        {claim.verdict === "INSUFFICIENT_EVIDENCE" && (
          <p className="mt-3 border-l-2 border-ink pl-3 text-sm">
            Not enough evidence was found to confirm or refute this claim. This is not a finding that it is false.
          </p>
        )}
      </article>

      <div className="space-y-5 border-t border-line p-5 md:border-t-0">
        <SourceList
          title="Supporting sources"
          sources={claim.supporting_sources}
          emptyText="No supporting sources returned."
        />
        <SourceList
          title="Contradicting sources"
          sources={claim.contradicting_sources}
          emptyText="No contradicting sources returned."
        />
      </div>
    </motion.li>
  );
}
