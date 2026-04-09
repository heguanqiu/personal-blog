import { SummaryStatus } from "@prisma/client";

import { env } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { buildTrendAnalytics } from "@/server/trending/analytics";

type ChatCompletionResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
};

async function callOpenAICompatibleSummary(prompt: string) {
  if (!env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is missing");
  }

  const response = await fetch(`${env.OPENAI_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: env.OPENAI_MODEL,
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "你是一名技术博客编辑，请用简洁中文总结 GitHub 趋势，突出技术方向、显著变化和值得关注的仓库。",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`AI summary request failed: ${response.status}`);
  }

  const data = (await response.json()) as ChatCompletionResponse;
  return data.choices?.[0]?.message?.content?.trim() || "";
}

export async function generateSummaryForSnapshot(snapshotId: string) {
  const snapshot = await prisma.gitHubTrendingSnapshot.findUnique({
    where: { id: snapshotId },
    include: { repos: { orderBy: { rank: "asc" } } },
  });

  if (!snapshot) {
    throw new Error("Trending snapshot not found");
  }

  const analytics = buildTrendAnalytics(snapshot.repos);
  const prompt = JSON.stringify(
    {
      period: snapshot.period,
      sourceDate: snapshot.sourceDate,
      analytics,
      topRepos: snapshot.repos.slice(0, 10).map((repo) => ({
        rank: repo.rank,
        name: repo.repoFullName,
        language: repo.language,
        starsGained: repo.starsGained,
        description: repo.description,
      })),
    },
    null,
    2,
  );

  try {
    const aiSummary = await callOpenAICompatibleSummary(prompt);

    return prisma.gitHubTrendingSummary.upsert({
      where: { snapshotId },
      update: {
        summarySourcePayload: { analytics, prompt } as never,
        aiSummary,
        status: SummaryStatus.GENERATED,
        modelName: env.OPENAI_MODEL,
      },
      create: {
        snapshotId,
        summarySourcePayload: { analytics, prompt } as never,
        aiSummary,
        status: SummaryStatus.GENERATED,
        modelName: env.OPENAI_MODEL,
      },
    });
  } catch {
    return prisma.gitHubTrendingSummary.upsert({
      where: { snapshotId },
      update: {
        summarySourcePayload: { analytics, prompt } as never,
        aiSummary: null,
        status: SummaryStatus.FAILED,
        modelName: env.OPENAI_MODEL,
        editedSummary: null,
      },
      create: {
        snapshotId,
        summarySourcePayload: { analytics, prompt } as never,
        aiSummary: null,
        status: SummaryStatus.FAILED,
        modelName: env.OPENAI_MODEL,
        editedSummary: null,
      },
    });
  }
}
