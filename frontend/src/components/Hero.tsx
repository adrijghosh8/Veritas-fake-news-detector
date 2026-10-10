import type { ReactNode } from "react";
import HeroArt from "./HeroArt";

/** `children` is the article form and any loading/error panel beneath it. */
export default function Hero({ children }: { children: ReactNode }) {
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:pt-20">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-10">
        <div>
          <p className="eyebrow">AI-POWERED CLAIM VERIFICATION</p>
          <h1 className="mt-5 text-[2.75rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            Truth deserves{" "}
            <span className="bg-lavender-soft px-1.5 [box-decoration-break:clone]">verification.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">
            Analyze news claims against web evidence and trusted fact-checking sources.
          </p>
          <div className="mt-8 space-y-4">{children}</div>
        </div>

        <div className="hidden pt-4 md:block">
          <HeroArt />
        </div>
      </div>
    </section>
  );
}
