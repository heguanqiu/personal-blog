type HomeHeroProps = {
  title: string;
  intro: string;
  noteTitle: string;
  noteItems: string[];
  socials: Array<{ label: string; url: string }>;
};

export function HomeHero({ title, intro, noteTitle, noteItems, socials }: HomeHeroProps) {
  return (
    <section className="glass hero-card relative overflow-hidden">
      <div className="hero-glow-left" />
      <div className="hero-glow-right" />
      <div className="grid gap-8 xl:grid-cols-[1.55fr_0.95fr] xl:items-end">
        <div className="max-w-4xl space-y-6">
          <p className="section-title">欢迎来到我的数据博客</p>
          <h1 className="hero-title max-w-4xl">{title}</h1>
          <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">{intro}</p>
          <div className="flex flex-wrap gap-3">
            <span className="tag">GitHub 趋势分析</span>
            <span className="tag">富文本文章</span>
            <span className="tag">匿名评论</span>
            <span className="tag">成果案例</span>
          </div>
        </div>

        <div className="rounded-[30px] border border-[rgba(255,255,255,0.55)] bg-[rgba(255,255,255,0.76)] p-6 shadow-[0_20px_40px_rgba(36,25,15,0.07)]">
          <p className="section-title">{noteTitle}</p>
          <div className="mt-4 grid gap-3">
            {noteItems.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[var(--line)] bg-[var(--paper-strong)] px-4 py-3 text-sm leading-7 text-[var(--muted)]"
              >
                {item}
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {socials.slice(0, 3).map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--line)] px-3 py-1.5 text-sm text-[var(--muted)] transition hover:bg-white"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
