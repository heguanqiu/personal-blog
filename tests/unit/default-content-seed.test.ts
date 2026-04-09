import { describe, expect, it } from "vitest";

import { buildDefaultContentSeed } from "@/server/seed/default-content";

describe("buildDefaultContentSeed", () => {
  it("returns default settings, one post, one case, and seeded comments", () => {
    const seed = buildDefaultContentSeed();

    expect(seed.settings.heroTitle.length).toBeGreaterThan(10);
    expect(seed.posts).toHaveLength(1);
    expect(seed.cases).toHaveLength(1);
    expect(seed.comments.length).toBeGreaterThanOrEqual(3);
    expect(seed.posts[0].contentHtml).toContain("<p>");
    expect(seed.cases[0].techStack.length).toBeGreaterThan(0);
  });
});
