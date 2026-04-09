import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || "http://localhost:3000"),
  title: {
    default: "Personal Blog",
    template: "%s | Personal Blog",
  },
  description: "GitHub 趋势、文章、案例与匿名留言组成的个人数据博客",
  openGraph: {
    title: "Personal Blog",
    description: "GitHub 趋势、文章、案例与匿名留言组成的个人数据博客",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="min-h-full antialiased">
      <body className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">{children}</body>
    </html>
  );
}
