import { saveSettingsAction } from "@/app/admin/actions";
import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";
import { getSiteSettings } from "@/server/settings/site-settings";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <section className="glass feature-card">
      <p className="section-title">Site Settings</p>
      <h1 className="mt-2 text-3xl font-semibold">站点设置</h1>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
        这里管理的是博客气质本身：Hero 文案、关于页、自我介绍、社媒和评论开关。
      </p>
      <div className="mt-6">
        <SiteSettingsForm action={saveSettingsAction} initial={settings} />
      </div>
    </section>
  );
}
