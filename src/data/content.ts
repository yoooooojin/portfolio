// ─────────────────────────────────────────────────────────────
//  포트폴리오의 모든 글 내용은 이 파일에서 수정하면 됩니다.
//  이미지를 넣으려면 public/images 폴더에 파일을 넣고
//  경로를 "/images/파일이름.png" 처럼 적어주세요.
// ─────────────────────────────────────────────────────────────

import type { ProjectDetail } from "./types";
import highlite from "./details/highlite";
import sookwalk from "./details/sookwalk";
import swapclass from "./details/swapclass";
import shhpoil from "./details/shhpoil";

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
  "숙명여자대학교에서 컴퓨터과학을 전공하는 **백엔드 개발자**입니다. 지금은 산학협력 프로젝트에서 **패션 상품 검색**을 연구하고, SOLUX에서 서버 개발을 하고 있습니다.";

// About 섹션 문단들 (**굵게** 사용 가능)
export const about = [
  "안녕하세요! **숙명여자대학교 컴퓨터과학전공** 송유진입니다. 지금은 **백엔드 개발**에 집중하고 있습니다.",
  "강의자료의 필기를 분석해 시험 문제를 만드는 멀티 에이전트 서비스, 걸음 수 목표와 단과대 랭킹을 담은 산책 앱, 수강신청 강의 교환 플랫폼을 팀원들과 함께 만들었습니다. 최근에는 안 본 회차의 스포일러만 가려 주는 크롬 확장 에이전트 **쉿스포(Shhpoil)**로 해커톤에서 우승했습니다. 구름(goorm)에서는 QA 인턴으로 서비스를 사용자 입장에서 꼼꼼히 살펴보는 경험을 했습니다.",
  "협업과 코드 리뷰를 통해 **팀과 함께 성장하는 것**을 좋아합니다. 최근에 주로 사용한 기술은 다음과 같습니다.",
];

export const skills = [
  "Java · Kotlin",
  "Spring Boot",
  "Python · FastAPI",
  "TypeScript · React",
  "PostgreSQL · MySQL",
  "Oracle",
];

export const certs = ["정보처리기사", "SQLD", "ADsP", "TOEIC 930"];

export type Job = {
  tab: string; // 왼쪽 탭에 보이는 짧은 이름
  title: string;
  org: string;
  range: string;
  points: string[];
};

export const jobs: Job[] = [
  {
    tab: "Hackathon",
    title: "Track 1 Winner",
    org: "TRILLION AGENT AI HACKATHON 2026",
    range: "2026.11",
    points: [
      "안 본 회차의 스포일러만 가리는 크롬 확장 에이전트 ‘쉿스포(Shhpoil)’로 Track 1 우승",
      "2인 팀에서 관찰 · 행동 · 학습 에이전트와 크롬 확장 전체 담당",
      "판단 엔진이 응답하지 않으면 키워드 방식으로 대신 가리고, 엔진이 돌아오면 자동 복귀하도록 구성",
    ],
  },
  {
    tab: "Research Project",
    title: "Researcher",
    org: "Industry–Academia Project",
    range: "2026.09 — Present",
    points: [
      "패션 동일 상품 검색 연구에서 텍스트 파트 담당",
      "Qwen3-VL로 상품 속성과 서술을 생성하고 BGE-M3로 임베딩",
      "이미지 검색과 결합해 mAP@10을 4.0%p 높임",
      "연구 결과를 정리해 논문 공동 작성",
    ],
  },
  {
    tab: "SOLUX",
    title: "Backend Developer",
    org: "SOLUX · 중앙동아리",
    range: "2026.03 — Present",
    points: [
      "기획 · 디자인 · 프론트엔드 · 백엔드가 모여 서비스를 만드는 중앙동아리",
      "Spring Boot 기반 AI 스터디 서비스에서 학습 화면 기능과 졸음 감지 AI 기능 담당",
      "앞선 프로젝트 SwapClass(강의 교환 플랫폼)에서는 프론트엔드 개발",
    ],
  },
  {
    tab: "goorm",
    title: "Fullstack Engineer Intern",
    org: "goorm",
    range: "2026.02 · Strategy Force",
    points: [
      "개발 중인 게임을 한 달간 직접 플레이하며 QA 수행",
      "발견한 이슈와 로그를 노션에 정리해 팀에 공유",
      "사내 AI 코딩 도구로 일부 이슈를 직접 수정",
    ],
  },
  {
    tab: "ALGOS",
    title: "Member",
    org: "ALGOS",
    range: "2025.03 — Present",
    points: [
      "C++ 알고리즘 동아리의 주차별 정기 스터디 참여",
      "맡은 주차에 알고리즘 주제를 발표하고 문제 5개를 골라 함께 풀이",
      "방학 세미나 발표와 캠프(일주일간 하루 3문제) 참여",
    ],
  },
];

export type Project = {
  slug: string; // 상세 페이지 주소: /projects/slug
  detail?: ProjectDetail; // 상세 페이지 내용 (src/data/details/). 없으면 카드는 GitHub로 연결돼요
  name: string;
  description: string;
  role: string;
  tech: string[];
  repo: string;
  demo?: string; // 배포된 데모 주소가 있으면 적어주세요
  image?: string; // 스크린샷: 예) "/images/highlite.png" — 없으면 색 타일
  tile: "gray" | "blue" | "green"; // 스크린샷이 없을 때 타일 색
  overline?: string; // 카드 위 작은 파란 글씨 (없으면 "Featured Project")
};

export const projects: Project[] = [
  {
    slug: "highlite",
    detail: highlite,
    name: "Highlite",
    description:
      "강의자료 PDF에 표시한 형광펜과 필기를 분석해 시험 문제를 자동으로 만들어 주는 멀티 에이전트 서비스입니다.",
    role: "중요도 분석 에이전트 · 백엔드 기반 설계 · UI",
    tech: ["FastAPI", "PostgreSQL", "LangChain", "GPT", "Streamlit"],
    repo: "https://github.com/yoooooojin/Highlite-Backend",
    image: "/images/highlite.png",
    tile: "gray",
  },
  {
    slug: "shhpoil",
    detail: shhpoil,
    name: "Shhpoil",
    description:
      "내가 본 회차까지만 보여주는 스포일러 판정 에이전트입니다. 유튜브 · X · 넷플릭스에서 안 본 회차 내용만 가려 주는 크롬 확장으로, TRILLION AGENT AI HACKATHON 2026 Track 1 우승작입니다.",
    role: "관찰 · 행동 · 학습 에이전트 · 크롬 확장",
    tech: ["JavaScript", "Chrome MV3", "Python", "Zoro-1"],
    repo: "https://github.com/yoooooojin/shhpoil",
    image: "/images/shhpoil.png",
    tile: "gray",
    overline: "Track 1 Winner · AI Hackathon 2026",
  },
  {
    slug: "sookwalk",
    detail: sookwalk,
    name: "SookWalk",
    description:
      "걸음 수 목표와 단과대 · 학과 대항 랭킹으로 꾸준히 걷도록 돕는 숙명여대생 전용 산책 앱입니다.",
    role: "걸음 수 측정 · Firestore 동기화 · 목표 · 지도",
    tech: ["Kotlin", "Jetpack Compose", "Firebase", "Google Maps API"],
    repo: "https://github.com/yoooooojin/sookwalk-android",
    image: "/images/sookwalk.png",
    tile: "green",
  },
  {
    slug: "swapclass",
    detail: swapclass,
    name: "SwapClass",
    description:
      "조건이 맞는 상대를 자동으로 추천하고 실시간 채팅으로 교환을 돕는 수강신청 강의 교환 플랫폼입니다.",
    role: "프론트엔드 · 프로젝트 기반 설정",
    tech: ["React", "TypeScript", "TanStack Query"],
    repo: "https://github.com/yoooooojin/31th_1_songwalks_swapclass_front",
    image: "/images/swapclass.png",
    tile: "blue",
  },
];

export const contact = {
  heading: "Get In Touch",
  text: "백엔드 개발 인턴십과 팀 프로젝트 기회를 찾고 있습니다. 궁금한 점이 있거나 이야기를 나누고 싶다면 편하게 연락 주세요.",
};
