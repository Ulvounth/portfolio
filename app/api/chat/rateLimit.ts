// Simple in-memory rate limiter
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Cleanup old entries every 10 minutes
setInterval(
  () => {
    const now = Date.now();
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  },
  10 * 60 * 1000,
);

export function rateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60 * 1000, // 1 minutt
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  if (!entry || now > entry.resetTime) {
    // New window
    const resetTime = now + windowMs;
    rateLimitMap.set(identifier, { count: 1, resetTime });
    return { success: true, remaining: limit - 1, resetTime };
  }

  if (entry.count >= limit) {
    // Rate limit exceeded
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime,
    };
  }

  // Increment count
  entry.count++;
  rateLimitMap.set(identifier, entry);
  return {
    success: true,
    remaining: limit - entry.count,
    resetTime: entry.resetTime,
  };
}

export function getClientIdentifier(req: Request): string {
  // Try to get IP from headers (works on Vercel)
  const forwarded = req.headers.get("x-forwarded-for");
  const realIp = req.headers.get("x-real-ip");

  // For development, use a combination of user-agent and a session identifier
  // In production, this will use the actual IP
  const ip = forwarded ? forwarded.split(",")[0] : realIp || "unknown";

  // In localhost/dev, IP will be ::1 or 127.0.0.1, so we need something else
  if (ip === "unknown" || ip === "::1" || ip.startsWith("127.")) {
    // Use user-agent as fallback in dev (not perfect but better than nothing)
    const userAgent = req.headers.get("user-agent") || "default";
    return `dev-${userAgent.substring(0, 50)}`;
  }

  return ip;
}
