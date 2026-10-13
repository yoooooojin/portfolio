import { profile } from "@/data/content";

export default function Footer() {
  return (
    <footer>
      Designed after{" "}
      <a href="https://v4.brittanychiang.com" target="_blank" rel="noopener noreferrer">
        Brittany Chiang&apos;s v4
      </a>{" "}
      · Built by {profile.name}
    </footer>
  );
}
