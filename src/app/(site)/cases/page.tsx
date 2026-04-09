import Link from "next/link";

import { listPublishedCases } from "@/server/content/cases";

export const dynamic = "force-dynamic";

export default async function CasesPage() {
  const cases = await listPublishedCases().catch(() => []);

  return (
    <section className="glass feature-card">
      <p className="section-title">Cases</p>
      <h1 className="mt-2 text-4xl font-semibold">成果案例</h1>
      <p className="mt-4 max-w-2xl leading-8 text-[var(--muted)]">
        这里放的是做过、交付过、愿意公开复盘的项目。希望它们比一串技能名更有说服力。
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {cases.length ? (
          cases.map((item, index) => (
            <Link
              key={item.id}
              href={`/cases/${item.slug}`}
              className="editorial-card"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                Case {String(index + 1).padStart(2, "0")}
              </p>
              <div className="flex items-center justify-between gap-3">
                <h2 className="mt-2 text-2xl font-semibold tracking-tight">{item.title}</h2>
                {item.featured ? <span className="tag">精选</span> : null}
              </div>
              <p className="mt-4 leading-8 text-[var(--muted)]">{item.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.techStack.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))
        ) : (
          <p className="text-[var(--muted)]">还没有已发布案例。</p>
        )}
      </div>
    </section>
  );
}
