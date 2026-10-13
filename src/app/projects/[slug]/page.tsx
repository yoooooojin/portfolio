import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, profile } from "@/data/content";
import Spotlight from "@/components/Spotlight";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealOnScroll from "@/components/RevealOnScroll";

function Points({ items }: { items: string[] }) {
  return (
    <ul className="pts">
      {items.map((it) => (
        <li key={it}>{it}</li>
      ))}
    </ul>
  );
}

type Params = { params: Promise<{ slug: string }> };

// 상세 내용이 있는 프로젝트만 페이지로 만들어요
export function generateStaticParams() {
  return projects.filter((p) => p.detail).map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project?.detail) return {};
  return {
    title: `${project.detail.title} · ${profile.name}`,
    description: project.detail.tagline,
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const d = project?.detail;
  if (!project || !d) notFound();

  return (
    <>
      <Spotlight />
      <Nav />
      <main className="case" lang="ko">
        <Link className="back fade" href="/#work">
          ← 프로젝트 목록
        </Link>

        <header className="case-head">
          <p className="overline fade">Case Study</p>
          <h1 className="fade">{d.title}</h1>
          <p className="case-tagline fade">{d.tagline}</p>

          <dl className="facts fade">
            <div>
              <dt>기간</dt>
              <dd>{d.period}</dd>
            </div>
            <div>
              <dt>팀</dt>
              <dd>{d.team}</dd>
            </div>
            <div className="wide">
              <dt>담당</dt>
              <dd>{d.role}</dd>
            </div>
          </dl>

          <div className="stack-rows fade">
            {d.stack.map((s) => (
              <div key={s.label} className="stack-row">
                <span className="stack-label">{s.label}</span>
                <span className="chips">
                  {s.items.map((it) => (
                    <span key={it} className="chip">
                      {it}
                    </span>
                  ))}
                  {s.team?.map((it) => (
                    <span key={it} className="chip team" title="팀에서 사용 (직접 담당하지 않음)">
                      {it}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>

          {d.stack.some((s) => s.team && s.team.length > 0) && (
            <p className="stack-legend fade">
              <span className="chip">직접 사용</span>
              <span className="chip team">팀에서 사용</span>
            </p>
          )}

          <div className="case-links fade">
            {d.links.map((l) => (
              <a key={l.href} className="btn" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label} ↗
              </a>
            ))}
          </div>
        </header>

        {d.result && (
          <section className="result" data-reveal="" aria-label="대표 성과">
            <div className="result-head">
              <div>
                <h2 className="result-title">{d.result.title}</h2>
                <p className="result-cap">{d.result.caption}</p>
              </div>
              <span className="result-badge">{d.result.badge}</span>
            </div>
            <div className="bars">
              {(["before", "after"] as const).map((k) => {
                const v = d.result![k];
                const max = Math.max(d.result!.before.minutes, d.result!.after.minutes);
                return (
                  <div key={k} className={`bar-row ${k}`}>
                    <span className="bar-label">{k === "before" ? "개선 전" : "개선 후"}</span>
                    <span className="track">
                      <span className="bar" style={{ "--w": `${Math.max(4, (v.minutes / max) * 100)}%` } as React.CSSProperties} />
                    </span>
                    <span className="bar-val">
                      <b>{v.value}</b>
                      {v.unit}
                    </span>
                  </div>
                );
              })}
            </div>
            <ul className="drivers">
              {d.result.drivers.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="case-sec" aria-label="개요">
          <h2 className="case-h" data-reveal="">개요</h2>
          <div data-reveal="">
            {d.overview.map((p, i) => (
              <p key={i} className="prose">
                {p}
              </p>
            ))}
          </div>
          {d.flow && (
            <ol className="flow" data-reveal="">
              {d.flow.map((f) => (
                <li key={f.name} className={f.mine ? "mine" : undefined}>
                  <strong>{f.name}</strong>
                  <span>{f.desc}</span>
                  {f.mine && <em>내 담당</em>}
                </li>
              ))}
            </ol>
          )}
        </section>

        <section className="case-sec" aria-label="내가 한 일">
          <h2 className="case-h" data-reveal="">내가 한 일</h2>
          <ul className="contrib">
            {d.contributions.map((c) => (
              <li key={c.title} data-reveal="">
                <h3>{c.title}</h3>
                <ul className="pts">
                  {c.points.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section className="case-sec" aria-label="트러블슈팅">
          <h2 className="case-h" data-reveal="">트러블슈팅</h2>
          <ol className="troubles">
            {d.troubles.map((t, i) => (
              <li key={t.title} className="trouble" data-reveal="">
                <h3>
                  <span className="t-num">{String(i + 1).padStart(2, "0")}</span>
                  {t.title}
                </h3>
                <div className="t-row">
                  <span className="t-tag problem">문제</span>
                  <Points items={t.problem} />
                </div>
                <div className="t-row">
                  <span className="t-tag solve">해결</span>
                  <Points items={t.solution} />
                </div>
                {t.result && (
                  <div className="t-row">
                    <span className="t-tag res">결과</span>
                    <Points items={t.result} />
                  </div>
                )}
                {t.code && (
                  <pre className="code">
                    <code>{t.code}</code>
                  </pre>
                )}
              </li>
            ))}
          </ol>
        </section>

        {d.considerations && d.considerations.length > 0 && (
          <section className="case-sec" aria-label="고민한 점">
            <h2 className="case-h" data-reveal="">고민한 점</h2>
            {d.considerations.map((c) => (
              <div key={c.title} className="consider" data-reveal="">
                <h3>{c.title}</h3>
                {c.body.map((p, i) => (
                  <p key={i} className="prose">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </section>
        )}

        {d.learned && d.learned.length > 0 && (
          <section className="case-sec" aria-label="배운 점">
            <h2 className="case-h" data-reveal="">배운 점</h2>
            <ul className="learned" data-reveal="">
              {d.learned.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </section>
        )}

        <div className="case-end" data-reveal="">
          <Link className="btn big" href="/#work">
            ← 다른 프로젝트 보기
          </Link>
        </div>
      </main>
      <Footer />
      <RevealOnScroll />
    </>
  );
}
