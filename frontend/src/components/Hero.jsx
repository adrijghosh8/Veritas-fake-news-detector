import { useState } from "react";
import VerificationForm from "./VerificationForm";
import ResultCard from "./ResultCard";
import { verifyNews } from "../utils/api";
import "./Hero.css";

const FRIENDLY_ERROR = "Unable to verify right now. Please try again.";

export default function Hero() {
  const [headline, setHeadline] = useState("");
  const [submittedHeadline, setSubmittedHeadline] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState(null);

  async function handleSubmit() {
    const trimmed = headline.trim();
    if (!trimmed) {
      setErrorMessage("Enter a headline to verify.");
      return;
    }

    setErrorMessage("");
    setStatus("loading");

    try {
      const data = await verifyNews(trimmed);
      setResult(data);
      setSubmittedHeadline(trimmed);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(FRIENDLY_ERROR);
    }
  }

  function handleReset() {
    setStatus("idle");
    setResult(null);
    setHeadline("");
    setErrorMessage("");
  }

  return (
    <section id="home" className="hero">
      <div className="hero__pillar hero__pillar--left" aria-hidden="true" />
      <div className="hero__pillar hero__pillar--right" aria-hidden="true" />

      <div className="container hero__inner">
        <p className="hero__eyebrow reveal is-visible">AI-Powered Fact Checking</p>
        <h1 className="hero__title reveal is-visible">
          Uncovering Truth
          <br />
          <span className="hero__title-accent">in the Digital Age</span>
        </h1>
        <p className="hero__subtitle reveal is-visible">Analyze. Verify. Stay Informed.</p>

        <div id="verify" className="hero__verify reveal is-visible">
          {status === "success" && result ? (
            <ResultCard
              headline={submittedHeadline}
              prediction={result.prediction}
              confidence={result.confidence}
              onReset={handleReset}
            />
          ) : (
            <VerificationForm
              value={headline}
              onChange={setHeadline}
              onSubmit={handleSubmit}
              status={status}
              errorMessage={errorMessage}
            />
          )}
        </div>
      </div>
    </section>
  );
}
