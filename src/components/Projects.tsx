import Image from "next/image";
import { projects } from "@/data/content";
import { ExternalIcon, GitHubIcon } from "./Icons";

export default function Projects() {
  return (
    <section id="work" aria-label="Projects">
      <h2 className="heading" data-reveal="">
        <span className="num">03.</span>Some Things I&apos;ve Built
      </h2>
      <ul className="featured">
        {projects.map((p, i) => {
          const flip = i % 2 === 1;
          const href = p.demo || p.repo;
          return (
            <li key={p.name} className={`project${flip ? " flip" : ""}`} data-reveal={flip ? "right" : "left"}>
              <a className={`shot tile-${p.tile}`} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${p.name}`}>
                {p.image ? (
                  <Image src={p.image} alt={`${p.name} screenshot`} fill sizes="(max-width: 820px) 100vw, 600px" style={{ objectFit: "cover" }} />
                ) : (
                  <>
                    <span className="deco" />
                    <span className="word">{p.name}</span>
                  </>
                )}
              </a>
              <div className="info">
                <p className="overline">Featured Project</p>
                <h3>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {p.name}
                  </a>
                </h3>
                <div className="desc">
                  {p.description}
                  <span className="role">{p.role}</span>
                </div>
                <ul className="techs">
                  {p.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="proj-links">
                  <a className="gh" href={p.repo} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
                    <GitHubIcon />
                  </a>
                  {p.demo && (
                    <a className="gh" href={p.demo} target="_blank" rel="noopener noreferrer" aria-label="Live demo">
                      <ExternalIcon />
                    </a>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
