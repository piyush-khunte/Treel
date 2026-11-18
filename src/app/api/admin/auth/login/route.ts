import { ADMIN_SESSION_COOKIE,authenticateAdmin,signSessionToken } from "@/lib/admin/admin-auth";
import {
  clearLoginFailures,
  getClientIp,
  getLoginLockSeconds,
  recordLoginFailure,
} from "@/lib/admin/login-rate-limit";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;
    const ip = getClientIp(req.headers);
    const userKey = typeof username === "string" ? username : "";

    const lockSeconds = getLoginLockSeconds(ip, userKey);
    if (lockSeconds > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many failed attempts. Try again in ${Math.ceil(lockSeconds / 60)} minute(s).`,
        },
        { status: 429, headers: { "Retry-After": String(lockSeconds) } }
      );
    }

    const result = await authenticateAdmin(username, password);

    if (!result.success || !result.session) {
      recordLoginFailure(ip, userKey);
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Authentication failed. Please verify your credentials.",
        },
        { status: 401 }
      );
    }

    clearLoginFailures(ip, userKey);
    const token = await signSessionToken(result.session);

    const response = NextResponse.json({
      success: true,
      data: {
        username: result.session.username,
        role: result.session.role,
      },
    });

    response.cookies.set({
      name: ADMIN_SESSION_COOKIE,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected authentication error occurred.",
      },
      { status: 500 }
    );
  }
}
