import { NextRequest, NextResponse } from "next/server";
import { saveConsentRecord } from "@/lib/privacy/consent-storage";
import { CURRENT_POLICY_VERSION } from "@/lib/privacy/cookie-consent";
import { getActiveServicesForCategories } from "@/lib/privacy/tracking-registry";
import { consumeRateLimit, getClientIp } from "@/lib/security/rate-limit";

const CONSENT_ID_RE = /^cons_[a-z0-9]{8,40}$/i;
// Labels sent by cookie-banner.tsx, cookie-preferences.tsx and withdrawAllConsent().
const ALLOWED_SOURCES = new Set([
  "Banner",
  "Cookie Banner",
  "Cookie Banner Preferences",
  "Cookie Preferences Page",
  "Cookie Preferences Withdrawal",
  "Preferences Settings",
]);

export async function POST(req: NextRequest) {
  try {
    // Consent changes are rare; this only stops scripted flooding of the audit trail.
    const wait = await consumeRateLimit(`consent:${getClientIp(req.headers)}`, 30, 10 * 60 * 1000);
    if (wait > 0) {
      return NextResponse.json(
        { success: false, error: "Too many consent updates. Please try again later." },
        { status: 429, headers: { "Retry-After": String(wait) } }
      );
    }

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
      source,
      page_path,
      pagePath,
    } = body;

    const finalConsentId = consent_id || consentId;

    // 1. Validation
    if (typeof finalConsentId !== "string" || !CONSENT_ID_RE.test(finalConsentId)) {
      return NextResponse.json(
        { success: false, error: "Invalid anonymous consent ID." },
        { status: 400 }
      );
    }

    const sanitizedCategories = {
      necessary: true, // Always true for essential operational security
      functional: Boolean(categories?.functional),
      analytics: Boolean(categories?.analytics),
      marketing: Boolean(categories?.marketing),
    };

    // The decision is derived from what was actually granted, so the audit trail can't
    // say "Accepted All" for a partial choice (or vice versa).
    const requestedStatus = typeof status === "string" ? status.toLowerCase() : "";
    let finalStatus: "accepted" | "rejected" | "customized" | "withdrawn";
    if (requestedStatus === "withdrawn") {
      finalStatus = "withdrawn";
      sanitizedCategories.functional = false;
      sanitizedCategories.analytics = false;
      sanitizedCategories.marketing = false;
    } else if (sanitizedCategories.functional && sanitizedCategories.analytics && sanitizedCategories.marketing) {
      finalStatus = "accepted";
    } else if (!sanitizedCategories.functional && !sanitizedCategories.analytics && !sanitizedCategories.marketing) {
      finalStatus = "rejected";
    } else {
      finalStatus = "customized";
    }

    const claimedPolicyVersion =
      typeof (policy_version || policyVersion) === "string" ? String(policy_version || policyVersion).trim().slice(0, 20) : "";
    const finalPolicyVersion = claimedPolicyVersion || CURRENT_POLICY_VERSION;

    // Server time is the authoritative record of when the decision was received.
    const recordedAt = new Date().toISOString();
    const claimedTimestamp =
      typeof (consent_timestamp || timestamp) === "string" && !Number.isNaN(Date.parse(consent_timestamp || timestamp))
        ? new Date(consent_timestamp || timestamp).toISOString()
        : recordedAt;

    const rawSource = typeof source === "string" ? source.trim() : "";
    const finalSource = ALLOWED_SOURCES.has(rawSource) ? rawSource : "Banner";
    const rawPath = typeof (page_path || pagePath) === "string" ? String(page_path || pagePath).trim() : "";
    const finalPagePath = rawPath.startsWith("/") ? rawPath.slice(0, 200) : "/";

    // What was actually switched on for this visitor in this deployment.
    const activeServices =
      finalStatus === "withdrawn" ? [] : getActiveServicesForCategories(sanitizedCategories);

    // 2. Persist record across multi-tier storage (local file + remote Supabase)
    const saved = await saveConsentRecord({
      consentId: finalConsentId,
      status: finalStatus,
      rawCategories: sanitizedCategories,
      policyVersion: finalPolicyVersion,
      timestamp: claimedTimestamp,
      recordedAt,
      withdrawnAt: finalStatus === "withdrawn" ? recordedAt : null,
      source: finalSource,
      pagePath: finalPagePath,
      activeServices,
    });

    return NextResponse.json({
      success: true,
      consent_id: saved.consentId,
      status: saved.status,
      decision: saved.decision,
      message: "Consent record successfully saved.",
    });
  } catch (err) {
    console.error("[Cookie Consent Ingestion] Server error:", err);
    return NextResponse.json(
      { success: false, error: "Server processing error while persisting consent record." },
      { status: 500 }
    );
  }
}
