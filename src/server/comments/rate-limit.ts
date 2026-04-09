import { createHash } from "node:crypto";

import { getRedisClient } from "@/lib/redis";

const memoryStore = new Map<string, { count: number; expiresAt: number }>();

const WINDOW_SECONDS = 60;
const LIMIT = 5;

export function hashIdentifier(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export async function assertWithinRateLimit(key: string) {
  const redis = getRedisClient();
  if (redis) {
    const bucket = `comment-rate:${key}`;
    const count = await redis.incr(bucket);
    if (count === 1) {
      await redis.expire(bucket, WINDOW_SECONDS);
    }
    if (count > LIMIT) {
      throw new Error("评论过于频繁，请稍后再试。");
    }
    return;
  }

  const current = memoryStore.get(key);
  const now = Date.now();

  if (!current || current.expiresAt < now) {
    memoryStore.set(key, {
      count: 1,
      expiresAt: now + WINDOW_SECONDS * 1000,
    });
    return;
  }

  if (current.count >= LIMIT) {
    throw new Error("评论过于频繁，请稍后再试。");
  }

  current.count += 1;
  memoryStore.set(key, current);
}
