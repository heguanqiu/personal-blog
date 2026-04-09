import { savePostAction } from "@/app/admin/actions";
import { PostEditorForm } from "@/components/admin/PostEditorForm";

export default function AdminNewPostPage() {
  return (
    <section className="glass card">
      <p className="section-title">New Post</p>
      <h1 className="mt-2 text-3xl font-semibold">创建文章</h1>
      <div className="mt-6">
        <PostEditorForm action={savePostAction} />
      </div>
    </section>
  );
}
