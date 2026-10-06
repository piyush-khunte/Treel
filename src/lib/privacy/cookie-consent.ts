/**
 * Cookie Consent Management Helper
 * Handles first-party cookie persistence, category validation,
 * anonymous consent identifier generation, and server-side record synchronization.
 */

export interface ConsentCategories {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export type ConsentStatus = "accepted" | "rejected" | "customized" | "withdrawn";

export interface StoredConsent {
  consentId: string;
  status: ConsentStatus;
  categories: ConsentCategories;
  policyVersion: string;
  timestamp: string;
  withdrawnAt?: string | null;
}

export const CONSENT_COOKIE_NAME = "treel_cookie_consent";
export const CURRENT_POLICY_VERSION = "2026-10-01";
export const CONSENT_MAX_AGE_SECONDS = 31536000; // 1 year (365 days)

export const DEFAULT_CATEGORIES: ConsentCategories = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

export const ACCEPTED_ALL_CATEGORIES: ConsentCategories = {
  necessary: true,
  functional: true,
  analytics: true,
  marketing: true,
};

/**
 * Generates an anonymous consent identifier.
 * Does NOT contain any personal info (IP, email, name, user-agent).
 */
export function generateAnonymousConsentId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `cons_${crypto.randomUUID().replace(/-/g, "").slice(0, 16)}`;
  }
  const chars = "abcdef0123456789";
  let result = "cons_";
  for (let i = 0; i < 16; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

/**
 * Parses raw cookie string from document.cookie
 */
function readCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)" + encodeURIComponent(name) + "=([^;]*)"));
  return match ? decodeURIComponent(match[2]) : null;
}

/**
 * Writes the first-party consent cookie with proper attributes.
 */
function writeCookieValue(name: string, value: string, maxAgeSeconds: number = CONSENT_MAX_AGE_SECONDS): void {
  if (typeof document === "undefined") return;
  const isSecure = typeof window !== "undefined" && window.location.protocol === "https:";
  const cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${
    isSecure ? "; Secure" : ""
  }`;
  document.cookie = cookieString;
}

/**
 * Retrieves the current valid consent state from browser cookie (or migrated localStorage).
 * Returns null if no consent or if policy version has been updated.
 */
export function getStoredConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;

  try {
    // 1. Try reading document.cookie
    let raw = readCookieValue(CONSENT_COOKIE_NAME);

    // 2. Fallback to localStorage if cookie is missing
    if (!raw) {
      raw = localStorage.getItem(CONSENT_COOKIE_NAME);
    }

    if (!raw) return null;

    let parsed: any;
    try {
      parsed = JSON.parse(raw);
    } catch {
      // Legacy string value e.g. "accepted"
      if (raw === "accepted") {
        parsed = {
          consentId: generateAnonymousConsentId(),
          status: "accepted",
          categories: ACCEPTED_ALL_CATEGORIES,
          policyVersion: CURRENT_POLICY_VERSION,
          timestamp: new Date().toISOString(),
        };
      } else {
        return null;
      }
    }

    if (!parsed || typeof parsed !== "object") return null;

    // Check policy version match — if policy version has changed, prompt visitor again
    if (parsed.policyVersion !== CURRENT_POLICY_VERSION) {
      return null;
    }

    const consent: StoredConsent = {
      consentId: typeof parsed.consentId === "string" ? parsed.consentId : generateAnonymousConsentId(),
      status: ["accepted", "rejected", "customized", "withdrawn"].includes(parsed.status) ? parsed.status : "customized",
      categories: {
        necessary: true,
        functional: Boolean(parsed.categories?.functional),
        analytics: Boolean(parsed.categories?.analytics),
        marketing: Boolean(parsed.categories?.marketing),
      },
      policyVersion: CURRENT_POLICY_VERSION,
      timestamp: typeof parsed.timestamp === "string" ? parsed.timestamp : new Date().toISOString(),
      withdrawnAt: parsed.withdrawnAt || null,
    };

    return consent;
  } catch {
    return null;
  }
}

/**
 * Removes non-essential first party tracking cookies when consent is rejected or withdrawn.
 */
export function deleteNonEssentialCookies(): void {
  if (typeof document === "undefined") return;

  const cookiesToClear = ["_ga", "_gid", "_gat", "_clck", "_clsk", "_fbp", "_fbc", "_linkedin_partner_id"];
  const domain = window.location.hostname;
  const path = "/";

  cookiesToClear.forEach((name) => {
    document.cookie = `${name}=; Path=${path}; Max-Age=-1; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `${name}=; Path=${path}; Domain=.${domain}; Max-Age=-1; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `${name}=; Path=${path}; Domain=${domain}; Max-Age=-1; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  });
}

/**
 * Dispatches a client-side custom event so components and tracking loaders react immediately.
 */
function notifyConsentChange(consent: StoredConsent): void {
  if (typeof window === "undefined") return;
  try {
    const event = new CustomEvent("treel_consent_updated", { detail: consent });
    window.dispatchEvent(event);
  } catch {
    // Ignore event dispatch errors in legacy environments
  }
}

/**
 * Records consent to the server-side API asynchronously without blocking the user.
 */
async function syncConsentServerSide(consent: StoredConsent, action: "consent" | "update" | "withdraw"): Promise<void> {
  try {
    await fetch("/api/privacy/cookie-consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        consent_id: consent.consentId,
        status: consent.status,
        categories: consent.categories,
        policy_version: consent.policyVersion,
        consent_timestamp: consent.timestamp,
        withdrawn_at: consent.withdrawnAt || null,
        action,
      }),
    });
  } catch {
    // Graceful silent fallback — browser preference is already stored in cookie
    console.warn("[Cookie Consent] Remote sync was not completed; local consent is safely active.");
  }
}

/**
 * Saves consent preference to browser cookie and initiates server-side recording.
 */
export function saveConsentPreference(
  status: ConsentStatus,
  categories: Partial<ConsentCategories>,
  action: "consent" | "update" | "withdraw" = "consent"
): StoredConsent {
  const current = getStoredConsent();
  const consentId = current?.consentId || generateAnonymousConsentId();
  const now = new Date().toISOString();

  const finalCategories: ConsentCategories = {
    necessary: true,
    functional: Boolean(categories.functional),
    analytics: Boolean(categories.analytics),
    marketing: Boolean(categories.marketing),
  };

  const storedConsent: StoredConsent = {
    consentId,
    status,
    categories: finalCategories,
    policyVersion: CURRENT_POLICY_VERSION,
    timestamp: now,
    withdrawnAt: action === "withdraw" ? now : null,
  };

  const serialized = JSON.stringify(storedConsent);

  // 1. Write Cookie
  writeCookieValue(CONSENT_COOKIE_NAME, serialized);

  // 2. Mirror in localStorage for fast local reads
  try {
    localStorage.setItem(CONSENT_COOKIE_NAME, serialized);
  } catch {
    // LocalStorage quota or privacy mode
  }

  // 3. Clear non-essential tracking cookies if rejected/withdrawn
  if (status === "rejected" || status === "withdrawn" || (!finalCategories.analytics && !finalCategories.marketing)) {
    deleteNonEssentialCookies();
  }

  // 4. Notify all client subscribers
  notifyConsentChange(storedConsent);

  // 5. Fire server-side recording asynchronously
  syncConsentServerSide(storedConsent, action);

  return storedConsent;
}

/**
 * Withdraws all optional consent.
 */
export function withdrawAllConsent(): StoredConsent {
  return saveConsentPreference("withdrawn", DEFAULT_CATEGORIES, "withdraw");
}
