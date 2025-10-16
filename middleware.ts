import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rate limiting map
const rateLimit = new Map();

export function middleware(request: NextRequest) {
  // Only apply rate limiting to contact API
  if (request.nextUrl.pathname === "/api/contact") {
    // Get IP from headers (Next.js 15 removed request.ip)
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded
      ? forwarded.split(",")[0]
      : request.headers.get("x-real-ip") || "127.0.0.1";

    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const max = 5; // 5 requests per minute

    if (!rateLimit.has(ip)) {
      rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
    } else {
      const data = rateLimit.get(ip);
      if (now > data.resetTime) {
        rateLimit.set(ip, { count: 1, resetTime: now + windowMs });
      } else {
        data.count++;
        if (data.count > max) {
          return NextResponse.json(
            {
              success: false,
              message: "Too many requests. Please try again later.",
            },
            { status: 429 }
          );
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/contact",
};
