import { prisma } from "@/lib/prisma";

export const defaultSiteSettings = {
  heroTitle: "把 GitHub 趋势、文章和案例放进同一个个人博客",
  heroIntro:
    "这里记录我对技术趋势的观察、项目沉淀和一些值得公开的经验。它不是单纯文章列表，而是一个带持续更新能力的个人数据博客。",
  aboutHtml:
    "<p>你好，我会在这里发布趋势观察、项目案例和个人写作。欢迎匿名留言交流。</p>",
  socialLinks: [
    { label: "GitHub", url: "https://github.com/" },
    { label: "X", url: "https://x.com/" },
  ],
  seoDefaults: {
    title: "Personal Blog",
    description: "GitHub 趋势、文章、案例与留言",
  },
  commentsEnabled: true,
};

export async function getSiteSettings() {
  const settings = await prisma.siteSetting.findFirst({
    orderBy: { createdAt: "asc" },
  });

  if (!settings) {
    return defaultSiteSettings;
  }

  return {
    heroTitle: settings.heroTitle,
    heroIntro: settings.heroIntro,
    aboutHtml: settings.aboutHtml,
    socialLinks: settings.socialLinks as Array<{ label: string; url: string }>,
    seoDefaults: settings.seoDefaults as { title: string; description: string },
    commentsEnabled: settings.commentsEnabled,
  };
}

export async function upsertSiteSettings(input: typeof defaultSiteSettings) {
  const existing = await prisma.siteSetting.findFirst({
    select: { id: true },
    orderBy: { createdAt: "asc" },
  });

  if (!existing) {
    return prisma.siteSetting.create({ data: input });
  }

  return prisma.siteSetting.update({
    where: { id: existing.id },
    data: input,
  });
}
