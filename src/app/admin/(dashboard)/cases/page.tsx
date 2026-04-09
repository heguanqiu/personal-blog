import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { listAdminCases } from "@/server/content/cases";

export default async function AdminCasesPage() {
  const cases = await listAdminCases().catch(() => []);

  return (
    <section className="glass card">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="section-title">Cases</p>
          <h1 className="mt-2 text-3xl font-semibold">案例管理</h1>
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
            className="rounded-3xl border border-[var(--line)] bg-white/75 p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <div className="flex gap-2">
                {item.featured ? <span className="tag">精选</span> : null}
                <span className="tag">{item.status}</span>
              </div>
            </div>
            <p className="mt-3 text-[var(--muted)]">{item.summary}</p>
            <p className="mt-3 text-sm text-[var(--muted)]">更新时间：{formatDate(item.updatedAt)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
