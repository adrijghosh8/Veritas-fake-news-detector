import "./ArticleCard.css";

const BADGE_CLASS = {
  TRUE: "article-card__badge--true",
  FAKE: "article-card__badge--fake",
  UNCERTAIN: "article-card__badge--uncertain",
};

export default function ArticleCard({ category, headline, verdict, gradient }) {
  return (
    <article className="article-card reveal">
      <div className="article-card__image" style={{ background: gradient }} aria-hidden="true" />
      <div className="article-card__body">
        <span className="article-card__category">{category}</span>
        <h3 className="article-card__headline">{headline}</h3>
        <span className={`article-card__badge ${BADGE_CLASS[verdict]}`}>{verdict}</span>
      </div>
    </article>
  );
}
