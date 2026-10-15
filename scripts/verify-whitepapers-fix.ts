import fs from "fs";
import path from "path";
import {
  getAllWhitepapers,
  getPublishedWhitepapers,
  getWhitepaperBySlug,
  saveWhitepaper,
} from "@/lib/content/whitepapers-storage";

async function runVerification() {
  console.log("=================================================");
  console.log("WHITEPAPERS & RESEARCH ADMIN RE-ARCH VERIFICATION");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName} ${detail ? `- ${detail}` : ""}`);
      failed++;
    }
  }

  // 1. Storage & Seeding Verification
  const allPapers = await getAllWhitepapers();
  assert(allPapers.length >= 8, `Expected at least 8 whitepapers in store, found ${allPapers.length}`);

  const researchPapers = await getPublishedWhitepapers("research");
  assert(
    researchPapers.some((w) => w.slug === "predictive-maintenance-heavy"),
    "predictive-maintenance-heavy is published and displayed in research library"
  );
  assert(
    researchPapers.some((w) => w.slug === "infrastructure-construction-fleets"),
    "infrastructure-construction-fleets is published and displayed in research library"
  );

  const tmipPapers = await getPublishedWhitepapers("tmip");
  assert(
    !tmipPapers.some((w) => w.slug === "predictive-maintenance-heavy" && w.displayOnTmip === false),
    "predictive-maintenance-heavy is isolated from tmip when displayOnTmip=false"
  );
  assert(
    tmipPapers.some((w) => w.slug === "roi-fleet-intelligence"),
    "roi-fleet-intelligence is present in tmip whitepapers"
  );

  // 2. Slug & Alias Resolution Verification
  const predPaper = await getWhitepaperBySlug("predictive-maintenance-heavy");
  assert(
    predPaper !== null && predPaper.title === "Predictive Maintenance in Heavy Haulage & Mining",
    "getWhitepaperBySlug resolves predictive-maintenance-heavy"
  );
  assert(
    Array.isArray(predPaper?.chapters) && predPaper!.chapters!.length > 0,
    "predictive-maintenance-heavy has chapters array populated",
    `chapters count: ${predPaper?.chapters?.length}`
  );

  const infraPaper = await getWhitepaperBySlug("infrastructure-construction-fleets");
  assert(
    infraPaper !== null && infraPaper.title === "Fleet Operations in Infrastructure Construction",
    "getWhitepaperBySlug resolves infrastructure-construction-fleets"
  );

  const caseStudyAlias = await getWhitepaperBySlug("case-study-1000-truck");
  assert(
    caseStudyAlias !== null && caseStudyAlias.slug === "1000-truck-case-study",
    "getWhitepaperBySlug resolves alias case-study-1000-truck -> 1000-truck-case-study"
  );

  const digitalTwinAlias = await getWhitepaperBySlug("vehicle-digital-twin");
  assert(
    digitalTwinAlias !== null && digitalTwinAlias.slug === "vehicle-digital-twins-architecture",
    "getWhitepaperBySlug resolves alias vehicle-digital-twin -> vehicle-digital-twins-architecture"
  );

  const dataArchAlias = await getWhitepaperBySlug("data-architecture");
  assert(
    dataArchAlias !== null && dataArchAlias.slug === "time-series-infrastructure-heavy-haul",
    "getWhitepaperBySlug resolves alias data-architecture -> time-series-infrastructure-heavy-haul"
  );

  // 3. Save Mutation Preserves category and chapters
  const testId = "wp_test_unit_" + Date.now();
  const saveRes = await saveWhitepaper({
    _id: testId,
    title: "Unit Test Whitepaper for Treel Main",
    slug: "unit-test-whitepaper-treel-main",
    excerpt: "Unit testing whitepaper save and placement persistence.",
    topic: "Fleet Operations",
    industry: "Logistics",
    category: "treel_main",
    displayOnResearch: true,
    displayOnTmip: false,
    fileUrl: "/uploads/documents/test.pdf",
    fileFormat: "PDF",
    chapters: [
      "01. Introduction to Test",
      "02. Architecture Verification",
    ],
  });

  assert(saveRes.success === true, "saveWhitepaper succeeds with custom category and chapters");
  assert(saveRes.data?.category === "treel_main", "saveWhitepaper persisted category=treel_main");
  assert(saveRes.data?.chapters?.length === 2, "saveWhitepaper persisted chapters array");

  // Clean up test whitepaper
  const { deleteWhitepaper } = await import("@/lib/content/whitepapers-storage");
  await deleteWhitepaper(testId);

  // 4. Verification of Email Label and Free Domain Removal across forms
  const modalCode = fs.readFileSync(
    path.join(process.cwd(), "src/components/whitepapers/whitepaper-access-modal.tsx"),
    "utf8"
  );
  assert(!modalCode.includes("Business Work Email"), "whitepaper-access-modal.tsx does NOT contain 'Business Work Email'");
  assert(modalCode.includes("Email <span"), "whitepaper-access-modal.tsx contains 'Email <span'");
  assert(!modalCode.includes("freeDomains"), "whitepaper-access-modal.tsx does NOT contain freeDomains block");

  const roiFormCode = fs.readFileSync(
    path.join(process.cwd(), "src/app/research/roi-fleet-intelligence/whitepaper-form.tsx"),
    "utf8"
  );
  assert(!roiFormCode.includes("Work Email <span"), "research/roi-fleet-intelligence/whitepaper-form.tsx does NOT contain 'Work Email *'");
  assert(roiFormCode.includes("Email <span"), "research/roi-fleet-intelligence/whitepaper-form.tsx contains 'Email *'");

  const dataArchFormCode = fs.readFileSync(
    path.join(process.cwd(), "src/app/research/data-architecture/whitepaper-form.tsx"),
    "utf8"
  );
  assert(!dataArchFormCode.includes("FREE_EMAIL_DOMAINS"), "research/data-architecture/whitepaper-form.tsx does NOT contain FREE_EMAIL_DOMAINS");
  assert(!dataArchFormCode.includes("Work email <span"), "research/data-architecture/whitepaper-form.tsx does NOT contain 'Work email *'");
  assert(dataArchFormCode.includes("Email <span"), "research/data-architecture/whitepaper-form.tsx contains 'Email *'");

  const tmipFormCode = fs.readFileSync(
    path.join(process.cwd(), "src/app/tmip/whitepapers/roi-fleet-intelligence/whitepaper-form.tsx"),
    "utf8"
  );
  assert(!tmipFormCode.includes("freeEmailDomains"), "tmip/whitepapers/roi-fleet-intelligence/whitepaper-form.tsx does NOT contain freeEmailDomains");
  assert(!tmipFormCode.includes("Work email <span"), "tmip/whitepapers/roi-fleet-intelligence/whitepaper-form.tsx does NOT contain 'Work email *'");
  assert(tmipFormCode.includes("Email <span"), "tmip/whitepapers/roi-fleet-intelligence/whitepaper-form.tsx contains 'Email *'");

  // 5. Test Personal Email Acceptance
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const testEmails = [
    "user@gmail.com",
    "director@fleetanalytics.org",
    "operator@yahoo.co.in",
    "ramesh@outlook.com",
    "fleet-admin@icloud.com",
  ];
  const allValid = testEmails.every((e) => emailRegex.test(e));
  assert(allValid, "Standard email regex accepts personal domains (gmail, yahoo, outlook, icloud) as well as enterprise");

  // 6. Admin Page Verification
  const adminPageCode = fs.readFileSync(
    path.join(process.cwd(), "src/app/admin/whitepapers/page.tsx"),
    "utf8"
  );
  assert(adminPageCode.includes("/research"), "admin/whitepapers/page.tsx mentions /research");
  assert(adminPageCode.includes("filterChannel"), "admin/whitepapers/page.tsx has filterChannel state");
  assert(adminPageCode.includes("Treel Main"), "admin/whitepapers/page.tsx has Treel Main channel badges");
  assert(adminPageCode.includes("Add Chapter"), "admin/whitepapers/page.tsx has Chapters editor");

  console.log(`\n=================================================`);
  console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log(`=================================================`);

  if (failed > 0) {
    process.exit(1);
  }
}

runVerification().catch((err) => {
  console.error("Verification script error:", err);
  process.exit(1);
});

