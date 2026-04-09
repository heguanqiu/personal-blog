import { prisma } from "@/lib/prisma";
import { collectTrending } from "@/server/trending/service";

export async function runTrendingJob(period: "daily" | "weekly" = "daily") {
  const startedAt = new Date();
  const jobRun = await prisma.jobRun.create({
    data: {
      jobName: `github-trending:${period}`,
      status: "RUNNING",
      startedAt,
    },
  });

  try {
    const result = await collectTrending(period);
    await prisma.jobRun.update({
      where: { id: jobRun.id },
      data: {
        status: "SUCCESS",
        finishedAt: new Date(),
        durationMs: Date.now() - startedAt.getTime(),
      },
    });
    return result;
  } catch (error) {
    await prisma.jobRun.update({
      where: { id: jobRun.id },
      data: {
        status: "FAILED",
        finishedAt: new Date(),
        durationMs: Date.now() - startedAt.getTime(),
        errorMessage: error instanceof Error ? error.message : "Unknown error",
      },
    });
    throw error;
  }
}
