import { listVisibleComments } from "@/server/comments/service";
import { listPublishedCases } from "@/server/content/cases";
import { listPublishedPosts } from "@/server/content/posts";
import { getSiteSettings } from "@/server/settings/site-settings";
import { getTrendingDashboard } from "@/server/trending/service";
import { HomeHero } from "@/components/site/HomeHero";
import { LatestPosts } from "@/components/site/LatestPosts";
import { FeaturedCases } from "@/components/site/FeaturedCases";
import { LatestTrends } from "@/components/site/LatestTrends";
import { HomeSidebar } from "@/components/site/HomeSidebar";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, posts, cases, dashboard, comments] = await Promise.all([
    getSiteSettings().catch(() => null),
    listPublishedPosts().catch(() => []),
    listPublishedCases().catch(() => []),
    getTrendingDashboard().catch(() => null),
    listVisibleComments().catch(() => []),
  ]);

  const topTags = [...new Set(posts.flatMap((post) => post.tags.map((tag) => tag.tag.name)))].slice(0, 6);
  const archives = [
    ...new Set(
      posts
        .map((post) =>
          post.publishedAt
            ? new Intl.DateTimeFormat("zh-CN", {
                year: "numeric",
                month: "2-digit",
              })
                .format(post.publishedAt)
                .replace("/", "年")
                .replace("/", "月")
            : null,
        )
        .filter(Boolean),
    ),
  ].slice(0, 4) as string[];

  const currentFocus = dashboard?.analytics.topLanguages[0]?.name || "趋势数据";
  const socials = settings?.socialLinks || [];

  return (
    <div className="grid gap-8">
      <HomeHero
        title={settings?.heroTitle || "趋势、文章、案例和留言聚在一起，才像一个完整的个人博客"}
        intro={settings?.heroIntro || "欢迎来到我的博客。"}
        noteTitle="编者便笺"
        noteItems={[
          `最近主要关注 ${currentFocus} 相关趋势。`,
          "把趋势观察、项目案例和个人写作收拢在一个长期更新的地方。",
          "这里更像个人编辑部，而不是一块纯功能化的技术看板。",
        ]}
        socials={socials}
      />

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.6fr)_340px] xl:items-start">
        <div className="grid gap-8">
          <LatestTrends dashboard={dashboard} />
          <LatestPosts
            posts={posts.slice(0, 4).map((post) => ({
              id: post.id,
              title: post.title,
              slug: post.slug,
              summary: post.summary,
              publishedAt: post.publishedAt,
              tags: post.tags.map((tag) => tag.tag.name),
            }))}
          />
          <FeaturedCases cases={cases.slice(0, 4)} />
        </div>

        <HomeSidebar
          profile={{
            title: "关于我",
            intro:
              settings?.heroIntro ||
              "长期关注技术趋势、工程实践和产品表达，喜欢把正在做的事公开整理成可读、可复用的内容。",
            socials,
          }}
          status={{
            label: "当前状态",
            items: [
              `最近一轮趋势抓取聚焦 ${currentFocus}。`,
              `站内目前有 ${posts.length} 篇文章、${cases.length} 个案例。`,
              `最新评论更新时间：${comments[0] ? formatDate(comments[0].createdAt) : "暂无留言"}`,
            ],
          }}
          comments={comments.slice(0, 3).map((comment) => ({
            id: comment.id,
            nickname: comment.nickname,
            content: comment.content,
            createdAtLabel: formatDate(comment.createdAt),
          }))}
          blogMeta={{
            tags: topTags,
            archives,
          }}
        />
      </div>
    </div>
  );
}
