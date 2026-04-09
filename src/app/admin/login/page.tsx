import { loginAction } from "@/app/admin/actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="shell flex min-h-screen items-center justify-center py-10">
      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="glass hero-card">
          <p className="section-title">Editor Studio</p>
          <h1 className="mt-2 text-5xl font-semibold tracking-tight">进入你的个人编辑部</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            后台沿用前台同一套暖纸色与编辑感语言，用来维护趋势、文章、案例和留言，不再只是默认管理面板。
          </p>
          <div className="mt-8 grid gap-3">
            {[
              "发布富文本文章与案例",
              "手动重跑 GitHub 趋势抓取",
              "修订 AI 摘要与巡看最新评论",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[var(--line)] bg-white/72 px-4 py-3 text-sm leading-7 text-[var(--muted)]"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
        <section className="glass feature-card">
          <p className="section-title">Admin Login</p>
          <h2 className="mt-2 text-3xl font-semibold">进入后台</h2>
          <p className="mt-4 text-[var(--muted)]">默认管理员来自环境变量 `ADMIN_USERNAME / ADMIN_PASSWORD`。</p>
          <form action={loginAction} className="mt-8 grid gap-4">
            <input className="field" name="username" placeholder="用户名" required />
            <input className="field" name="password" type="password" placeholder="密码" required />
            <button className="btn btn-primary">登录后台</button>
          </form>
          {params.error ? <p className="mt-4 text-sm text-red-600">用户名或密码错误。</p> : null}
        </section>
      </div>
    </main>
  );
}
