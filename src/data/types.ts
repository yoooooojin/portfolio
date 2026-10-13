export type ProjectDetail = {
  title: string;
  tagline: string;
  period: string;
  team: string;
  role: string;
  // items: 내가 직접 쓴 기술, team: 팀에서 썼지만 내가 직접 다루지 않은 기술 (흐리게 표시)
  stack: { label: string; items: string[]; team?: string[] }[];
  links: { label: string; href: string }[];
  overview: string[];
  // 서비스 흐름. mine: true 인 단계가 강조돼요
  flow?: { name: string; desc: string; mine?: boolean }[];
  // 내가 한 일 · 트러블슈팅은 개조식 문장 배열로 적어요
  contributions: { title: string; points: string[] }[];
  // 대표 성과 (없으면 생략). minutes 값으로 막대 길이를 계산해요
  result?: {
    title: string;
    caption: string;
    badge: string;
    before: { value: string; unit: string; minutes: number };
    after: { value: string; unit: string; minutes: number };
    drivers: string[];
  };
  troubles: { title: string; problem: string[]; solution: string[]; result?: string[]; code?: string }[];
  considerations?: { title: string; body: string[] }[];
  learned?: string[];
};
