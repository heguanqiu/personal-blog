"use client";

import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { SubmitButton } from "@/components/admin/SubmitButton";

type PostEditorFormProps = {
  action: (formData: FormData) => void;
  initial?: {
    id?: string;
    title?: string;
    summary?: string;
    coverImage?: string | null;
    contentHtml?: string;
    seoTitle?: string | null;
    seoDescription?: string | null;
    category?: string | null;
    tags?: string[];
  };
};

export function PostEditorForm({ action, initial }: PostEditorFormProps) {
  return (
    <form action={action} className="grid gap-6">
      <input type="hidden" name="id" defaultValue={initial?.id} />
      <div className="grid gap-2">
        <label className="font-medium">标题</label>
        <input className="field" name="title" defaultValue={initial?.title} required />
      </div>
      <div className="grid gap-2">
        <label className="font-medium">摘要</label>
        <textarea className="field min-h-28" name="summary" defaultValue={initial?.summary} required />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="font-medium">封面图 URL</label>
          <input className="field" name="coverImage" defaultValue={initial?.coverImage || ""} />
        </div>
        <div className="grid gap-2">
          <label className="font-medium">分类</label>
          <input className="field" name="category" defaultValue={initial?.category || ""} />
        </div>
      </div>
      <div className="grid gap-2">
        <label className="font-medium">标签（逗号分隔）</label>
        <input className="field" name="tags" defaultValue={initial?.tags?.join(", ") || ""} />
      </div>
      <div className="grid gap-2">
        <label className="font-medium">正文</label>
        <RichTextEditor name="contentHtml" initialValue={initial?.contentHtml} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="font-medium">SEO 标题</label>
          <input className="field" name="seoTitle" defaultValue={initial?.seoTitle || ""} />
        </div>
        <div className="grid gap-2">
          <label className="font-medium">SEO 描述</label>
          <input className="field" name="seoDescription" defaultValue={initial?.seoDescription || ""} />
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <SubmitButton className="btn btn-secondary" name="intent" value="draft">
          保存草稿
        </SubmitButton>
        <SubmitButton className="btn btn-primary" name="intent" value="publish">
          发布文章
        </SubmitButton>
      </div>
    </form>
  );
}
