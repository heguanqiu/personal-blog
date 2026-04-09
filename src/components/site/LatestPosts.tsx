import Link from "next/link";

import { formatDate } from "@/lib/utils";

type PostItem = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  publishedAt: Date | null;
};

export function LatestPosts({ posts }: { posts: PostItem[] }) {
  return (
    <section className="glass card">
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
          posts.map((post) => (
            <Link
              key={post.id}
              href={`/articles/${post.slug}`}
              className="rounded-3xl border border-[var(--line)] bg-white/75 p-5 transition hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <span className="text-sm text-[var(--muted)]">{formatDate(post.publishedAt)}</span>
              </div>
              <p className="mt-3 line-clamp-2 text-[var(--muted)]">{post.summary}</p>
            </Link>
          ))
        ) : (
          <p className="text-[var(--muted)]">还没有发布文章，先去后台写第一篇。</p>
        )}
      </div>
    </section>
  );
}
