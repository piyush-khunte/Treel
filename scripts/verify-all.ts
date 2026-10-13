import * as fs from "fs";
import * as path from "path";

// Load .env manually
try {
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
} catch (e) {
  console.warn("Could not load .env:", e);
}

import { 
  countWords, 
  validateNoticeWordCount, 
  validateAndNormalizeDriveUrl,
  MAX_NOTICE_WORD_COUNT 
} from "../src/lib/notices/notice-utils";
import {
  getAllNotices,
  saveNotice,
  removeNotice
} from "../src/lib/notices/notice-storage";
import {
  getAllBlogsFromDb,
  getPublishedBlogsFromDb,
  getBlogBySlugFromDb,
  toSupabaseBlogPayload,
  fromSupabaseBlogRow
} from "../src/lib/blogs/blog-storage";
import { createClient } from "@supabase/supabase-js";

async function runVerification() {
  console.log("=================================================");
  console.log("STARTING FULL NOTICES & BLOGS VERIFICATION SUITE");
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

  // -----------------------------------------------------------------
  // 1. NOTICE UTILITIES TESTS
  // -----------------------------------------------------------------
  console.log("--- 1. Testing Notice Utilities ---");

  // Word count
  const sampleText = "One two three four five six seven.";
  assert(countWords(sampleText) === 7, "Word counter accurately counts 7 words");
  assert(validateNoticeWordCount(sampleText).valid === true, "Valid word count passes validation");

  const longWords = Array(155).fill("word").join(" ");
  const longValidation = validateNoticeWordCount(longWords);
  assert(longValidation.valid === false && longValidation.count === 155, "Notice > 150 words is rejected", `Count was ${longValidation.count}`);

  // Google Drive URL validation & normalization
  const validDriveUrl1 = "https://drive.google.com/file/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OIvE2up0Y/view?usp=sharing";
  const norm1 = validateAndNormalizeDriveUrl(validDriveUrl1);
  assert(Boolean(norm1.valid === true && (norm1.normalizedUrl?.includes("/view") || norm1.normalizedUrl?.includes("/preview"))), "Standard Google Drive file URL normalized to viewable format");

  const validDocsUrl = "https://docs.google.com/document/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OIvE2up0Y/edit?usp=sharing";
  const normDocs = validateAndNormalizeDriveUrl(validDocsUrl);
  assert(Boolean(normDocs.valid === true && normDocs.normalizedUrl?.includes("/preview")), "Google Docs share URL normalized to /preview");

  const invalidUrl = "https://dropbox.com/s/12345/document.pdf";
  const normInvalid = validateAndNormalizeDriveUrl(invalidUrl);
  assert(normInvalid.valid === false, "Non-Google Drive URL is rejected");

  // -----------------------------------------------------------------
  // 2. NOTICES PERSISTENCE & VISIBILITY PIPELINE
  // -----------------------------------------------------------------
  console.log("\n--- 2. Testing Notices Persistence & Public Visibility ---");

  const testNoticeId = `test_notice_${Date.now()}`;
  const testDriveShareUrl = "https://drive.google.com/file/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ123456/view?usp=drivesdk";
  const normTestUrl = validateAndNormalizeDriveUrl(testDriveShareUrl).normalizedUrl;

  // Create Published Notice
  const publishedNotice = {
    _id: testNoticeId,
    title: "Official AGM Announcement 2026",
    description: "Notice is hereby given that the Annual General Meeting of Treel Mobility Solutions will be held on October 30, 2026.",
    publishedDate: "2026-10-30",
    category: "Regulatory",
    status: "Published" as const,
    documentUrl: normTestUrl,
  };

  const savedNotice = await saveNotice(publishedNotice);
  assert(savedNotice._id === testNoticeId, "Published notice created in persistent multi-tier store");

  // Verify it appears in persistent notices
  let allNotices = await getAllNotices();
  const foundPub = allNotices.find(n => n._id === testNoticeId);
  assert(foundPub !== undefined && foundPub.status === "Published", "Published notice is queryable and active");
  assert(foundPub?.documentUrl?.includes("drive.google.com") === true, "Document link persisted with normalized format");

  // Toggle to Draft
  const draftNotice = { ...publishedNotice, status: "Draft" as const };
  await saveNotice(draftNotice);
  allNotices = await getAllNotices();
  const foundDraft = allNotices.find(n => n._id === testNoticeId);
  assert(foundDraft !== undefined && foundDraft.status === "Draft", "Notice status updated to Draft");

  // Filter as public visitors see it:
  const publicNotices = allNotices.filter(n => n.status === "Published");
  const draftInPublic = publicNotices.some(n => n._id === testNoticeId);
  assert(draftInPublic === false, "Draft notices remain strictly hidden from public notice board");

  // Cleanup notice
  await removeNotice(testNoticeId);
  allNotices = await getAllNotices();
  const deletedNoticeFound = allNotices.some(n => n._id === testNoticeId);
  assert(deletedNoticeFound === false, "Test notice successfully deleted from persistent store");

  // -----------------------------------------------------------------
  // 3. BLOGS CRUD & STORAGE PIPELINE
  // -----------------------------------------------------------------
  console.log("\n--- 3. Testing Blogs CRUD & Supabase TreelEcommerce.blogs Pipeline ---");

  const testBlogSlug = `test-smart-tyre-guide-${Date.now()}`;
  const testBlogId = `blog_test_${Date.now()}`;

  const testBlogData = {
    _id: testBlogId,
    title: "How Smart Tyre Sensors Revolutionize High-Speed Highway Safety",
    subtitle: "Real-time thermal monitoring across Samruddhi Mahamarg",
    slug: testBlogSlug,
    category: "Road Safety",
    author: "Treel Research Desk",
    readTime: "5 min read",
    status: "Published" as const,
    description: "Explore the thermodynamic benefits of sub-second BLE tyre sensor telemetry on Indian expressways.",
    blogContent: "<p>Continuous real-time telemetry alerts drivers before frictional heat compromises radial tyre integrity.</p>",
    metatitle: "Smart Tyre Sensors on Highway · Treel",
    metadescription: "Explore the thermodynamic benefits of sub-second BLE tyre sensor telemetry on Indian expressways."
  };

  // Convert to Supabase row & test serialization
  const payload = toSupabaseBlogPayload(testBlogData);
  assert(Array.isArray(payload.title) && payload.title[0] === testBlogData.title, "Blog title serialized as PostgreSQL text array [title]");
  assert(typeof payload.__v === "string" && payload.__v.includes("Road Safety"), "Blog metadata serialized into __v JSON");

  // Insert into database
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error: insertErr } = await supabase.from("TreelEcommerce.blogs").insert([payload]);
  assert(!insertErr, "Blog inserted successfully into TreelEcommerce.blogs", insertErr?.message);

  // Read back via getAllBlogsFromDb
  const allBlogs = await getAllBlogsFromDb();
  const fetchedBlog = allBlogs.find(b => b.slug === testBlogSlug);
  assert(fetchedBlog !== undefined, "Blog retrieved from DB via getAllBlogsFromDb");
  assert(fetchedBlog?.title === testBlogData.title, "Title array deserialized to plain string title");
  assert(fetchedBlog?.status === "Published", "Status deserialized from __v metadata");

  // Read via getPublishedBlogsFromDb
  const publishedBlogs = await getPublishedBlogsFromDb();
  const pubFound = publishedBlogs.some(b => b.slug === testBlogSlug);
  assert(pubFound === true, "Published blog appears in getPublishedBlogsFromDb");

  // Read via getBlogBySlugFromDb
  const slugFound = await getBlogBySlugFromDb(testBlogSlug);
  assert(slugFound !== null && slugFound._id === testBlogId, "Blog resolved correctly by slug");

  // Test Draft Status Visibility
  const draftPayload = toSupabaseBlogPayload({ ...testBlogData, status: "Draft" });
  await supabase.from("TreelEcommerce.blogs").update(draftPayload).eq("_id", testBlogId);

  const publishedAfterDraft = await getPublishedBlogsFromDb();
  const draftInPublished = publishedAfterDraft.some(b => b.slug === testBlogSlug);
  assert(draftInPublished === false, "Draft blog is completely hidden from public published blogs list");

  // Cleanup test blog from database
  const { error: delErr } = await supabase.from("TreelEcommerce.blogs").delete().eq("_id", testBlogId);
  assert(!delErr, "Test blog cleaned up from TreelEcommerce.blogs", delErr?.message);

  // -----------------------------------------------------------------
  // 4. COOKIE CONSENT PERSISTENCE & STATS PIPELINE
  // -----------------------------------------------------------------
  console.log("\n--- 4. Testing Cookie Consent Persistence & Stats ---");
  const { saveConsentRecord, getAllConsentRecords, getConsentStats } = await import("../src/lib/privacy/consent-storage");

  const testConsentId = `cons_test_${Date.now()}`;
  const savedConsent = await saveConsentRecord({
    consentId: testConsentId,
    status: "accepted",
    rawCategories: { necessary: true, functional: true, analytics: true, marketing: true },
    policyVersion: "2026-10-01",
    source: "Cookie Banner",
    pagePath: "/tmip",
  });

  assert(Boolean(savedConsent.status === "Accepted" && savedConsent.decision === "Accepted All"), "Consent saved and normalized to Accepted All");
  assert(Boolean(savedConsent.rawCategories.analytics && savedConsent.rawCategories.marketing), "Consent permissions correctly set to true");

  const allConsents = await getAllConsentRecords();
  const consentFound = allConsents.some(c => c.consentId === testConsentId);
  assert(Boolean(consentFound), "Consent record queryable via getAllConsentRecords");

  const consentStats = getConsentStats(allConsents);
  assert(Boolean(consentStats.total > 0 && consentStats.accepted > 0), "Consent stats computed properly");

  // Clean test consent
  await supabase.from("TreelEcommerce.t_test").delete().eq("_id", testConsentId);
  const storePath = path.resolve("src/lib/data/consents-store.json");
  if (fs.existsSync(storePath)) {
    const raw = JSON.parse(fs.readFileSync(storePath, "utf-8"));
    const cleaned = raw.filter((r: any) => r.consentId !== testConsentId);
    fs.writeFileSync(storePath, JSON.stringify(cleaned, null, 2), "utf-8");
  }

  // -----------------------------------------------------------------
  // 5. SERVER ACTIONS AUTHENTICATION SECURITY CHECK
  // -----------------------------------------------------------------
  console.log("\n--- 5. Testing Server Action Security & Authentication ---");
  const { createAdminNotice, createAdminBlog, deleteAdminNotice, getAdminCookieConsents } = await import("../src/lib/admin/admin-actions");

  const unauthNotice = await createAdminNotice({ title: "Hack attempt", description: "unauth" });
  assert(Boolean(unauthNotice.success === false && unauthNotice.error?.includes("Unauthorized")), "Unauthenticated notice creation rejected");

  const unauthBlog = await createAdminBlog({ title: "Hack blog", slug: "hack-blog" });
  assert(Boolean(unauthBlog.success === false && unauthBlog.error?.includes("Unauthorized")), "Unauthenticated blog creation rejected");

  const unauthDelete = await deleteAdminNotice("some_id");
  assert(Boolean(unauthDelete.success === false && unauthDelete.error?.includes("Unauthorized")), "Unauthenticated notice deletion rejected");

  const unauthConsent = await getAdminCookieConsents();
  assert(Boolean(unauthConsent.success === false && unauthConsent.error?.includes("Unauthorized")), "Unauthenticated call to getAdminCookieConsents rejected");

  // -----------------------------------------------------------------
  // 6. SUMMARY
  // -----------------------------------------------------------------
  console.log("\n=================================================");
  console.log(`VERIFICATION COMPLETE: ${passed} PASSED, ${failed} FAILED`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runVerification().catch(err => {
  console.error("Verification script error:", err);
  process.exit(1);
});
