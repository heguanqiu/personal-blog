import Redis from "ioredis";

declare global {
  var __redis__: Redis | undefined;
}

export function getRedisClient() {
  if (!process.env.REDIS_URL) {
    return null;
  }

  if (!global.__redis__) {
    global.__redis__ = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 1,
      enableReadyCheck: true,
    });
  }

  return global.__redis__;
}
