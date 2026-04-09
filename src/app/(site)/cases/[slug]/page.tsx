import Image from "next/image";
import { CommentTargetType } from "@prisma/client";
import { notFound } from "next/navigation";

import { CommentForm } from "@/components/comments/CommentForm";
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
      <article className="glass card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="section-title">Case Study</p>
            <h1 className="mt-2 text-4xl font-semibold">{item.title}</h1>
          </div>
          {item.featured ? <span className="tag">精选案例</span> : null}
        </div>
        <p className="mt-4 text-lg text-[var(--muted)]">{item.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {item.techStack.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
          <span className="text-sm text-[var(--muted)]">{formatDate(item.publishedAt)}</span>
        </div>
        <div className="prose-html mt-8" dangerouslySetInnerHTML={{ __html: item.contentHtml }} />
        {item.gallery.length ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {item.gallery.map((image) => (
              <Image
                key={image}
                src={image}
                alt={item.title}
                width={1200}
                height={720}
                className="rounded-3xl border border-[var(--line)] object-cover"
              />
            ))}
          </div>
        ) : null}
      </article>

      <section className="glass card">
        <p className="section-title">评论区</p>
        <h2 className="mt-2 text-2xl font-semibold">对案例的反馈</h2>
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

      <CommentForm targetType="CASE" targetId={item.id} />
    </div>
  );
}
