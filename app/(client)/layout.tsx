import Header from "components/client/layouts/header";
import { Metadata } from "next";
import { clientSiteConfig } from "src/config/site.config";

export const metadata: Metadata = {
  title: clientSiteConfig.title,
  description: clientSiteConfig.description,
  icons: "/logos/cash_form_icon.svg",
};

/**
 * CLIENT Root Layout
 *
 * 모든 클라이언트 페이지에 공통으로 적용되는 레이아웃입니다.
 * - 헤더 포함
 * - 최대 너비 제한 (max-w-7xl)
 * - 중앙 정렬 및 양옆 여백
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <article className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-14">
        <div className="max-w-7xl mx-auto px-4">{children}</div>
      </main>
    </article>
  );
}
