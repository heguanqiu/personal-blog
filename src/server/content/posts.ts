import { ContentStatus } from "@prisma/client";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import { sanitizeContentHtml } from "@/lib/sanitize";
import { slugify } from "@/lib/utils";

export const postInputSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1),
  summary: z.string().min(1),
  coverImage: z.string().url().optional().or(z.literal("")),
  category: z.string().optional(),
  tags: z.string().optional(),
  contentHtml: z.string().min(1),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  status: z.nativeEnum(ContentStatus),
});

async function ensureCategory(name?: string) {
  if (!name?.trim()) {
    return null;
  }

  const slug = slugify(name);
  return prisma.postCategory.upsert({
    where: { slug },
    update: { name },
    create: { name, slug },
  });
}

async function ensureTags(rawTags?: string) {
  const values = (rawTags ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const records = [];

  for (const value of values) {
    records.push(
      await prisma.postTag.upsert({
        where: { slug: slugify(value) },
        update: { name: value },
        create: { name: value, slug: slugify(value) },
      }),
    );
  }

  return records;
}

async function ensureUniqueSlug(title: string, id?: string) {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.post.findFirst({
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

export async function listPublishedPosts() {
  return prisma.post.findMany({
    where: { status: ContentStatus.PUBLISHED },
    include: { category: true, tags: { include: { tag: true } } },
    orderBy: { publishedAt: "desc" },
  });
}

export async function listAdminPosts() {
  return prisma.post.findMany({
    include: { category: true, tags: { include: { tag: true } } },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: { category: true, tags: { include: { tag: true } } },
  });
}

export async function getPostById(id: string) {
  return prisma.post.findUnique({
    where: { id },
    include: { category: true, tags: { include: { tag: true } } },
  });
}

export async function savePost(input: z.infer<typeof postInputSchema>) {
  const parsed = postInputSchema.parse(input);
  const category = await ensureCategory(parsed.category);
  const tags = await ensureTags(parsed.tags);
  const slug = await ensureUniqueSlug(parsed.title, parsed.id);
  const sanitizedHtml = sanitizeContentHtml(parsed.contentHtml);

  const data = {
    title: parsed.title,
    slug,
    summary: parsed.summary,
    coverImage: parsed.coverImage || null,
    contentHtml: sanitizedHtml,
    status: parsed.status,
    seoTitle: parsed.seoTitle || null,
    seoDescription: parsed.seoDescription || null,
    publishedAt: parsed.status === ContentStatus.PUBLISHED ? new Date() : null,
    categoryId: category?.id ?? null,
  };

  const post =
    parsed.id
      ? await prisma.post.update({
          where: { id: parsed.id },
          data,
        })
      : await prisma.post.create({
          data,
        });

  await prisma.postTagRelation.deleteMany({
    where: { postId: post.id },
  });

  if (tags.length) {
    await prisma.postTagRelation.createMany({
      data: tags.map((tag) => ({
        postId: post.id,
        tagId: tag.id,
      })),
    });
  }

  return post;
}
