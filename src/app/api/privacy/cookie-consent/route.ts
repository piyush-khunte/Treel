import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
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
        { success: false, error: "Invalid consent payload." },
        { status: 400 }
      );
    }

    const {
      consent_id,
      status,
      categories,
      policy_version,
      consent_timestamp,
      withdrawn_at,
    } = body;

    // 1. Validation
    if (!consent_id || typeof consent_id !== "string" || consent_id.length < 5 || consent_id.length > 64) {
      return NextResponse.json(
        { success: false, error: "Invalid anonymous consent ID." },
        { status: 400 }
      );
    }

    const validStatuses = ["accepted", "rejected", "customized", "withdrawn"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid consent status." },
        { status: 400 }
      );
    }

    const sanitizedCategories = {
      necessary: true, // Always true
      functional: Boolean(categories?.functional),
      analytics: Boolean(categories?.analytics),
      marketing: Boolean(categories?.marketing),
    };

    const finalPolicyVersion =
      typeof policy_version === "string" && policy_version.trim().length > 0
        ? policy_version.trim()
        : "2026-10-01";

    const finalTimestamp =
      typeof consent_timestamp === "string" && consent_timestamp.trim().length > 0
        ? consent_timestamp.trim()
        : new Date().toISOString();

    const finalWithdrawnAt =
      status === "withdrawn"
        ? (typeof withdrawn_at === "string" ? withdrawn_at : new Date().toISOString())
        : null;

    const supabase = getSupabaseClient();
    if (!supabase) {
      // In development or if Supabase is unconfigured, return success with warning flag
      return NextResponse.json({
        success: true,
        stored: "local_only",
        message: "Consent noted locally. Database configuration pending.",
      });
    }

    // 2. Insert or update the consent record
    const insertPayload = {
      consent_id,
      status,
      categories: sanitizedCategories,
      policy_version: finalPolicyVersion,
      consent_timestamp: finalTimestamp,
      withdrawn_at: finalWithdrawnAt,
      updated_at: new Date().toISOString(),
    };

    // Check if consent record with this consent_id already exists to update
    const { data: existing } = await supabase
      .from("cookie_consents")
      .select("id")
      .eq("consent_id", consent_id)
      .limit(1);

    let error: any = null;

    if (existing && existing.length > 0) {
      const updateRes = await supabase
        .from("cookie_consents")
        .update(insertPayload)
        .eq("consent_id", consent_id);
      error = updateRes.error;
    } else {
      const insertRes = await supabase
        .from("cookie_consents")
        .insert([insertPayload]);
      error = insertRes.error;
    }

    if (error) {
      // If table does not exist or permissions error, log safely and don't break the client
      console.warn("[Cookie Consent Ingestion] Remote write error:", error.message || error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to persist consent record remotely. Local preference remains active.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      consent_id,
      status,
      message: "Consent record successfully saved.",
    });
  } catch (err: unknown) {
    console.error("[Cookie Consent Ingestion] Unexpected server error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Server processing error.",
      },
      { status: 500 }
    );
  }
}
