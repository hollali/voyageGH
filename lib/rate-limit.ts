const rateLimits = new Map<string, { count: number; resetTime: number }>();

// Clean up expired entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimits.entries()) {
      if (now > record.resetTime) {
        rateLimits.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export function checkRateLimit(
  key: string,
  maxRequests = 30,
  windowMs = 60000
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimits.get(key);

  if (!record || now > record.resetTime) {
    rateLimits.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true };
  }

  if (record.count >= maxRequests) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

export function getRateLimitHeaders(
  key: string,
  maxRequests = 30
): Record<string, string> {
  const record = rateLimits.get(key);
  if (!record) return {};

  return {
    "X-RateLimit-Limit": String(maxRequests),
    "X-RateLimit-Remaining": String(Math.max(0, maxRequests - record.count)),
    "X-RateLimit-Reset": String(Math.ceil(record.resetTime / 1000)),
  };
}
