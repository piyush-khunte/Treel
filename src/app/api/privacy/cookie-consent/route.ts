import { NextRequest, NextResponse } from "next/server";
import { saveConsentRecord } from "@/lib/privacy/consent-storage";

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
      consentId,
      status,
      categories,
      policy_version,
      policyVersion,
      consent_timestamp,
      timestamp,
      withdrawn_at,
      withdrawnAt,
      source,
      page_path,
      pagePath,
    } = body;

    const finalConsentId = consent_id || consentId;

    // 1. Validation
    if (!finalConsentId || typeof finalConsentId !== "string" || finalConsentId.length < 5 || finalConsentId.length > 64) {
      return NextResponse.json(
        { success: false, error: "Invalid anonymous consent ID." },
        { status: 400 }
      );
    }

    const validStatuses = ["accepted", "rejected", "customized", "withdrawn"];
    const normalizedStatus = (status || "").toLowerCase();
    if (!normalizedStatus || !validStatuses.includes(normalizedStatus)) {
      return NextResponse.json(
        { success: false, error: "Invalid consent status. Allowed: accepted, rejected, customized, withdrawn." },
        { status: 400 }
      );
    }

    const sanitizedCategories = {
      necessary: true, // Always true for essential operational security
      functional: Boolean(categories?.functional),
      analytics: Boolean(categories?.analytics),
      marketing: Boolean(categories?.marketing),
    };

    const finalPolicyVersion =
      typeof (policy_version || policyVersion) === "string" && (policy_version || policyVersion).trim().length > 0
        ? (policy_version || policyVersion).trim()
        : "2026-10-01";

    const finalTimestamp =
      typeof (consent_timestamp || timestamp) === "string" && (consent_timestamp || timestamp).trim().length > 0
        ? (consent_timestamp || timestamp).trim()
        : new Date().toISOString();

    const finalWithdrawnAt =
      normalizedStatus === "withdrawn"
        ? (typeof (withdrawn_at || withdrawnAt) === "string" ? (withdrawn_at || withdrawnAt) : new Date().toISOString())
        : null;

    const finalSource = typeof source === "string" && source.trim() ? source.trim() : "Banner";
    const finalPagePath = typeof (page_path || pagePath) === "string" && (page_path || pagePath).trim() ? (page_path || pagePath).trim() : "/";

    // 2. Persist record across multi-tier storage (local file + remote Supabase)
    const saved = await saveConsentRecord({
      consentId: finalConsentId,
      status: normalizedStatus,
      rawCategories: sanitizedCategories,
      policyVersion: finalPolicyVersion,
      timestamp: finalTimestamp,
      withdrawnAt: finalWithdrawnAt,
      source: finalSource,
      pagePath: finalPagePath,
    });

    return NextResponse.json({
      success: true,
      consent_id: saved.consentId,
      status: saved.status,
      decision: saved.decision,
      message: "Consent record successfully saved.",
    });
  } catch (err: any) {
    console.error("[Cookie Consent Ingestion] Server error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Server processing error while persisting consent record.",
      },
      { status: 500 }
    );
  }
}
