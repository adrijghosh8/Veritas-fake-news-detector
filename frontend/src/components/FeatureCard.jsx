import "./FeatureCard.css";

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="feature-card reveal">
      <div className="feature-card__icon">
        <Icon size={20} strokeWidth={1.6} />
      </div>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__desc">{description}</p>
    </div>
  );
}
