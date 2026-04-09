import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { listAdminPosts } from "@/server/content/posts";

export default async function AdminPostsPage() {
  const posts = await listAdminPosts().catch(() => []);

  return (
    <section className="glass feature-card">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="section-title">Posts</p>
          <h1 className="mt-2 text-3xl font-semibold">文章管理</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            这里是写作工作台。文章列表不只展示状态，也应该让你一眼判断哪篇值得继续补完和发布。
          </p>
        </div>
        <Link href="/admin/posts/new" className="btn btn-primary">
          新建文章
        </Link>
      </div>
      <div className="mt-6 grid gap-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/admin/posts/${post.id}`}
            className="editorial-card"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Post Draft</p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">{post.title}</h2>
              </div>
              <span className="tag">{post.status}</span>
            </div>
            <p className="mt-4 leading-8 text-[var(--muted)]">{post.summary}</p>
            <p className="mt-4 text-sm text-[var(--muted)]">更新时间：{formatDate(post.updatedAt)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
