type EditorialDetailHeroProps = {
  eyebrow: string;
  title: string;
  summary: string;
  badges?: string[];
  metaItems?: string[];
};

export function EditorialDetailHero({
  eyebrow,
  title,
  summary,
  badges = [],
  metaItems = [],
}: EditorialDetailHeroProps) {
  return (
    <section className="glass hero-card relative overflow-hidden">
      <div className="hero-glow-left" />
      <div className="hero-glow-right" />
      <div className="relative z-10 max-w-4xl space-y-6">
        <p className="section-title">{eyebrow}</p>
        <h1 className="hero-title max-w-4xl">{title}</h1>
        <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">{summary}</p>
        {badges.length ? (
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span key={badge} className="tag">
                {badge}
              </span>
            ))}
          </div>
        ) : null}
        {metaItems.length ? (
          <div className="flex flex-wrap gap-3 text-sm text-[var(--muted)]">
            {metaItems.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--line)] bg-white/70 px-3 py-1"
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
