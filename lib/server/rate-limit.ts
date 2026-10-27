interface Entry {
  count: number;
  resetTime: number;
}

// Per-process protection. A shared store is needed for limits across serverless instances.
export function createRateLimiter(limit: number, windowMs: number) {
  const entries = new Map<string, Entry>();
  const maxEntries = 10000;
  return (identifier: string, now = Date.now()) => {
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

export function getClientIdentifier(request: Request) {
  // Only use forwarded headers supplied by the trusted deployment proxy.
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    "unknown"
  );
}

export function rateLimitHeaders(result: {
  remaining: number;
  resetTime: number;
}) {
  return {
    "Retry-After": Math.max(
      1,
      Math.ceil((result.resetTime - Date.now()) / 1000),
    ).toString(),
    "X-RateLimit-Remaining": result.remaining.toString(),
    "X-RateLimit-Reset": result.resetTime.toString(),
  };
}
