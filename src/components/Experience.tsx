"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { jobs } from "@/data/content";

export default function Experience() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  // 선택된 탭 위치로 강조선을 옮겨요 (모바일에서는 가로, 데스크톱에서는 세로)
  const placeIndicator = useCallback(() => {
    const tab = tabRefs.current[active];
    const ind = indicatorRef.current;
    if (!tab || !ind) return;
    if (window.matchMedia("(max-width: 620px)").matches) {
      ind.style.width = `${tab.offsetWidth}px`;
      ind.style.transform = `translateX(${tab.offsetLeft}px)`;
    } else {
      ind.style.width = "";
      ind.style.transform = `translateY(${tab.offsetTop}px)`;
    }
  }, [active]);

  useEffect(() => {
    placeIndicator();
    window.addEventListener("resize", placeIndicator);
    return () => window.removeEventListener("resize", placeIndicator);
  }, [placeIndicator]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    let next = active;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (active + 1) % jobs.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (active - 1 + jobs.length) % jobs.length;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="experience" aria-label="Experience">
      <h2 className="heading" data-reveal="">
        <span className="num">02.</span>Where I&apos;ve Worked
      </h2>
      <div className="jobs" data-reveal="">
        <div className="tablist" role="tablist" aria-label="Experience">
          {jobs.map((job, i) => (
            <button
              key={job.tab}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              className="tab"
              role="tab"
              id={`tab-${i}`}
              aria-selected={active === i}
              aria-controls={`panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
            >
              {job.tab}
            </button>
          ))}
          <span className="indicator" ref={indicatorRef} />
        </div>
        <div>
          {jobs.map((job, i) => (
            <div
              key={job.tab}
              className="panel"
              role="tabpanel"
              id={`panel-${i}`}
              aria-labelledby={`tab-${i}`}
              hidden={active !== i}
            >
              <h3>
                {job.title} <span className="at">@ {job.org}</span>
              </h3>
              <p className="range">{job.range}</p>
              <ul>
                {job.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
