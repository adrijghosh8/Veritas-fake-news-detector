import { ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { focusArticleInput } from "../utils/scroll";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-ivory">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#top" aria-label="Veritas home">
          <Logo />
        </a>

        <div className="flex items-center gap-6 sm:gap-10">
          <ul className="hidden items-center gap-8 text-sm font-medium sm:flex">
            <li>
              <a href="#how-it-works" className="hover:underline underline-offset-4">
                How it works
              </a>
            </li>
            <li>
              <a href="#about" className="hover:underline underline-offset-4">
                About
              </a>
            </li>
          </ul>
          <button type="button" onClick={focusArticleInput} className="btn-primary !py-2.5">
            Verify News <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </nav>
    </header>
  );
}
