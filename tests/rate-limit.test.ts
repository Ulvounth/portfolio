import { describe, expect, it } from "vitest";
import {
  createRateLimiter,
  getClientIdentifier,
} from "@/lib/server/rate-limit";

describe("rate limiter", () => {
  it("limits each client independently and resets at the exact expiry", () => {
    const limit = createRateLimiter(2, 100);
    expect(limit("a", 0)).toEqual({
      success: true,
      remaining: 1,
      resetTime: 100,
    });
    expect(limit("a", 1).success).toBe(true);
    expect(limit("a", 2).success).toBe(false);
    expect(limit("b", 2).success).toBe(true);
    expect(limit("a", 100)).toEqual({
      success: true,
      remaining: 1,
      resetTime: 200,
    });
  });
  it("keeps endpoint budgets separate", () => {
    const chat = createRateLimiter(1, 100);
    const contact = createRateLimiter(1, 100);
    chat("visitor", 0);
    expect(chat("visitor", 1).success).toBe(false);
    expect(contact("visitor", 1).success).toBe(true);
  });
  it("bounds memory by evicting the oldest bucket instead of locking out new clients", () => {
    const limit = createRateLimiter(1, 100);
    for (let i = 0; i < 10000; i++)
      expect(limit(String(i), 0).success).toBe(true);
    expect(limit("new", 1).success).toBe(true);
    expect(limit("new", 2).success).toBe(false);
    expect(limit("9999", 2).success).toBe(false);
    expect(limit("0", 2).success).toBe(true);
  });
  it("sweeps expired buckets before evicting active ones", () => {
    const limit = createRateLimiter(1, 100);
    for (let i = 0; i < 10000; i++) limit(String(i), 0);
    expect(limit("new", 100).success).toBe(true);
    expect(limit("5000", 101).success).toBe(true);
    expect(limit("new", 101).success).toBe(false);
  });
  it("normalizes proxy IPs and does not let user-agent changes bypass local limits", () => {
    expect(
      getClientIdentifier(
        new Request("https://example.com", {
          headers: { "x-forwarded-for": " 203.0.113.1, 10.0.0.1" },
        }),
      ),
    ).toBe("203.0.113.1");
    expect(
      getClientIdentifier(
        new Request("https://example.com", {
          headers: { "user-agent": "changed" },
        }),
      ),
    ).toBe("unknown");
  });
});
