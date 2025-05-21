import { Metadata } from "next";
import { adminSiteConfig } from "src/config/site.config";

export const metadata: Metadata = {
  title: adminSiteConfig.title,
  description: adminSiteConfig.description,
  icons: "/logos/cash_form_icon.svg",
};

/**
 * ADMIN Root Layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <article>{children}</article>;
}
