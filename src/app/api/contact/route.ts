import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isSesConfigured, sendEmail } from "@/lib/integrations";

// In-memory idempotency cache (prevents rapid double-clicks within 30s)
const recentSubmissions = new Map<string, number>();

function isDuplicateSubmission(key: string, windowMs = 30000): boolean {
  const now = Date.now();
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
    let body: Record<string, any> | null = null;
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      body = await req.json().catch(() => null);
    } else if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      try {
        const formData = await req.formData();
        const parsed: Record<string, any> = {};
        formData.forEach((val, key) => {
          parsed[key] = typeof val === "string" ? val : val.name;
        });
        body = parsed;
      } catch {
        body = null;
      }
    } else {
      body = await req.json().catch(() => null);
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request payload format." },
        { status: 400 }
      );
    }

    const {
      fullName,
      full_name,
      name,
      email,
      work_email,
      phone,
      mobile,
      mobile_number,
      company,
      subject,
      fleetSize,
      fleet_size,
      message,
      consent,
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

    // 1. Validation
    const normalizedName = (
      typeof fullName === "string" ? fullName : typeof full_name === "string" ? full_name : typeof name === "string" ? name : ""
    ).trim();
    if (!normalizedName || normalizedName.length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide your full name." },
        { status: 400 }
      );
    }

    const rawEmail = (
      typeof email === "string" ? email : typeof work_email === "string" ? work_email : ""
    ).trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!rawEmail || !emailRegex.test(rawEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const normalizedSubject = typeof subject === "string" ? subject.trim() : "General inquiry";
    const normalizedMessage = typeof message === "string" ? message.trim() : "";
    if (!normalizedMessage) {
      return NextResponse.json(
        { success: false, error: "Please write your message." },
        { status: 400 }
      );
    }

    if (consent !== true && consent !== "true" && consent !== "on") {
      return NextResponse.json(
        { success: false, error: "Please confirm your consent to proceed." },
        { status: 400 }
      );
    }

    // Optional phone formatting
    const rawPhone = (
      typeof phone === "string" ? phone : typeof mobile === "string" ? mobile : typeof mobile_number === "string" ? mobile_number : ""
    ).trim();
    let normalizedPhone = "N/A";
    if (rawPhone) {
      const cleanDigits = rawPhone.replace(/\D/g, "");
      const last10 = cleanDigits.slice(-10);
      if (last10.length === 10) {
        normalizedPhone = `+91${last10}`;
      } else {
        normalizedPhone = rawPhone;
      }
    }

    // Optional company
    const normalizedCompany = typeof company === "string" && company.trim() ? company.trim() : "Corporate / General Inquirer";

    // Optional fleet size
    const rawFleet = typeof fleetSize === "string" ? fleetSize : typeof fleet_size === "string" || typeof fleet_size === "number" ? String(fleet_size) : "";
    const parsedFleetSize = rawFleet ? parseInt(rawFleet.replace(/\D/g, ""), 10) || null : null;

    // 2. Idempotency Check
    const idempotencyKey = `contact_${rawEmail}_${normalizedPhone}`;
    if (isDuplicateSubmission(idempotencyKey)) {
      return NextResponse.json(
        { success: false, error: "A submission with these details was already received. Please wait a moment." },
        { status: 429 }
      );
    }

    // 3. Database Persistence
    const supabase = getSupabaseClient();
    if (!supabase) {
      console.error("[Contact Form Ingestion] Database configuration missing.");
      return NextResponse.json(
        { success: false, error: "Server database configuration error. Please call 1800 833 0233." },
        { status: 500 }
      );
    }

    const insertPayload = {
      full_name: normalizedName,
      mobile_number: normalizedPhone,
      work_email: rawEmail,
      company: normalizedCompany,
      fleet_size: parsedFleetSize,
      lead_source: "General Contact",
      campaign_type: "contact_form",
      form_id: "contact",
      status: "new",
      utm_source: typeof utm_source === "string" && utm_source.trim() ? utm_source.trim() : null,
      utm_medium: typeof utm_medium === "string" && utm_medium.trim() ? utm_medium.trim() : null,
      utm_campaign: typeof utm_campaign === "string" && utm_campaign.trim() ? utm_campaign.trim() : null,
      utm_term: typeof utm_term === "string" && utm_term.trim() ? utm_term.trim() : null,
      utm_content: typeof utm_content === "string" && utm_content.trim() ? utm_content.trim() : null,
      gclid: typeof gclid === "string" && gclid.trim() ? gclid.trim() : null,
      fbclid: typeof fbclid === "string" && fbclid.trim() ? fbclid.trim() : null,
      ad_group: typeof ad_group === "string" && ad_group.trim() ? ad_group.trim() : null,
      landing_page: typeof landing_page === "string" && landing_page.trim() ? landing_page.trim() : "https://treel.in/contact",
      first_landing_page: typeof first_landing_page === "string" && first_landing_page.trim() ? first_landing_page.trim() : null,
      referrer: typeof referrer === "string" && referrer.trim() ? referrer.trim() : null,
      page_path: typeof page_path === "string" && page_path.trim() ? page_path.trim() : "/contact",
      user_agent: req.headers.get("user-agent") || null,
      attribution_metadata: {
        subject: normalizedSubject,
        message: normalizedMessage,
        fleet_size_label: rawFleet || null,
        consent: true,
        product_line: "general_contact",
      },
      email_notification_status: "skipped",
    };

    const { data: insertData, error: insertError } = await supabase
      .from("leads")
      .insert([insertPayload])
      .select("id")
      .single();

    if (insertError) {
      console.error("[Contact Form Ingestion] Supabase insert failed:", insertError);
      return NextResponse.json(
        { success: false, error: "Database insertion error. Please retry or call toll-free 1800 833 0233." },
        { status: 500 }
      );
    }

    const insertedLeadId = insertData?.id;

    // 4. Amazon SES Email Notification (Triggered only when configured)
    if (isSesConfigured()) {
      try {
        const primaryRecipient =
          process.env.SES_LEADS_EMAIL || process.env.SES_TO_EMAIL || process.env.SES_FROM_EMAIL || "support@treel.in";
        const emailSubject = `[Contact Inquiry] ${normalizedName} — ${normalizedCompany} (${normalizedSubject})`;

        const emailHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>New Contact Form Inquiry</title>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 24px;">
    <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
      <div style="background: #0f172a; padding: 24px; border-bottom: 3px solid #3b82f6;">
        <h2 style="margin: 0; font-size: 20px; color: #ffffff; letter-spacing: -0.02em;">Treel — New Contact Form Inquiry</h2>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #94a3b8; font-family: monospace;">Source: /contact · Subject: ${normalizedSubject}</p>
      </div>
      
      <div style="padding: 24px;">
        <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #0f172a; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">Sender Information</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
          <tr>
            <td style="padding: 8px 0; width: 140px; color: #64748b; font-weight: 500;">Name:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${normalizedName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Email:</td>
            <td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${rawEmail}" style="color: #0f172a; text-decoration: none;">${rawEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Mobile:</td>
            <td style="padding: 8px 0; color: #2563eb; font-weight: 600;">${normalizedPhone}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Company:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${normalizedCompany}</td>
          </tr>
          ${parsedFleetSize ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: 500;">Fleet Size:</td><td style="padding: 8px 0; color: #059669; font-weight: 600;">${parsedFleetSize} Vehicles</td></tr>` : ''}
          <tr>
            <td style="padding: 8px 0; color: #64748b; font-weight: 500;">Subject:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${normalizedSubject}</td>
          </tr>
          ${insertedLeadId ? `<tr><td style="padding: 8px 0; color: #64748b; font-weight: 500;">Lead ID:</td><td style="padding: 8px 0; color: #64748b; font-family: monospace;">${insertedLeadId}</td></tr>` : ''}
        </table>

        <h3 style="margin: 0 0 12px 0; font-size: 15px; color: #0f172a;">Message:</h3>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #334155; margin-bottom: 24px;">${normalizedMessage}</div>

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
          text: `New Contact Inquiry:\nName: ${normalizedName}\nEmail: ${rawEmail}\nPhone: ${normalizedPhone}\nCompany: ${normalizedCompany}\nSubject: ${normalizedSubject}\nMessage:\n${normalizedMessage}`,
          replyTo: rawEmail,
        });

        if (insertedLeadId && supabase) {
          await supabase
            .from("leads")
            .update({ email_notification_status: "sent" })
            .eq("id", insertedLeadId);
        }
      } catch (emailErr: any) {
        console.error("[Contact Form Ingestion] Amazon SES notification failed:", emailErr);
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
      message: "Your message has been received.",
    });
  } catch (err: unknown) {
    console.error("[Contact Form Ingestion] Unexpected server error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong while submitting your request. Please try again." },
      { status: 500 }
    );
  }
}
