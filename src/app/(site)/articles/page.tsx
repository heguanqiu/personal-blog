import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { listPublishedPosts } from "@/server/content/posts";

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const posts = await listPublishedPosts().catch(() => []);

  return (
    <section className="glass card">
      <p className="section-title">Articles</p>
      <h1 className="mt-2 text-4xl font-semibold">文章归档</h1>
      <div className="mt-8 grid gap-4">
        {posts.length ? (
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/articles/${post.slug}`}
              className="rounded-3xl border border-[var(--line)] bg-white/75 p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <span className="text-sm text-[var(--muted)]">{formatDate(post.publishedAt)}</span>
              </div>
              <p className="mt-3 text-[var(--muted)]">{post.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag.tagId} className="tag">
                    {tag.tag.name}
                  </span>
                ))}
              </div>
            </Link>
          ))
        ) : (
          <p className="text-[var(--muted)]">还没有已发布文章。</p>
        )}
      </div>
    </section>
  );
}
