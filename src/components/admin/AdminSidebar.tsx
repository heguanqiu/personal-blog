import Link from "next/link";

type AdminSidebarProps = {
  sessionName: string;
  groups: Array<{
    title: string;
    links: Array<{ href: string; label: string }>;
  }>;
  statusItems: string[];
  quickActions: Array<{ href: string; label: string }>;
};

export function AdminSidebar({
  sessionName,
  groups,
  statusItems,
  quickActions,
}: AdminSidebarProps) {
  return (
    <aside className="grid gap-5 xl:sticky xl:top-6">
      <section className="glass card space-y-5">
        <div>
          <p className="section-title">Studio</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">欢迎回来，{sessionName}</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            这里不是冷冰冰的管理台，而是你维护内容、趋势和互动的编辑工作台。
          </p>
        </div>
      </section>

      {groups.map((group) => (
        <section key={group.title} className="glass card space-y-4">
          <div>
            <p className="section-title">{group.title}</p>
            <h3 className="mt-2 text-xl font-semibold">{group.title}管理</h3>
          </div>
          <nav className="grid gap-2">
            {group.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl border border-[var(--line)] bg-white/65 px-4 py-3 text-sm text-[var(--muted)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </section>
      ))}

      <section className="glass card space-y-4">
        <div>
          <p className="section-title">当前状态</p>
          <h3 className="mt-2 text-xl font-semibold">编辑部侧记</h3>
        </div>
        <ul className="grid gap-3">
          {statusItems.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-[var(--line)] bg-[var(--paper-strong)] px-4 py-3 text-sm leading-7 text-[var(--muted)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="glass card space-y-4">
        <div>
          <p className="section-title">快速入口</p>
          <h3 className="mt-2 text-xl font-semibold">最常用动作</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href} className="tag transition hover:-translate-y-0.5">
              {action.label}
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
}
