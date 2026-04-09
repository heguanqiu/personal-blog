import { runTrendingNowAction, saveTrendSummaryAction } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { formatDate } from "@/lib/utils";
import { getTrendingArchive } from "@/server/trending/service";

export default async function AdminTrendingPage() {
  const archive = await getTrendingArchive().catch(() => []);

  return (
    <div className="grid gap-6">
      <section className="glass card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="section-title">Trending Jobs</p>
            <h1 className="mt-2 text-3xl font-semibold">趋势任务与摘要</h1>
          </div>
          <form action={runTrendingNowAction}>
            <SubmitButton className="btn btn-primary">立即抓取一次</SubmitButton>
          </form>
        </div>
      </section>

      {archive.map((item) => (
        <section key={item.id} className="glass card">
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
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="rounded-3xl border border-[var(--line)] bg-white/75 p-5">
              <p className="font-semibold">AI 摘要</p>
              <p className="mt-3 whitespace-pre-line text-[var(--muted)]">
                {item.summary?.aiSummary || "本次未生成 AI 摘要。"}
              </p>
            </div>
            <div className="rounded-3xl border border-[var(--line)] bg-white/75 p-5">
              <form action={saveTrendSummaryAction} className="grid gap-3">
                <input type="hidden" name="summaryId" value={item.summary?.id} />
                <label className="font-medium">人工修订摘要</label>
                <textarea
                  className="field min-h-36"
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
