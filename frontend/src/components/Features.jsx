import { ScanSearch, ShieldCheck, FileText, Eye } from "lucide-react";
import FeatureCard from "./FeatureCard";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "./Features.css";

const FEATURES = [
  {
    icon: ScanSearch,
    title: "AI Fact-Checking",
    description: "Analyze news using machine learning.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Analysis",
    description: "Evaluate the prediction and confidence.",
  },
  {
    icon: FileText,
    title: "Clear Results",
    description: "Understand the model's verdict instantly.",
  },
  {
    icon: Eye,
    title: "Stay Informed",
    description: "Check news before believing it.",
  },
];

export default function Features() {
  const ref = useScrollReveal();

  return (
    <section className="section features" ref={ref}>
      <div className="container">
        <div className="section-head reveal" style={{ textAlign: "center", margin: "0 auto 44px" }}>
          <h2 className="section-title" style={{ margin: "0 auto" }}>Why Veritas?</h2>
        </div>
        <div className="features__grid">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}
