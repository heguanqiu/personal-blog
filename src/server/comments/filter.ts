const defaultSensitiveWords = ["spam", "博彩", "色情", "赌博", "http://", "https://"];

export function hasHoneypot(value: string | null | undefined) {
  return Boolean(value?.trim());
}

export function hasSensitiveWords(content: string) {
  const extraWords = (process.env.COMMENT_SENSITIVE_WORDS ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const source = [...defaultSensitiveWords, ...extraWords];
  const normalized = content.toLowerCase();
  return source.some((word) => normalized.includes(word.toLowerCase()));
}
