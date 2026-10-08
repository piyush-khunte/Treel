import { NextRequest, NextResponse } from "next/server";
import { authenticateAdmin, signSessionToken, ADMIN_SESSION_COOKIE } from "@/lib/admin/admin-auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const result = await authenticateAdmin(username, password);

    if (!result.success || !result.session) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || "Authentication failed. Please verify your credentials.",
        },
        { status: 401 }
      );
    }

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
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected authentication error occurred.",
      },
      { status: 500 }
    );
  }
}
