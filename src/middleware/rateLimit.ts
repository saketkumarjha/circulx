import { type NextRequest, NextResponse } from "next/server"

// Simple in-memory store for rate limiting
// Note: This won't work across multiple instances - use Redis in production
interface RateLimitStore {
  [ip: string]: {
    count: number
    resetTime: number
  }
}

const rateLimitStore: RateLimitStore = {}

// Configuration
const RATE_LIMIT_MAX = 100 // Maximum requests per window
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute in milliseconds

export async function rateLimiter(req: NextRequest) {
  // Get IP address
  const ip = req.ip || req.headers.get("x-forwarded-for") || "unknown"
  const now = Date.now()

  // Initialize or reset if window has passed
  if (!rateLimitStore[ip] || now > rateLimitStore[ip].resetTime) {
    rateLimitStore[ip] = {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    }
    return null
  }

  // Increment count
  rateLimitStore[ip].count++

  // Check if over limit
  if (rateLimitStore[ip].count > RATE_LIMIT_MAX) {
    // Clean up old entries every 100 requests to prevent memory leaks
    if (rateLimitStore[ip].count % 100 === 0) {
      cleanupRateLimitStore()
    }

    return new NextResponse(
      JSON.stringify({
        error: "Too many requests",
        message: "Please try again later",
      }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": `${Math.ceil((rateLimitStore[ip].resetTime - now) / 1000)}`,
        },
      },
    )
  }

  return null
}

// Clean up old entries to prevent memory leaks
function cleanupRateLimitStore() {
  const now = Date.now()
  Object.keys(rateLimitStore).forEach((ip) => {
    if (now > rateLimitStore[ip].resetTime) {
      delete rateLimitStore[ip]
    }
  })
}

