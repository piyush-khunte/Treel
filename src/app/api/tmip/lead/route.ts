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
      phone,
      email,
      company,
      fleet_size,
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
    } = body;

    // 1. SERVER-SIDE VALIDATION & NORMALIZATION
    const normalizedName = typeof name === "string" ? name.trim() : "";
    if (!normalizedName || normalizedName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid full name." },
        { status: 400 }
      );
    }

    const rawPhone = typeof phone === "string" ? phone.trim() : "";
    const cleanDigits = rawPhone.replace(/\D/g, "");
    // Extract last 10 digits for Indian standard
    const last10 = cleanDigits.slice(-10);
    if (last10.length !== 10 || !/^[6-9]\d{9}$/.test(last10)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid 10-digit Indian mobile number." },
        { status: 400 }
      );
    }
    const normalizedPhone = `+91${last10}`;

    const rawEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!rawEmail || !emailRegex.test(rawEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid work email address." },
        { status: 400 }
      );
    }
    const normalizedEmail = rawEmail;

    const normalizedCompany = typeof company === "string" ? company.trim() : "";
    if (!normalizedCompany) {
      return NextResponse.json(
        { success: false, error: "Please provide your company or fleet name." },
        { status: 400 }
      );
    }

    const rawFleet = typeof fleet_size === "string" || typeof fleet_size === "number" ? String(fleet_size).trim() : "";
    if (!rawFleet) {
      return NextResponse.json(
        { success: false, error: "Please select your fleet size." },
        { status: 400 }
      );
    }
    const parsedFleetSize = parseInt(rawFleet.replace(/\D/g, ""), 10) || null;

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

    // 3. DATABASE PERSISTENCE (Source of Truth)
    const supabase = getSupabaseClient();
    if (!supabase) {
      console.error(
        "[TMIP Lead Ingestion] Database configuration missing: SUPABASE_URL or SUPABASE_SECRET_KEY not set."
      );
      return NextResponse.json(
        {
          success: false,
          error: "Something went wrong while submitting your request. Please try again.",
        },
        { status: 500 }
      );
    }

    let insertedLeadId: string | null = null;

    // Primary attempt: full attribution columns (003_create_leads_table schema)
    const fullPayload = {
      type: "tmip_campaign_lead",
      full_name: normalizedName,
      phone: normalizedPhone,
      email: normalizedEmail,
      company_name: normalizedCompany,
      fleet_size: parsedFleetSize,
      lead_source: "tmip_campaign",
      campaign_type: "paid_marketing",
      ad_group: ad_group || null,
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
      utm_term: utm_term || null,
      utm_content: utm_content || null,
      gclid: gclid || null,
      fbclid: fbclid || null,
      landing_page: landing_page || null,
      first_landing_page: first_landing_page || null,
      referrer: referrer || null,
      user_agent: userAgent || null,
      message: `Ad Group: ${ad_group || "default"} | UTM: ${[utm_source, utm_medium, utm_campaign].filter(Boolean).join("/")} | GCLID: ${gclid || "none"}`,
      status: "new",
    };

    const { data: primaryData, error: primaryError } = await supabase
      .from("leads")
      .insert([fullPayload])
      .select("id");

    if (primaryError) {
      // Check if failure is due to missing optional columns (legacy/minimal schema fallback)
      console.warn(
        "[TMIP Lead Ingestion] Full column insert warning:",
        primaryError.message
      );

      const minimalPayload = {
        type: "tmip_campaign_lead",
        full_name: normalizedName,
        phone: normalizedPhone,
        email: normalizedEmail,
        company_name: normalizedCompany,
        fleet_size: parsedFleetSize,
        message: JSON.stringify({
          ad_group,
          utm_source,
          utm_medium,
          utm_campaign,
          utm_term,
          utm_content,
          gclid,
          fbclid,
          landing_page,
          first_landing_page,
          referrer,
          user_agent: userAgent,
          submitted_at: timestamp,
        }),
        status: "new",
      };

      const { data: fallbackData, error: fallbackError } = await supabase
        .from("leads")
        .insert([minimalPayload])
        .select("id");

      if (fallbackError) {
        // Database persistence genuinely FAILED!
        console.error(
          "[TMIP Lead Ingestion Critical] Database insertion failed:",
          fallbackError.message,
          fallbackError.details
        );
        // CRITICAL: Return HTTP 500. Never return HTTP 200 when persistence failed!
        return NextResponse.json(
          {
            success: false,
            error: "Something went wrong while submitting your request. Please try again.",
          },
          { status: 500 }
        );
      }

      if (fallbackData && fallbackData.length > 0) {
        insertedLeadId = fallbackData[0].id;
      }
    } else if (primaryData && primaryData.length > 0) {
      insertedLeadId = primaryData[0].id;
    }

    if (!insertedLeadId) {
      console.error("[TMIP Lead Ingestion Critical] Database returned empty response on insert.");
      return NextResponse.json(
        {
          success: false,
          error: "Something went wrong while submitting your request. Please try again.",
        },
        { status: 500 }
      );
    }

    // 4. AMAZON SES / SMTP NOTIFICATION (Only after successful persistence)
    if (isSesConfigured()) {
      try {
        const primaryRecipient =
          process.env.SES_LEADS_EMAIL || process.env.SES_FROM_EMAIL || "sales@treel.in";
        // Support second recipient through TMIP_CAMPAIGN_SECOND_EMAIL or configured fallbacks
        const secondRecipient =
          process.env.TMIP_CAMPAIGN_SECOND_EMAIL ||
          process.env.TMIP_LEADS_SECONDARY_EMAIL ||
          process.env.SES_LEADS_SECONDARY_EMAIL;

        const recipients = [primaryRecipient];
        const ccAddresses: string[] = [];
        if (secondRecipient && secondRecipient.trim() && secondRecipient.trim() !== primaryRecipient) {
          ccAddresses.push(secondRecipient.trim());
        }

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
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8; font-family: monospace;">Source: Paid Ads Campaign (/tmip/campaign)</p>
      </div>
      
      <div style="padding: 24px;">
        <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #0f172a; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">Contact & Fleet Details</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; width: 140px; color: #64748b; font-weight: 500;">Lead Name:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${normalizedName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Phone:</td>
            <td style="padding: 8px 0; color: #2563eb; font-weight: 600;"><a href="tel:${normalizedPhone}" style="color: #2563eb; text-decoration: none;">${normalizedPhone}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Work Email:</td>
            <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${normalizedEmail}" style="color: #0f172a; text-decoration: none;">${normalizedEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Company:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 500;">${normalizedCompany}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Fleet Scale:</td>
            <td style="padding: 8px 0; color: #059669; font-weight: 700;">${parsedFleetSize ? `${parsedFleetSize} Vehicles` : rawFleet}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Lead Record ID:</td>
            <td style="padding: 8px 0; color: #64748b; font-family: monospace;">${insertedLeadId}</td>
          </tr>
        </table>

        <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #0f172a; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">Marketing & Attribution</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; font-family: monospace; background: #f8fafc; border-radius: 6px; padding: 12px;">
          <tr>
            <td style="padding: 6px 12px; color: #64748b; width: 140px;">Ad Group:</td>
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
          subject: `[TMIP Campaign Lead] ${normalizedName} — ${normalizedCompany} (${parsedFleetSize ? `${parsedFleetSize} Trucks` : rawFleet})`,
          html: emailHtml,
          text: `New TMIP Campaign Lead:\nName: ${normalizedName}\nPhone: ${normalizedPhone}\nEmail: ${normalizedEmail}\nCompany: ${normalizedCompany}\nFleet: ${rawFleet}\nAd Group: ${ad_group || "default"}\nUTM: ${utm_source || "none"}/${utm_medium || "none"}/${utm_campaign || "none"}\nGCLID: ${gclid || "none"}\nLead ID: ${insertedLeadId}`,
          replyTo: normalizedEmail,
        });
      } catch (emailErr) {
        // Notification failure is logged, but does not invalidate the persisted lead
        console.error("[TMIP Lead Ingestion] Amazon SES notification failed:", emailErr);
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
        error: "Something went wrong while submitting your request. Please try again.",
      },
      { status: 500 }
    );
  }
}
