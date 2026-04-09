import { saveCaseAction } from "@/app/admin/actions";
import { CaseEditorForm } from "@/components/admin/CaseEditorForm";

export default function AdminNewCasePage() {
  return (
    <section className="glass card">
      <p className="section-title">New Case</p>
      <h1 className="mt-2 text-3xl font-semibold">创建案例</h1>
      <div className="mt-6">
        <CaseEditorForm action={saveCaseAction} />
      </div>
    </section>
  );
}
