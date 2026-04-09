import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { listAdminPosts } from "@/server/content/posts";

export default async function AdminPostsPage() {
  const posts = await listAdminPosts().catch(() => []);

  return (
    <section className="glass card">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="section-title">Posts</p>
          <h1 className="mt-2 text-3xl font-semibold">文章管理</h1>
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
            className="rounded-3xl border border-[var(--line)] bg-white/75 p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <span className="tag">{post.status}</span>
            </div>
            <p className="mt-3 text-[var(--muted)]">{post.summary}</p>
            <p className="mt-3 text-sm text-[var(--muted)]">更新时间：{formatDate(post.updatedAt)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
