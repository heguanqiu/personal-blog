import "dotenv/config";

import { runTrendingJob } from "@/server/jobs/trending-job";

async function main() {
  await runTrendingJob("daily");
  console.log("Trending job completed");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
