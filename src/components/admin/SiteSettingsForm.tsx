"use client";

import { SubmitButton } from "@/components/admin/SubmitButton";

export function SiteSettingsForm({
  action,
  initial,
}: {
  action: (formData: FormData) => void;
  initial: {
    heroTitle: string;
    heroIntro: string;
    aboutHtml: string;
    commentsEnabled: boolean;
    socialLinks: Array<{ label: string; url: string }>;
    seoDefaults: { title: string; description: string };
  };
}) {
  return (
    <form action={action} className="grid gap-6">
      <div className="grid gap-2">
        <label className="font-medium">首页标题</label>
        <input className="field" name="heroTitle" defaultValue={initial.heroTitle} />
      </div>
      <div className="grid gap-2">
        <label className="font-medium">首页简介</label>
        <textarea className="field min-h-28" name="heroIntro" defaultValue={initial.heroIntro} />
      </div>
      <div className="grid gap-2">
        <label className="font-medium">关于页 HTML</label>
        <textarea className="field min-h-40 font-mono text-sm" name="aboutHtml" defaultValue={initial.aboutHtml} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="font-medium">默认 SEO 标题</label>
          <input className="field" name="seoTitle" defaultValue={initial.seoDefaults.title} />
        </div>
        <div className="grid gap-2">
          <label className="font-medium">默认 SEO 描述</label>
          <input className="field" name="seoDescription" defaultValue={initial.seoDefaults.description} />
        </div>
      </div>
      <div className="grid gap-2">
        <label className="font-medium">社媒链接（每行 `名称|URL`）</label>
        <textarea
          className="field min-h-28"
          name="socialLinks"
          defaultValue={initial.socialLinks.map((item) => `${item.label}|${item.url}`).join("\n")}
        />
      </div>
      <label className="flex items-center gap-3 text-sm">
        <input type="checkbox" name="commentsEnabled" defaultChecked={initial.commentsEnabled} />
        启用全站匿名评论
      </label>
      <SubmitButton className="btn btn-primary">保存站点设置</SubmitButton>
    </form>
  );
}
