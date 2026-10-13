"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/content";
import { MoonIcon, SunIcon } from "./Icons";

const sections = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  // 아래로 스크롤하면 숨고, 위로 올리면 다시 나타나요
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setHidden(y > 120 && y > lastY);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("ys-theme", next);
    } catch {}
  };

  return (
    <header className={`topnav${scrolled ? " scrolled" : ""}${hidden ? " hide" : ""}`}>
      <a className="logo" href="#top" aria-label="Back to top">
        {profile.initials}
      </a>
      <nav aria-label="Sections">
        <ol>
          {sections.map((s) => (
            <li key={s.href}>
              <a href={s.href}>{s.label}</a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="actions">
        <button className="theme-btn" type="button" onClick={toggleTheme} aria-label="Switch light or dark mode">
          <MoonIcon className="to-dark" />
          <SunIcon className="to-light" />
        </button>
        <a className="btn" href={profile.links.blog} target="_blank" rel="noopener noreferrer">
          Blog
        </a>
      </div>
    </header>
  );
}
