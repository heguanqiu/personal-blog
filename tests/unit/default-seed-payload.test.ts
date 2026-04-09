import { describe, expect, it } from "vitest";

import { buildDefaultSeedPayload } from "@/server/seed/default-content";

describe("buildDefaultSeedPayload", () => {
  it("returns a complete payload for site settings, article, case, and comments", () => {
    const payload = buildDefaultSeedPayload();

    expect(payload.settings.heroTitle.length).toBeGreaterThan(10);
    expect(payload.post.title.length).toBeGreaterThan(5);
    expect(payload.post.contentHtml).toContain("<p>");
    expect(payload.caseStudy.techStack).toContain("Next.js");
    expect(payload.comments.length).toBeGreaterThanOrEqual(3);
  });
});
