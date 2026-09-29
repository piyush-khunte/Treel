import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isSesConfigured, sendEmail } from "@/lib/integrations";

// Server-side in-memory idempotency cache (prevents rapid double-clicks within 30s)
const recentSubmissions = new Map<string, number>();

function isDuplicateSubmission(key: string, windowMs = 30000): boolean {
  const now = Date.now();
  // Clean up entries older than 2 minutes
  for (const [k, timestamp] of recentSubmissions.entries()) {
    if (now - timestamp > 120000) {
      recentSubmissions.delete(k);
    }
  }

  const lastSeen = recentSubmissions.get(key);
  if (lastSeen && now - lastSeen < windowMs) {
    return true;
  }
  recentSubmissions.set(key, now);
  return false;
}

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
        { success: false, error: "Invalid request payload format." },
        { status: 400 }
      );
    }

    const {
      name,
      full_name,
      phone,
      mobile,
      mobile_number,
      email,
      work_email,
      company,
      fleet_size,
      fleetSize,
      lead_source,
      campaign_type,
      form_id,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      gclid,
      fbclid,
      ad_group,
      landing_page,
      first_landing_page,
      referrer,
      page_path,
    } = body;

    // 1. SERVER-SIDE VALIDATION & NORMALIZATION
    // full_name (required NOT NULL in public.leads)
    const normalizedName = (
      typeof full_name === "string" ? full_name : typeof name === "string" ? name : ""
    ).trim();
    if (!normalizedName || normalizedName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid full name." },
        { status: 400 }
      );
    }

    // mobile_number (required NOT NULL in public.leads)
    const rawPhone = (
      typeof mobile_number === "string"
        ? mobile_number
        : typeof mobile === "string"
        ? mobile
        : typeof phone === "string"
        ? phone
        : ""
    ).trim();
    const cleanDigits = rawPhone.replace(/\D/g, "");
    const last10 = cleanDigits.slice(-10);
    if (last10.length !== 10 || !/^[6-9]\d{9}$/.test(last10)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid 10-digit Indian mobile number." },
        { status: 400 }
      );
    }
    const normalizedPhone = `+91${last10}`;

    // work_email (required NOT NULL in public.leads)
    const rawEmail = (
      typeof work_email === "string" ? work_email : typeof email === "string" ? email : ""
    ).trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!rawEmail || !emailRegex.test(rawEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid work email address." },
        { status: 400 }
      );
    }
    const normalizedEmail = rawEmail;

    // company (required NOT NULL in public.leads)
    const normalizedCompany = typeof company === "string" ? company.trim() : "";
    if (!normalizedCompany || normalizedCompany.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide your company or fleet name." },
        { status: 400 }
      );
    }

    // fleet_size (nullable in public.leads)
    const rawFleet =
      typeof fleet_size === "string" || typeof fleet_size === "number"
        ? String(fleet_size).trim()
        : typeof fleetSize === "string" || typeof fleetSize === "number"
        ? String(fleetSize).trim()
        : "";
    const parsedFleetSize = rawFleet ? parseInt(rawFleet.replace(/\D/g, ""), 10) || null : null;

    // 2. IDEMPOTENCY / RAPID DUPLICATE SUBMISSION CHECK
    const idempotencyKey = `${normalizedEmail}_${last10}`;
    if (isDuplicateSubmission(idempotencyKey)) {
      return NextResponse.json(
        { success: false, error: "A submission with these details was already received. Please wait a moment." },
        { status: 429 }
      );
    }

    const timestamp = new Date().toISOString();
    const userAgent = req.headers.get("user-agent") || undefined;

    // 3. DATABASE PERSISTENCE (Source of Truth - Exact verified public.leads schema)
    const supabase = getSupabaseClient();
    if (!supabase) {
      console.error(
        "[TMIP Lead Ingestion] Database configuration missing: SUPABASE_URL or SUPABASE_SECRET_KEY not set."
      );
      return NextResponse.json(
        {
          success: false,
          error: "Something went wrong while submitting your request. Please try again or call 1800 833 0233.",
        },
        { status: 500 }
      );
    }

    const finalFormId =
      typeof form_id === "string" && form_id.trim()
        ? form_id.trim()
        : "tmip_demo";

    const insertPayload = {
      full_name: normalizedName,
      mobile_number: normalizedPhone,
      work_email: normalizedEmail,
      company: normalizedCompany,
      fleet_size: parsedFleetSize,

      lead_source:
        typeof lead_source === "string" && lead_source.trim() ? lead_source.trim() : "website",
      campaign_type:
        typeof campaign_type === "string" && campaign_type.trim()
          ? campaign_type.trim()
          : "tmip_campaign",
      form_id: finalFormId,
      status: "new",

      utm_source: typeof utm_source === "string" && utm_source.trim() ? utm_source.trim() : null,
      utm_medium: typeof utm_medium === "string" && utm_medium.trim() ? utm_medium.trim() : null,
      utm_campaign:
        typeof utm_campaign === "string" && utm_campaign.trim() ? utm_campaign.trim() : null,
      utm_term: typeof utm_term === "string" && utm_term.trim() ? utm_term.trim() : null,
      utm_content:
        typeof utm_content === "string" && utm_content.trim() ? utm_content.trim() : null,

      gclid: typeof gclid === "string" && gclid.trim() ? gclid.trim() : null,
      fbclid: typeof fbclid === "string" && fbclid.trim() ? fbclid.trim() : null,
      ad_group: typeof ad_group === "string" && ad_group.trim() ? ad_group.trim() : null,

      landing_page:
        typeof landing_page === "string" && landing_page.trim()
          ? landing_page.trim()
          : "https://treel.in/tmip/campaign",
      first_landing_page:
        typeof first_landing_page === "string" && first_landing_page.trim()
          ? first_landing_page.trim()
          : null,
      referrer: typeof referrer === "string" && referrer.trim() ? referrer.trim() : null,
      page_path:
        typeof page_path === "string" && page_path.trim() ? page_path.trim() : "/tmip/campaign",
      user_agent: userAgent || null,

      attribution_metadata: {
        raw_fleet_size: rawFleet || null,
        product_line: "tmip_enterprise",
        form_id: finalFormId,
      },
      email_notification_status: isSesConfigured() ? "pending" : "skipped",
    };

    const { data: insertData, error: insertError } = await supabase
      .from("leads")
      .insert([insertPayload])
      .select("id")
      .single();

    if (insertError) {
      console.error(
        "[TMIP Lead Ingestion Critical] Database insertion failed:",
        insertError.message,
        insertError
      );
      return NextResponse.json(
        {
          success: false,
          error: "Database insertion error. Please retry or call toll-free 1800 833 0233.",
        },
        { status: 500 }
      );
    }

    const insertedLeadId = insertData?.id || `TL-${Date.now()}`;

    // 4. AMAZON SES NOTIFICATION (Only after successful persistence)
    if (isSesConfigured()) {
      try {
        const primaryRecipient =
          process.env.SES_LEADS_EMAIL || process.env.SES_FROM_EMAIL || "sales@treel.in";
        const secondRecipient =
          process.env.TMIP_CAMPAIGN_SECOND_EMAIL ||
          process.env.TMIP_LEADS_SECONDARY_EMAIL ||
          process.env.SES_LEADS_SECONDARY_EMAIL;

        const recipients = [primaryRecipient];
        const ccAddresses: string[] = [];
        if (secondRecipient && secondRecipient.trim() && secondRecipient.trim() !== primaryRecipient) {
          ccAddresses.push(secondRecipient.trim());
        }

        const formDisplayName =
          finalFormId === "tmip_footer_demo" ? "TMIP Footer Demo" : "TMIP Campaign Demo";

        const emailSubject = `[${formDisplayName}] ${normalizedName} — ${normalizedCompany} (${parsedFleetSize ? `${parsedFleetSize} Trucks` : rawFleet || "Enterprise"})`;

        const emailHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>New TMIP Campaign Lead</title>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 24px;">
    <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
      <div style="background: #050a17; padding: 24px; border-bottom: 3px solid #3b82f6;">
        <h2 style="margin: 0; font-size: 20px; color: #ffffff; letter-spacing: -0.02em;">Treel Mobility — New TMIP Campaign Lead</h2>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8; font-family: monospace;">Form: ${formDisplayName} · /tmip/campaign</p>
      </div>
      
      <div style="padding: 24px;">
        <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #0f172a; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">Contact &amp; Fleet Details</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; width: 140px; color: #64748b; font-weight: 500;">Lead Name:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${normalizedName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Mobile:</td>
            <td style="padding: 8px 0; color: #2563eb; font-weight: 600;"><a href="tel:${normalizedPhone}" style="color: #2563eb; text-decoration: none;">${normalizedPhone}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Work Email:</td>
            <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${normalizedEmail}" style="color: #0f172a; text-decoration: none;">${normalizedEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Company:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${normalizedCompany}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Fleet Scale:</td>
            <td style="padding: 8px 0; color: #059669; font-weight: 700;">${parsedFleetSize ? `${parsedFleetSize} Vehicles` : rawFleet || "Not specified"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Lead Record ID:</td>
            <td style="padding: 8px 0; color: #64748b; font-family: monospace;">${insertedLeadId}</td>
          </tr>
        </table>

        <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #0f172a; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">Marketing &amp; Attribution</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; font-family: monospace; background: #f8fafc; border-radius: 6px; padding: 12px;">
          <tr>
            <td style="padding: 6px 12px; color: #64748b; width: 140px;">Form ID:</td>
            <td style="padding: 6px 12px; color: #0f172a; font-weight: 600;">${finalFormId}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; color: #64748b;">Ad Group:</td>
            <td style="padding: 6px 12px; color: #0f172a; font-weight: 600;">${ad_group || "default"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; color: #64748b;">UTM Source:</td>
            <td style="padding: 6px 12px; color: #0f172a;">${utm_source || "direct / organic"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; color: #64748b;">UTM Medium:</td>
            <td style="padding: 6px 12px; color: #0f172a;">${utm_medium || "none"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; color: #64748b;">UTM Campaign:</td>
            <td style="padding: 6px 12px; color: #0f172a;">${utm_campaign || "none"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; color: #64748b;">UTM Term:</td>
            <td style="padding: 6px 12px; color: #0f172a;">${utm_term || "none"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; color: #64748b;">UTM Content:</td>
            <td style="padding: 6px 12px; color: #0f172a;">${utm_content || "none"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; color: #64748b;">Google GCLID:</td>
            <td style="padding: 6px 12px; color: #0f172a;">${gclid || "none"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; color: #64748b;">Meta FBCLID:</td>
            <td style="padding: 6px 12px; color: #0f172a;">${fbclid || "none"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; color: #64748b;">Landing URL:</td>
            <td style="padding: 6px 12px; color: #0f172a; word-break: break-all;">${landing_page || "https://treel.in/tmip/campaign"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; color: #64748b;">First Page:</td>
            <td style="padding: 6px 12px; color: #0f172a; word-break: break-all;">${first_landing_page || "direct"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 12px; color: #64748b;">Referrer:</td>
            <td style="padding: 6px 12px; color: #0f172a;">${referrer || "none"}</td>
          </tr>
        </table>

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
          Received on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST · Treel Mobility Solutions Pvt. Ltd.
        </div>
      </div>
    </div>
  </body>
</html>
        `;

        await sendEmail({
          to: recipients,
          cc: ccAddresses.length > 0 ? ccAddresses : undefined,
          subject: emailSubject,
          html: emailHtml,
          replyTo: normalizedEmail,
        });

        // Update email_notification_status to sent
        if (insertedLeadId && typeof insertedLeadId === "string" && !insertedLeadId.startsWith("TL-")) {
          await supabase
            .from("leads")
            .update({ email_notification_status: "sent" })
            .eq("id", insertedLeadId);
        }
      } catch (emailErr: any) {
        console.error("[TMIP Lead Ingestion] Amazon SES notification failed:", emailErr);
        if (insertedLeadId && typeof insertedLeadId === "string" && !insertedLeadId.startsWith("TL-")) {
          await supabase
            .from("leads")
            .update({
              email_notification_status: "failed",
              email_notification_error: emailErr?.message || "SES send failure",
            })
            .eq("id", insertedLeadId);
        }
      }
    }

    // 5. SUCCESS RESPONSE (Database persisted)
    return NextResponse.json(
      {
        success: true,
        leadId: insertedLeadId,
        timestamp,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("[TMIP Lead Ingestion Critical] Unexpected server exception:", message);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while submitting your request. Please try again or call 1800 833 0233.",
      },
      { status: 500 }
    );
  }
}
