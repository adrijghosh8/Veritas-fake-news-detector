import { useEffect, useRef } from "react";

/**
 * Adds `.is-visible` to any descendant with the `.reveal` class
 * once it scrolls into view. Attach the returned ref to a section wrapper.
 */
export function useScrollReveal() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = container.classList.contains("reveal")
      ? [container, ...container.querySelectorAll(".reveal")]
      : [...container.querySelectorAll(".reveal")];

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return containerRef;
}
