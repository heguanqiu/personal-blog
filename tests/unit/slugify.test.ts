import { describe, expect, it } from "vitest";

import { slugify } from "@/lib/utils";

describe("slugify", () => {
  it("creates clean slugs", () => {
    expect(slugify("Hello World 2026")).toBe("hello-world-2026");
  });
});
