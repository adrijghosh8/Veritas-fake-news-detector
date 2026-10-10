import { FileText, Search, ShieldCheck, ListChecks } from "lucide-react";

const STEPS = [
  { icon: FileText, title: "Extract Claims", text: "Identify factual claims in the article." },
  { icon: Search, title: "Find Evidence", text: "Retrieve relevant web evidence and fact-checks." },
  { icon: ShieldCheck, title: "Verify Claims", text: "Compare claims against the available evidence." },
  { icon: ListChecks, title: "Review Results", text: "Read explanations and open source links." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
      <h2 className="eyebrow mb-5">How it works</h2>
      <ol className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map(({ icon: Icon, title, text }, i) => (
          <li key={title} className="flex flex-col bg-ivory p-5">
            <div className="flex items-center justify-between">
              <span className="inline-flex h-9 w-9 items-center justify-center border border-line bg-paper">
                <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="font-mono text-xs text-mute" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-bold tracking-tight">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-mute">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
