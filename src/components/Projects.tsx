import Image from "next/image";
import Link from "next/link";
import { projects, type Project } from "@/data/content";
import { ExternalIcon, GitHubIcon } from "./Icons";

// 상세 페이지가 있으면 사이트 안으로, 없으면 GitHub/데모로 연결
function ProjectLink({ p, className, label, children }: { p: Project; className?: string; label?: string; children: React.ReactNode }) {
  if (p.detail) {
    return (
      <Link className={className} href={`/projects/${p.slug}`} aria-label={label}>
        {children}
      </Link>
    );
  }
  return (
    <a className={className} href={p.demo || p.repo} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {children}
    </a>
  );
}

export default function Projects() {
  return (
    <section id="work" aria-label="Projects">
      <h2 className="heading" data-reveal="">
        <span className="num">03.</span>Some Things I&apos;ve Built
      </h2>
      <ul className="featured">
        {projects.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <li key={p.slug} className={`project${flip ? " flip" : ""}`} data-reveal={flip ? "right" : "left"}>
              <ProjectLink p={p} className={`shot tile-${p.tile}`} label={p.name}>
                {p.image ? (
                  <Image src={p.image} alt={`${p.name} screenshot`} fill sizes="(max-width: 820px) 100vw, 600px" style={{ objectFit: "cover" }} />
                ) : (
                  <>
                    <span className="deco" />
                    <span className="word">{p.name}</span>
                  </>
                )}
              </ProjectLink>
              <div className="info">
                <p className="overline">Featured Project</p>
                <h3>
                  <ProjectLink p={p}>{p.name}</ProjectLink>
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
                  {p.detail && (
                    <Link className="more" href={`/projects/${p.slug}`}>
                      Read case study →
                    </Link>
                  )}
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
