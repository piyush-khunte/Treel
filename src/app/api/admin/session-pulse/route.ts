import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/admin-auth";
import { recordHeartbeat } from "@/lib/admin/session-tracker";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Derive a stable per-login session ID from username + issue time
  const sessionId = `${session.username}_${session.iat}`;
  const stats = recordHeartbeat(sessionId, session.username);

  return NextResponse.json({
    sessionId,
    username: session.username,
    loginAt: new Date(session.iat * 1000).toISOString(),
    sessionExp: new Date(session.exp * 1000).toISOString(),
    ...stats,
  });
}
