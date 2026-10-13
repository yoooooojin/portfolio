import type { ProjectDetail } from "../types";

// SookWalk 상세 페이지 내용. 문장을 고치고 싶으면 이 파일만 수정하면 돼요.
// 말투 규칙: 개요 · 고민한 점 · 배운 점은 합니다체, 내가 한 일 · 트러블슈팅은 개조식
const sookwalk: ProjectDetail = {
  title: "SookWalk",
  tagline:
    "목표와 단과대 대항 랭킹으로 산책 동기를 주는 숙명여대생 전용 걷기 앱",
  period: "2025.11 – 2025.12",
  team: "3명 · Android 팀 프로젝트",
  role: "걸음 수 측정 · Firebase 동기화 · 목표 기능 · 지도/장소 즐겨찾기",
  stack: [
    {
      label: "Android",
      items: [
        "Kotlin",
        "Jetpack Compose",
        "Hilt",
        "Coroutines · Flow",
        "Room",
        "DataStore",
      ],
    },
    {
      label: "Backend",
      items: ["Firestore"],
      team: ["Firebase Auth", "Cloud Functions"],
    },
    { label: "API", items: ["Google Maps", "Places API"] },
  ],
  links: [
    {
      label: "프로젝트 소개",
      href: "https://github.com/yoooooojin/sookwalk-android",
    },
  ],

  overview: [
    "2024년 기준 우리나라 성인의 신체활동 부족률은 58.1%로 OECD 최하위권입니다. 팀에서 진행한 사전 설문에서도 응답자의 76.5%가 걷기·헬스케어 앱을 써 봤지만, 절반 이상이 '동기 부여 부족'과 '귀찮음' 때문에 꾸준히 쓰지 못했다고 답했습니다.",
    "SookWalk(Sook + Walk)는 숙명여대 학생만을 위한 산책 앱입니다. 걸음 수 목표를 세우고 달성 과정을 확인하며, 단과대·학과 대항 랭킹과 뱃지로 꾸준히 걸을 동기를 줍니다. 산책할 장소를 지도에서 찾아 즐겨찾기로 모아둘 수도 있습니다.",
  ],

  flow: [
    {
      name: "걸음 측정",
      desc: "백그라운드에서 센서로 걸음 수 기록",
      mine: true,
    },
    { name: "목표", desc: "걸음 수 목표 설정과 달성 추적", mine: true },
    { name: "랭킹", desc: "단과대 · 학과 대항 주간 랭킹" },
    { name: "지도", desc: "장소 검색과 즐겨찾기 카테고리", mine: true },
    { name: "뱃지", desc: "활동에 따른 뱃지 획득" },
  ],

  contributions: [
    {
      title: "걸음 수 측정 서비스",
      points: [
        "Foreground Service와 TYPE_STEP_COUNTER 센서로 앱이 꺼져 있어도 걸음 수 측정",
        "재부팅 후 누적된 센서값에서 직전 값과의 차이만 더하고, 재부팅으로 값이 초기화되면 기준값 재설정",
        "Room(일별 걸음)과 DataStore(누적 걸음 · 마지막 센서값)에 먼저 저장하는 로컬 우선 구조",
      ],
    },
    {
      title: "Firestore 동기화",
      points: [
        "50걸음 누적 · 3분 경과 · 목표 달성 중 하나라도 해당할 때만 업로드해 쓰기 횟수 절감",
        "트랜잭션과 FieldValue.increment로 단과대 · 학과 랭킹 걸음 수 누적",
        "재설치 시 로컬과 서버 기록 중 큰 값을 택해 걸음 기록 복구",
      ],
    },
    {
      title: "목표 기능",
      points: [
        "목표 추가 · 삭제 · 메모 수정과 Firestore 동기화",
        "걸음이 기록될 때마다 진행 중인 목표의 진행도 갱신, 달성 시 즉시 서버 반영",
        "홈 · 목표 화면 데이터 연동, 완수한 목표 수 통계 반영",
      ],
    },
    {
      title: "지도 · 장소 즐겨찾기",
      points: [
        "Google Maps 현재 위치 지도, Places API 검색 · 자동완성 · 장소 사진",
        "즐겨찾기 카테고리와 저장 장소를 Room과 Firestore에 함께 저장하고 로그인 시 복원",
      ],
    },
    {
      title: "UI 구현",
      points: [
        "지도 · 장소 목록 · 즐겨찾기 바텀시트와 다이얼로그 · 목표 · 목표 추가 · 뱃지 화면",
      ],
    },
  ],

  troubles: [
    {
      title: "랭킹 걸음 수가 실제보다 크게 집계되는 문제",
      problem: [
        "업로드할 때마다 단과대 · 학과 랭킹에 '오늘 누적 걸음 수' 전체를 더하고 있었음",
        "업로드가 반복될수록 같은 걸음이 여러 번 더해져 랭킹 수치가 부풀려짐",
      ],
      solution: [
        "마지막 업로드 이후 늘어난 걸음 수(차이값)만 더하도록 변경",
        "Firestore 트랜잭션과 FieldValue.increment로 여러 사용자가 동시에 더해도 값이 꼬이지 않게 처리",
      ],
      code: `// Before: 업로드마다 오늘 누적 걸음을 통째로 더함
stepRepository.addStepsToCollegeAndDepartment(todayAddedTotal)

// After: 마지막 업로드 이후 늘어난 만큼만 더함
val stepDiff = todayAddedTotal - lastUploadedTodaySteps
stepRepository.addStepsToCollegeAndDepartment(stepDiff)`,
    },
    {
      title: "서버 반영이 늦거나, 앱 종료 시 마지막 기록이 사라지는 문제",
      problem: [
        "처음에는 100걸음마다 업로드해서 조금만 걸으면 서버 기록과 랭킹이 갱신되지 않음",
        "서비스 종료 시 최종 저장을 코루틴으로 띄운 직후 스코프를 취소해, 마지막 걸음이 저장되지 않음",
      ],
      solution: [
        "업로드 조건을 50걸음 누적 · 3분 경과 · 목표 달성 시로 세분화",
        "업로드 중복을 막는 isUploading 플래그 추가",
        "onDestroy에서 최종 저장을 runBlocking으로 끝까지 수행한 뒤 스코프 정리",
      ],
      code: `if (!isUploading && (stepDiff >= 50 || hasPendingGoalSync ||
        (stepDiff > 0 && timeDiff >= 3 * 60 * 1000))) {
    isUploading = true
    ...
}`,
    },
    {
      title: "목표를 달성해도 서버에 반영되지 않는 문제",
      problem: [
        "걸음 수 업로드와 목표 동기화가 같은 흐름에 묶여, 걸음 업로드 중 오류가 나면 목표 동기화까지 건너뜀",
        "목표 달성 순간에 업로드 조건을 만족하지 못하면 달성 기록이 누락됨",
      ],
      solution: [
        "걸음 업로드와 목표 동기화의 예외 처리를 분리해 한쪽이 실패해도 다른 쪽은 진행",
        "목표 달성을 감지하면 동기화 대기 플래그를 세워 다음 업로드에서 반드시 반영",
        "랭킹 업데이트 실패는 로그만 남기고 건너뛰도록 격리",
      ],
    },
  ],

  considerations: [
    {
      title: "모든 걸음을 서버에 보낼 필요가 있을까",
      body: [
        "걸음 센서는 걸을 때마다 값을 보냅니다. 이를 그대로 Firestore에 쓰면 사용자 한 명이 하루에 수천 번 쓰기를 하게 되고, 쓰기 횟수만큼 비용이 발생하는 Firestore 특성상 사용자가 늘수록 비용이 빠르게 커집니다.",
        "그래서 걸음은 기기 안의 Room과 DataStore에 먼저 쌓고, 서버에는 의미 있는 변화가 생겼을 때만 보내는 구조를 택했습니다. 반대로 너무 드물게 보내면 랭킹과 목표가 늦게 갱신되므로, 50걸음 누적 · 3분 경과 · 목표 달성이라는 세 가지 조건을 조합해 비용과 실시간성 사이의 균형을 맞췄습니다.",
      ],
    },
  ],

  learned: [
    "첫 앱 프로젝트였지만, 센서에서 받은 데이터가 로컬 DB를 거쳐 서버와 랭킹까지 이어지는 전체 흐름을 직접 설계하며 프론트와 백엔드가 어떻게 연결되는지 이해했습니다.",
    "누적값을 더할 때는 '무엇을 기준으로 한 차이인지'를 명확히 해야 같은 데이터가 중복 집계되지 않는다는 것을 배웠습니다.",
    "여러 동기화 작업을 한 흐름에 묶으면 하나의 실패가 전체로 번진다는 것을 경험하고, 작업마다 실패를 격리하는 습관을 들였습니다.",
  ],
};

export default sookwalk;
