import { formatDate } from "@/lib/utils";
import { getTrendingArchive } from "@/server/trending/service";
import { TrendChartsPanel } from "@/components/charts/TrendChartsPanel";
import { TrendSnapshotOverview } from "@/components/charts/TrendSnapshotOverview";

export const dynamic = "force-dynamic";

export default async function TrendingPage() {
  const archive = await getTrendingArchive().catch(() => []);
  const current = archive[0];

  return (
    <div className="grid gap-8">
      <section className="glass hero-card">
        <p className="section-title">GitHub Trending</p>
        <h1 className="mt-2 text-5xl font-semibold tracking-tight">趋势抓取与自动摘要</h1>
        <div className="mt-5 grid gap-6 xl:grid-cols-[1.2fr_0.85fr]">
          <p className="max-w-3xl text-lg leading-8 text-[var(--muted)]">
            这里不是单纯的榜单页，而是一块持续更新的趋势专栏。抓取、基础分析和 AI 摘要共同组成“最近值得关注什么”的内容视图。
          </p>
          <div className="rounded-[28px] border border-[var(--line)] bg-white/76 p-6">
            <p className="section-title">阅读提示</p>
            <div className="mt-4 grid gap-3">
              {[
                "先看 AI 摘要，再看上榜仓库和图表。",
                "如果 AI 摘要失败，原始趋势数据仍然可用。",
                "历史快照会被保留下来，方便横向回看。",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[var(--line)] bg-[var(--paper-strong)] px-4 py-3 text-sm leading-7 text-[var(--muted)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {current ? (
        <>
          <section className="glass feature-card">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="section-title">Latest Snapshot</p>
                <h2 className="mt-2 text-3xl font-semibold">本期观察</h2>
              </div>
              <span className="rounded-full border border-[var(--line)] px-3 py-1 text-sm text-[var(--muted)]">
                {formatDate(current.sourceDate)}
              </span>
            </div>
            <div className="mt-6 grid gap-8 xl:grid-cols-[0.98fr_1.02fr]">
              <div className="grid gap-5">
                <div className="rounded-[30px] border border-[var(--line)] bg-white/78 p-6">
                  <p className="section-title">AI 自动摘要</p>
                  <p className="mt-4 whitespace-pre-line leading-8 text-[var(--muted)]">
                    {current.summary?.editedSummary ||
                      current.summary?.aiSummary ||
                      "本次抓取尚未生成摘要，但基础统计和仓库排行已经可见。"}
                  </p>
                </div>
                <div className="grid gap-4">
                  {current.repos.slice(0, 10).map((repo) => (
                    <article key={repo.id} className="editorial-card">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                            Rank #{repo.rank}
                          </p>
                          <h3 className="mt-2 text-xl font-semibold tracking-tight">{repo.repoFullName}</h3>
                          <p className="mt-3 leading-7 text-[var(--muted)]">{repo.description}</p>
                        </div>
                        <div className="text-right text-sm text-[var(--muted)]">
                          <p>{repo.language || "Unknown"}</p>
                          <p>+{repo.starsGained ?? 0} stars</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              <div className="grid gap-6">
                <TrendSnapshotOverview
                  metrics={[
                    { label: "仓库数", value: String(current.analytics.totalRepos) },
                    { label: "Star 增量", value: String(current.analytics.totalStarsGained) },
                    { label: "平均热度", value: String(current.analytics.averageStarsGained) },
                    { label: "摘要状态", value: current.summary?.status || "NO_SUMMARY" },
                  ]}
                  languages={current.analytics.topLanguages}
                />
                <TrendChartsPanel
                  languages={current.analytics.topLanguages}
                  repos={current.analytics.topRepos}
                />
              </div>
            </div>
          </section>

          <section className="glass feature-card">
            <p className="section-title">Archive</p>
            <h2 className="mt-2 text-2xl font-semibold">最近抓取记录</h2>
            <div className="mt-6 grid gap-4">
              {archive.map((item) => (
                <article key={item.id} className="editorial-card">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Archive Snapshot</p>
                      <h3 className="mt-2 text-xl font-semibold">{formatDate(item.sourceDate)}</h3>
                    </div>
                    <span className="text-sm text-[var(--muted)]">
                      {item.repos.length} repos · {item.summary?.status || "NO_SUMMARY"}
                    </span>
                  </div>
                  <p className="mt-4 leading-8 text-[var(--muted)]">
                    {item.summary?.editedSummary || item.summary?.aiSummary || "暂无摘要"}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="glass feature-card">
          <p className="text-[var(--muted)]">还没有趋势数据。请先启动 worker，或在后台手动触发抓取。</p>
        </section>
      )}
    </div>
  );
}
