import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const rawEmail = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const unsubscribeAll = Boolean(body.unsubscribeAll);
    const preferences = body.preferences || {};

    if (!rawEmail) {
      return NextResponse.json(
        { success: false, error: "Email address is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(rawEmail)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Persist preference update to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        // Update any existing leads records for this email
        await supabase
          .from("leads")
          .update({
            marketing_consent: !unsubscribeAll,
            unsubscribed_at: unsubscribeAll ? new Date().toISOString() : null,
          })
          .eq("work_email", rawEmail);

        // Also record an explicit audit consent row in consents table if available
        try {
          await supabase.from("consents").insert({
            email: rawEmail,
            consent_type: "marketing_email",
            status: unsubscribeAll ? "opt_out" : "preferences_updated",
            preferences: preferences,
            updated_at: new Date().toISOString(),
          });
        } catch {
          // Non-critical if separate consents table isn't present
        }
      } catch (dbErr) {
        console.warn("[Unsubscribe API] Database update warning:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: unsubscribeAll
        ? "You have been successfully unsubscribed from all promotional communications."
        : "Your email communication preferences have been saved.",
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
