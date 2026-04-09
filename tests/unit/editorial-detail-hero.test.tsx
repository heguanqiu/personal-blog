import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EditorialDetailHero } from "@/components/site/EditorialDetailHero";

describe("EditorialDetailHero", () => {
  it("renders eyebrow, title, summary, badges, and meta items", () => {
    render(
      <EditorialDetailHero
        eyebrow="Article"
        title="把趋势整理成可读内容"
        summary="这是一段用于锁定详情页页眉层级的摘要文案。"
        badges={["Next.js", "趋势分析"]}
        metaItems={["2026/04/09", "8 分钟阅读", "长期写作"]}
      />,
    );

    expect(screen.getByText("Article")).toBeInTheDocument();
    expect(screen.getByText("把趋势整理成可读内容")).toBeInTheDocument();
    expect(screen.getByText("这是一段用于锁定详情页页眉层级的摘要文案。")).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("8 分钟阅读")).toBeInTheDocument();
  });
});
