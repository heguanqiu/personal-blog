import { CommentTargetType } from "@prisma/client";
import { notFound } from "next/navigation";

import { CommentForm } from "@/components/comments/CommentForm";
import { CommentConversation } from "@/components/site/CommentConversation";
import { EditorialDetailHero } from "@/components/site/EditorialDetailHero";
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
      <EditorialDetailHero
        eyebrow="Article"
        title={post.title}
        summary={post.summary}
        badges={[
          ...(post.category ? [post.category.name] : []),
          ...post.tags.map((tag) => tag.tag.name),
        ]}
        metaItems={[formatDate(post.publishedAt), "公开写作", `${comments.length} 条评论`]}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
        <article className="glass feature-card">
          <div className="prose-html" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </article>

        <aside className="grid gap-5 xl:sticky xl:top-6">
          <section className="glass card">
            <p className="section-title">阅读侧记</p>
            <div className="mt-4 grid gap-3">
              {[
                "这里适合放更完整的观察，而不是碎片动态。",
                "如果你读完有反馈，直接在下方匿名留言即可。",
                "标签和分类会帮助你回到同类文章。",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-[var(--line)] bg-[var(--paper-strong)] px-4 py-3 text-sm leading-7 text-[var(--muted)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>
          <section className="glass card">
            <p className="section-title">文章信息</p>
            <div className="mt-4 grid gap-3 text-sm text-[var(--muted)]">
              <div className="rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3">
                发布时间：{formatDate(post.publishedAt)}
              </div>
              {post.category ? (
                <div className="rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3">
                  分类：{post.category.name}
                </div>
              ) : null}
              <div className="rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3">
                标签：{post.tags.map((tag) => tag.tag.name).join(" · ") || "未设置"}
              </div>
            </div>
          </section>
        </aside>
      </div>

      <CommentConversation
        title="评论区"
        subtitle="读者在这里留下痕迹"
        comments={comments.map((comment) => ({
          id: comment.id,
          nickname: comment.nickname,
          content: comment.content,
          createdAtLabel: formatDate(comment.createdAt),
        }))}
      />

      <CommentForm targetType="POST" targetId={post.id} />
    </div>
  );
}
