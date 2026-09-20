import ArticleCard from "./ArticleCard";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "./Articles.css";

const SAMPLE_ARTICLES = [
  {
    category: "Policy",
    headline: "Government outlines new education policy for 2027",
    verdict: "TRUE",
    gradient: "linear-gradient(135deg, #7f8fa6, #2c3e50)",
  },
  {
    category: "Health",
    headline: "Viral post claims new virus strain spreads through Wi-Fi",
    verdict: "FAKE",
    gradient: "linear-gradient(135deg, #b3583e, #4a2318)",
  },
  {
    category: "Science",
    headline: "Asteroid said to threaten Earth in 2031",
    verdict: "UNCERTAIN",
    gradient: "linear-gradient(135deg, #2c3e63, #061c33)",
  },
];

export default function Articles() {
  const ref = useScrollReveal();

  return (
    <section id="articles" className="section articles" ref={ref}>
      <div className="container">
        <div className="section-head reveal" style={{ textAlign: "center", margin: "0 auto 12px" }}>
          <h2 className="section-title" style={{ margin: "0 auto" }}>Verified Articles</h2>
        </div>
        <p className="articles__note reveal">Sample results shown for demonstration.</p>

        <div className="articles__grid">
          {SAMPLE_ARTICLES.map((a) => (
            <ArticleCard key={a.headline} {...a} />
          ))}
        </div>

        <div className="articles__cta reveal">
          <button type="button" className="btn btn-ghost">View Articles</button>
        </div>
      </div>
    </section>
  );
}
