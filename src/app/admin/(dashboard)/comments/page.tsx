import { hideCommentAction } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export default async function AdminCommentsPage() {
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  }).catch(() => []);

  return (
    <section className="glass feature-card">
      <p className="section-title">Comments</p>
      <h1 className="mt-2 text-3xl font-semibold">评论管理</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
        评论是站点活跃度的信号，所以这里的管理体验应该更像巡看和清理，而不是单纯的后台表格。
      </p>
      <div className="mt-6 grid gap-4">
        {comments.map((comment) => (
          <article key={comment.id} className="editorial-card">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Comment</p>
                <h2 className="mt-2 font-semibold">{comment.nickname}</h2>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {comment.targetType} · {comment.targetId} · {formatDate(comment.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="tag">{comment.status}</span>
                {comment.status === "VISIBLE" ? (
                  <form action={hideCommentAction}>
                    <input type="hidden" name="id" value={comment.id} />
                    <SubmitButton className="btn btn-secondary">隐藏</SubmitButton>
                  </form>
                ) : null}
              </div>
            </div>
            <p className="mt-4 leading-8 text-[var(--muted)]">{comment.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
