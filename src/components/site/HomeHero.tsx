type HomeHeroProps = {
  title: string;
  intro: string;
};

export function HomeHero({ title, intro }: HomeHeroProps) {
  return (
    <section className="glass card relative overflow-hidden">
      <div className="absolute right-[-40px] top-[-40px] h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(15,118,110,0.22),_transparent_68%)]" />
      <div className="max-w-3xl space-y-6">
        <p className="section-title">欢迎来到我的数据博客</p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          {title}
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">{intro}</p>
        <div className="flex flex-wrap gap-3">
          <span className="tag">GitHub 趋势分析</span>
          <span className="tag">Rich Text Publishing</span>
          <span className="tag">Anonymous Comments</span>
          <span className="tag">Case Studies</span>
        </div>
      </div>
    </section>
  );
}
