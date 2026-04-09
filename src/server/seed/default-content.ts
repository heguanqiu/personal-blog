import { CommentTargetType, ContentStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { saveCase } from "@/server/content/cases";
import { savePost } from "@/server/content/posts";
import { hashIdentifier } from "@/server/comments/rate-limit";
import { upsertSiteSettings } from "@/server/settings/site-settings";

export type DefaultSeedPayload = {
  settings: {
    heroTitle: string;
    heroIntro: string;
    aboutHtml: string;
    commentsEnabled: boolean;
    socialLinks: Array<{ label: string; url: string }>;
    seoDefaults: { title: string; description: string };
  };
  post: {
    title: string;
    summary: string;
    category: string;
    tags: string;
    seoTitle: string;
    seoDescription: string;
    contentHtml: string;
  };
  caseStudy: {
    title: string;
    summary: string;
    techStack: string;
    projectUrl: string;
    repoUrl: string;
    seoTitle: string;
    seoDescription: string;
    contentHtml: string;
  };
  comments: Array<{
    target: "POST" | "CASE" | "GUESTBOOK";
    nickname: string;
    content: string;
  }>;
};

export function buildDefaultSeedPayload(): DefaultSeedPayload {
  return {
    settings: {
      heroTitle: "把趋势观察、项目复盘和长期写作放在同一个个人博客里",
      heroIntro:
        "这里不只记录链接和结论，也保留判断过程。GitHub 趋势、项目案例、公开写作和匿名留言会长期并存在这里，作为一个持续更新的个人编辑空间。",
      aboutHtml: [
        "<p>你好，这里是一个偏长期主义的个人博客。</p>",
        "<p>我会在这里公开整理三类内容：一是对 GitHub 趋势和技术方向的观察，二是做过项目后的案例复盘，三是一些值得保留下来的写作。</p>",
        "<p>如果你读到某篇文章或案例有想法，欢迎直接匿名留言。比起把内容发散在多个平台，我更希望把它们放进一个可回看、可沉淀、可持续更新的地方。</p>",
      ].join(""),
      commentsEnabled: true,
      socialLinks: [
        { label: "GitHub", url: "https://github.com/heguanqiu" },
        { label: "X", url: "https://x.com/" },
        { label: "Email", url: "mailto:hello@example.com" },
      ],
      seoDefaults: {
        title: "Personal Blog",
        description: "GitHub 趋势、项目案例、长期写作与匿名留言",
      },
    },
    post: {
      title: "为什么我把 GitHub 趋势做成了个人博客的一部分",
      summary:
        "纯粹的趋势榜单只能告诉你“今天什么热”，却很难帮助你建立稳定判断。我更想做的是把趋势、上下文和个人观点放在一起，让每次抓取都能沉淀成可回看的内容。",
      category: "趋势观察",
      tags: "GitHub 趋势, 写作系统, 内容产品, 个人博客",
      seoTitle: "为什么我把 GitHub 趋势做成了个人博客的一部分",
      seoDescription: "把 GitHub 趋势从“榜单”变成“可回看的判断记录”，是这个个人博客最核心的动机。",
      contentHtml: [
        "<p>一开始我也只是把 GitHub Trending 当作一个每天顺手看一眼的榜单工具：看看今天哪些仓库涨得快，哪些技术方向突然被更多人提到。</p>",
        "<p>但很快我发现，仅仅“看榜”并不能形成真正稳定的判断。榜单只会告诉你当下最热的表象，却不会自动提供上下文。它不告诉你这波热度是社区长期积累，还是短时间事件驱动；也不告诉你它对我正在做的事情有没有价值。</p>",
        "<p>所以我把趋势功能放进了个人博客，而不是单独做成一个工具页。这样做有两个好处。第一，榜单数据可以自然进入写作流程，我可以把“今天发生了什么”和“我怎么看这件事”放在一起。第二，趋势不再只是一次性消费的信息，而能被保存成长期可回看的记录。</p>",
        "<blockquote><p>我想要的不是“一个能抓榜单的页面”，而是“一个能持续积累判断的地方”。</p></blockquote>",
        "<p>博客恰好是适合这种工作的容器。文章、案例、趋势和留言会互相补充：趋势告诉我最近值得关注什么，案例证明我实际做过什么，文章负责把判断展开，留言则提醒我站点不是单向输出。</p>",
        "<p>这也是为什么这个站点没有做成 Markdown 驱动的静态博客。它更像一个轻量的个人编辑系统：可以写、可以改、可以抓数据、也可以和读者产生直接互动。</p>",
        "<p>如果这套结构最终有效，它带来的价值不会只是“看起来功能更多”，而是让我能更持续地输出，并且让每次输出之间产生联系。</p>",
      ].join(""),
    },
    caseStudy: {
      title: "Personal Blog：把趋势、内容与案例收拢到一个工作台",
      summary:
        "这是一个面向长期维护的个人数据博客项目。它把 GitHub 趋势抓取、富文本文章发布、案例管理和匿名留言放进同一个系统里，目标不是功能堆叠，而是形成稳定的公开输出工作流。",
      techStack: "Next.js 16, React 19, Prisma, PostgreSQL, Redis, Tiptap, Docker Compose",
      projectUrl: "http://localhost:3000",
      repoUrl: "https://github.com/heguanqiu/personal-blog",
      seoTitle: "Personal Blog 案例：把趋势、内容与案例收拢到一个工作台",
      seoDescription: "一个将 GitHub 趋势、富文本文章、案例展示与匿名留言整合到同一系统中的个人博客项目。",
      contentHtml: [
        "<p>这个项目的起点很简单：我不想再把趋势、文章、案例和留言分散在不同工具里维护。</p>",
        "<p>于是我把它做成了一个统一的个人博客平台。前台负责呈现趋势观察、文章和案例，后台则负责发布、维护和轻运营。它不追求 CMS 级别的复杂度，而是追求一个人也能长期维护的稳定节奏。</p>",
        "<h2>这个项目解决了什么问题</h2>",
        "<p>第一，它把 GitHub 趋势从“工具页”变成了“内容入口”。第二，它用富文本而不是 Markdown 驱动，避免内容发布流程割裂。第三，它允许匿名评论，保留博客作为公共交流空间的属性。</p>",
        "<h2>关键设计取舍</h2>",
        "<p>在技术上，我选择了 Next.js 单体全栈，而不是拆成多仓或重型 CMS 方案。原因很直接：对个人站来说，部署复杂度和维护成本比理论上的模块解耦更重要。</p>",
        "<p>在产品上，我把“编辑感”放在很靠前的位置。站点不是一个炫技的 dashboard，而更像一个个人编辑部：我可以写、可以观察、可以归档、也可以和人交流。</p>",
        "<h2>当前状态</h2>",
        "<p>目前已经完成首页、趋势页、文章、案例、留言、后台管理、Docker 部署和基础数据层。下一步会继续补示例内容、优化移动端体验，并逐步提升趋势解读的质量。</p>",
      ].join(""),
    },
    comments: [
      {
        target: "GUESTBOOK",
        nickname: "路过的读者",
        content: "把趋势页和博客放在一起这个思路挺好，读起来比单纯看榜单更有脉络。",
      },
      {
        target: "POST",
        nickname: "长期订阅者",
        content: "这篇文章把“为什么要做这个站”讲清楚了，希望后面能继续写一些趋势判断背后的方法。",
      },
      {
        target: "CASE",
        nickname: "同类项目关注者",
        content: "案例部分很有参考价值，尤其是把产品和工程取舍放在一起讲这一点。",
      },
    ],
  };
}

export function buildDefaultContentSeed() {
  const payload = buildDefaultSeedPayload();
  return {
    ...payload,
    posts: [
      {
        title: payload.post.title,
        summary: payload.post.summary,
        contentHtml: payload.post.contentHtml,
      },
    ],
    cases: [
      {
        title: payload.caseStudy.title,
        summary: payload.caseStudy.summary,
        techStack: payload.caseStudy.techStack.split(",").map((item) => item.trim()),
        contentHtml: payload.caseStudy.contentHtml,
      },
    ],
  };
}

async function upsertComment(input: {
  targetType: CommentTargetType;
  targetId: string;
  nickname: string;
  content: string;
}) {
  const existing = await prisma.comment.findFirst({
    where: {
      targetType: input.targetType,
      targetId: input.targetId,
      nickname: input.nickname,
      content: input.content,
    },
    select: { id: true },
  });

  if (existing) {
    return existing;
  }

  return prisma.comment.create({
    data: {
      targetType: input.targetType,
      targetId: input.targetId,
      nickname: input.nickname,
      content: input.content,
      status: "VISIBLE",
      ipHash: hashIdentifier(`seed:${input.nickname}:${input.targetType}`),
      uaHash: hashIdentifier("seed-script"),
      postId: input.targetType === CommentTargetType.POST ? input.targetId : null,
      caseStudyId: input.targetType === CommentTargetType.CASE ? input.targetId : null,
    },
  });
}

export async function seedDefaultContent() {
  const payload = buildDefaultSeedPayload();

  await upsertSiteSettings(payload.settings);

  const existingPost = await prisma.post.findFirst({
    where: { title: payload.post.title },
    select: { id: true },
  });

  const seededPost = await savePost({
    id: existingPost?.id,
    title: payload.post.title,
    summary: payload.post.summary,
    category: payload.post.category,
    tags: payload.post.tags,
    contentHtml: payload.post.contentHtml,
    seoTitle: payload.post.seoTitle,
    seoDescription: payload.post.seoDescription,
    status: ContentStatus.PUBLISHED,
  });

  const existingCase = await prisma.caseStudy.findFirst({
    where: { title: payload.caseStudy.title },
    select: { id: true },
  });

  const seededCase = await saveCase({
    id: existingCase?.id,
    title: payload.caseStudy.title,
    summary: payload.caseStudy.summary,
    techStack: payload.caseStudy.techStack,
    projectUrl: payload.caseStudy.projectUrl,
    repoUrl: payload.caseStudy.repoUrl,
    contentHtml: payload.caseStudy.contentHtml,
    seoTitle: payload.caseStudy.seoTitle,
    seoDescription: payload.caseStudy.seoDescription,
    featured: true,
    status: ContentStatus.PUBLISHED,
  });

  for (const comment of payload.comments) {
    if (comment.target === "GUESTBOOK") {
      await upsertComment({
        targetType: CommentTargetType.GUESTBOOK,
        targetId: "guestbook",
        nickname: comment.nickname,
        content: comment.content,
      });
      continue;
    }

    if (comment.target === "POST") {
      await upsertComment({
        targetType: CommentTargetType.POST,
        targetId: seededPost.id,
        nickname: comment.nickname,
        content: comment.content,
      });
      continue;
    }

    await upsertComment({
      targetType: CommentTargetType.CASE,
      targetId: seededCase.id,
      nickname: comment.nickname,
      content: comment.content,
    });
  }

  return {
    postId: seededPost.id,
    caseId: seededCase.id,
  };
}
