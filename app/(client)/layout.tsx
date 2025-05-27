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
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <article>
      <Header />
      <main className="pt-14">{children}</main>
    </article>
  );
}
