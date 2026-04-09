import Link from "next/link";

import { logoutAction } from "@/app/admin/actions";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { requireAdmin } from "@/server/auth/session";

export const dynamic = "force-dynamic";

const links = [
  {
    title: "内容",
    links: [
      { href: "/admin", label: "仪表盘" },
      { href: "/admin/posts", label: "文章" },
      { href: "/admin/cases", label: "案例" },
    ],
  },
  {
    title: "运营",
    links: [
      { href: "/admin/trending", label: "趋势" },
      { href: "/admin/comments", label: "评论" },
      { href: "/admin/settings", label: "设置" },
    ],
  },
];

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await requireAdmin();

  return (
    <div className="shell py-8">
      <div className="grid gap-8 xl:grid-cols-[320px_minmax(0,1fr)]">
        <div className="grid gap-5">
          <AdminSidebar
            sessionName={session.username}
            groups={links}
            statusItems={[
              "当前后台以单人维护为前提，适合高频发布和轻运营。",
              "趋势任务可以手动重跑，AI 摘要支持人工修订。",
              "评论默认直出，所以这里需要定期巡看最新评论。",
            ]}
            quickActions={[
              { href: "/admin/posts/new", label: "写文章" },
              { href: "/admin/cases/new", label: "建案例" },
              { href: "/admin/trending", label: "看趋势" },
              { href: "/guestbook", label: "看留言" },
            ]}
          />
          <section className="glass card space-y-4">
            <div>
              <p className="section-title">Session</p>
              <h3 className="mt-2 text-xl font-semibold">工作结束后</h3>
            </div>
            <form action={logoutAction}>
              <button className="btn btn-secondary w-full">退出登录</button>
            </form>
            <Link href="/" className="nav-link text-sm">
              返回前台
            </Link>
          </section>
        </div>
        <section className="grid gap-6">{children}</section>
      </div>
    </div>
  );
}
