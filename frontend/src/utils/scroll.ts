import { ARTICLE_INPUT_ID } from "../constants";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function focusArticleInput() {
  const el = document.getElementById(ARTICLE_INPUT_ID);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" });
  el.focus({ preventScroll: true });
}

export function scrollToElement(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
}
