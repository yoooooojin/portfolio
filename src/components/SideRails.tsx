import { profile } from "@/data/content";
import { BlogIcon, GitHubIcon } from "./Icons";

export default function SideRails() {
  return (
    <>
      <div className="rail left" aria-label="Profiles">
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <GitHubIcon />
        </a>
        <a href={profile.links.blog} target="_blank" rel="noopener noreferrer" aria-label="Blog">
          <BlogIcon />
        </a>
      </div>
      <div className="rail right">
        <a className="vmail" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </div>
    </>
  );
}
