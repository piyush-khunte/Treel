import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { unsubscribeByTokenOrEmail, getSubscriberByToken } from "@/lib/content/subscriber-storage";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get("token") || "";
    const email = searchParams.get("email") || "";

    if (!token && !email) {
      return NextResponse.json(
        { success: false, error: "Token or email query parameter is required." },
        { status: 400 }
      );
    }

    const result = await unsubscribeByTokenOrEmail({ token, email });
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error processing unsubscribe request";
    console.error("[Unsubscribe GET API Exception]", message);
    return NextResponse.json(
      { success: false, error: "Failed to process request." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const token = typeof body.token === "string" ? body.token.trim() : "";
    let rawEmail = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const unsubscribeAll = body.unsubscribeAll !== undefined ? Boolean(body.unsubscribeAll) : true;
    const preferences = body.preferences || {};

    // If token provided without email, resolve email from subscriber store
    if (token && !rawEmail) {
      const existingSub = await getSubscriberByToken(token);
      if (existingSub) {
        rawEmail = existingSub.email;
      }
    }

    if (!rawEmail && !token) {
      return NextResponse.json(
        { success: false, error: "Email address or unsubscribe token is required." },
        { status: 400 }
      );
    }

    if (rawEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(rawEmail)) {
        return NextResponse.json(
          { success: false, error: "Please enter a valid email address." },
          { status: 400 }
        );
      }
    }

    // 1. Unsubscribe from global Unified Subscriber Storage
    const subResult = await unsubscribeByTokenOrEmail({ token, email: rawEmail });

    // 2. Persist preference update to Supabase leads & consents if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (rawEmail && supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Update existing leads records for this email
        await supabase
          .from("leads")
          .update({
            marketing_consent: !unsubscribeAll,
            unsubscribed_at: unsubscribeAll ? new Date().toISOString() : null,
          })
          .eq("work_email", rawEmail);

        // Audit consent row in consents table if available
        try {
          await supabase.from("consents").insert({
            email: rawEmail,
            consent_type: "marketing_email",
            status: unsubscribeAll ? "opt_out" : "preferences_updated",
            preferences: preferences,
            updated_at: new Date().toISOString(),
          });
        } catch {
          // Non-critical if consents table is not present
        }
      } catch (dbErr) {
        console.warn("[Unsubscribe API] Database update warning:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: subResult.message || (unsubscribeAll
        ? "You have been successfully unsubscribed from all Treel Insights communications."
        : "Your email communication preferences have been saved."),
      subscriber: subResult.subscriber,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error processing unsubscribe request";
    console.error("[Unsubscribe API Exception]", message);
    return NextResponse.json(
      { success: false, error: "Failed to update preferences. Please try again." },
      { status: 500 }
    );
  }
}
