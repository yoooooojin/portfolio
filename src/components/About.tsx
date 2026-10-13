import Image from "next/image";
import { about, profile, skills } from "@/data/content";
import Rich from "./Rich";

export default function About() {
  return (
    <section id="about" aria-label="About">
      <h2 className="heading" data-reveal="">
        <span className="num">01.</span>About Me
      </h2>
      <div className="about-grid">
        <div data-reveal="">
          {about.map((p, i) => (
            <p key={i}>
              <Rich text={p} />
            </p>
          ))}
          <ul className="skills">
            {skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="photo" data-reveal="scale">
          <div className="frame">
            {profile.photo ? (
              <Image src={profile.photo} alt={profile.name} fill sizes="300px" style={{ objectFit: "cover" }} />
            ) : (
              <>
                <span>{profile.initials}</span>
                <small>photo goes here</small>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
