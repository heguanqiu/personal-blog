import Link from "next/link";

import { logoutAction } from "@/app/admin/actions";
import { requireAdmin } from "@/server/auth/session";

export const dynamic = "force-dynamic";

const links = [
  { href: "/admin", label: "仪表盘" },
  { href: "/admin/posts", label: "文章" },
  { href: "/admin/cases", label: "案例" },
  { href: "/admin/trending", label: "趋势" },
  { href: "/admin/comments", label: "评论" },
  { href: "/admin/settings", label: "设置" },
];

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireAdmin();

  return (
    <div className="shell py-8">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="glass card h-fit">
          <p className="section-title">后台导航</p>
          <h2 className="mt-2 text-2xl font-semibold">欢迎，{session.username}</h2>
          <nav className="mt-6 grid gap-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-2xl px-4 py-3 transition hover:bg-white/70">
                {link.label}
              </Link>
            ))}
          </nav>
          <form action={logoutAction} className="mt-6">
            <button className="btn btn-secondary w-full">退出登录</button>
          </form>
        </aside>
        <section className="grid gap-6">{children}</section>
      </div>
    </div>
  );
}
