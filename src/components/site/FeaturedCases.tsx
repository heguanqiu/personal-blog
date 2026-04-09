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
    <section className="glass card">
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
          cases.map((item) => (
            <Link
              key={item.id}
              href={`/cases/${item.slug}`}
              className="rounded-3xl border border-[var(--line)] bg-white/75 p-5"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 line-clamp-3 text-[var(--muted)]">{item.summary}</p>
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
