import Link from "next/link";

import { formatDate } from "@/lib/utils";

type PostItem = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  publishedAt: Date | null;
  tags?: string[];
};

export function LatestPosts({ posts }: { posts: PostItem[] }) {
  return (
    <section className="glass feature-card">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="section-title">最新文章</p>
          <h2 className="mt-2 text-2xl font-semibold">写作与沉淀</h2>
        </div>
        <Link href="/articles" className="nav-link text-sm">
          查看全部
        </Link>
      </div>
      <div className="grid gap-4">
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
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight">{post.title}</h3>
                </div>
                <span className="text-sm text-[var(--muted)]">{formatDate(post.publishedAt)}</span>
              </div>
              <p className="mt-4 line-clamp-3 max-w-3xl leading-8 text-[var(--muted)]">{post.summary}</p>
              {post.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </Link>
          ))
        ) : (
          <p className="text-[var(--muted)]">还没有发布文章，先去后台写第一篇。</p>
        )}
      </div>
    </section>
  );
}
