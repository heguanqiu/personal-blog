type TrendSnapshotOverviewProps = {
  metrics: Array<{ label: string; value: string }>;
  languages: Array<{ name: string; count: number }>;
};

export function TrendSnapshotOverview({
  metrics,
  languages,
}: TrendSnapshotOverviewProps) {
  return (
    <section className="glass feature-card">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="section-title">趋势速览</p>
          <h3 className="mt-2 text-2xl font-semibold">本期指标与语言分布</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {languages.map((language) => (
            <span key={language.name} className="tag">
              {language.name} · {language.count}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-[24px] border border-[var(--line)] bg-white/80 p-5"
          >
            <p className="text-sm text-[var(--muted)]">{metric.label}</p>
            <p className="mt-2 text-3xl font-semibold">{metric.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
