import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import QueryProvider from "components/common/provider/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * APP DEFAULT Root Layout
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src="https://nsp.pay.naver.com/sdk/js/naverpay.min.js"
          strategy="beforeInteractive"
        />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
