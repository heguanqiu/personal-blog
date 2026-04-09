import { CommentTargetType } from "@prisma/client";

import { CommentForm } from "@/components/comments/CommentForm";
import { formatDate } from "@/lib/utils";
import { listVisibleComments } from "@/server/comments/service";
import { getSiteSettings } from "@/server/settings/site-settings";

export const dynamic = "force-dynamic";

export default async function GuestbookPage() {
  const [settings, comments] = await Promise.all([
    getSiteSettings().catch(() => null),
    listVisibleComments(CommentTargetType.GUESTBOOK, "guestbook").catch(() => []),
  ]);

  return (
    <div className="grid gap-8">
      <section className="glass card">
        <p className="section-title">About</p>
        <h1 className="mt-2 text-4xl font-semibold">关于与留言</h1>
        <div
          className="prose-html mt-6"
          dangerouslySetInnerHTML={{
            __html: settings?.aboutHtml || "<p>欢迎留下你的看法。</p>",
          }}
        />
      </section>

      <section className="glass card">
        <p className="section-title">Guestbook</p>
        <h2 className="mt-2 text-2xl font-semibold">访客留言板</h2>
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
            <p className="text-[var(--muted)]">还没有留言。</p>
          )}
        </div>
      </section>

      <CommentForm targetType="GUESTBOOK" targetId="guestbook" />
    </div>
  );
}
