import { loginAction } from "@/app/admin/actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="shell flex min-h-screen items-center justify-center py-10">
      <div className="glass card w-full max-w-xl">
        <p className="section-title">Admin Login</p>
        <h1 className="mt-2 text-4xl font-semibold">进入后台</h1>
        <p className="mt-4 text-[var(--muted)]">默认管理员来自环境变量 `ADMIN_USERNAME / ADMIN_PASSWORD`。</p>
        <form action={loginAction} className="mt-8 grid gap-4">
          <input className="field" name="username" placeholder="用户名" required />
          <input className="field" name="password" type="password" placeholder="密码" required />
          <button className="btn btn-primary">登录后台</button>
        </form>
        {params.error ? <p className="mt-4 text-sm text-red-600">用户名或密码错误。</p> : null}
      </div>
    </main>
  );
}
