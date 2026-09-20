import { Landmark, Github, Linkedin } from "lucide-react";
import "./Footer.css";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Verify", href: "#verify" },
  { label: "Articles", href: "#articles" },
  { label: "About", href: "#about" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <a href="#home" className="footer__brand">
          <Landmark size={18} strokeWidth={1.5} />
          <span>
            Veritas
            <span className="footer__brand-tag">Facts Before Beliefs</span>
          </span>
        </a>

        <nav className="footer__links" aria-label="Footer">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="footer__link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer__socials">
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="footer__social">
            <Github size={17} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="footer__social">
            <Linkedin size={17} />
          </a>
        </div>
      </div>
      <p className="footer__copyright">© 2026 Veritas</p>
    </footer>
  );
}
