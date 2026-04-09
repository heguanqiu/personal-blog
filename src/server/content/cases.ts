import { ContentStatus } from "@prisma/client";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { sanitizeContentHtml } from "@/lib/sanitize";
import { slugify } from "@/lib/utils";

export const caseInputSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  summary: z.string().min(1),
  coverImage: z.string().url().optional().or(z.literal("")),
  gallery: z.string().optional(),
  techStack: z.string().optional(),
  projectUrl: z.string().url().optional().or(z.literal("")),
  repoUrl: z.string().url().optional().or(z.literal("")),
  contentHtml: z.string().min(1),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  featured: z.boolean().default(false),
  status: z.nativeEnum(ContentStatus),
});

async function ensureUniqueSlug(title: string, id?: string) {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.caseStudy.findFirst({
      where: {
        slug,
        ...(id ? { NOT: { id } } : {}),
      },
      select: { id: true },
    });

    if (!existing) {
      return slug;
    }

    counter += 1;
    slug = `${baseSlug}-${counter}`;
  }
}

function splitCsv(value?: string) {
  return (value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function listPublishedCases() {
  return prisma.caseStudy.findMany({
    where: { status: ContentStatus.PUBLISHED },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
  });
}

export async function listAdminCases() {
  return prisma.caseStudy.findMany({
    orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
  });
}

export async function getCaseBySlug(slug: string) {
  return prisma.caseStudy.findUnique({ where: { slug } });
}

export async function getCaseById(id: string) {
  return prisma.caseStudy.findUnique({ where: { id } });
}

export async function saveCase(input: z.infer<typeof caseInputSchema>) {
  const parsed = caseInputSchema.parse(input);
  const slug = await ensureUniqueSlug(parsed.title, parsed.id);

  const data = {
    title: parsed.title,
    slug,
    summary: parsed.summary,
    coverImage: parsed.coverImage || null,
    contentHtml: sanitizeContentHtml(parsed.contentHtml),
    gallery: splitCsv(parsed.gallery),
    techStack: splitCsv(parsed.techStack),
    projectUrl: parsed.projectUrl || null,
    repoUrl: parsed.repoUrl || null,
    featured: parsed.featured,
    status: parsed.status,
    seoTitle: parsed.seoTitle || null,
    seoDescription: parsed.seoDescription || null,
    publishedAt: parsed.status === ContentStatus.PUBLISHED ? new Date() : null,
  };

  return parsed.id
    ? prisma.caseStudy.update({
        where: { id: parsed.id },
        data,
      })
    : prisma.caseStudy.create({
        data,
      });
}
