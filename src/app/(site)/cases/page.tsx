import Link from "next/link";

import { listPublishedCases } from "@/server/content/cases";

export const dynamic = "force-dynamic";

export default async function CasesPage() {
  const cases = await listPublishedCases().catch(() => []);

  return (
    <section className="glass card">
      <p className="section-title">Cases</p>
      <h1 className="mt-2 text-4xl font-semibold">成果案例</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {cases.length ? (
          cases.map((item) => (
            <Link
              key={item.id}
              href={`/cases/${item.slug}`}
              className="rounded-3xl border border-[var(--line)] bg-white/75 p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold">{item.title}</h2>
                {item.featured ? <span className="tag">精选</span> : null}
              </div>
              <p className="mt-3 text-[var(--muted)]">{item.summary}</p>
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
