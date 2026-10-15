import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getWhitepaperById, getWhitepaperBySlug, recordWhitepaperDownload } from "@/lib/content/whitepapers-storage";
import { createWhitepaperAccessToken } from "@/lib/content/whitepaper-tokens";
import { isSesConfigured, sendWhitepaperAccessEmail } from "@/lib/integrations/email/ses-client";

function getSupabaseClient() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "").replace(/^['"]|['"]$/g, "");
  const key = (
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    ""
  ).replace(/^['"]|['"]$/g, "");

  if (!url || !key || url.includes("placeholder-treel") || key.includes("placeholder-key")) {
    return null;
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

// In-memory rate limiting / idempotency cache (keyed by email + whitepaperId, 15 seconds window)
const recentAccessRequests = new Map<string, { timestamp: number; token: string }>();

function cleanupOldRequests() {
  const now = Date.now();
  for (const [k, v] of recentAccessRequests.entries()) {
    if (now - v.timestamp > 60000) {
      recentAccessRequests.delete(k);
    }
  }
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
      whitepaperId,
      slug,
      email,
      fullName,
      name,
      company,
      phone,
      fleetSize,
      consent,
      marketingConsent,
    } = body;

    // 1. Validate Email
    const rawEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!rawEmail || !emailRegex.test(rawEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // 2. Validate Whitepaper identifier
    const targetIdOrSlug = (typeof whitepaperId === "string" && whitepaperId.trim())
      ? whitepaperId.trim()
      : typeof slug === "string" && slug.trim()
      ? slug.trim()
      : "";

    if (!targetIdOrSlug) {
      return NextResponse.json(
        { success: false, error: "Whitepaper identifier is required." },
        { status: 400 }
      );
    }

    let whitepaper = await getWhitepaperById(targetIdOrSlug);
    if (!whitepaper) {
      whitepaper = await getWhitepaperBySlug(targetIdOrSlug);
    }

    if (!whitepaper) {
      return NextResponse.json(
        { success: false, error: "Whitepaper not found in library." },
        { status: 404 }
      );
    }

    if (whitepaper.publicationStatus !== "Published") {
      return NextResponse.json(
        { success: false, error: "This whitepaper is not available for public download." },
        { status: 403 }
      );
    }

    // 3. Normalization
    const normalizedName = (
      typeof fullName === "string" && fullName.trim()
        ? fullName.trim()
        : typeof name === "string" && name.trim()
        ? name.trim()
        : "Whitepaper Requester"
    );

    const normalizedCompany = (
      typeof company === "string" && company.trim()
        ? company.trim()
        : "Fleet Operator"
    );

    const normalizedPhone = (
      typeof phone === "string" && phone.trim() ? phone.trim() : "N/A"
    );

    // 4. Rate Limiting & Idempotency check
    cleanupOldRequests();
    const rateLimitKey = `${rawEmail}:${whitepaper._id}`;
    const cached = recentAccessRequests.get(rateLimitKey);

    let token: string;
    if (cached && Date.now() - cached.timestamp < 15000) {
      token = cached.token;
    } else {
      token = createWhitepaperAccessToken(whitepaper._id, rawEmail);
      recentAccessRequests.set(rateLimitKey, { timestamp: Date.now(), token });
    }

    // Determine host origin for document links
    const origin = req.nextUrl.origin || "https://treel.in";
    const viewUrl = `${origin}/api/tmip/whitepapers/document?token=${encodeURIComponent(token)}&action=view`;
    const downloadUrl = `${origin}/api/tmip/whitepapers/document?token=${encodeURIComponent(token)}&action=download`;

    // 5. Record Lead in Database
    const supabase = getSupabaseClient();
    let leadSaved = false;
    let leadId: string | null = null;

    if (supabase) {
      try {
        const parsedFleet = fleetSize ? parseInt(String(fleetSize).replace(/\D/g, ""), 10) || null : null;
        const insertPayload = {
          full_name: normalizedName,
          work_email: rawEmail,
          company: normalizedCompany,
          mobile_number: normalizedPhone,
          fleet_size: parsedFleet,
          lead_source: "Whitepaper Download",
          campaign_type: "tmip_whitepaper",
          form_id: "tmip_whitepaper_access",
          status: "new",
          landing_page: `${origin}/tmip/whitepapers`,
          page_path: "/tmip/whitepapers",
          attribution_metadata: {
            whitepaperId: whitepaper._id,
            whitepaperTitle: whitepaper.title,
            whitepaperSlug: whitepaper.slug,
            fileFormat: whitepaper.fileFormat,
            deliveryConsent: Boolean(consent),
            marketingConsent: Boolean(marketingConsent),
            requestedAt: new Date().toISOString(),
          },
          email_notification_status: "pending",
        };

        const { data: inserted, error: insertErr } = await supabase
          .from("leads")
          .insert([insertPayload])
          .select("id")
          .single();

        if (!insertErr && inserted?.id) {
          leadSaved = true;
          leadId = inserted.id;
        } else if (insertErr) {
          console.warn("Could not insert whitepaper lead into public.leads:", insertErr.message);
        }
      } catch (dbErr) {
        console.warn("Database insert exception for whitepaper lead:", dbErr);
      }
    }

    // Increment download metric
    recordWhitepaperDownload(whitepaper._id).catch(() => {});

    // 6. Send Email via Amazon SES
    let emailStatus: "sent" | "failed" | "skipped" = "skipped";
    let emailErrorMessage: string | null = null;

    if (isSesConfigured()) {
      try {
        const emailRes = await sendWhitepaperAccessEmail({
          email: rawEmail,
          recipientName: normalizedName,
          whitepaperTitle: whitepaper.title,
          fileFormat: whitepaper.fileFormat,
          length: whitepaper.length,
          viewUrl,
          downloadUrl,
          coverImage: whitepaper.coverImage,
        });

        if (emailRes.success) {
          emailStatus = "sent";
        } else {
          emailStatus = "failed";
          emailErrorMessage = emailRes.error?.message || "Email provider dispatch failed.";
        }
      } catch (eErr: any) {
        emailStatus = "failed";
        emailErrorMessage = eErr.message || "Email send error.";
      }
    } else {
      emailStatus = "skipped";
    }

    // Update lead email status in database if available
    if (supabase && leadId) {
      try {
        await supabase
          .from("leads")
          .update({
            email_notification_status: emailStatus,
            email_notification_error: emailErrorMessage,
          })
          .eq("id", leadId);
      } catch (upErr) {
        console.warn("Could not update lead email status:", upErr);
      }
    }

    return NextResponse.json({
      success: true,
      token,
      viewUrl,
      downloadUrl,
      whitepaper: {
        id: whitepaper._id,
        title: whitepaper.title,
        format: whitepaper.fileFormat,
        originalFilename: whitepaper.originalFilename,
        fileSizeFormatted: whitepaper.fileSizeFormatted,
      },
      emailStatus,
      emailSent: emailStatus === "sent",
      leadSaved,
      message:
        emailStatus === "sent"
          ? `Access granted! We have also sent a download link to ${rawEmail}.`
          : "Access granted! You can now view or download your whitepaper.",
    });
  } catch (err: any) {
    console.error("Whitepaper access error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
