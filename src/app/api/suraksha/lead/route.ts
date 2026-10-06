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
      fullName,
      name,
      mobile,
      mobile_number,
      mobileNumber,
      phone,
      city,
      truck_count,
      truckConfig,
      truck_config,
      fleet_size,
      call_language,
      preferredLanguage,
      preferred_language,
      page_language,
      topic,
      subject,
      message,
      consent,
      preferred_time,
      preferredTime,
      time_slot,
      timeSlot,
      contact_preference,
      contactPreference,
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
      typeof fullName === "string" ? fullName : typeof full_name === "string" ? full_name : typeof name === "string" ? name : ""
    ).trim();
    if (!rawName || rawName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name." },
        { status: 400 }
      );
    }

    const rawPhone = (
      typeof mobileNumber === "string"
        ? mobileNumber
        : typeof mobile_number === "string"
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
    const rawTruckConfig = typeof truckConfig === "string" ? truckConfig.trim() : typeof truck_config === "string" ? truck_config.trim() : "";
    const rawTrucks = typeof truck_count === "string" ? truck_count.trim() : typeof fleet_size === "string" ? fleet_size.trim() : rawTruckConfig;
    const parsedFleetSize = rawTrucks ? parseInt(rawTrucks.replace(/\D/g, ""), 10) || null : null;
    
    const finalCallLang = typeof preferredLanguage === "string" && preferredLanguage.trim() 
      ? preferredLanguage.trim() 
      : typeof preferred_language === "string" && preferred_language.trim()
      ? preferred_language.trim()
      : typeof call_language === "string" && call_language.trim() 
      ? call_language.trim() 
      : "Hindi";

    const finalPreferredTime = typeof preferredTime === "string" && preferredTime.trim()
      ? preferredTime.trim()
      : typeof preferred_time === "string" && preferred_time.trim()
      ? preferred_time.trim()
      : typeof timeSlot === "string" && timeSlot.trim()
      ? timeSlot.trim()
      : typeof time_slot === "string" && time_slot.trim()
      ? time_slot.trim()
      : "Any time during business hours";

    const finalContactPreference = typeof contactPreference === "string" && contactPreference.trim()
      ? contactPreference.trim()
      : typeof contact_preference === "string" && contact_preference.trim()
      ? contact_preference.trim()
      : "Phone call";

    const finalPageLang = typeof page_language === "string" && page_language.trim() ? page_language.trim() : "en";
    const finalTopic = typeof topic === "string" ? topic.trim() : typeof subject === "string" ? subject.trim() : "General inquiry";
    const finalMessage = typeof message === "string" ? message.trim() : "";

    const syntheticWorkEmail = `${last10}@suraksha.treel.in`;
    const finalCompany = normalizedCity ? `Truck Owner (${normalizedCity})` : "Truck Owner / Driver";

    // 2. Idempotency Check
    const idempotencyKey = `suraksha_${last10}_${form_id || page_path || 'general'}`;
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
    if (!supabase) {
      console.error("[Suraksha Lead Ingestion] Database configuration missing.");
      return NextResponse.json(
        { success: false, error: "Server database configuration error. Please call 1800 833 0233." },
        { status: 500 }
      );
    }

    const isCallback = form_id === "suraksha_callback" || lead_source === "Suraksha Callback" || page_path === "/suraksha/callback";
    const isContact = form_id === "suraksha_contact" || lead_source === "Suraksha Contact" || page_path === "/suraksha/contact";

    const finalFormId = typeof form_id === "string" && form_id.trim() 
      ? form_id.trim() 
      : isCallback 
      ? "suraksha_callback" 
      : isContact 
      ? "suraksha_contact" 
      : "suraksha_enquiry";

    const finalLeadSource = typeof lead_source === "string" && lead_source.trim() 
      ? lead_source.trim() 
      : isCallback 
      ? "Suraksha Callback" 
      : isContact 
      ? "Suraksha Contact" 
      : "website";

    const finalCampaignType = typeof campaign_type === "string" && campaign_type.trim() 
      ? campaign_type.trim() 
      : isCallback 
      ? "suraksha_callback" 
      : isContact 
      ? "suraksha_contact" 
      : "suraksha_campaign";

    const finalLandingPage = typeof landing_page === "string" && landing_page.trim() 
      ? landing_page.trim() 
      : isCallback 
      ? "https://treel.in/suraksha/callback" 
      : isContact 
      ? "https://treel.in/suraksha/contact" 
      : "https://treel.in/lp-suraksha";

    const finalPagePath = typeof page_path === "string" && page_path.trim() 
      ? page_path.trim() 
      : isCallback 
      ? "/suraksha/callback" 
      : isContact 
      ? "/suraksha/contact" 
      : "/lp-suraksha";

    const insertPayload = {
      full_name: rawName,
      mobile_number: normalizedPhone,
      work_email: syntheticWorkEmail,
      company: finalCompany,
      fleet_size: parsedFleetSize,
      lead_source: finalLeadSource,
      campaign_type: finalCampaignType,
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
      landing_page: finalLandingPage,
      first_landing_page: typeof first_landing_page === "string" && first_landing_page.trim() ? first_landing_page.trim() : null,
      referrer: typeof referrer === "string" && referrer.trim() ? referrer.trim() : null,
      page_path: finalPagePath,
      user_agent: userAgent || null,
      attribution_metadata: {
        product_line: "suraksha",
        city: normalizedCity || null,
        truck_count: rawTrucks || null,
        truck_config: rawTruckConfig || null,
        preferred_time: finalPreferredTime,
        preferred_language: finalCallLang,
        topic: finalTopic,
        contact_preference: finalContactPreference,
        message: finalMessage || null,
        consent: consent === true || consent === "true" || consent === "on",
        userAgent,
        submittedAt: timestamp,
      },
      email_notification_status: "skipped",
    };

    const { data: insertData, error: insertError } = await supabase
      .from("leads")
      .insert([insertPayload])
      .select("id")
      .single();

    if (insertError) {
      console.error("[Suraksha Lead Ingestion] Supabase insert failed:", insertError);
      return NextResponse.json(
        {
          success: false,
          error: "Database insertion error. Please retry or call toll-free 1800 833 0233.",
        },
        { status: 500 }
      );
    }

    const insertedLeadId = insertData?.id;

    // 4. Amazon SES Email Notification (Triggered only when configured)
    if (isSesConfigured()) {
      try {
        const primaryRecipient =
          process.env.SES_LEADS_EMAIL || process.env.SES_TO_EMAIL || process.env.SES_FROM_EMAIL || "support@treel.in";
        const formTitle = isCallback ? "Suraksha Callback Request" : isContact ? "Suraksha Contact Inquiry" : "Suraksha Lead";
        const emailSubject = `[${formTitle}] ${rawName} — ${normalizedPhone}${normalizedCity ? ` (${normalizedCity})` : ''}`;

        const emailHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>${formTitle}</title>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 24px;">
    <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
      <div style="background: #0f172a; padding: 24px; border-bottom: 3px solid #f97316;">
        <h2 style="margin: 0; font-size: 20px; color: #ffffff; letter-spacing: -0.02em;">Treel Suraksha — ${formTitle}</h2>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8; font-family: monospace;">Path: ${finalPagePath} · Form ID: ${finalFormId}</p>
      </div>
      
      <div style="padding: 24px;">
        <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #0f172a; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">Customer &amp; Vehicle Details</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; width: 150px; color: #64748b; font-weight: 500;">Name:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${rawName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Mobile:</td>
            <td style="padding: 8px 0; color: #2563eb; font-weight: 600;"><a href="tel:${normalizedPhone}" style="color: #2563eb; text-decoration: none;">${normalizedPhone}</a></td>
          </tr>
          ${normalizedCity ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: 500;">City / Location:</td><td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${normalizedCity}</td></tr>` : ''}
          ${rawTrucks ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: 500;">Trucks / Fleet:</td><td style="padding: 8px 0; color: #f97316; font-weight: 600;">${rawTrucks}</td></tr>` : ''}
          ${rawTruckConfig ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: 500;">Truck Type:</td><td style="padding: 8px 0; color: #0f172a;">${rawTruckConfig}</td></tr>` : ''}
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Preferred Language:</td>
            <td style="padding: 8px 0; color: #0f172a;">${finalCallLang}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Preferred Time:</td>
            <td style="padding: 8px 0; color: #0f172a;">${finalPreferredTime}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Contact Mode:</td>
            <td style="padding: 8px 0; color: #0f172a;">${finalContactPreference}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Topic / Subject:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${finalTopic}</td>
          </tr>
          ${insertedLeadId ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: 500;">Lead ID:</td><td style="padding: 8px 0; color: #64748b; font-family: monospace;">${insertedLeadId}</td></tr>` : ''}
        </table>

        ${finalMessage ? `
        <h3 style="margin: 0 0 12px 0; font-size: 15px; color: #0f172a;">Message:</h3>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #334155; margin-bottom: 24px;">${finalMessage}</div>
        ` : ''}

        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
          Received on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST · Treel Mobility Solutions Pvt. Ltd.
        </div>
      </div>
    </div>
  </body>
</html>
        `;

        await sendEmail({
          to: primaryRecipient,
          subject: emailSubject,
          html: emailHtml,
          text: `Suraksha Request:\nName: ${rawName}\nMobile: ${normalizedPhone}\nCity: ${normalizedCity}\nTrucks: ${rawTrucks}\nLanguage: ${finalCallLang}\nTime: ${finalPreferredTime}\nMessage: ${finalMessage}`,
        });

        if (insertedLeadId && supabase) {
          await supabase
            .from("leads")
            .update({ email_notification_status: "sent" })
            .eq("id", insertedLeadId);
        }
      } catch (emailErr: any) {
        console.error("[Suraksha Lead Ingestion] Amazon SES notification failed:", emailErr);
        if (insertedLeadId && supabase) {
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

    return NextResponse.json({
      success: true,
      leadId: insertedLeadId,
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
