import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-2 text-sm text-mute">Claim-level news verification backed by web evidence.</p>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
          AI-assisted verification · Evidence-based analysis
        </p>
      </div>
    </footer>
  );
}
