// ─────────────────────────────────────────────────────────────
//  포트폴리오의 모든 글 내용은 이 파일에서 수정하면 됩니다.
//  이미지를 넣으려면 public/images 폴더에 파일을 넣고
//  경로를 "/images/파일이름.png" 처럼 적어주세요.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Yoojin Song",
  initials: "YS",
  role: "Backend Developer",
  headline: "I build the parts you don't see.",
  email: "nijoooy@gmail.com",
  // 프로필 사진: 예) "/images/profile.jpg" — 비워두면 이니셜 박스가 보여요
  photo: "",
  links: {
    github: "https://github.com/yoooooojin",
    blog: "https://youjeans.tistory.com",
  },
};

// 첫 화면 소개 문장. **굵게** 표시한 부분은 진하게 나와요.
export const heroIntro =
  "I'm a **backend developer** studying Computer Science at **Sookmyung Women's University**. Right now I'm researching **multimodal recommendation systems** and building server-side features with SOLUX.";

// About 섹션 문단들 (**굵게** 사용 가능)
export const about = [
  "Hello! I'm Yoojin, a Computer Science student at **Sookmyung Women's University**. I started out curious about how apps keep data in sync, and that curiosity turned into a focus on **backend development**.",
  "Since then I've built a course-swap platform, a multi-agent study tool, and a walking app for my campus. I've also worked as a QA intern at goorm, which taught me to look at a service from the user's side.",
  "I enjoy **growing together with my team** through collaboration and code review. Here are the technologies I've been working with recently:",
];

export const skills = [
  "Java · Kotlin",
  "Spring Boot",
  "Python · FastAPI",
  "PostgreSQL · Oracle",
  "TypeScript · React",
  "AWS · GitHub Actions",
];

export type Job = {
  tab: string; // 왼쪽 탭에 보이는 짧은 이름
  title: string;
  org: string;
  range: string;
  points: string[];
};

export const jobs: Job[] = [
  {
    tab: "Research Project",
    title: "Researcher",
    org: "Industry–Academia Project",
    range: "2026.09 — Present",
    points: [
      "Researching a multimodal recommendation system that combines several kinds of input data.",
      "Writing a research paper on the approach and its results.",
    ],
  },
  {
    tab: "SOLUX",
    title: "Backend Developer",
    org: "SOLUX",
    range: "2026.03 — Present",
    points: [
      "Building server-side features for the club's team projects.",
      "Taking part in code reviews and sharing what I learn with teammates.",
    ],
  },
  {
    tab: "goorm",
    title: "Fullstack Engineer Intern",
    org: "goorm",
    range: "2026.02 · Strategy Force",
    points: [
      "Performed QA testing on the company's services.",
      "Found and reported issues so they could be fixed before release.",
    ],
  },
  {
    tab: "ALGOS",
    title: "Member",
    org: "ALGOS",
    range: "2025.03 — Present",
    points: ["Studying algorithms and problem solving in C++ with a programming club."],
  },
];

export type Project = {
  name: string;
  description: string;
  role: string;
  tech: string[];
  repo: string;
  demo?: string; // 배포된 데모 주소가 있으면 적어주세요
  image?: string; // 스크린샷: 예) "/images/highlite.png" — 없으면 색 타일
  tile: "gray" | "blue" | "green"; // 스크린샷이 없을 때 타일 색
};

export const projects: Project[] = [
  {
    name: "Highlite",
    description:
      "A multi-agent service that reads the parts you highlighted in lecture PDFs and generates exam questions from them.",
    role: "Importance Analysis Agent · Frontend UI",
    tech: ["FastAPI", "PostgreSQL", "LangChain", "GPT", "Streamlit"],
    repo: "https://github.com/yoooooojin/Highlite-Backend",
    tile: "gray",
  },
  {
    name: "SwapClass",
    description:
      "A course-swap platform that matches students automatically and lets them settle the trade in real-time chat.",
    role: "Frontend",
    tech: ["React", "TypeScript", "TanStack Query"],
    repo: "https://github.com/yoooooojin/31th_1_songwalks_swapclass_front",
    tile: "blue",
  },
  {
    name: "SookWalk",
    description:
      "An Android walking app for Sookmyung students with daily step goals and rankings between colleges.",
    role: "Frontend & Backend",
    tech: ["Kotlin", "Jetpack Compose", "Firebase", "Google Maps API"],
    repo: "https://github.com/yoooooojin/sookwalk-android",
    tile: "green",
  },
];

export const contact = {
  heading: "Get In Touch",
  text: "I'm looking for internships and team projects in backend development. Whether you have a question or just want to say hi, I'll get back to you.",
};
