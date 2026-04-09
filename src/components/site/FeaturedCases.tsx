import Link from "next/link";

type CaseItem = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  techStack: string[];
};

export function FeaturedCases({ cases }: { cases: CaseItem[] }) {
  return (
    <section className="glass feature-card">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="section-title">成果案例</p>
          <h2 className="mt-2 text-2xl font-semibold">做过什么，比写过什么更有说服力</h2>
        </div>
        <Link href="/cases" className="nav-link text-sm">
          查看全部
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {cases.length ? (
          cases.map((item, index) => (
            <Link
              key={item.id}
              href={`/cases/${item.slug}`}
              className="editorial-card min-h-64"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                Case {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-4 line-clamp-4 leading-8 text-[var(--muted)]">{item.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.techStack.slice(0, 4).map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))
        ) : (
          <p className="text-[var(--muted)]">还没有发布案例，可以先在后台创建精选项目。</p>
        )}
      </div>
    </section>
  );
}
