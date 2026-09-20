import { useScrollReveal } from "../hooks/useScrollReveal";
import "./HowItWorks.css";

const STEPS = [
  {
    number: "01",
    title: "Input",
    description: "Enter a news headline.",
  },
  {
    number: "02",
    title: "Analyze",
    description: "Our model analyzes the text.",
  },
  {
    number: "03",
    title: "Verify",
    description: "Receive the model's verdict.",
  },
];

export default function HowItWorks() {
  const ref = useScrollReveal();

  return (
    <section className="section how" ref={ref}>
      <div className="container">
        <div className="section-head reveal" style={{ textAlign: "center", margin: "0 auto 56px" }}>
          <h2 className="section-title" style={{ margin: "0 auto" }}>How It Works</h2>
        </div>

        <div className="how__steps">
          {STEPS.map((step, i) => (
            <div className="how__step-wrap" key={step.number}>
              <div className="how__step reveal">
                <span className="how__number">{step.number}</span>
                <h3 className="how__title">{step.title}</h3>
                <p className="how__desc">{step.description}</p>
              </div>
              {i < STEPS.length - 1 && <span className="how__connector" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
