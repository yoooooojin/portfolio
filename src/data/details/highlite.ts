import type { ProjectDetail } from "../types";

// Highlite 상세 페이지 내용. 문장을 고치고 싶으면 이 파일만 수정하면 돼요.
// 말투 규칙: 개요 · 고민한 점 · 배운 점은 합니다체, 내가 한 일 · 트러블슈팅은 개조식
const highlite: ProjectDetail = {
  title: "Highlite",
  tagline:
    "형광펜 친 강의자료로 시험 문제를 만들어주는 멀티 에이전트 학습 서비스",
  period: "2026.03 – 2026.06",
  team: "4명 · 2026-1 캡스톤 (팀 형광단)",
  role: "중요도 분석 에이전트 · 백엔드 기반 설계 · Streamlit UI 구축 · 구글 로그인",
  stack: [
    {
      label: "Backend",
      items: [
        "FastAPI",
        "SQLAlchemy (asyncpg)",
        "Supabase PostgreSQL",
        "Authlib",
      ],
      team: ["pgvector"],
    },
    {
      label: "AI",
      items: ["LangChain", "GPT-4o-mini", "Gemini 2.5"],
      team: ["Claude Opus 4.5", "GPT-4.1"],
    },
    { label: "Frontend", items: ["Streamlit"] },
  ],
  links: [
    { label: "프로젝트 소개", href: "https://github.com/Team-HyeongGwang" },
    {
      label: "Backend",
      href: "https://github.com/yoooooojin/Highlite-Backend",
    },
    {
      label: "Frontend",
      href: "https://github.com/highlite2026/Highlite-Frontend",
    },
  ],

  overview: [
    "대학생들은 교수님이 제공한 PPT에 형광펜과 펜으로 중요한 부분을 표시하며 공부합니다. 하지만 그 표시를 직접 문제로 만드는 데는 많은 시간이 들고, 중요도에 맞춰 문제를 배분하기도 어렵습니다.",
    "Highlite(Highlight + Lite)는 이 표시를 읽어 시험 문제를 자동으로 만들어 주는 멀티 에이전트 서비스입니다. PDF를 올리면 다섯 에이전트가 차례로 동작합니다. 내용과 필기를 추출하고, 조각마다 중요도를 매기고, 중요도 순위에 따라 5:3:2 비율로 문제를 배분해 출제하고, 품질을 검수한 뒤, 틀린 문제를 바탕으로 다시 출제합니다.",
  ],

  flow: [
    {
      name: "RAG",
      desc: "Gemini로 OCR·필기 색상 추출, 임베딩을 pgvector에 저장",
    },
    {
      name: "중요도 분석",
      desc: "텍스트와 필기 표시로 조각마다 0~10점 산정",
      mine: true,
    },
    {
      name: "문제 생성",
      desc: "중요도 순위별 5:3:2 배분, Claude·GPT 동시 출제",
    },
    { name: "평가", desc: "룰 기반 검증과 LLM 검수, 반려 시 재생성" },
    { name: "개인화", desc: "오답 조각 우선 배정해 맞춤 재출제" },
  ],

  contributions: [
    {
      title: "중요도 분석 에이전트",
      points: [
        "본문, 형광펜·펜 색상, [별표]·[밑줄] 등 필기 표시를 근거로 0~10점 중요도 산정",
        "사용자가 설정한 색상별 중요도 순위(최대 3개)를 가중치로 반영하는 프롬프트 설계",
        "Structured Output으로 점수·근거·키워드·요약을 받아 DB에 저장",
      ],
    },
    {
      title: "백엔드 기반 설계",
      points: [
        "에이전트별 router · schemas · service 계층 구조와 전체 워크플로 라우터 구성",
        "에이전트 간 공통 스키마 분리, CORS · 환경 변수 설정",
      ],
    },
    {
      title: "DB 스키마 설계",
      points: [
        "SQLAlchemy(async)로 7개 테이블 모델링",
        "사용자 · 문서 · 문서 조각 · 중요도 결과 · 문제 · 퀴즈 결과 · 사용자 답안",
      ],
    },
    {
      title: "구글 로그인 · 마이페이지",
      points: [
        "Authlib 기반 구글 OAuth 로그인과 JWT 발급",
        "닉네임 수정, 회원 탈퇴 API 구현",
        "로그인 시마다 계정을 선택하도록 개선 (prompt=select_account)",
      ],
    },
    {
      title: "Streamlit UI 구축",
      points: [
        "팀원의 와이어프레임을 바탕으로 앱 전체 화면 직접 구현",
        "로그인 · 업로드 · 문서 라이브러리 · 문제 풀이 · 오답 노트 · 내보내기 · 마이페이지",
        "백엔드 API 연동, 구글 로그인과 세션 기반 인증 흐름 구현",
      ],
    },
  ],

  result: {
    title: "파이프라인 처리 시간",
    caption: "51쪽 강의자료 기준 · PDF 추출부터 중요도 분석 완료까지",
    badge: "약 90% 단축",
    before: { value: "10", unit: "분+", minutes: 10 },
    after: { value: "1", unit: "분 내외", minutes: 1 },
    drivers: [
      "페이지 단위 병렬 요청",
      "논블로킹 비동기 호출",
      "결과 수집 후 일괄 저장",
      "타임아웃 · 재시도",
    ],
  },

  troubles: [
    {
      title: "PDF 추출 중 API 과부하와 무한 대기",
      problem: [
        "51쪽 슬라이드를 한 번에 Gemini API로 요청 시 503(UNAVAILABLE) · 429 에러 발생",
        "LangChain 내부 지수 백오프 재시도와 겹치며 처리 시간 10분 이상으로 증가",
      ],
      solution: [
        "5장씩 묶어 보내던 방식을 폐기하고 1장 단위 요청으로 분리",
        "asyncio.Semaphore로 동시 요청 수를 제한하며 병렬 처리",
        "해상도(DPI) 150 유지로 속도와 추출 정확도 동시 확보",
      ],
      code: `semaphore = asyncio.Semaphore(50)

async def sem_process(page_num, b64):
    async with semaphore:
        return await process_single_page(page_num, b64)

tasks = [sem_process(n, b64) for n, b64 in pages_data]
results = await asyncio.gather(*tasks)`,
    },
    {
      title: "동기 호출로 인해 병렬 처리가 직렬로 동작",
      problem: [
        "async 함수 내부의 동기 호출(chain.invoke())이 이벤트 루프 전체를 블로킹",
        "병렬 설정에도 실제로는 순차 처리되어 120여 개 청크 분석 지연",
      ],
      solution: [
        "await chain.ainvoke()로 전환해 논블로킹 비동기 호출로 변경",
        "대기 중인 요청 사이에 다른 코루틴이 실행되며 실제 병렬 처리 달성",
      ],
      code: `# Before: 이벤트 루프를 막는 동기 호출
response = chain.invoke({...})

# After: 논블로킹 비동기 호출
response = await chain.ainvoke({...})`,
    },
    {
      title: "단일 DB 세션 동시 접근으로 파이프라인 정지",
      problem: [
        "분석을 마친 120여 개 비동기 태스크가 하나의 세션에 동시에 session.add() 시도",
        "세션 충돌로 파이프라인 전체가 멈춤",
      ],
      solution: [
        "LLM 호출(병렬)과 DB 저장(순차)의 역할 분리",
        "asyncio.gather로 분석 결과를 먼저 수집한 뒤, 한 곳에서 순차 add 후 단일 commit",
      ],
      code: `# 1. 분석은 병렬로, 결과만 수집
llm_results = await asyncio.gather(*tasks)

# 2. DB 저장은 한 곳에서 순차적으로
for db_result in llm_results:
    session.add(db_result)
await session.commit()`,
    },
    {
      title: "응답 없는 요청 하나가 전체를 멈추는 문제",
      problem: [
        "수백 개 요청 중 1~2개만 무응답이어도 gather가 전체 완료를 기다리며 파이프라인 미반환",
      ],
      solution: [
        "asyncio.wait_for로 요청별 20초 타임아웃 적용 (Fail-Fast)",
        "최대 3회 재시도, 통신 에러는 5초 · 10초로 대기 시간을 늘려 재시도",
        "최종 실패 청크는 0점 기본값으로 처리해 전체 흐름 유지",
      ],
      code: `for attempt in range(MAX_RETRIES):
    try:
        response = await asyncio.wait_for(chain.ainvoke(...), timeout=20.0)
        break
    except asyncio.TimeoutError:
        continue  # 즉시 재시도
    except Exception:
        await asyncio.sleep((attempt + 1) * 5)

if not response:
    response = ImportanceResponse(score=0.0, reasoning="API 분석 실패", ...)`,
    },
    {
      title: "대량 Structured Output 요청 시 잦은 타임아웃",
      problem: [
        "청크마다 JSON 구조화 응답이 필요한 중요도 분석에서 Gemini의 동시 요청 타임아웃 빈발",
      ],
      solution: [
        "JSON 생성 안정성이 높은 OpenAI gpt-4o-mini로 모델 교체",
        "동시 처리량 확대",
      ],
      result: ["120개 이상의 청크 중요도 분석을 수십 초 내 완료"],
    },
  ],

  considerations: [
    {
      title: "좋은 문제가 나오려면 중요도를 어떻게 매겨야 할까",
      body: [
        "문제 생성 에이전트는 중요도 순위에 따라 5:3:2 비율로 출제 비중을 나눕니다. 그런데 초기에는 중요하지 않은 부분에서도 상당수의 문제가 출제되었습니다. 원인을 살펴보니 형광펜 색상만으로 중요도를 판단하고 있었는데, 실제 필기본에는 형광펜 외에도 별표, '중요'라는 글자, 밑줄처럼 학생이 중요하다고 표시하는 방법이 훨씬 다양했습니다.",
        "그래서 이런 표시들을 하나씩 반영하며 프롬프트를 고쳐 나갔습니다. 시험·핵심을 뜻하는 최상위 강조, 동그라미·밑줄 같은 시각적 강조, 점수를 올리지 않는 부연 메모의 세 등급으로 나누고, 사용자가 순위를 정하지 않은 색상에는 가중치를 주지 않도록 규칙을 명시했습니다.",
        "개선 결과는 두 가지 방법으로 확인했습니다. DB에 저장된 결과를 보며 어떤 청크에 높은 중요도가 매겨졌고 문제가 어느 청크에서 생성되었는지를 대조했고, 팀원들이 생성된 문제를 직접 보며 실제 필기의 강조 부분과 비교해 합리적인지 판단했습니다.",
      ],
    },
  ],

  learned: [
    "비동기 코드는 async로 선언하는 것만으로는 충분하지 않으며, 내부 호출까지 논블로킹이어야 실제로 병렬 처리된다는 것을 배웠습니다.",
    "외부 API에 의존하는 파이프라인은 일부 요청이 반드시 실패한다고 가정하고, 타임아웃 · 재시도 · 기본값 처리를 처음부터 설계해야 한다는 것을 깨달았습니다.",
    "병렬 작업과 공유 자원(DB 세션)의 접근 지점을 분리하는 것이 안정성의 핵심이라는 것을 경험했습니다.",
  ],
};

export default highlite;
