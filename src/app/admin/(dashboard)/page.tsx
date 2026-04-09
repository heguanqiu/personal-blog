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
      <section className="glass feature-card">
        <p className="section-title">Dashboard</p>
        <h1 className="mt-2 text-4xl font-semibold">后台概览</h1>
        <p className="mt-4 max-w-2xl leading-8 text-[var(--muted)]">
          这里把文章、案例、趋势和评论放进同一个工作台。重点不是配置项有多少，而是你能否高频、稳定地维护公开输出。
        </p>
      </section>
      <section className="grid gap-4 md:grid-cols-3">
        {[
          { label: "文章数", value: postCount, note: "持续写作" },
          { label: "案例数", value: caseCount, note: "成果公开" },
          { label: "评论数", value: commentCount, note: "互动状态" },
        ].map((item) => (
          <article key={item.label} className="glass feature-card">
            <p className="text-sm text-[var(--muted)]">{item.label}</p>
            <p className="mt-3 text-4xl font-semibold">{item.value}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">{item.note}</p>
          </article>
        ))}
      </section>
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="glass feature-card">
          <p className="section-title">Latest Job</p>
          <h2 className="mt-2 text-2xl font-semibold">最近任务</h2>
          {latestJob ? (
            <div className="mt-5 rounded-[28px] border border-[var(--line)] bg-white/78 p-6">
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

        <section className="glass feature-card">
          <p className="section-title">Focus</p>
          <h2 className="mt-2 text-2xl font-semibold">编辑建议</h2>
          <div className="mt-5 grid gap-3">
            {[
              "先补一篇示例文章，让首页内容感更完整。",
              "如果已配好模型 API，就去趋势页修一版 AI 摘要。",
              "评论直出模式下，建议每天巡看一次评论管理。",
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
      </div>
    </>
  );
}
