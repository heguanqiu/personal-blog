import { describe, expect, it } from "vitest";

import { hasHoneypot, hasSensitiveWords } from "@/server/comments/filter";

describe("comment filter", () => {
  it("detects honeypot content", () => {
    expect(hasHoneypot("bot-value")).toBe(true);
    expect(hasHoneypot("")).toBe(false);
  });

  it("detects obvious spam words", () => {
    expect(hasSensitiveWords("visit https://spam.example")).toBe(true);
    expect(hasSensitiveWords("正常的中文评论")).toBe(false);
  });
});
