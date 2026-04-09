import { listVisibleComments } from "@/server/comments/service";
import { listPublishedCases } from "@/server/content/cases";
import { listPublishedPosts } from "@/server/content/posts";
import { getSiteSettings } from "@/server/settings/site-settings";
import { getTrendingDashboard } from "@/server/trending/service";
import { HomeHero } from "@/components/site/HomeHero";
import { LatestPosts } from "@/components/site/LatestPosts";
import { FeaturedCases } from "@/components/site/FeaturedCases";
import { LatestTrends } from "@/components/site/LatestTrends";
import { RecentComments } from "@/components/site/RecentComments";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, posts, cases, dashboard, comments] = await Promise.all([
    getSiteSettings().catch(() => null),
    listPublishedPosts().catch(() => []),
    listPublishedCases().catch(() => []),
    getTrendingDashboard().catch(() => null),
    listVisibleComments().catch(() => []),
  ]);

  return (
    <div className="grid gap-8">
      <HomeHero
        title={settings?.heroTitle || "趋势、文章、案例和留言聚在一起，才像一个完整的个人博客"}
        intro={settings?.heroIntro || "欢迎来到我的博客。"}
      />
      <div className="grid gap-8 xl:grid-cols-[1.35fr_0.9fr]">
        <LatestTrends dashboard={dashboard} />
        <RecentComments comments={comments} />
      </div>
      <div className="grid gap-8 xl:grid-cols-[1.1fr_1fr]">
        <LatestPosts posts={posts.slice(0, 4)} />
        <FeaturedCases cases={cases.slice(0, 4)} />
      </div>
    </div>
  );
}
