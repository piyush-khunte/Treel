import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/admin-constants";
import { verifySessionToken } from "@/lib/admin/admin-token";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login";
    const sessionCookie = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    const session = sessionCookie ? await verifySessionToken(sessionCookie) : null;
    const isAuthenticated = !!session && session.role === "admin";

    // If authenticated user visits /admin/login, redirect them into the admin dashboard
    if (isLoginPage && isAuthenticated) {
      const nextUrl = req.nextUrl.searchParams.get("next") || "/admin";
      return NextResponse.redirect(new URL(nextUrl, req.url));
    }

    // If unauthenticated user tries to access protected admin routes, redirect to login
    if (!isLoginPage && !isAuthenticated) {
      const loginUrl = new URL("/admin/login", req.url);
      if (pathname !== "/admin") {
        loginUrl.searchParams.set("next", pathname);
      }
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
