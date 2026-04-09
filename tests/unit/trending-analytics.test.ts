import { describe, expect, it } from "vitest";

import { buildTrendAnalytics } from "@/server/trending/analytics";

describe("trend analytics", () => {
  it("builds language and star aggregates", () => {
    const analytics = buildTrendAnalytics([
      { repoFullName: "a/one", language: "TypeScript", starsGained: 100 },
      { repoFullName: "b/two", language: "TypeScript", starsGained: 20 },
      { repoFullName: "c/three", language: "Rust", starsGained: 50 },
    ]);

    expect(analytics.totalRepos).toBe(3);
    expect(analytics.totalStarsGained).toBe(170);
    expect(analytics.topLanguages[0]).toEqual({ name: "TypeScript", count: 2 });
  });
});
