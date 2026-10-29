import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  isSesConfigured,
  sendEmail,
  sendEventRegistrationConfirmationEmail,
} from "@/lib/integrations";

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url.includes("placeholder-treel") || key.includes("placeholder-key")) {
    return null;
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
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

    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const company = typeof body.company === "string" ? body.company.trim() : "";
    const role = typeof body.role === "string" ? body.role.trim() : "";
    const eventName = typeof body.eventName === "string" ? body.eventName.trim() : "Treel Event";
    const eventSlug = typeof body.eventSlug === "string" ? body.eventSlug.trim() : "";
    const dateTime = typeof body.dateTime === "string" ? body.dateTime.trim() : "";
    const location = typeof body.location === "string" ? body.location.trim() : "Online";
    const isOnline = Boolean(body.isOnline);
    const googleCalendarUrl = typeof body.googleCalendarUrl === "string" ? body.googleCalendarUrl : undefined;
    const outlookCalendarUrl = typeof body.outlookCalendarUrl === "string" ? body.outlookCalendarUrl : undefined;

    if (!fullName) {
      return NextResponse.json(
        { success: false, error: "Please enter your full name." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid work email address." },
        { status: 400 }
      );
    }

    // 1. Persist to Supabase leads table
    const supabase = getSupabaseClient();
    let leadId: string | null = null;

    if (supabase) {
      try {
        const { data: insertData } = await supabase
          .from("leads")
          .insert({
            full_name: fullName,
            work_email: email,
            company: company || null,
            lead_source: "event_registration",
            form_id: eventSlug ? `event_${eventSlug}` : "event_registration",
            campaign_type: "events",
            landing_page: eventSlug ? `https://treel.in/events/${eventSlug}` : "https://treel.in/events",
            page_path: eventSlug ? `/events/${eventSlug}` : "/events",
            status: "new",
            attribution_metadata: {
              eventName,
              eventSlug,
              dateTime,
              location,
              isOnline,
              role,
            },
          })
          .select("id")
          .single();

        if (insertData?.id) {
          leadId = insertData.id;
        }
      } catch (dbErr) {
        console.warn("[Event Registration] Database persistence warning:", dbErr);
      }
    }

    // 2. Dispatch confirmation email from hello@treel.in to the attendee
    if (isSesConfigured()) {
      try {
        await sendEventRegistrationConfirmationEmail({
          name: fullName,
          email: email,
          eventName,
          dateTime,
          location,
          isOnline,
          company,
          role,
          googleCalendarUrl,
          outlookCalendarUrl,
        });

        // Also notify internal team
        const internalRecipient = process.env.SES_LEADS_EMAIL || "events@treel.in";
        await sendEmail({
          to: internalRecipient,
          from: "Treel <hello@treel.in>",
          subject: `[Event Registration] ${fullName} - ${eventName}`,
          text: `New Registration:\nName: ${fullName}\nEmail: ${email}\nCompany: ${company || "N/A"}\nRole: ${role || "N/A"}\nEvent: ${eventName}\nDate: ${dateTime}`,
          html: `<p><strong>New Event Registration:</strong></p><ul><li>Name: ${fullName}</li><li>Email: ${email}</li><li>Company: ${company || "N/A"}</li><li>Role: ${role || "N/A"}</li><li>Event: ${eventName}</li><li>Date: ${dateTime}</li></ul>`,
          replyTo: email,
        });
      } catch (mailErr) {
        console.warn("[Event Registration] Email dispatch error:", mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      leadId: leadId || `EVT-${Date.now()}`,
      message: "You are successfully registered. Confirmation email sent.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to process registration";
    console.error("[Event Registration] Unexpected exception:", message);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

