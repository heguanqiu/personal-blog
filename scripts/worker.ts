import "dotenv/config";

import { env } from "@/lib/env";
import { runTrendingJob } from "@/server/jobs/trending-job";

async function execute() {
  try {
    await runTrendingJob("daily");
  } catch (error) {
    console.error("Worker job failed", error);
  }
}

async function main() {
  await execute();

  const intervalMs = env.TRENDING_INTERVAL_SECONDS * 1000;
  setInterval(() => {
    void execute();
  }, intervalMs);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
