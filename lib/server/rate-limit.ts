import { createHash } from "node:crypto";
import { Redis } from "@upstash/redis";

interface Entry {
  count: number;
  resetTime: number;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
}

// Per-process protection. It is the fallback when no shared store is configured.
export function createMemoryRateLimiter(limit: number, windowMs: number) {
  const entries = new Map<string, Entry>();
  const maxEntries = 10000;
  return (identifier: string, now = Date.now()): RateLimitResult => {
    let entry = entries.get(identifier);
    if (!entry || now >= entry.resetTime) {
      // Re-insert so the map stays ordered by reset time: expired entries come first.
      entries.delete(identifier);
      if (entries.size >= maxEntries) {
        for (const [key, value] of entries) {
          if (value.resetTime > now) break;
          entries.delete(key);
        }
        // Bound memory by dropping the oldest bucket. Refusing new identifiers
        // instead would let a flood of distinct clients lock out every real visitor.
        const oldest = entries.keys().next();
        if (entries.size >= maxEntries && !oldest.done)
          entries.delete(oldest.value);
      }
      entry = { count: 0, resetTime: now + windowMs };
      entries.set(identifier, entry);
    }
    const success = entry.count < limit;
    if (success) entry.count++;
    return {
      success,
      remaining: Math.max(0, limit - entry.count),
      resetTime: entry.resetTime,
    };
  };
}

async function redisHit(
  redis: Redis,
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  // One transaction: NX only sets an expiry when the key has none, so a window
  // is started exactly once and a key can never be left without a TTL.
  const [count, , ttl] = await redis
    .multi()
    .incr(key)
    .pexpire(key, windowMs, "NX")
    .pttl(key)
    .exec<[number, number, number]>();
  return {
    success: count <= limit,
    remaining: Math.max(0, limit - count),
    resetTime: Date.now() + Math.max(0, ttl),
  };
}

/**
 * Fixed-window limiter shared between serverless instances through Upstash
 * Redis when UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set.
 * Without them, or if Redis fails, it falls back to a per-process limiter.
 * `name` keeps the budgets of different endpoints apart.
 */
export function createRateLimiter(
  limit: number,
  windowMs: number,
  name: string,
) {
  const memory = createMemoryRateLimiter(limit, windowMs);
  return async (identifier: string): Promise<RateLimitResult> => {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    if (url && token) {
      try {
        // Hash the identifier so the store never holds raw IP addresses.
        const hashed = createHash("sha256")
          .update(identifier)
          .digest("hex")
          .slice(0, 32);
        return await redisHit(
          new Redis({ url, token }),
          `rl:${name}:${hashed}`,
          limit,
          windowMs,
        );
      } catch {
        console.error("Rate limit store unavailable, using local limiter");
      }
    }
    return memory(identifier);
  };
}

export function getClientIdentifier(request: Request) {
  // Netlify sets x-nf-client-connection-ip itself. The first x-forwarded-for
  // value can be supplied by the client, so it is only a fallback for local runs.
  return (
    request.headers.get("x-nf-client-connection-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

export function rateLimitHeaders(result: RateLimitResult) {
  return {
    "Retry-After": Math.max(
      1,
      Math.ceil((result.resetTime - Date.now()) / 1000),
    ).toString(),
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": result.resetTime.toString(),
  };
}
