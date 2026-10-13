# Yoojin Song — Portfolio

Next.js(App Router) + TypeScript로 만든 개인 포트폴리오입니다.
레이아웃은 [Brittany Chiang v4](https://v4.brittanychiang.com)를 참고했어요.

## 로컬에서 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 을 열면 됩니다.

## 내용 수정하기

| 바꾸고 싶은 것 | 수정할 파일 |
|---|---|
| 이름, 소개, 경력, 프로젝트, 이메일, 링크 | `src/data/content.ts` |
| 색상 (메인 컬러 = `--accent`) | `src/app/globals.css` 맨 위 |
| 프로필 사진, 프로젝트 스크린샷 | `public/images/`에 파일을 넣고 `content.ts`에 경로 입력 |
| 섹션 구성, 레이아웃 | `src/components/` |

예) 프로필 사진: `public/images/profile.jpg`를 넣고 `content.ts`에서
`photo: "/images/profile.jpg"` 로 바꾸기.

## 폴더 구조

```
src/
  app/
    layout.tsx       폰트, 테마 초기화, <head>
    page.tsx         섹션 순서
    globals.css      모든 스타일
  components/        Nav, Hero, About, Experience, Projects, Contact ...
  data/content.ts    글 내용 전부
public/images/       이미지
```
