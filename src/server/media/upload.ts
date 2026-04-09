import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { prisma } from "@/lib/prisma";

const uploadRoot = path.join(process.cwd(), "public", "uploads");

export async function saveUpload(file: File) {
  await mkdir(uploadRoot, { recursive: true });
  const bytes = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const filePath = path.join(uploadRoot, fileName);

  await writeFile(filePath, bytes);

  return prisma.mediaAsset.create({
    data: {
      fileName,
      mimeType: file.type || "application/octet-stream",
      storagePath: `/uploads/${fileName}`,
    },
  });
}
