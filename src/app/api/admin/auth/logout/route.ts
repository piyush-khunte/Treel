import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin/admin-auth";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully.",
  });

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}

export async function GET(req: NextRequest) {
  const url = new URL("/admin/login", req.url);
  const response = NextResponse.redirect(url);

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}
