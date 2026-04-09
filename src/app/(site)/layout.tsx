import Link from "next/link";

import { getSiteSettings } from "@/server/settings/site-settings";

export const dynamic = "force-dynamic";

const navigation = [
  { href: "/", label: "首页" },
  { href: "/articles", label: "文章" },
  { href: "/cases", label: "案例" },
  { href: "/trending", label: "趋势" },
  { href: "/guestbook", label: "留言" },
];

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings().catch(() => null);

  return (
    <div className="pb-16">
      <header className="shell pt-6">
        <div className="glass card flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <p className="section-title">Personal Data Blog</p>
            <Link href="/" className="mt-2 block text-[1.85rem] font-semibold tracking-tight">
              {settings?.seoDefaults.title ?? "Personal Blog"}
            </Link>
            <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
              一个更像个人编辑部的博客：观察趋势、发布文章、整理案例，并把交流留在现场。
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
            <Link href="/admin" className="rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--muted)] transition hover:bg-white">
              Studio
            </Link>
          </nav>
        </div>
      </header>
      <main className="shell mt-8">{children}</main>
      <footer className="shell mt-10">
        <div className="glass card flex flex-col gap-3 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
          <p>一个把趋势、文章、案例和留言放在一起的个人编辑空间。</p>
          <p>暖纸色背景、强人格侧栏、高信息密度内容流。</p>
        </div>
      </footer>
    </div>
  );
}
