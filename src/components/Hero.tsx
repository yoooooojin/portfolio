import { heroIntro, profile } from "@/data/content";
import Rich from "./Rich";

export default function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <p className="hi fade">Hi, my name is</p>
      <h1 className="fade">{profile.name}.</h1>
      <h2 className="fade">{profile.headline}</h2>
      <p className="fade">
        <Rich text={heroIntro} />
      </p>
      <div className="fade">
        <a className="btn big" href="#work">
          See my projects
        </a>
      </div>
    </section>
  );
}
