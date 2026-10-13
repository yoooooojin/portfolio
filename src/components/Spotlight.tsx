"use client";

import { useEffect, useRef } from "react";

// 마우스를 따라다니는 파란 빛
export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      el.style.setProperty("--x", `${e.clientX}px`);
      el.style.setProperty("--y", `${e.clientY}px`);
      el.classList.add("on");
    };
    const leave = () => el.classList.remove("on");
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <div ref={ref} className="spot" aria-hidden="true" />;
}
