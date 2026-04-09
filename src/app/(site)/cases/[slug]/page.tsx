import Image from "next/image";
import { CommentTargetType } from "@prisma/client";
import { notFound } from "next/navigation";

import { CommentForm } from "@/components/comments/CommentForm";
import { CommentConversation } from "@/components/site/CommentConversation";
import { EditorialDetailHero } from "@/components/site/EditorialDetailHero";
import { formatDate } from "@/lib/utils";
import { listVisibleComments } from "@/server/comments/service";
import { getCaseBySlug } from "@/server/content/cases";

export const dynamic = "force-dynamic";

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getCaseBySlug(slug).catch(() => null);

  if (!item || item.status !== "PUBLISHED") {
    notFound();
  }

  const comments = await listVisibleComments(CommentTargetType.CASE, item.id).catch(() => []);

  return (
    <div className="grid gap-8">
      <EditorialDetailHero
        eyebrow="Case Study"
        title={item.title}
        summary={item.summary}
        badges={[...(item.featured ? ["精选案例"] : []), ...item.techStack]}
        metaItems={[formatDate(item.publishedAt), item.projectUrl ? "含项目链接" : "纯案例复盘", `${comments.length} 条评论`]}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
        <article className="grid gap-6">
          <section className="glass feature-card">
            <div className="prose-html" dangerouslySetInnerHTML={{ __html: item.contentHtml }} />
          </section>
          {item.gallery.length ? (
            <section className="glass feature-card">
              <p className="section-title">Gallery</p>
              <h2 className="mt-2 text-2xl font-semibold">项目画面</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {item.gallery.map((image) => (
                  <Image
                    key={image}
                    src={image}
                    alt={item.title}
                    width={1200}
                    height={720}
                    className="rounded-[28px] border border-[var(--line)] object-cover"
                  />
                ))}
              </div>
            </section>
          ) : null}
        </article>

        <aside className="grid gap-5 xl:sticky xl:top-6">
          <section className="glass card">
            <p className="section-title">项目概览</p>
            <div className="mt-4 grid gap-3 text-sm text-[var(--muted)]">
              <div className="rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3">
                发布时间：{formatDate(item.publishedAt)}
              </div>
              <div className="rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3">
                技术栈：{item.techStack.join(" · ") || "未设置"}
              </div>
              {item.projectUrl ? (
                <a
                  href={item.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3 text-[var(--accent)]"
                >
                  查看项目链接
                </a>
              ) : null}
              {item.repoUrl ? (
                <a
                  href={item.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3 text-[var(--accent)]"
                >
                  查看仓库地址
                </a>
              ) : null}
            </div>
          </section>
          <section className="glass card">
            <p className="section-title">案例阅读提示</p>
            <div className="mt-4 grid gap-3">
              {[
                "案例页更强调结果、方法和产出，而不是功能列表。",
                "如果你对某个项目细节感兴趣，可以直接留言交流。",
                "图片区放在正文后，保证先读故事，再看画面。",
              ].map((itemText) => (
                <div
                  key={itemText}
                  className="rounded-2xl border border-[var(--line)] bg-[var(--paper-strong)] px-4 py-3 text-sm leading-7 text-[var(--muted)]"
                >
                  {itemText}
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>

      <CommentConversation
        title="评论区"
        subtitle="对案例的反馈"
        comments={comments.map((comment) => ({
          id: comment.id,
          nickname: comment.nickname,
          content: comment.content,
          createdAtLabel: formatDate(comment.createdAt),
        }))}
      />

      <CommentForm targetType="CASE" targetId={item.id} />
    </div>
  );
}
