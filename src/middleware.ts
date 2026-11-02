import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/admin-constants";
import { verifySessionToken } from "@/lib/admin/admin-token";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Identify host and determine whether to block search engine indexing.
  // Only the canonical production hosts (treel.in, www.treel.in) should be indexed.
  // All other hosts (staging, Vercel previews, dev/local), admin paths, and transactional cart flows get noindex, nofollow.
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || "";
  const hostname = host.split(":")[0].toLowerCase();
  const isProductionDomain = hostname === "treel.in" || hostname === "www.treel.in";
  const isCartPath =
    pathname.startsWith("/personal/buy/cart") ||
    pathname.startsWith("/suraksha/cart") ||
    pathname.startsWith("/suraksha/buy/cart");
  const shouldNoIndex = !isProductionDomain || pathname.startsWith("/admin") || isCartPath;

  // Enforce trailing-slash removal: 308 permanent redirect (e.g. /tmip/ -> /tmip)
  if (pathname !== "/" && pathname.endsWith("/")) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.replace(/\/+$/, "");
    const redirectRes = NextResponse.redirect(url, 308);
    if (shouldNoIndex) {
      redirectRes.headers.set("X-Robots-Tag", "noindex, nofollow");
    }
    return redirectRes;
  }

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login";
    const sessionCookie = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const session = sessionCookie ? await verifySessionToken(sessionCookie) : null;
    const isAuthenticated = !!session && session.role === "admin";

    // If authenticated user visits /admin/login, redirect them into the admin dashboard
    if (isLoginPage && isAuthenticated) {
      const nextUrl = req.nextUrl.searchParams.get("next") || "/admin";
      const redirectRes = NextResponse.redirect(new URL(nextUrl, req.url));
      if (shouldNoIndex) {
        redirectRes.headers.set("X-Robots-Tag", "noindex, nofollow");
      }
      return redirectRes;
    }

    // If unauthenticated user tries to access protected admin routes, redirect to login
    if (!isLoginPage && !isAuthenticated) {
      const loginUrl = new URL("/admin/login", req.url);
      if (pathname !== "/admin") {
        loginUrl.searchParams.set("next", pathname);
      }
      const redirectRes = NextResponse.redirect(loginUrl);
      if (shouldNoIndex) {
        redirectRes.headers.set("X-Robots-Tag", "noindex, nofollow");
      }
      return redirectRes;
    }
  }

  const response = NextResponse.next();
  if (shouldNoIndex) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico and static media assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|bmp|tiff|woff|woff2)$).*)",
  ],
};
