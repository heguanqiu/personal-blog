import { CommentTargetType } from "@prisma/client";
import { notFound } from "next/navigation";

import { CommentForm } from "@/components/comments/CommentForm";
import { formatDate } from "@/lib/utils";
import { listVisibleComments } from "@/server/comments/service";
import { getPostBySlug } from "@/server/content/posts";

export const dynamic = "force-dynamic";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  const comments = await listVisibleComments(CommentTargetType.POST, post.id).catch(() => []);

  return (
    <div className="grid gap-8">
      <article className="glass card">
        <p className="section-title">Article</p>
        <h1 className="mt-2 text-4xl font-semibold">{post.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
          <span>{formatDate(post.publishedAt)}</span>
          {post.category ? <span className="tag">{post.category.name}</span> : null}
          {post.tags.map((tag) => (
            <span key={tag.tagId} className="tag">
              {tag.tag.name}
            </span>
          ))}
        </div>
        <p className="mt-6 text-lg text-[var(--muted)]">{post.summary}</p>
        <div className="prose-html mt-8" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>

      <section className="glass card">
        <p className="section-title">评论区</p>
        <h2 className="mt-2 text-2xl font-semibold">读者在这里留下痕迹</h2>
        <div className="mt-6 grid gap-4">
          {comments.length ? (
            comments.map((comment) => (
              <article key={comment.id} className="rounded-3xl border border-[var(--line)] bg-white/75 p-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-semibold">{comment.nickname}</h3>
                  <span className="text-sm text-[var(--muted)]">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="mt-3 text-[var(--muted)]">{comment.content}</p>
              </article>
            ))
          ) : (
            <p className="text-[var(--muted)]">还没有评论。</p>
          )}
        </div>
      </section>

      <CommentForm targetType="POST" targetId={post.id} />
    </div>
  );
}
