import { ThrottlerStorage } from "@nestjs/throttler";
import Redis from "ioredis";

interface ThrottlerStorageRecord {
  totalHits: number; // number of requests
  blockedUntil?: number; // timestamp in ms
  timeToExpire: number; // ms until the TTL expires
  isBlocked: boolean; // whether currently blocked
  timeToBlockExpire: number; // ms until block ends (0 if not blocked)
}

export class CustomThrottlerRedisStorage implements ThrottlerStorage {
  constructor(private readonly redis: Redis) {}

  async increment(
    key: string,
    ttl: number,
    limit: number,
    blockDuration: number,
    throttlerName: string,
  ): Promise<any> {
    // no need to import ThrottlerStorageRecord
    const count = await this.redis.incr(key);

    if (count === 1) {
      await this.redis.pexpire(key, ttl);
    }

    const ttlRemaining = (await this.redis.pttl(key)) || 0;
    const isBlocked = count > limit;
    const blockedUntil = isBlocked ? Date.now() + blockDuration : undefined;
    const timeToBlockExpire = isBlocked ? blockDuration : 0;

    return {
      totalHits: count,
      blockedUntil,
      timeToExpire: ttlRemaining,
      isBlocked,
      timeToBlockExpire,
    };
  }

  async getRecord(key: string): Promise<number[]> {
    const count = await this.redis.get(key);
    return count ? [parseInt(count, 10)] : [];
  }
}
