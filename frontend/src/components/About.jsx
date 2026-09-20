import { useScrollReveal } from "../hooks/useScrollReveal";
import "./About.css";

export default function About() {
  const ref = useScrollReveal();

  return (
    <section id="about" className="section about" ref={ref}>
      <div className="container about__inner">
        <div className="about__visual reveal" aria-hidden="true">
          <div className="about__column" />
          <div className="about__column" />
          <div className="about__column" />
        </div>
        <div className="about__text reveal">
          <p className="section-eyebrow">About Veritas</p>
          <h2 className="section-title">A clearer way to read the news</h2>
          <p className="about__desc">
            An AI-powered platform designed to help users analyze news and
            identify potentially misleading information.
          </p>
        </div>
      </div>
    </section>
  );
}
