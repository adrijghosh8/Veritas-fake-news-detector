import { useCallback, useRef, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ArticleForm from "./components/ArticleForm";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import VerificationResults from "./components/VerificationResults";
import HowItWorks from "./components/HowItWorks";
import About from "./components/About";
import Footer from "./components/Footer";
import { ApiError, verifyArticle } from "./services/api";
import type { VerificationResponse } from "./types/verification";
import { focusArticleInput } from "./utils/scroll";

type Status = "idle" | "loading" | "success" | "error";

export default function App() {
  const [article, setArticle] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<VerificationResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const inFlight = useRef(false);

  const submit = useCallback(async () => {
    if (inFlight.current) return; // block duplicate submissions
    inFlight.current = true;
    setStatus("loading");
    setError(null);
    setResult(null);

    try {
      setResult(await verifyArticle(article));
      setStatus("success");
    } catch (err) {
      setError(err instanceof ApiError ? err : new ApiError("network", "Something went wrong."));
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }, [article]);

  const reset = () => {
    setArticle("");
    setResult(null);
    setError(null);
    setStatus("idle");
    window.setTimeout(focusArticleInput, 0);
  };

  const handleChange = (value: string) => {
    setArticle(value);
    if (status === "error") {
      setError(null);
      setStatus("idle");
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero>
          <ArticleForm
            value={article}
            onChange={handleChange}
            onSubmit={submit}
            onClear={reset}
            loading={status === "loading"}
          />
          <AnimatePresence mode="wait">
            {status === "loading" && <LoadingState key="loading" />}
            {status === "error" && error && <ErrorState key="error" error={error} onRetry={submit} />}
          </AnimatePresence>
        </Hero>

        {status === "success" && result && <VerificationResults result={result} onReset={reset} />}

        <HowItWorks />
        <About />
      </main>
      <Footer />
    </MotionConfig>
  );
}
