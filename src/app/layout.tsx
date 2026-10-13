import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree, JetBrains_Mono, IBM_Plex_Sans_KR } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "800"],
  variable: "--font-display",
});
const body = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

// 한글용 폰트: IBM Plex Sans KR. 용량이 커서 미리 불러오지 않아요
const korean = IBM_Plex_Sans_KR({
  weight: ["400", "500", "700"],
  preload: false,
  variable: "--font-kr",
});

export const metadata: Metadata = {
  title: "Yoojin Song",
  description: "Yoojin Song — backend developer studying Computer Science at Sookmyung Women's University.",
};

// 첫 화면이 그려지기 전에 저장된 테마를 적용해서 깜빡임을 막아요. 기본값은 라이트.
const themeScript = `(function(){var t='light';try{t=localStorage.getItem('ys-theme')||'light'}catch(e){}document.documentElement.setAttribute('data-theme',t)})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${display.variable} ${body.variable} ${mono.variable} ${korean.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
