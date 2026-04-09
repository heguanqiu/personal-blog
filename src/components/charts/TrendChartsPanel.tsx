"use client";

import dynamic from "next/dynamic";

const TrendLanguageChartClient = dynamic(
  () => import("@/components/charts/TrendLanguageChart").then((module) => module.TrendLanguageChart),
  {
    ssr: false,
    loading: () => (
      <div className="glass card flex h-[320px] items-center justify-center text-sm text-[var(--muted)]">
        图表加载中…
      </div>
    ),
  },
);

const TrendTopRepoChartClient = dynamic(
  () => import("@/components/charts/TrendTopRepoChart").then((module) => module.TrendTopRepoChart),
  {
    ssr: false,
    loading: () => (
      <div className="glass card flex h-[320px] items-center justify-center text-sm text-[var(--muted)]">
        图表加载中…
      </div>
    ),
  },
);

export function TrendChartsPanel({
  languages,
  repos,
}: {
  languages: Array<{ name: string; count: number }>;
  repos: Array<{ name: string; starsGained: number }>;
}) {
  return (
    <div className="grid gap-5">
      <TrendLanguageChartClient data={languages} />
      <TrendTopRepoChartClient data={repos} />
    </div>
  );
}
