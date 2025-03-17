import { type NextRequest, NextResponse } from "next/server"
import { rateLimiter } from "./middleware/rateLimit"

export async function middleware(req: NextRequest) {
  // Apply stricter rate limiting to sensitive routes
  if (
    req.nextUrl.pathname.startsWith("/api/auth") ||
    req.nextUrl.pathname.includes("login") ||
    req.nextUrl.pathname.includes("signup")
  ) {
    // More strict rate limiting for auth endpoints
    const authRateLimit = await rateLimiter(req)
    if (authRateLimit) return authRateLimit
  }
  // Apply standard rate limiting to all API routes
  else if (req.nextUrl.pathname.startsWith("/api/")) {
    const apiRateLimit = await rateLimiter(req)
    if (apiRateLimit) return apiRateLimit
  }

  // Add security headers to all responses
  const response = NextResponse.next()

  // Security headers
  response.headers.set("X-DNS-Prefetch-Control", "on")
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("X-Frame-Options", "SAMEORIGIN")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "origin-when-cross-origin")

  // Add Content-Security-Policy in production
  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'",
    )
  }

  return response
}

// Configure which paths should be processed by this middleware
export const config = {
  matcher: [
    // Apply to all API routes
    "/api/:path*",
    // Apply to all routes except static files, images, etc.
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}

