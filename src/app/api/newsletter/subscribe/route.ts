import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isSesConfigured, sendNewsletterWelcomeEmail } from "@/lib/integrations";
import { subscribeEmail } from "@/lib/content/subscriber-storage";
import { getCanonicalSiteUrl } from "@/lib/content/insights-broadcast";

// Rate limiting & idempotency cache (prevents duplicate rapid clicks within 15 seconds)
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
    const interest = typeof body.interest === "string" ? body.interest.trim() : "Mobility Intelligence Research";

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
        { success: true, message: "You are already subscribed to Treel updates." },
        { status: 200 }
      );
    }

    // 1. Persist to Global Unified Subscriber Storage (local store + Supabase sync)
    const { subscriber, isNew, reactivated } = await subscribeEmail(rawEmail, source, interest);

    // 2. Also log to Supabase leads table if configured for legacy lead CRM tracking
    let persistedLeadId: string | null = null;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { data, error } = await supabase
          .from("leads")
          .insert({
            full_name: "Insights Subscriber",
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
        console.warn("[Newsletter Subscription] Database leads persistence warning:", dbErr);
      }
    }

    // 3. Trigger Amazon SES welcome confirmation email if configured and subscriber is new/reactivated
    if (isSesConfigured() && (isNew || reactivated)) {
      try {
        const baseUrl = getCanonicalSiteUrl();
        const unsubscribeUrl = `${baseUrl}/unsubscribe?token=${subscriber.token}&email=${encodeURIComponent(rawEmail)}`;

        await sendNewsletterWelcomeEmail({
          email: rawEmail,
          source,
          interest,
          unsubscribeUrl,
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

    const responseMessage = isNew
      ? "Thank you for subscribing to Treel updates."
      : reactivated
      ? "Your subscription has been reactivated. Welcome back!"
      : "You are already subscribed to Treel updates.";

    return NextResponse.json({
      success: true,
      message: responseMessage,
      token: subscriber.token,
      subscriberId: subscriber._id,
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
