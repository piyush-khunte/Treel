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
      full_name,
      name,
      mobile,
      mobile_number,
      phone,
      email,
      work_email,
      company,
      fleet_size,
      fleetSize,
      city,
      kit_interest,
      vehicle_model,
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
    // full_name (required NOT NULL)
    const rawName = (
      typeof full_name === "string" ? full_name : typeof name === "string" ? name : ""
    ).trim();
    if (!rawName || rawName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid full name." },
        { status: 400 }
      );
    }

    // mobile_number (required NOT NULL)
    const rawMobile = (
      typeof mobile_number === "string"
        ? mobile_number
        : typeof mobile === "string"
        ? mobile
        : typeof phone === "string"
        ? phone
        : ""
    ).trim();
    const cleanDigits = rawMobile.replace(/\D/g, "");
    const last10 = cleanDigits.slice(-10);
    if (last10.length !== 10 || !/^[6-9]\d{9}$/.test(last10)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid 10-digit Indian mobile number." },
        { status: 400 }
      );
    }
    const normalizedMobile = `+91${last10}`;

    // work_email (required NOT NULL in public.leads)
    const rawEmail = (
      typeof work_email === "string" ? work_email : typeof email === "string" ? email : ""
    ).trim().toLowerCase();
    const finalWorkEmail = rawEmail || `${last10}@lead.treel.in`;

    // company (required NOT NULL in public.leads)
    const rawCompany = typeof company === "string" ? company.trim() : "";
    const normalizedCity = typeof city === "string" ? city.trim() : "";
    const normalizedVehicle = typeof vehicle_model === "string" ? vehicle_model.trim() : "";
    const finalCompany =
      rawCompany ||
      (normalizedVehicle
        ? `${normalizedVehicle}${normalizedCity ? ` (${normalizedCity})` : ""}`
        : normalizedCity
        ? `Rider (${normalizedCity})`
        : "Personal Two-Wheeler");

    // fleet_size (nullable - omit or store null for 2W)
    const rawFleet =
      typeof fleet_size === "string" || typeof fleet_size === "number"
        ? String(fleet_size).trim()
        : typeof fleetSize === "string" || typeof fleetSize === "number"
        ? String(fleetSize).trim()
        : "";
    const parsedFleetSize = rawFleet ? parseInt(rawFleet.replace(/\D/g, ""), 10) || null : null;

    const normalizedKit = typeof kit_interest === "string" ? kit_interest.trim() : "not_sure";

    // 2. IDEMPOTENCY / RAPID DUPLICATE SUBMISSION CHECK
    const idempotencyKey = `personal_2w_${last10}`;
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
        "[Personal 2W Lead Ingestion] Database configuration missing: SUPABASE_URL or SUPABASE_SECRET_KEY not set."
      );
      return NextResponse.json(
        {
          success: false,
          error: "Something went wrong while submitting your request. Please try again or call 1800 833 0233.",
        },
        { status: 500 }
      );
    }

    // Exact verified public.leads schema mapping - NO fallback guessing
    const insertPayload = {
      full_name: rawName,
      mobile_number: normalizedMobile,
      work_email: finalWorkEmail,
      company: finalCompany,
      fleet_size: parsedFleetSize,

      lead_source:
        typeof lead_source === "string" && lead_source.trim() ? lead_source.trim() : "website",
      campaign_type:
        typeof campaign_type === "string" && campaign_type.trim()
          ? campaign_type.trim()
          : "personal_tpms_2w_campaign",
      form_id:
        typeof form_id === "string" && form_id.trim() ? form_id.trim() : "bike_tpms_callback",
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
          : "https://treel.in/lp/tpms/bike",
      first_landing_page:
        typeof first_landing_page === "string" && first_landing_page.trim()
          ? first_landing_page.trim()
          : null,
      referrer: typeof referrer === "string" && referrer.trim() ? referrer.trim() : null,
      page_path:
        typeof page_path === "string" && page_path.trim() ? page_path.trim() : "/lp/tpms/bike",
      user_agent: userAgent || null,

      attribution_metadata: {
        city: normalizedCity,
        kit_interest: normalizedKit,
        vehicle_model: normalizedVehicle,
        product_line: "personal_tpms_2w",
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
        "[Personal 2W Lead Ingestion] Database insertion failed:",
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

    const insertedLeadId = insertData?.id || `PL-${Date.now()}`;

    // 4. AMAZON SES EMAIL NOTIFICATION PIPELINE
    // Triggered ONLY after database persistence is confirmed
    if (isSesConfigured()) {
      try {
        const toEmail = process.env.SES_LEADS_EMAIL || process.env.SES_FROM_EMAIL || "sales@treel.in";
        const secondEmail = process.env.TMIP_CAMPAIGN_SECOND_EMAIL?.trim();
        const ccList = secondEmail ? [secondEmail] : undefined;

        const emailSubject = `[Personal TPMS 2W Lead] ${rawName} (${normalizedKit === "motorbike_kit" ? "Motorbike" : normalizedKit === "scooter_kit" ? "Scooter" : "2W Inquiry"}) - ${normalizedMobile}`;

        const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #2563EB; color: #ffffff; padding: 24px; text-align: left; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #dbeafe; }
    .content { padding: 24px; }
    .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
    .item { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px; }
    .item-label { font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase; margin-bottom: 4px; }
    .item-value { font-size: 14px; font-weight: 600; color: #0f172a; word-break: break-all; }
    .item-value a { color: #2563EB; text-decoration: none; }
    .full-width { grid-column: 1 / -1; }
    .badge { display: inline-block; padding: 3px 8px; border-radius: 4px; font-size: 12px; font-weight: 700; background: #dbeafe; color: #1e40af; }
    .footer { background: #f1f5f9; padding: 16px 24px; font-size: 11px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>New Personal TPMS 2W Campaign Lead</h1>
      <p>Received on ${new Date(timestamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
    </div>
    <div class="content">
      <div class="section-title">Contact & Vehicle Details</div>
      <div class="grid">
        <div class="item">
          <div class="item-label">Full Name</div>
          <div class="item-value">${rawName}</div>
        </div>
        <div class="item">
          <div class="item-label">Mobile Number</div>
          <div class="item-value"><a href="tel:${normalizedMobile}">${normalizedMobile}</a></div>
        </div>
        <div class="item">
          <div class="item-label">Kit Interest</div>
          <div class="item-value"><span class="badge">${normalizedKit === "motorbike_kit" ? "Motorbike Kit" : normalizedKit === "scooter_kit" ? "Scooter Kit" : "Not Sure Yet"}</span></div>
        </div>
        <div class="item">
          <div class="item-label">City</div>
          <div class="item-value">${normalizedCity || "Not Provided"}</div>
        </div>
        <div class="item full-width">
          <div class="item-label">Vehicle Make & Model</div>
          <div class="item-value">${normalizedVehicle || "Not Specified"}</div>
        </div>
        <div class="item full-width">
          <div class="item-label">Email</div>
          <div class="item-value"><a href="mailto:${finalWorkEmail}">${finalWorkEmail}</a></div>
        </div>
      </div>

      <div class="section-title">Campaign Attribution & Tracking</div>
      <div class="grid">
        <div class="item">
          <div class="item-label">Product Line</div>
          <div class="item-value">personal_tpms_2w</div>
        </div>
        <div class="item">
          <div class="item-label">Form ID</div>
          <div class="item-value">bike_tpms_callback</div>
        </div>
        <div class="item">
          <div class="item-label">UTM Source</div>
          <div class="item-value">${utm_source || "direct"}</div>
        </div>
        <div class="item">
          <div class="item-label">UTM Medium</div>
          <div class="item-value">${utm_medium || "none"}</div>
        </div>
        <div class="item">
          <div class="item-label">UTM Campaign</div>
          <div class="item-value">${utm_campaign || "none"}</div>
        </div>
        <div class="item">
          <div class="item-label">Ad Group</div>
          <div class="item-value">${ad_group || "none"}</div>
        </div>
        ${gclid ? `<div class="item full-width"><div class="item-label">Google Click ID (GCLID)</div><div class="item-value">${gclid}</div></div>` : ""}
        ${fbclid ? `<div class="item full-width"><div class="item-label">Facebook Click ID (FBCLID)</div><div class="item-value">${fbclid}</div></div>` : ""}
        <div class="item full-width">
          <div class="item-label">Landing Page</div>
          <div class="item-value">${landing_page || "https://treel.in/lp/tpms/bike"}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      Treel Mobility Solutions — Personal TPMS 2W Notification Engine
    </div>
  </div>
</body>
</html>
        `;

        await sendEmail({
          to: toEmail,
          cc: ccList,
          subject: emailSubject,
          html: emailHtml,
          replyTo: rawEmail || undefined,
        });

        // Update email_notification_status to sent
        if (insertedLeadId && typeof insertedLeadId === "string" && !insertedLeadId.startsWith("PL-")) {
          await supabase
            .from("leads")
            .update({ email_notification_status: "sent" })
            .eq("id", insertedLeadId);
        }
      } catch (mailErr: any) {
        console.error(
          "[Personal 2W Lead Ingestion] SES email notification failed (Lead persisted in DB):",
          mailErr
        );
        // Record email notification failure in database
        if (insertedLeadId && typeof insertedLeadId === "string" && !insertedLeadId.startsWith("PL-")) {
          await supabase
            .from("leads")
            .update({
              email_notification_status: "failed",
              email_notification_error: mailErr?.message || "SES send failure",
            })
            .eq("id", insertedLeadId);
        }
      }
    }

    // 5. SUCCESS RESPONSE
    return NextResponse.json(
      {
        success: true,
        leadId: insertedLeadId,
        timestamp,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("[Personal 2W Lead Ingestion] Server unhandled exception:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Server processing error. Please try again or call toll-free 1800 833 0233.",
      },
      { status: 500 }
    );
  }
}
