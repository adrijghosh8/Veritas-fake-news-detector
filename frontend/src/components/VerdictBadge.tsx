import { CheckCircle2, CircleDashed, CircleHelp, XCircle } from "lucide-react";
import type { Verdict } from "../types/verification";

export const VERDICT_META: Record<
  Verdict,
  { label: string; classes: string; icon: typeof CheckCircle2 }
> = {
  SUPPORTED: { label: "Supported", classes: "bg-ok-bg text-ok-fg", icon: CheckCircle2 },
  REFUTED: { label: "Refuted", classes: "bg-bad-bg text-bad-fg", icon: XCircle },
  PARTIALLY_SUPPORTED: { label: "Partially supported", classes: "bg-warn-bg text-warn-fg", icon: CircleDashed },
  INSUFFICIENT_EVIDENCE: {
    label: "Insufficient evidence",
    classes: "bg-neutral-bg text-neutral-fg",
    icon: CircleHelp,
  },
};

export default function VerdictBadge({ verdict }: { verdict: Verdict }) {
  const { label, classes, icon: Icon } = VERDICT_META[verdict];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wider ${classes}`}
    >
      <Icon size={13} aria-hidden="true" />
      {label}
    </span>
  );
}
