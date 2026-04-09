import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HomeSidebar } from "@/components/site/HomeSidebar";

describe("HomeSidebar", () => {
  it("renders persona, status, socials, comments, and blog meta sections", () => {
    render(
      <HomeSidebar
        profile={{
          title: "关于我",
          intro: "长期关注趋势、工程和产品表达。",
          socials: [
            { label: "GitHub", url: "https://github.com/example" },
            { label: "X", url: "https://x.com/example" },
          ],
        }}
        status={{
          label: "当前状态",
          items: ["在做个人博客", "观察 GitHub 趋势"],
        }}
        comments={[
          {
            id: "1",
            nickname: "访客A",
            content: "首页很有味道",
            createdAtLabel: "2026/04/09",
          },
        ]}
        blogMeta={{
          tags: ["Next.js", "Prisma", "趋势分析"],
          archives: ["2026年04月", "2026年03月"],
        }}
      />,
    );

    expect(screen.getByText("关于我")).toBeInTheDocument();
    expect(screen.getByText("当前状态")).toBeInTheDocument();
    expect(screen.getByText("GitHub")).toBeInTheDocument();
    expect(screen.getByText("最新评论")).toBeInTheDocument();
    expect(screen.getByText("标签 / 归档")).toBeInTheDocument();
  });
});
