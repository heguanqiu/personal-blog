import { formatDate } from "@/lib/utils";
import { getTrendingArchive } from "@/server/trending/service";
import { TrendChartsPanel } from "@/components/charts/TrendChartsPanel";

export const dynamic = "force-dynamic";

export default async function TrendingPage() {
  const archive = await getTrendingArchive().catch(() => []);
  const current = archive[0];

  return (
    <div className="grid gap-8">
      <section className="glass card">
        <p className="section-title">GitHub Trending</p>
        <h1 className="mt-2 text-4xl font-semibold">趋势抓取与自动摘要</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[var(--muted)]">
          这里展示 GitHub 趋势榜的最新抓取结果、语言分布、热度变化，以及通过大模型生成的简明解读。
        </p>
      </section>

      {current ? (
        <>
          <section className="glass card">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="section-title">Latest Snapshot</p>
                <h2 className="mt-2 text-3xl font-semibold">最近一次抓取</h2>
              </div>
              <span className="text-sm text-[var(--muted)]">{formatDate(current.sourceDate)}</span>
            </div>
            <div className="mt-6 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="rounded-3xl border border-[var(--line)] bg-white/75 p-5">
                  <p className="text-sm text-[var(--muted)]">AI 自动摘要</p>
                  <p className="mt-3 whitespace-pre-line leading-8 text-[var(--muted)]">
                    {current.summary?.editedSummary ||
                      current.summary?.aiSummary ||
                      "本次抓取尚未生成摘要，但基础统计和仓库排行已经可见。"}
                  </p>
                </div>
                <div className="mt-6 grid gap-4">
                  {current.repos.slice(0, 10).map((repo) => (
                    <article key={repo.id} className="rounded-3xl border border-[var(--line)] bg-white/75 p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm text-[var(--muted)]">#{repo.rank}</p>
                          <h3 className="text-xl font-semibold">{repo.repoFullName}</h3>
                          <p className="mt-2 text-[var(--muted)]">{repo.description}</p>
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
              <TrendChartsPanel
                languages={current.analytics.topLanguages}
                repos={current.analytics.topRepos}
              />
            </div>
          </section>

          <section className="glass card">
            <p className="section-title">Archive</p>
            <h2 className="mt-2 text-2xl font-semibold">最近抓取记录</h2>
            <div className="mt-6 grid gap-4">
              {archive.map((item) => (
                <article key={item.id} className="rounded-3xl border border-[var(--line)] bg-white/75 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <h3 className="text-xl font-semibold">{formatDate(item.sourceDate)}</h3>
                    <span className="text-sm text-[var(--muted)]">
                      {item.repos.length} repos · {item.summary?.status || "NO_SUMMARY"}
                    </span>
                  </div>
                  <p className="mt-3 text-[var(--muted)]">
                    {item.summary?.editedSummary || item.summary?.aiSummary || "暂无摘要"}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="glass card">
          <p className="text-[var(--muted)]">还没有趋势数据。请先启动 worker，或在后台手动触发抓取。</p>
        </section>
      )}
    </div>
  );
}
