import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { listPublishedPosts } from "@/server/content/posts";

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const posts = await listPublishedPosts().catch(() => []);

  return (
    <section className="glass feature-card">
      <p className="section-title">Articles</p>
      <h1 className="mt-2 text-4xl font-semibold">文章归档</h1>
      <p className="mt-4 max-w-2xl leading-8 text-[var(--muted)]">
        这里保留我对趋势、工程和产品表达的长期写作。比起碎片动态，我更偏爱能反复回看的公开记录。
      </p>
      <div className="mt-8 grid gap-4">
        {posts.length ? (
          posts.map((post, index) => (
            <Link
              key={post.id}
              href={`/articles/${post.slug}`}
              className="editorial-card"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="max-w-3xl">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                    Article {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight">{post.title}</h2>
                </div>
                <span className="text-sm text-[var(--muted)]">{formatDate(post.publishedAt)}</span>
              </div>
              <p className="mt-4 max-w-3xl leading-8 text-[var(--muted)]">{post.summary}</p>
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
