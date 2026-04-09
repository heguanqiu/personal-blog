import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TrendSnapshotOverview } from "@/components/charts/TrendSnapshotOverview";

describe("TrendSnapshotOverview", () => {
  it("renders metric cards and language chips", () => {
    render(
      <TrendSnapshotOverview
        metrics={[
          { label: "仓库数", value: "24" },
          { label: "Star 增量", value: "9812" },
          { label: "平均热度", value: "408" },
          { label: "摘要状态", value: "GENERATED" },
        ]}
        languages={[
          { name: "TypeScript", count: 6 },
          { name: "Python", count: 5 },
        ]}
      />,
    );

    expect(screen.getByText("趋势速览")).toBeInTheDocument();
    expect(screen.getByText("仓库数")).toBeInTheDocument();
    expect(screen.getByText("9812")).toBeInTheDocument();
    expect(screen.getByText("TypeScript · 6")).toBeInTheDocument();
  });
});
