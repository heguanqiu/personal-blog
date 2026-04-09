import { TrendPeriod } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import type { ParsedTrendingRepo } from "@/server/trending/parse";

export async function storeTrendingSnapshot(input: {
  sourceDate: Date;
  period: "daily" | "weekly";
  language?: string;
  rawPayload: unknown;
  repos: ParsedTrendingRepo[];
}) {
  const snapshot = await prisma.gitHubTrendingSnapshot.create({
    data: {
      sourceDate: input.sourceDate,
      period: input.period === "daily" ? TrendPeriod.DAILY : TrendPeriod.WEEKLY,
      language: input.language || null,
      rawPayload: input.rawPayload as never,
      repos: {
        create: input.repos.map((repo) => ({
          repoFullName: repo.repoFullName,
          owner: repo.owner,
          repoName: repo.repoName,
          description: repo.description,
          language: repo.language,
          starsTotal: repo.starsTotal,
          forks: repo.forks,
          starsGained: repo.starsGained,
          rank: repo.rank,
          keywords: repo.keywords,
        })),
      },
    },
    include: {
      repos: true,
    },
  });

  return snapshot;
}

export async function getLatestTrendingSnapshot() {
  return prisma.gitHubTrendingSnapshot.findFirst({
    include: {
      repos: {
        orderBy: { rank: "asc" },
      },
      summaries: true,
    },
    orderBy: { fetchedAt: "desc" },
  });
}

export async function listRecentTrendingSnapshots() {
  return prisma.gitHubTrendingSnapshot.findMany({
    include: {
      repos: {
        orderBy: { rank: "asc" },
        take: 5,
      },
      summaries: true,
    },
    orderBy: { fetchedAt: "desc" },
    take: 10,
  });
}
