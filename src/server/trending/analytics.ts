import type { GitHubTrendingRepo } from "@prisma/client";

export type TrendAnalytics = {
  totalRepos: number;
  topLanguages: Array<{ name: string; count: number }>;
  totalStarsGained: number;
  averageStarsGained: number;
  topRepos: Array<{
    name: string;
    starsGained: number;
    language: string | null;
  }>;
};

export function buildTrendAnalytics(repos: Pick<GitHubTrendingRepo, "repoFullName" | "language" | "starsGained">[]) {
  const languageMap = new Map<string, number>();
  let totalStarsGained = 0;

  for (const repo of repos) {
    const language = repo.language || "Unknown";
    languageMap.set(language, (languageMap.get(language) ?? 0) + 1);
    totalStarsGained += repo.starsGained ?? 0;
  }

  return {
    totalRepos: repos.length,
    topLanguages: [...languageMap.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6),
    totalStarsGained,
    averageStarsGained: repos.length ? Math.round(totalStarsGained / repos.length) : 0,
    topRepos: [...repos]
      .sort((a, b) => (b.starsGained ?? 0) - (a.starsGained ?? 0))
      .slice(0, 5)
      .map((repo) => ({
        name: repo.repoFullName,
        starsGained: repo.starsGained ?? 0,
        language: repo.language,
      })),
  };
}
