import Link from "next/link";

type HomeSidebarProps = {
  profile: {
    title: string;
    intro: string;
    socials: Array<{ label: string; url: string }>;
  };
  status: {
    label: string;
    items: string[];
  };
  comments: Array<{
    id: string;
    nickname: string;
    content: string;
    createdAtLabel: string;
  }>;
  blogMeta: {
    tags: string[];
    archives: string[];
  };
};

export function HomeSidebar({
  profile,
  status,
  comments,
  blogMeta,
}: HomeSidebarProps) {
  return (
    <aside className="grid gap-5 xl:sticky xl:top-6">
      <section className="glass card space-y-5">
        <div>
          <p className="section-title">{profile.title}</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">一个持续写、持续做、持续公开的人</h2>
        </div>
        <p className="leading-8 text-[var(--muted)]">{profile.intro}</p>
        <div className="flex flex-wrap gap-2">
          {profile.socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="tag transition hover:-translate-y-0.5"
            >
              {social.label}
            </a>
          ))}
          <Link href="/guestbook" className="tag bg-white text-[var(--ink)]">
            去留言
          </Link>
        </div>
      </section>

      <section className="glass card space-y-4">
        <div>
          <p className="section-title">{status.label}</p>
          <h3 className="mt-2 text-xl font-semibold">最近在做什么</h3>
        </div>
        <ul className="grid gap-3">
          {status.items.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3 text-sm leading-7 text-[var(--muted)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="glass card space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="section-title">最新评论</p>
            <h3 className="mt-2 text-xl font-semibold">站点的呼吸感</h3>
          </div>
          <Link href="/guestbook" className="nav-link text-sm">
            留言板
          </Link>
        </div>
        <div className="grid gap-3">
          {comments.length ? (
            comments.map((comment) => (
              <article
                key={comment.id}
                className="rounded-2xl border border-[var(--line)] bg-white/72 px-4 py-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-medium">{comment.nickname}</h4>
                  <span className="text-xs text-[var(--muted)]">{comment.createdAtLabel}</span>
                </div>
                <p className="mt-2 line-clamp-3 text-sm leading-7 text-[var(--muted)]">
                  {comment.content}
                </p>
              </article>
            ))
          ) : (
            <p className="text-sm leading-7 text-[var(--muted)]">还没有评论，欢迎留下第一条留言。</p>
          )}
        </div>
      </section>

      <section className="glass card space-y-4">
        <div>
          <p className="section-title">标签 / 归档</p>
          <h3 className="mt-2 text-xl font-semibold">轻量博客入口</h3>
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {blogMeta.tags.length ? (
              blogMeta.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))
            ) : (
              <span className="text-sm text-[var(--muted)]">发布几篇文章后，这里会自动更丰富。</span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {blogMeta.archives.map((archive) => (
              <span key={archive} className="rounded-full border border-[var(--line)] px-3 py-1 text-sm text-[var(--muted)]">
                {archive}
              </span>
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
}
