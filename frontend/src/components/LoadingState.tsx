import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const STAGES = ["Extracting claims", "Gathering evidence", "Evaluating claims", "Preparing report"];

/** How long each illustrative stage is highlighted before moving on. */
const STAGE_INTERVAL_MS = 6000;

/**
 * The backend returns one completed response and does not stream progress.
 * The stages below are an illustrative sequence only, and the copy says so.
 */
export default function LoadingState() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const id = window.setInterval(
      () => setActive((i) => Math.min(i + 1, STAGES.length - 1)),
      STAGE_INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="status"
      aria-live="polite"
      className="border border-line bg-paper p-4 sm:p-5"
    >
      <div className="flex items-center gap-3">
        <motion.span
          aria-hidden="true"
          className="h-2.5 w-2.5 bg-ink"
          animate={reduceMotion ? undefined : { opacity: [1, 0.25, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <p className="text-sm font-semibold">Verifying article. This can take a minute.</p>
      </div>

      <div className="relative mt-4 h-px w-full overflow-hidden bg-line" aria-hidden="true">
        {!reduceMotion && (
          <motion.div
            className="absolute inset-y-0 w-1/4 bg-ink"
            animate={{ left: ["-25%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>

      <ol className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 font-mono text-xs sm:grid-cols-4">
        {STAGES.map((stage, i) => (
          <li
            key={stage}
            className={`flex items-center gap-2 ${i === active ? "text-ink" : "text-mute/70"}`}
            aria-current={i === active ? "step" : undefined}
          >
            <span className={`h-1.5 w-1.5 ${i <= active ? "bg-ink" : "bg-line"}`} aria-hidden="true" />
            {stage}
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs text-mute">
        Stages are illustrative. The server reports results only when verification is complete.
      </p>
    </motion.section>
  );
}
