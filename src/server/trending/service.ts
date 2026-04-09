import { buildTrendAnalytics } from "@/server/trending/analytics";
import { fetchGitHubTrendingHtml } from "@/server/trending/fetch";
import { parseTrendingHtml } from "@/server/trending/parse";
import { generateSummaryForSnapshot } from "@/server/trending/summary";
import { getLatestTrendingSnapshot, listRecentTrendingSnapshots, storeTrendingSnapshot } from "@/server/trending/store";

export async function collectTrending(period: "daily" | "weekly" = "daily", language?: string) {
  const html = await fetchGitHubTrendingHtml(period, language);
  const repos = parseTrendingHtml(html);
  const snapshot = await storeTrendingSnapshot({
    sourceDate: new Date(),
    period,
    language,
    rawPayload: {
      htmlLength: html.length,
      collectedAt: new Date().toISOString(),
    },
    repos,
  });

  const summary = await generateSummaryForSnapshot(snapshot.id);

  return {
    snapshot,
    summary,
    analytics: buildTrendAnalytics(snapshot.repos),
  };
}

export async function getTrendingDashboard() {
  const latest = await getLatestTrendingSnapshot();

  if (!latest) {
    return null;
  }

  return {
    snapshot: latest,
    analytics: buildTrendAnalytics(latest.repos),
    summary: latest.summaries[0] ?? null,
  };
}

export async function getTrendingArchive() {
  const snapshots = await listRecentTrendingSnapshots();
  return snapshots.map((snapshot) => ({
    ...snapshot,
    analytics: buildTrendAnalytics(snapshot.repos),
    summary: snapshot.summaries[0] ?? null,
  }));
}
