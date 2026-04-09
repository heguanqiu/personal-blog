import { runTrendingNowAction, saveTrendSummaryAction } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { formatDate } from "@/lib/utils";
import { getTrendingArchive } from "@/server/trending/service";

export default async function AdminTrendingPage() {
  const archive = await getTrendingArchive().catch(() => []);

  return (
    <div className="grid gap-6">
      <section className="glass feature-card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="section-title">Trending Jobs</p>
            <h1 className="mt-2 text-3xl font-semibold">趋势任务与摘要</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
              这里不是简单的任务面板，而是趋势内容编辑工作台。抓取、摘要和人工修订应该在同一视角里完成。
            </p>
          </div>
          <form action={runTrendingNowAction}>
            <SubmitButton className="btn btn-primary">立即抓取一次</SubmitButton>
          </form>
        </div>
      </section>

      {archive.map((item) => (
        <section key={item.id} className="glass feature-card">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="section-title">Snapshot</p>
              <h2 className="mt-2 text-2xl font-semibold">{formatDate(item.sourceDate)}</h2>
            </div>
            <div className="text-sm text-[var(--muted)]">
              <p>{item.repos.length} repos</p>
              <p>{item.summary?.status || "NO_SUMMARY"}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-4">
              <div className="rounded-[28px] border border-[var(--line)] bg-white/76 p-6">
                <p className="section-title">AI 摘要</p>
                <p className="mt-4 whitespace-pre-line leading-8 text-[var(--muted)]">
                  {item.summary?.aiSummary || "本次未生成 AI 摘要。"}
                </p>
              </div>
              <div className="rounded-[28px] border border-[var(--line)] bg-[var(--paper-strong)] p-6">
                <p className="section-title">抓取速览</p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-4">
                    <p className="text-sm text-[var(--muted)]">仓库数</p>
                    <p className="mt-1 text-3xl font-semibold">{item.repos.length}</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--line)] bg-white/80 p-4">
                    <p className="text-sm text-[var(--muted)]">摘要状态</p>
                    <p className="mt-1 text-lg font-semibold">{item.summary?.status || "NO_SUMMARY"}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-[28px] border border-[var(--line)] bg-white/78 p-6">
              <form action={saveTrendSummaryAction} className="grid gap-3">
                <input type="hidden" name="summaryId" value={item.summary?.id} />
                <label className="font-medium">人工修订摘要</label>
                <textarea
                  className="field min-h-44"
                  name="editedSummary"
                  defaultValue={item.summary?.editedSummary || item.summary?.aiSummary || ""}
                />
                <SubmitButton className="btn btn-secondary">保存修订</SubmitButton>
              </form>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
