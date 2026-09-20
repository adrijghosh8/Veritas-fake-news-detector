import { CheckCircle2, AlertTriangle, RotateCcw } from "lucide-react";
import "./ResultCard.css";

export default function ResultCard({ headline, prediction, confidence, onReset }) {
  const isTrue = prediction === "TRUE";
  const circumference = 2 * Math.PI * 46;
  const offset = circumference - (Math.min(Math.max(confidence, 0), 100) / 100) * circumference;

  return (
    <div className={`result-card ${isTrue ? "result-card--true" : "result-card--fake"}`}>
      <p className="result-card__eyebrow">Verification Result</p>

      <p className="result-card__headline">&ldquo;{headline}&rdquo;</p>

      <div className="result-card__body">
        <div className="result-card__ring-wrap">
          <svg className="result-card__ring" viewBox="0 0 100 100">
            <circle className="result-card__ring-track" cx="50" cy="50" r="46" />
            <circle
              className="result-card__ring-progress"
              cx="50"
              cy="50"
              r="46"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: offset,
              }}
            />
          </svg>
          <div className="result-card__ring-center">
            <span className="result-card__ring-value">{confidence.toFixed(0)}%</span>
            <span className="result-card__ring-label">Confidence</span>
          </div>
        </div>

        <div className="result-card__verdict">
          {isTrue ? (
            <CheckCircle2 size={22} className="result-card__verdict-icon" />
          ) : (
            <AlertTriangle size={22} className="result-card__verdict-icon" />
          )}
          <div>
            <span className="result-card__verdict-label">Model Verdict</span>
            <span className="result-card__verdict-value">{prediction}</span>
          </div>
        </div>
      </div>

      <button type="button" className="result-card__reset" onClick={onReset}>
        <RotateCcw size={14} />
        Verify another
      </button>
    </div>
  );
}
