import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isSesConfigured, sendNewsletterWelcomeEmail } from "@/lib/integrations";

// Rate limiting & idempotency cache (prevents duplicate clicks within 15 seconds)
const recentSubscriptions = new Map<string, number>();

function isRateLimited(email: string, windowMs = 15000): boolean {
  const now = Date.now();
  for (const [key, timestamp] of recentSubscriptions.entries()) {
    if (now - timestamp > 60000) {
      recentSubscriptions.delete(key);
    }
  }
  const last = recentSubscriptions.get(email);
  if (last && now - last < windowMs) {
    return true;
  }
  recentSubscriptions.set(email, now);
  return false;
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

    const rawEmail = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const source = typeof body.source === "string" ? body.source.trim() : "website_newsletter";
    const interest = typeof body.interest === "string" ? body.interest.trim() : "Mobility Intelligence & Updates";

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

    if (isRateLimited(rawEmail)) {
      return NextResponse.json(
        { success: true, message: "You are already subscribed." },
        { status: 200 }
      );
    }

    // Persist to Supabase leads / subscriber list
    let persistedLeadId: string | null = null;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data, error } = await supabase
          .from("leads")
          .insert({
            full_name: "Newsletter Subscriber",
            work_email: rawEmail,
            company_name: "Subscriber",
            source: source,
            interest_area: interest,
            message: `Newsletter subscription from ${source}: ${rawEmail}`,
            marketing_consent: true,
            status: "new",
            created_at: new Date().toISOString(),
          })
          .select("id")
          .single();

        if (data && !error) {
          persistedLeadId = String(data.id);
        }
      } catch (dbErr) {
        console.warn("[Newsletter Subscription] Database persistence warning:", dbErr);
      }
    }

    // Trigger Amazon SES welcome confirmation email if configured
    if (isSesConfigured()) {
      try {
        await sendNewsletterWelcomeEmail({
          email: rawEmail,
          source,
          interest,
        });

        if (persistedLeadId && supabaseUrl && supabaseKey) {
          const supabase = createClient(supabaseUrl, supabaseKey);
          await supabase
            .from("leads")
            .update({ email_notification_status: "sent" })
            .eq("id", persistedLeadId);
        }
      } catch (emailErr) {
        console.warn("[Newsletter Subscription] SES welcome email dispatch warning:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing to Treel updates.",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal subscription error";
    console.error("[Newsletter Subscription Exception]", message);
    return NextResponse.json(
      { success: false, error: "Unable to process subscription. Please try again." },
      { status: 500 }
    );
  }
}
