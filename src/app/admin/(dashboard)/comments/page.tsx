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
    <section className="glass card">
      <p className="section-title">Comments</p>
      <h1 className="mt-2 text-3xl font-semibold">评论管理</h1>
      <div className="mt-6 grid gap-4">
        {comments.map((comment) => (
          <article key={comment.id} className="rounded-3xl border border-[var(--line)] bg-white/75 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-semibold">{comment.nickname}</h2>
                <p className="text-sm text-[var(--muted)]">
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
            <p className="mt-3 text-[var(--muted)]">{comment.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
