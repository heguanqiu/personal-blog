import { formatDate } from "@/lib/utils";

type CommentItem = {
  id: string;
  nickname: string;
  content: string;
  createdAt: Date;
};

export function RecentComments({ comments }: { comments: CommentItem[] }) {
  return (
    <section className="glass card">
      <p className="section-title">最新评论</p>
      <h2 className="mt-2 text-2xl font-semibold">这里是站点还活着的证据</h2>
      <div className="mt-6 grid gap-4">
        {comments.length ? (
          comments.map((comment) => (
            <article key={comment.id} className="rounded-3xl border border-[var(--line)] bg-white/75 p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold">{comment.nickname}</h3>
                <span className="text-sm text-[var(--muted)]">{formatDate(comment.createdAt)}</span>
              </div>
              <p className="mt-3 text-[var(--muted)]">{comment.content}</p>
            </article>
          ))
        ) : (
          <p className="text-[var(--muted)]">还没有评论，欢迎成为第一个留言的人。</p>
        )}
      </div>
    </section>
  );
}
