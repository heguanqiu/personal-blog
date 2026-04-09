import type { MetadataRoute } from "next";

import { listPublishedCases } from "@/server/content/cases";
import { listPublishedPosts } from "@/server/content/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.APP_URL || "http://localhost:3000";
  const [posts, cases] = await Promise.all([
    listPublishedPosts().catch(() => []),
    listPublishedCases().catch(() => []),
  ]);

  return [
    "",
    "/articles",
    "/cases",
    "/trending",
    "/guestbook",
    ...posts.map((post) => `/articles/${post.slug}`),
    ...cases.map((item) => `/cases/${item.slug}`),
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
  }));
}
