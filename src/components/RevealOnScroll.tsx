"use client";

import { useEffect } from "react";

// data-reveal 이 붙은 요소를, 화면에 들어올 때 떠오르게 해요
export default function RevealOnScroll() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("pre");
          observer.unobserve(entry.target);
        }),
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.9) {
        el.classList.add("pre");
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
