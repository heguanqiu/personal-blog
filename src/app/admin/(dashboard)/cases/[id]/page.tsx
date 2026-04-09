import { notFound } from "next/navigation";

import { saveCaseAction } from "@/app/admin/actions";
import { CaseEditorForm } from "@/components/admin/CaseEditorForm";
import { getCaseById } from "@/server/content/cases";

export default async function AdminEditCasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getCaseById(id).catch(() => null);

  if (!item) {
    notFound();
  }

  return (
    <section className="glass card">
      <p className="section-title">Edit Case</p>
      <h1 className="mt-2 text-3xl font-semibold">编辑案例</h1>
      <div className="mt-6">
        <CaseEditorForm
          action={saveCaseAction}
          initial={{
            id: item.id,
            title: item.title,
            summary: item.summary,
            coverImage: item.coverImage,
            contentHtml: item.contentHtml,
            seoTitle: item.seoTitle,
            seoDescription: item.seoDescription,
            gallery: item.gallery,
            techStack: item.techStack,
            projectUrl: item.projectUrl,
            repoUrl: item.repoUrl,
            featured: item.featured,
          }}
        />
      </div>
    </section>
  );
}
