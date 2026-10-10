export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl border-t border-line px-5 py-16 sm:px-8">
      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        <h2 className="eyebrow">About</h2>
        <div className="max-w-2xl space-y-3 text-[15px] leading-relaxed">
          <p>
            Veritas breaks an article into individual factual claims and checks each one against web
            evidence and fact-checking sources.
          </p>
          <p className="text-mute">
            Results are AI-assisted and can be wrong. Open the linked sources and judge the evidence yourself.
          </p>
        </div>
      </div>
    </section>
  );
}
