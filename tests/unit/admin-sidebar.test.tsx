import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AdminSidebar } from "@/components/admin/AdminSidebar";

describe("AdminSidebar", () => {
  it("renders grouped navigation, operator status, and quick actions", () => {
    render(
      <AdminSidebar
        sessionName="admin"
        groups={[
          {
            title: "内容",
            links: [
              { href: "/admin/posts", label: "文章" },
              { href: "/admin/cases", label: "案例" },
            ],
          },
          {
            title: "运营",
            links: [
              { href: "/admin/trending", label: "趋势" },
              { href: "/admin/comments", label: "评论" },
            ],
          },
        ]}
        statusItems={["今日适合补内容", "趋势任务可手动重跑"]}
        quickActions={[
          { href: "/admin/posts/new", label: "写文章" },
          { href: "/admin/cases/new", label: "建案例" },
        ]}
      />,
    );

    expect(screen.getByText("内容")).toBeInTheDocument();
    expect(screen.getByText("运营")).toBeInTheDocument();
    expect(screen.getByText("当前状态")).toBeInTheDocument();
    expect(screen.getByText("快速入口")).toBeInTheDocument();
    expect(screen.getByText("写文章")).toBeInTheDocument();
  });
});
