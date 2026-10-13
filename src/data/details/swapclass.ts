import type { ProjectDetail } from "../types";

// SwapClass(수강구조대) 상세 페이지 내용. 문장을 고치고 싶으면 이 파일만 수정하면 돼요.
// 말투 규칙: 개요 · 고민한 점 · 배운 점은 합니다체, 내가 한 일 · 트러블슈팅은 개조식
const swapclass: ProjectDetail = {
  title: "SwapClass",
  tagline:
    "자동 매칭부터 실시간 채팅, 수강 내역 인증까지 지원하는 숙대생 강의 교환 플랫폼 (수강구조대)",
  period: "2026.03 – 2026.08",
  team: "7명 (기획 1 · 디자인 1 · FE 3 · BE 2) · SOLUX",
  role: "프론트엔드 · 프로젝트 기반 설정 · 공통 컴포넌트 · API 클라이언트 · 홈 · 라운지 · 신고",
  stack: [
    {
      label: "Frontend",
      items: [
        "React",
        "TypeScript",
        "TanStack Query",
        "Zustand",
        "Axios",
        "Tailwind CSS",
        "Vite",
        "MSW",
      ],
      team: ["STOMP · SockJS", "FCM"],
    },
    {
      label: "Backend",
      items: [],
      team: ["Spring Boot 3", "MySQL", "Redis", "WebSocket", "AWS"],
    },
  ],
  links: [
    { label: "프로젝트 소개", href: "https://github.com/SongWalks" },
    {
      label: "Frontend",
      href: "https://github.com/yoooooojin/31th_1_songwalks_swapclass_front",
    },
    { label: "서비스", href: "https://soo-frontend-brown.vercel.app" },
    { label: "시연 영상", href: "https://youtu.be/ThDeejwzZzE" },
  ],

  overview: [
    "수강신청 기간에는 원하는 강의를 얻기 위해 에브리타임 같은 익명 커뮤니티에서 강의를 맞교환하는 일이 많습니다. 하지만 조건에 맞는 상대를 찾으려 게시판을 계속 확인해야 하고, 쪽지로 조건을 일일이 맞춰야 하며, 상대가 약속을 지킬지 알 수 없어 불안합니다.",
    "SwapClass는 버릴 과목과 희망 과목(1~3순위)을 등록하면 조건이 맞는 상대를 자동으로 추천하고, 실시간 채팅으로 교환 시간을 정한 뒤, 화면 공유로 수강 내역을 인증하고 10초 카운트다운에 맞춰 동시에 교환하도록 돕는 서비스입니다.",
  ],

  flow: [
    { name: "게시글 등록", desc: "버릴 과목과 희망 과목 1~3순위 입력" },
    { name: "추천 매칭", desc: "조건이 맞는 상대 추천과 교환 요청" },
    { name: "채팅 · 일정", desc: "STOMP 실시간 채팅으로 교환 시간 확정" },
    { name: "QR 인증", desc: "교환 5분 전 화면 공유로 수강 내역 인증" },
    { name: "동시 교환", desc: "양측 인증 후 10초 카운트다운" },
  ],

  contributions: [
    {
      title: "프로젝트 기반 설정 (단독 담당)",
      points: [
        "Vite · TypeScript 프로젝트 초기 구성, ESLint · oxlint · Prettier · Husky(lint-staged)로 커밋 전 코드 검사 자동화",
        "React Router 라우팅과 레이아웃 체계(Root · Default · FullScreen, Header, BottomNav) 설계",
        "Button · Input · Modal · Toast · Tabs · Skeleton 등 공통 컴포넌트 16종 구현",
      ],
    },
    {
      title: "API 클라이언트와 인증 처리",
      points: [
        "Axios 인스턴스와 인터셉터로 토큰 자동 첨부, 401 · 403 응답 공통 처리",
        "백엔드 완성 전 MSW로 API 명세 기반 목 서버를 만들어 프론트 개발을 병행",
      ],
    },
    {
      title: "홈 화면",
      points: [
        "교환 약속이 있을 때만 나타나는 D-Day 배너",
        "받은 교환 요청 목록 표시, 남은 시간을 실시간 카운트다운으로 보여주고 10분 미만은 긴급 요청으로 구분",
        "다른 화면에서 돌아오면 최신 데이터로 갱신",
      ],
    },
    {
      title: "라운지 커뮤니티 · 신고",
      points: [
        "게시글 목록 · 상세 · 작성 · 수정, 과목 태그 필터, 이미지 업로드, 댓글 API 연동",
        "익명 댓글 작성자를 게시글마다 송이1, 송이2…로 일관되게 표시",
        "신고 화면과 신고 대상자 연동",
      ],
    },
  ],

  troubles: [
    {
      title: "로그인 만료 시 경고창이 여러 번 뜨는 문제",
      problem: [
        "한 화면에서 여러 API를 동시에 호출하다 토큰이 만료되면, 401 응답마다 경고창이 반복해서 뜸",
        "비로그인 상태에서도 호출되는 '내 글 여부 확인' API까지 로그인 만료로 처리됨",
      ],
      solution: [
        "응답 인터셉터에서 경고 표시 여부를 모듈 단위 플래그로 관리해 한 번만 안내하고 로그인 화면으로 이동",
        "로그인 여부와 무관하게 호출되는 API는 조용히 실패하도록 예외 목록으로 분리",
      ],
      code: `let isAuthAlertShown = false;

axiosInstance.interceptors.response.use(undefined, (error) => {
  if (error.response?.status === 401) {
    localStorage.removeItem('soo_access_token');
    if (!isSilentRequest && !isAuthAlertShown) {
      isAuthAlertShown = true;
      alert('로그인이 만료되었습니다. 다시 로그인해 주세요.');
      window.location.href = '/login';
    }
  }
  return Promise.reject(error);
});`,
    },
    {
      title: "정지된 사용자와 비로그인 사용자가 같은 안내를 받는 문제",
      problem: [
        "두 경우 모두 서버가 403을 반환해, 비로그인 사용자에게도 '이용이 정지된 계정' 안내가 표시됨",
      ],
      solution: [
        "백엔드가 이미 응답에 담아 주던 정지 해제일(suspendedUntil) 유무로 두 경우를 구분",
        "정지된 사용자에게는 해제일을 함께 안내하고, 비로그인 사용자에게는 로그인 안내 표시",
      ],
    },
    {
      title: "알림 빨간 점이 새로고침해야만 갱신되는 문제",
      problem: [
        "읽지 않은 알림 수를 상위 컴포넌트에서 한 번만 받아 props로 내려, 화면을 이동해도 값이 그대로 남음",
      ],
      solution: [
        "헤더가 직접 읽지 않은 알림 수 API를 호출하고, 경로가 바뀔 때마다 다시 조회하도록 변경",
        "토큰이 없으면 호출 자체를 건너뛰어 불필요한 요청 제거",
      ],
    },
    {
      title: "라운지와 과목 검색 화면이 검색어를 공유하는 문제",
      problem: [
        "라운지 검색어를 Zustand 전역 스토어에 두어, 과목 검색 화면에서 입력한 검색어가 라운지에도 그대로 적용됨",
      ],
      solution: [
        "화면 밖에서 쓸 일이 없는 검색어는 컴포넌트 지역 상태로 옮기고, 전역 스토어에는 여러 화면이 공유해야 하는 값만 남김",
      ],
    },
  ],

  considerations: [
    {
      title: "API를 받아 쓰는 입장에서 배운 협업",
      body: [
        "이 프로젝트에서는 프론트엔드를 맡아 백엔드 API를 가장 많이 호출하고 연동하는 입장이었습니다. 프론트와 백엔드가 동시에 개발을 진행하다 보니, 화면을 만들면서 필요한 API나 응답 값이 새로 생기는 일이 많았습니다. 그때마다 백엔드 팀원과 수시로 이야기하며 요청과 응답 형식을 함께 맞춰 나갔습니다.",
        "백엔드가 준비되기 전에는 MSW로 가짜 응답을 만들어 화면 개발을 이어갔고, 응답에 이미 담겨 있던 값들을 최대한 활용해 화면을 구성했습니다. 이 과정에서 API 명세에 요청 · 응답 예시와 에러 상황을 처음부터 구체적으로 정리해 두면, 서로 확인하는 시간이 줄고 양쪽 모두 더 빠르게 개발할 수 있다는 것을 체감했습니다. 백엔드 개발자로서 API를 설계할 때 이 경험을 기준으로 삼고 있습니다.",
      ],
    },
  ],

  learned: [
    "공통 컴포넌트와 코드 검사 규칙을 초기에 정해 두면, 7명이 함께 작업해도 화면과 코드 스타일이 흩어지지 않는다는 것을 배웠습니다.",
    "전역 상태는 편리하지만, 여러 화면이 정말로 공유해야 하는 값에만 써야 예상치 못한 간섭을 막을 수 있다는 것을 경험했습니다.",
    "에러 처리를 화면마다 흩어 두지 않고 인터셉터 한곳에 모으면, 인증 정책이 바뀌어도 한 곳만 고치면 된다는 것을 깨달았습니다.",
    "API를 받아 쓰는 입장이 되어 보니, 요청 · 응답 예시와 에러 상황까지 담긴 명세가 협업 속도를 크게 높인다는 것을 알게 되었습니다.",
  ],
};

export default swapclass;
