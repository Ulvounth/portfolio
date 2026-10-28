import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const redis = vi.hoisted(() => ({
  incr: vi.fn(),
  pexpire: vi.fn(),
  pttl: vi.fn(),
  exec: vi.fn(),
  constructed: vi.fn(),
}));
vi.mock("@upstash/redis", () => ({
  Redis: class {
    constructor(options: unknown) {
      redis.constructed(options);
    }
    multi() {
      const transaction = {
        incr: (...args: unknown[]) => {
          redis.incr(...args);
          return transaction;
        },
        pexpire: (...args: unknown[]) => {
          redis.pexpire(...args);
          return transaction;
        },
        pttl: (...args: unknown[]) => {
          redis.pttl(...args);
          return transaction;
        },
        exec: redis.exec,
      };
      return transaction;
    }
  },
}));
import { createRateLimiter } from "@/lib/server/rate-limit";

describe("shared rate limiter", () => {
  beforeEach(() => {
    for (const mock of Object.values(redis)) mock.mockReset();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("uses the in-memory limiter without Upstash configuration", async () => {
    vi.stubEnv("UPSTASH_REDIS_REST_URL", "");
    vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "");
    const limit = createRateLimiter(1, 60_000, "test");
    expect((await limit("a")).success).toBe(true);
    expect((await limit("a")).success).toBe(false);
    expect(redis.constructed).not.toHaveBeenCalled();
  });

  describe("with Upstash configured", () => {
    beforeEach(() => {
      vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://redis.example");
      vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "test-only-token");
    });

    it("counts and sets the window in one transaction, keyed by endpoint and hashed identifier", async () => {
      redis.exec.mockResolvedValue([1, 1, 60_000]);
      const result = await createRateLimiter(2, 60_000, "chat")("203.0.113.9");
      expect(result).toMatchObject({ success: true, remaining: 1 });
      // NX: only a key without an expiry gets a new window.
      expect(redis.pexpire).toHaveBeenCalledWith(
        expect.any(String),
        60_000,
        "NX",
      );
      const key = redis.incr.mock.calls[0][0];
      expect(key).toMatch(/^rl:chat:[0-9a-f]{32}$/);
      expect(key).not.toContain("203.0.113.9");
    });

    it("blocks once the count passes the limit and reports the remaining window", async () => {
      redis.exec.mockResolvedValue([3, 0, 12_000]);
      const before = Date.now();
      const result = await createRateLimiter(2, 60_000, "chat")("a");
      expect(result).toMatchObject({ success: false, remaining: 0 });
      expect(result.resetTime).toBeGreaterThanOrEqual(before + 12_000);
    });

    it("falls back to the local limiter when Redis fails", async () => {
      redis.exec.mockRejectedValue(new Error("connection lost"));
      const limit = createRateLimiter(1, 60_000, "chat");
      expect((await limit("a")).success).toBe(true);
      expect((await limit("a")).success).toBe(false);
    });
  });
});
