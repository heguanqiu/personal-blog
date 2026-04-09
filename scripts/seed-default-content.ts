import "dotenv/config";

import { prisma } from "@/lib/prisma";
import { seedDefaultContent } from "@/server/seed/default-content";

async function main() {
  const result = await seedDefaultContent();
  console.log("Default content initialized");
  console.log(JSON.stringify(result, null, 2));
  await prisma.$disconnect();
}

main().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
