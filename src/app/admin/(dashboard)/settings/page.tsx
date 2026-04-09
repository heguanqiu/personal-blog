import { saveSettingsAction } from "@/app/admin/actions";
import { SiteSettingsForm } from "@/components/admin/SiteSettingsForm";
import { getSiteSettings } from "@/server/settings/site-settings";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <section className="glass card">
      <p className="section-title">Site Settings</p>
      <h1 className="mt-2 text-3xl font-semibold">站点设置</h1>
      <div className="mt-6">
        <SiteSettingsForm action={saveSettingsAction} initial={settings} />
      </div>
    </section>
  );
}
