import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/admin-auth";

export async function GET(req: NextRequest) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json(
      {
        authenticated: false,
      },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      username: session.username,
      role: session.role,
    },
  });
}
