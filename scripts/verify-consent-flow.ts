import * as fs from "fs";
import * as path from "path";

// Load .env
const envPath = path.resolve(".env");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

import { 
  getAllConsentRecords, 
  saveConsentRecord, 
  getConsentStats, 
  normalizeConsentRecord 
} from "../src/lib/privacy/consent-storage";
import { 
  DEFAULT_CATEGORIES, 
  ACCEPTED_ALL_CATEGORIES 
} from "../src/lib/privacy/cookie-consent";
import { createClient } from "@supabase/supabase-js";

async function runConsentVerification() {
  console.log("=================================================");
  console.log("STARTING COOKIE CONSENT VERIFICATION SUITE");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}: ${detail || ""}`);
      failed++;
    }
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const testConsentId = `cons_test_${Date.now()}`;

  // -----------------------------------------------------------------
  // 1. ACCEPT ALL FLOW
  // -----------------------------------------------------------------
  console.log("--- 1. Testing 'Accept All' Flow ---");
  const acceptRecord = await saveConsentRecord({
    consentId: testConsentId,
    status: "accepted",
    rawCategories: ACCEPTED_ALL_CATEGORIES,
    policyVersion: "2026-10-01",
    source: "Cookie Banner",
    pagePath: "/tmip",
  });

  assert(acceptRecord.status === "Accepted", "Status normalized to 'Accepted'");
  assert(acceptRecord.decision === "Accepted All", "Decision recorded as 'Accepted All'");
  assert(acceptRecord.rawCategories.analytics === true, "Analytics permission granted");
  assert(acceptRecord.rawCategories.marketing === true, "Marketing permission granted");
  assert(acceptRecord.rawCategories.functional === true, "Functional permission granted");
  assert(acceptRecord.rawCategories.necessary === true, "Essential necessary cookie is true");

  // Verify remote persistence in Supabase TreelEcommerce.t_test
  const { data: remoteRow1 } = await supabase
    .from("TreelEcommerce.t_test")
    .select("*")
    .eq("_id", testConsentId)
    .single();

  assert(remoteRow1 !== null && remoteRow1.testKey === "treel_cookie_consent", "Record persisted to remote Supabase cloud storage (TreelEcommerce.t_test)");
  const parsedItem1 = JSON.parse(remoteRow1.item);
  assert(parsedItem1.consentId === testConsentId && parsedItem1.status === "Accepted", "Remote Supabase record contains verified consent details");

  // -----------------------------------------------------------------
  // 2. REJECT NON-ESSENTIAL (ESSENTIAL ONLY) FLOW
  // -----------------------------------------------------------------
  console.log("\n--- 2. Testing 'Reject Non-Essential' Flow ---");
  const rejectConsentId = `cons_test_rej_${Date.now()}`;
  const rejectRecord = await saveConsentRecord({
    consentId: rejectConsentId,
    status: "rejected",
    rawCategories: DEFAULT_CATEGORIES,
    policyVersion: "2026-10-01",
    source: "Cookie Banner",
    pagePath: "/",
  });

  assert(rejectRecord.status === "Rejected", "Status normalized to 'Rejected'");
  assert(rejectRecord.decision === "Rejected Non-Essential", "Decision recorded as 'Rejected Non-Essential'");
  assert(rejectRecord.rawCategories.analytics === false, "Analytics blocked on rejection");
  assert(rejectRecord.rawCategories.marketing === false, "Marketing blocked on rejection");
  assert(rejectRecord.rawCategories.functional === false, "Functional blocked on rejection");
  assert(rejectRecord.rawCategories.necessary === true, "Strictly necessary cookie remains active");

  // -----------------------------------------------------------------
  // 3. CUSTOMIZE & SAVE PREFERENCES FLOW
  // -----------------------------------------------------------------
  console.log("\n--- 3. Testing 'Custom Preferences' Flow ---");
  const customConsentId = `cons_test_cust_${Date.now()}`;
  const customRecord = await saveConsentRecord({
    consentId: customConsentId,
    status: "customized",
    rawCategories: {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: false, // User selectively authorized Analytics but rejected Marketing
    },
    policyVersion: "2026-10-01",
    source: "Cookie Preferences Page",
    pagePath: "/cookies",
  });

  assert(customRecord.status === "Customized", "Status normalized to 'Customized'");
  assert(customRecord.decision === "Custom Preferences", "Decision recorded as 'Custom Preferences'");
  assert(customRecord.rawCategories.analytics === true, "Analytics selectively authorized");
  assert(customRecord.rawCategories.marketing === false, "Marketing selectively denied");
  assert(customRecord.rawCategories.functional === true, "Functional selectively authorized");

  // -----------------------------------------------------------------
  // 4. WITHDRAW CONSENT FLOW
  // -----------------------------------------------------------------
  console.log("\n--- 4. Testing 'Withdraw Consent' Flow ---");
  const withdrawRecord = await saveConsentRecord({
    consentId: customConsentId, // Update the custom consent visitor
    status: "withdrawn",
    rawCategories: DEFAULT_CATEGORIES,
    policyVersion: "2026-10-01",
    withdrawnAt: new Date().toISOString(),
    source: "Cookie Preferences Withdrawal",
    pagePath: "/cookies",
  });

  assert(withdrawRecord.status === "Withdrawn", "Status updated to 'Withdrawn'");
  assert(withdrawRecord.decision === "Withdrawn", "Decision recorded as 'Withdrawn'");
  assert(withdrawRecord.withdrawnAt !== null, "Withdrawn timestamp recorded");
  assert(withdrawRecord.rawCategories.analytics === false, "Analytics revoked on withdrawal");
  assert(withdrawRecord.rawCategories.marketing === false, "Marketing revoked on withdrawal");

  // -----------------------------------------------------------------
  // 5. DEDUPLICATION & REPEATED SUBMISSIONS CHECK
  // -----------------------------------------------------------------
  console.log("\n--- 5. Testing Deduplication on Repeated Clicks ---");
  const allRecordsBefore = await getAllConsentRecords();
  const instancesOfCustomIdBefore = allRecordsBefore.filter(r => r.consentId === customConsentId);
  assert(instancesOfCustomIdBefore.length === 1, "Deduplication: exactly one record exists for visitor after repeated updates");

  // -----------------------------------------------------------------
  // 6. QUERY & KPI STATS CALCULATION
  // -----------------------------------------------------------------
  console.log("\n--- 6. Testing KPI Stats & Aggregations ---");
  const allRecords = await getAllConsentRecords();
  const stats = getConsentStats(allRecords);

  assert(stats.total === allRecords.length, `Total count matches record count (${stats.total})`);
  assert(stats.accepted >= 1, "Accepted count properly tracked");
  assert(stats.rejected >= 1, "Rejected count properly tracked");
  assert(stats.withdrawn >= 1, "Withdrawn count properly tracked");

  // -----------------------------------------------------------------
  // 7. SECURITY & UNATHENTICATED ACCESS REJECTION
  // -----------------------------------------------------------------
  console.log("\n--- 7. Testing Admin Authentication Protection ---");
  const { getAdminCookieConsents } = await import("../src/lib/admin/admin-actions");
  const unauthRes = await getAdminCookieConsents();
  assert(Boolean(unauthRes.success === false && unauthRes.error?.includes("Unauthorized")), "Unauthenticated call to getAdminCookieConsents is rejected");

  // -----------------------------------------------------------------
  // 8. CLEANUP TEST DATA
  // -----------------------------------------------------------------
  console.log("\n--- 8. Cleaning Up Verification Test Data ---");
  await supabase.from("TreelEcommerce.t_test").delete().in("_id", [testConsentId, rejectConsentId, customConsentId]);
  
  // Clean from local store
  const storePath = path.join(process.cwd(), "src", "lib", "data", "consents-store.json");
  if (fs.existsSync(storePath)) {
    const raw = JSON.parse(fs.readFileSync(storePath, "utf-8"));
    const cleaned = raw.filter((r: any) => ![testConsentId, rejectConsentId, customConsentId].includes(r.consentId));
    fs.writeFileSync(storePath, JSON.stringify(cleaned, null, 2), "utf-8");
  }
  console.log("Test records cleaned up from storage.");

  // -----------------------------------------------------------------
  // SUMMARY
  // -----------------------------------------------------------------
  console.log("\n=================================================");
  console.log(`VERIFICATION COMPLETE: ${passed} PASSED, ${failed} FAILED`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runConsentVerification().catch(err => {
  console.error("Verification failed with error:", err);
  process.exit(1);
});
