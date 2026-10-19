import "./global.css";

export const metadata = {
  title: "포트폴리오 관제 대시보드",
  description: "Next.js & MongoDB 웹서버보안프로그래밍 포트폴리오",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
