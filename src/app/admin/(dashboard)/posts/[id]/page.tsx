import { notFound } from "next/navigation";

import { savePostAction } from "@/app/admin/actions";
import { PostEditorForm } from "@/components/admin/PostEditorForm";
import { getPostById } from "@/server/content/posts";

export default async function AdminEditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id).catch(() => null);

  if (!post) {
    notFound();
  }

  return (
    <section className="glass card">
      <p className="section-title">Edit Post</p>
      <h1 className="mt-2 text-3xl font-semibold">编辑文章</h1>
      <div className="mt-6">
        <PostEditorForm
          action={savePostAction}
          initial={{
            id: post.id,
            title: post.title,
            summary: post.summary,
            coverImage: post.coverImage,
            contentHtml: post.contentHtml,
            seoTitle: post.seoTitle,
            seoDescription: post.seoDescription,
            category: post.category?.name,
            tags: post.tags.map((tag) => tag.tag.name),
          }}
        />
      </div>
    </section>
  );
}
