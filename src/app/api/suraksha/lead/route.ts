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
    let body: Record<string, unknown> | null = null;
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      body = await req.json().catch(() => null);
    } else if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      try {
        const formData = await req.formData();
        const parsed: Record<string, unknown> = {};
        formData.forEach((val, key) => {
          parsed[key] = typeof val === "string" ? val : val.name;
        });
        body = parsed;
      } catch {
        body = null;
      }
    } else {
      body = await req.json().catch(async () => {
        try {
          const text = await req.text();
          if (!text) return null;
          const params = new URLSearchParams(text);
          const parsed: Record<string, unknown> = {};
          params.forEach((val, key) => {
            parsed[key] = val;
          });
          return parsed;
        } catch {
          return null;
        }
      });
    }

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
      city,
      truck_count,
      fleet_size,
      call_language,
      page_language,
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

    // 1. Validation & Normalization
    const rawName = (
      typeof full_name === "string" ? full_name : typeof name === "string" ? name : ""
    ).trim();
    if (!rawName || rawName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name." },
        { status: 400 }
      );
    }

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

    const normalizedCity = typeof city === "string" ? city.trim() : "";
    const rawTrucks = typeof truck_count === "string" ? truck_count.trim() : typeof fleet_size === "string" ? fleet_size.trim() : "";
    const parsedFleetSize = rawTrucks ? parseInt(rawTrucks.replace(/\D/g, ""), 10) || null : null;
    const finalCallLang = typeof call_language === "string" && call_language.trim() ? call_language.trim() : "en";
    const finalPageLang = typeof page_language === "string" && page_language.trim() ? page_language.trim() : "en";

    const syntheticWorkEmail = `${last10}@suraksha.treel.in`;
    const finalCompany = normalizedCity ? `Truck Owner (${normalizedCity})` : "Truck Owner / Driver";

    // 2. Idempotency Check
    const idempotencyKey = `suraksha_${last10}`;
    if (isDuplicateSubmission(idempotencyKey)) {
      return NextResponse.json(
        { success: false, error: "A submission with these details was already received. Please wait a moment." },
        { status: 429 }
      );
    }

    const timestamp = new Date().toISOString();
    const userAgent = req.headers.get("user-agent") || undefined;

    // 3. Database Persistence
    const supabase = getSupabaseClient();
    const finalFormId = typeof form_id === "string" && form_id.trim() ? form_id.trim() : "suraksha_enquiry";

    let leadId: string | number | undefined;

    if (supabase) {
      const insertPayload = {
        full_name: rawName,
        mobile_number: normalizedPhone,
        work_email: syntheticWorkEmail,
        company: finalCompany,
        fleet_size: parsedFleetSize,
        lead_source: typeof lead_source === "string" && lead_source.trim() ? lead_source.trim() : "website",
        campaign_type: typeof campaign_type === "string" && campaign_type.trim() ? campaign_type.trim() : "suraksha_campaign",
        form_id: finalFormId,
        status: "new",
        utm_source: typeof utm_source === "string" && utm_source.trim() ? utm_source.trim() : null,
        utm_medium: typeof utm_medium === "string" && utm_medium.trim() ? utm_medium.trim() : null,
        utm_campaign: typeof utm_campaign === "string" && utm_campaign.trim() ? utm_campaign.trim() : null,
        utm_term: typeof utm_term === "string" && utm_term.trim() ? utm_term.trim() : null,
        utm_content: typeof utm_content === "string" && utm_content.trim() ? utm_content.trim() : null,
        gclid: typeof gclid === "string" && gclid.trim() ? gclid.trim() : null,
        fbclid: typeof fbclid === "string" && fbclid.trim() ? fbclid.trim() : null,
        ad_group: typeof ad_group === "string" && ad_group.trim() ? ad_group.trim() : null,
        landing_page: typeof landing_page === "string" && landing_page.trim() ? landing_page.trim() : "/lp/suraksha",
        first_landing_page: typeof first_landing_page === "string" && first_landing_page.trim() ? first_landing_page.trim() : null,
        referrer: typeof referrer === "string" && referrer.trim() ? referrer.trim() : null,
        page_path: typeof page_path === "string" && page_path.trim() ? page_path.trim() : "/lp/suraksha",
        notes: `Product: Suraksha | City: ${normalizedCity || "N/A"} | Trucks: ${rawTrucks || "N/A"} | Call Language: ${finalCallLang} | Page Language: ${finalPageLang}`,
        metadata: {
          product_line: "suraksha",
          city: normalizedCity,
          truck_count: rawTrucks,
          call_language: finalCallLang,
          page_language: finalPageLang,
          userAgent,
          submittedAt: timestamp,
        },
      };

      const { data, error } = await supabase.from("leads").insert([insertPayload]).select("id").single();
      if (error) {
        console.error("[Suraksha Lead Ingestion] Supabase insert failed:", error);
      } else if (data) {
        leadId = data.id;
      }
    }

    // 4. SES Notification Email (if configured)
    if (isSesConfigured()) {
      try {
        const emailHtml = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #451A03; max-width: 600px; margin: 0 auto; border: 1px solid #EA580C; border-radius: 12px; overflow: hidden; background-color: #FEF3C7;">
            <div style="background-color: #DC2626; color: white; padding: 20px; text-align: center;">
              <h2 style="margin: 0; font-size: 22px;">New Suraksha Lead</h2>
              <p style="margin: 5px 0 0; opacity: 0.9; font-size: 14px;">Suraksha Truck Safety Campaign</p>
            </div>
            <div style="padding: 24px; background-color: #ffffff;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr><td style="padding: 8px 0; color: #78350F; font-weight: bold; width: 35%;">Name:</td><td style="padding: 8px 0; color: #111827;">${rawName}</td></tr>
                <tr><td style="padding: 8px 0; color: #78350F; font-weight: bold;">Mobile:</td><td style="padding: 8px 0; color: #111827;"><a href="tel:${normalizedPhone}" style="color: #DC2626; font-weight: bold; text-decoration: none;">${normalizedPhone}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #78350F; font-weight: bold;">City / District:</td><td style="padding: 8px 0; color: #111827;">${normalizedCity || "Not specified"}</td></tr>
                <tr><td style="padding: 8px 0; color: #78350F; font-weight: bold;">Truck Count:</td><td style="padding: 8px 0; color: #111827;">${rawTrucks || "Not specified"}</td></tr>
                <tr><td style="padding: 8px 0; color: #78350F; font-weight: bold;">Call Language:</td><td style="padding: 8px 0; color: #111827;">${finalCallLang}</td></tr>
                <tr><td style="padding: 8px 0; color: #78350F; font-weight: bold;">Page Language:</td><td style="padding: 8px 0; color: #111827;">${finalPageLang}</td></tr>
                <tr><td style="padding: 8px 0; color: #78350F; font-weight: bold;">Form ID:</td><td style="padding: 8px 0; color: #111827;">${finalFormId}</td></tr>
                <tr><td style="padding: 8px 0; color: #78350F; font-weight: bold;">UTM Source / Campaign:</td><td style="padding: 8px 0; color: #111827;">${utm_source || "direct"} / ${utm_campaign || "none"}</td></tr>
              </table>
            </div>
            <div style="background-color: #FFFBEB; padding: 14px; text-align: center; font-size: 12px; color: #92400E; border-top: 1px solid #FEF3C7;">
              Treel Suraksha Lead Alert · Received at ${timestamp}
            </div>
          </div>
        `;

        await sendEmail({
          to: process.env.LEAD_NOTIFICATION_EMAIL || "sales@treel.in",
          subject: `🛡️ New Suraksha Lead: ${rawName} (${normalizedCity || "India"}) - ${normalizedPhone}`,
          html: emailHtml,
        });
      } catch (err) {
        console.error("[Suraksha Lead Ingestion] SES email sending failed:", err);
      }
    }

    return NextResponse.json({
      success: true,
      leadId: leadId || "received",
      message: "Your request has been received. Our Suraksha expert will call you shortly.",
    });
  } catch (err: unknown) {
    console.error("[Suraksha Lead Ingestion] Unexpected server error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while submitting your request. Please try again or call 1800 833 0233.",
      },
      { status: 500 }
    );
  }
}
