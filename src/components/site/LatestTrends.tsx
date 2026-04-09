import Link from "next/link";

import { formatDate } from "@/lib/utils";

type LatestTrendsProps = {
  dashboard: {
    snapshot: {
      sourceDate: Date;
      repos: Array<{
        id: string;
        repoFullName: string;
        starsGained: number | null;
        language: string | null;
      }>;
    };
    analytics: {
      totalRepos: number;
      totalStarsGained: number;
      topLanguages: Array<{ name: string; count: number }>;
    };
    summary: {
      aiSummary: string | null;
      editedSummary: string | null;
      status: string;
    } | null;
  } | null;
};

export function LatestTrends({ dashboard }: LatestTrendsProps) {
  if (!dashboard) {
    return (
      <section className="glass feature-card">
        <p className="section-title">GitHub 趋势</p>
        <h2 className="mt-2 text-2xl font-semibold">暂时还没有抓取数据</h2>
        <p className="mt-3 text-[var(--muted)]">启动 worker 或在后台手动触发一次趋势抓取后，这里会出现摘要和分析。</p>
      </section>
    );
  }

  const summary = dashboard.summary?.editedSummary || dashboard.summary?.aiSummary;

  return (
    <section className="glass feature-card">
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-3xl">
            <p className="section-title">本周观察</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-semibold tracking-tight">GitHub 趋势摘要</h2>
              <span className="rounded-full border border-[var(--line)] px-3 py-1 text-sm text-[var(--muted)]">
                {formatDate(dashboard.snapshot.sourceDate)}
              </span>
            </div>
            <p className="mt-4 leading-8 text-[var(--muted)]">
              {summary || "本次抓取已经完成，但 AI 摘要还未生成。你仍然可以在趋势页查看原始排行榜和基础统计。"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {dashboard.analytics.topLanguages.map((language) => (
              <span key={language.name} className="tag">
                {language.name} · {language.count}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.15fr]">
          <div className="rounded-[30px] border border-[var(--line)] bg-[rgba(255,255,255,0.8)] p-6">
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--muted)]">本次抓取概览</p>
            <dl className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper-strong)] p-4">
                <dt className="text-sm text-[var(--muted)]">仓库数</dt>
                <dd className="mt-1 text-3xl font-semibold">{dashboard.analytics.totalRepos}</dd>
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper-strong)] p-4">
                <dt className="text-sm text-[var(--muted)]">Star 增量</dt>
                <dd className="mt-1 text-3xl font-semibold">{dashboard.analytics.totalStarsGained}</dd>
              </div>
            </dl>
            <Link href="/trending" className="btn btn-primary mt-6 w-full">
              去看完整趋势页
            </Link>
          </div>

          <div className="grid gap-3">
            {dashboard.snapshot.repos.slice(0, 4).map((repo, index) => (
              <div
                key={repo.id}
                className="rounded-[26px] border border-[var(--line)] bg-[rgba(255,255,255,0.74)] px-5 py-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                      Rank #{index + 1}
                    </p>
                    <p className="mt-1 text-lg font-semibold">{repo.repoFullName}</p>
                  </div>
                  <span className="text-sm text-[var(--muted)]">+{repo.starsGained ?? 0}</span>
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">{repo.language || "Unknown"} · 热度上升中</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
