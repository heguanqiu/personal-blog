import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { listAdminCases } from "@/server/content/cases";

export default async function AdminCasesPage() {
  const cases = await listAdminCases().catch(() => []);

  return (
    <section className="glass feature-card">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="section-title">Cases</p>
          <h1 className="mt-2 text-3xl font-semibold">案例管理</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
            这里更像作品集编辑台。重点是案例的可读性、可信度和精选标记，而不是简单地把项目堆成列表。
          </p>
        </div>
        <Link href="/admin/cases/new" className="btn btn-primary">
          新建案例
        </Link>
      </div>
      <div className="mt-6 grid gap-4">
        {cases.map((item) => (
          <Link
            key={item.id}
            href={`/admin/cases/${item.id}`}
            className="editorial-card"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Case Entry</p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight">{item.title}</h2>
              </div>
              <div className="flex gap-2">
                {item.featured ? <span className="tag">精选</span> : null}
                <span className="tag">{item.status}</span>
              </div>
            </div>
            <p className="mt-4 leading-8 text-[var(--muted)]">{item.summary}</p>
            <p className="mt-4 text-sm text-[var(--muted)]">更新时间：{formatDate(item.updatedAt)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
