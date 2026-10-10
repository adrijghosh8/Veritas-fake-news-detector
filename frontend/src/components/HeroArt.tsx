/** Static, monochrome editorial composition built from CSS shapes. Decorative only. */
export default function HeroArt() {
  return (
    <div aria-hidden="true" className="relative mx-auto h-[22rem] w-full max-w-md">
      <div className="absolute right-0 top-2 h-72 w-48 bg-lavender-soft" />
      <div className="absolute bottom-10 left-6 h-44 w-24 bg-line" />

      <div className="absolute left-10 top-8 w-64 border border-ink bg-paper p-5 sm:left-14">
        <div className="mb-4 h-3 w-2/3 bg-ink" />
        <div className="space-y-2">
          <div className="h-1.5 w-full bg-line" />
          <div className="h-1.5 w-11/12 bg-line" />
          <div className="relative h-1.5 w-full bg-lavender">
            <span className="absolute -right-5 -top-1 h-3.5 w-3.5 border border-ink bg-paper" />
          </div>
          <div className="h-1.5 w-4/5 bg-line" />
          <div className="h-1.5 w-full bg-line" />
          <div className="h-1.5 w-2/3 bg-line" />
        </div>
        <div className="mt-5 flex items-center gap-2 border-t border-line pt-3 font-mono text-[10px] uppercase tracking-widest text-mute">
          <span className="h-2 w-2 bg-ink" />
          Claim · Evidence · Verdict
        </div>
      </div>

      <div className="absolute -right-1 top-1/2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-mute">
        Evidence
        <br />
        over
        <br />
        assumption
        <div className="mt-2 h-px w-6 bg-ink" />
      </div>
    </div>
  );
}
