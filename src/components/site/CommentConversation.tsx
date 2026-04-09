type CommentConversationProps = {
  title: string;
  subtitle: string;
  comments: Array<{
    id: string;
    nickname: string;
    content: string;
    createdAtLabel: string;
  }>;
};

export function CommentConversation({
  title,
  subtitle,
  comments,
}: CommentConversationProps) {
  return (
    <section className="glass feature-card">
      <p className="section-title">{title}</p>
      <h2 className="mt-2 text-2xl font-semibold">{subtitle}</h2>
      <div className="mt-6 grid gap-4">
        {comments.length ? (
          comments.map((comment) => (
            <article key={comment.id} className="editorial-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Comment</p>
                  <h3 className="mt-2 font-semibold">{comment.nickname}</h3>
                </div>
                <span className="text-sm text-[var(--muted)]">{comment.createdAtLabel}</span>
              </div>
              <p className="mt-4 leading-8 text-[var(--muted)]">{comment.content}</p>
            </article>
          ))
        ) : (
          <p className="text-[var(--muted)]">还没有评论。</p>
        )}
      </div>
    </section>
  );
}
