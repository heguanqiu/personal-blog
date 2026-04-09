import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [postCount, caseCount, commentCount, latestJob] = await Promise.all([
    prisma.post.count().catch(() => 0),
    prisma.caseStudy.count().catch(() => 0),
    prisma.comment.count().catch(() => 0),
    prisma.jobRun.findFirst({ orderBy: { startedAt: "desc" } }).catch(() => null),
  ]);

  return (
    <>
      <section className="glass card">
        <p className="section-title">Dashboard</p>
        <h1 className="mt-2 text-4xl font-semibold">后台概览</h1>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "文章数", value: postCount },
          { label: "案例数", value: caseCount },
          { label: "评论数", value: commentCount },
        ].map((item) => (
          <article key={item.label} className="glass card">
            <p className="text-sm text-[var(--muted)]">{item.label}</p>
            <p className="mt-3 text-4xl font-semibold">{item.value}</p>
          </article>
        ))}
      </section>
      <section className="glass card">
        <p className="section-title">Latest Job</p>
        <h2 className="mt-2 text-2xl font-semibold">最近任务</h2>
        {latestJob ? (
          <div className="mt-4 rounded-3xl border border-[var(--line)] bg-white/75 p-5">
            <p className="font-semibold">{latestJob.jobName}</p>
            <p className="mt-2 text-[var(--muted)]">
              {latestJob.status} · {formatDate(latestJob.startedAt)}
            </p>
            {latestJob.errorMessage ? <p className="mt-2 text-red-600">{latestJob.errorMessage}</p> : null}
          </div>
        ) : (
          <p className="mt-4 text-[var(--muted)]">还没有任务记录。</p>
        )}
      </section>
    </>
  );
}
