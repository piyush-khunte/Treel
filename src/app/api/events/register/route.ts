import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  isSesConfigured,
  sendEmail,
  sendEventRegistrationConfirmationEmail,
} from "@/lib/integrations";
import { getEventBySlug } from "@/lib/content/events-storage";
import { createEventCalendarLinks } from "@/lib/events/calendar-links";
import { guardLeadSubmission } from "@/lib/security/lead-guard";
import { escapeHtml } from "@/lib/security/escape-html";

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

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

    const blocked = await guardLeadSubmission("event-register", req.headers, body);
    if (blocked) return blocked;

    const fullName = typeof body.fullName === "string" ? body.fullName.trim().slice(0, 120) : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 254) : "";
    const company = typeof body.company === "string" ? body.company.trim().slice(0, 160) : "";
    const role = typeof body.role === "string" ? body.role.trim().slice(0, 120) : "";
    const eventSlug = typeof body.eventSlug === "string" ? body.eventSlug.trim() : "";

    // Event details (name, date, venue, calendar links) are taken from our own event
    // records — never from the request — so this endpoint can't be used to send
    // arbitrary content or links from hello@treel.in.
    const event = eventSlug ? await getEventBySlug(eventSlug) : null;
    if (!event || event.publicationStatus !== "Published") {
      return NextResponse.json(
        { success: false, error: "This event is not open for registration." },
        { status: 404 }
      );
    }
    const eventName = event.name;
    const dateTime = event.dateTime;
    const location = event.location || "Online";
    const isOnline = Boolean(event.isOnline);
    const calendarLinks = createEventCalendarLinks(event);
    const googleCalendarUrl = calendarLinks.google;
    const outlookCalendarUrl = calendarLinks.outlook;

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
            landing_page: eventSlug ? `https://treel.in/resources/events/${eventSlug}` : "https://treel.in/resources/events",
            page_path: eventSlug ? `/resources/events/${eventSlug}` : "/resources/events",
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
          html: `<p><strong>New Event Registration:</strong></p><ul><li>Name: ${escapeHtml(fullName)}</li><li>Email: ${escapeHtml(email)}</li><li>Company: ${escapeHtml(company || "N/A")}</li><li>Role: ${escapeHtml(role || "N/A")}</li><li>Event: ${escapeHtml(eventName)}</li><li>Date: ${escapeHtml(dateTime)}</li></ul>`,
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

