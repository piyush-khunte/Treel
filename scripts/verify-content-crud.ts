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
createAdminCategoryContent,
deleteAdminCategoryContent,
getAdminCategoryContent,
updateAdminCategoryContent
} from "../src/lib/admin/admin-actions";
import {
getAllBlogsFromDb
} from "../src/lib/blogs/blog-storage";
import {
deleteCaseStudy,
getAllCaseStudies,
getCaseStudyBySlug,
getPublishedCaseStudies,
saveCaseStudy
} from "../src/lib/content/casestudies-storage";
import {
deleteInsight,
getAllInsights,
getInsightBySlug,
getPublishedInsights,
saveInsight
} from "../src/lib/content/insights-storage";
import {
deleteSurakshaArticle,
getAllSurakshaArticles,
getPublishedSurakshaArticles,
getSurakshaArticleById,
saveSurakshaArticle
} from "../src/lib/content/suraksha-storage";

async function runContentCrudVerification() {
  console.log("=================================================");
  console.log("STARTING MULTI-CATEGORY CONTENT CRUD VERIFICATION");
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

  // ---------------------------------------------------------------------------
  // 1. Seed Content & Default Data Verification
  // ---------------------------------------------------------------------------
  console.log("--- 1. Seed Content Verification ---");

  const insights = await getAllInsights(true);
  assert(insights.length >= 6, "Treel Main has at least 6 seed insights", `Found ${insights.length}`);
  const hasTwinInsight = insights.some((i) => i.slug === "vehicle-digital-twins-architecture");
  assert(hasTwinInsight, "Treel Main contains vehicle-digital-twins-architecture");

  const caseStudies = await getAllCaseStudies(true);
  assert(caseStudies.length >= 6, "TMIP has at least 6 seed case studies", `Found ${caseStudies.length}`);
  const hasThousandTruck = caseStudies.some((c) => c.slug === "1000-truck-case-study");
  assert(hasThousandTruck, "TMIP contains 1000-truck-case-study");

  const suraksha = await getAllSurakshaArticles(true);
  assert(suraksha.length >= 14, "Suraksha has at least 14 seed articles", `Found ${suraksha.length}`);
  const hasBlowout = suraksha.some((s) => s.slug === "safety-front-blowout" || s._id === "safety-front-blowout");
  assert(hasBlowout, "Suraksha contains safety-front-blowout");

  const personalBlogs = await getAllBlogsFromDb();
  assert(personalBlogs.length >= 6, "Personal TPMS has at least 6 seed blogs", `Found ${personalBlogs.length}`);

  // ---------------------------------------------------------------------------
  // 2. Strict Category Isolation Checks
  // ---------------------------------------------------------------------------
  console.log("\n--- 2. Category Isolation Verification ---");

  const insightSlugs = new Set(insights.map((i) => i.slug));
  const caseStudySlugs = new Set(caseStudies.map((c) => c.slug));
  const surakshaIds = new Set(suraksha.map((s) => s.slug || s._id));
  const personalSlugs = new Set(personalBlogs.map((p) => p.slug));

  const insightInCaseStudies = [...insightSlugs].some((s) => caseStudySlugs.has(s));
  assert(!insightInCaseStudies, "No Treel Main insights leak into TMIP case studies");

  const caseStudyInSuraksha = [...caseStudySlugs].some((s) => surakshaIds.has(s));
  assert(!caseStudyInSuraksha, "No TMIP case studies leak into Suraksha articles");

  const surakshaInPersonal = [...surakshaIds].some((s) => personalSlugs.has(s));
  assert(!surakshaInPersonal, "No Suraksha articles leak into Personal TPMS blogs");

  // ---------------------------------------------------------------------------
  // 3. Treel Main CRUD & Draft/Publish Flow
  // ---------------------------------------------------------------------------
  console.log("\n--- 3. Treel Main (Insights) Storage CRUD ---");

  const testInsight = await saveInsight({
    _id: `test_ins_${Date.now()}`,
    slug: `test-insight-${Date.now()}`,
    title: "Testing Dynamic Telemetry Architecture",
    deck: "A comprehensive test insight exploring edge resilience.",
    category: "Mobility Intelligence",
    author: "Test Engineer",
    status: "Draft",
    tldr: "Drafts must remain hidden from public visitors."
  });

  assert(testInsight._id.startsWith("test_ins_"), "Created draft insight successfully");

  // Draft should NOT appear in getPublishedInsights
  const publishedInsights1 = await getPublishedInsights();
  const draftVisible1 = publishedInsights1.some((i) => i._id === testInsight._id);
  assert(!draftVisible1, "Draft insight is strictly excluded from public published insights");

  // Toggle status to Published
  await saveInsight({
    ...testInsight,
    status: "Published",
    title: "Updated Title for Telemetry Architecture"
  });

  const publishedInsights2 = await getPublishedInsights();
  const publishedVisible2 = publishedInsights2.some((i) => i._id === testInsight._id);
  assert(publishedVisible2, "Published insight is visible in public published insights");

  // Fetch by slug
  const fetchedInsight = await getInsightBySlug(testInsight.slug);
  assert(fetchedInsight?.title === "Updated Title for Telemetry Architecture", "Updated insight title resolved correctly by slug");

  // Delete insight
  const deletedInsight = await deleteInsight(testInsight._id);
  assert(deletedInsight, "Test insight deleted successfully");

  const fetchedAfterDelete = await getInsightBySlug(testInsight.slug);
  assert(!fetchedAfterDelete, "Deleted insight is no longer found in store");

  // ---------------------------------------------------------------------------
  // 4. TMIP (Case Studies) Storage CRUD
  // ---------------------------------------------------------------------------
  console.log("\n--- 4. TMIP (Case Studies) Storage CRUD ---");

  const testCs = await saveCaseStudy({
    _id: `test_cs_${Date.now()}`,
    slug: `test-case-study-${Date.now()}`,
    headline: "500 Electric Buses: 0.52% Energy Conservation",
    industry: "Passenger Transport",
    fleetSize: "500-2000",
    excerpt: "Measuring regenerative braking and tyre rolling resistance across electric city buses.",
    metricValue: "0.5–0.6% Fuel · 22% Tyre",
    metricLabel: "Measured transit efficiency",
    status: "Draft"
  });

  assert(testCs._id.startsWith("test_cs_"), "Created draft case study successfully");

  const publishedCs1 = await getPublishedCaseStudies();
  const draftCsVisible1 = publishedCs1.some((c) => c._id === testCs._id);
  assert(!draftCsVisible1, "Draft case study is strictly excluded from public case studies");

  // Publish case study
  await saveCaseStudy({
    ...testCs,
    status: "Published",
    metricValue: "0.52% Fuel Saved"
  });

  const publishedCs2 = await getPublishedCaseStudies();
  const publishedCsVisible2 = publishedCs2.some((c) => c._id === testCs._id);
  assert(publishedCsVisible2, "Published case study is visible in public case studies");

  const fetchedCs = await getCaseStudyBySlug(testCs.slug);
  assert(fetchedCs?.metricValue === "0.52% Fuel Saved", "Case study metric updated and fetched by slug");

  // Delete case study
  const deletedCs = await deleteCaseStudy(testCs._id);
  assert(deletedCs, "Test case study deleted successfully");

  const fetchedCsAfterDelete = await getCaseStudyBySlug(testCs.slug);
  assert(!fetchedCsAfterDelete, "Deleted case study is no longer found in store");

  // ---------------------------------------------------------------------------
  // 5. Suraksha Articles Storage CRUD
  // ---------------------------------------------------------------------------
  console.log("\n--- 5. Suraksha Articles Storage CRUD ---");

  const testSur = await saveSurakshaArticle({
    _id: `test_sur_${Date.now()}`,
    slug: `test-driver-guide-${Date.now()}`,
    title: "5 Safety Habits for Night Expressway Driving",
    category: "Safety",
    excerpt: "Night driving demands vigilant tyre pressure checks and scheduled rest windows.",
    author: "Driver Care Desk",
    readTime: "4 min read",
    keyTakeaway: "Take a 15-minute break every 3 hours.",
    status: "Draft"
  });

  assert(testSur._id.startsWith("test_sur_"), "Created draft Suraksha article successfully");

  const publishedSur1 = await getPublishedSurakshaArticles();
  const draftSurVisible1 = publishedSur1.some((s) => s._id === testSur._id);
  assert(!draftSurVisible1, "Draft Suraksha article is strictly excluded from public articles");

  // Publish Suraksha article
  await saveSurakshaArticle({
    ...testSur,
    status: "Published",
    title: "7 Safety Habits for Night Expressway Driving"
  });

  const publishedSur2 = await getPublishedSurakshaArticles();
  const publishedSurVisible2 = publishedSur2.some((s) => s._id === testSur._id);
  assert(publishedSurVisible2, "Published Suraksha article is visible in public articles");

  const fetchedSur = await getSurakshaArticleById(testSur._id);
  assert(fetchedSur?.title === "7 Safety Habits for Night Expressway Driving", "Suraksha article title updated and fetched by ID");

  // Delete Suraksha article
  const deletedSur = await deleteSurakshaArticle(testSur._id);
  assert(deletedSur, "Test Suraksha article deleted successfully");

  const fetchedSurAfterDelete = await getSurakshaArticleById(testSur._id);
  assert(!fetchedSurAfterDelete, "Deleted Suraksha article is no longer found in store");

  // ---------------------------------------------------------------------------
  // 6. Server Action Security (Unauthorized Mutations Rejected)
  // ---------------------------------------------------------------------------
  console.log("\n--- 6. Admin Action Security & Auth Verification ---");

  const unauthCreate = await createAdminCategoryContent("treel_main", { title: "Hacked Post" });
  assert(Boolean(!unauthCreate.success && unauthCreate.error?.includes("Unauthorized")), "Unauthenticated category create action is rejected");

  const unauthUpdate = await updateAdminCategoryContent("tmip", "some_id", { headline: "Hacked Headline" });
  assert(Boolean(!unauthUpdate.success && unauthUpdate.error?.includes("Unauthorized")), "Unauthenticated category update action is rejected");

  const unauthDelete = await deleteAdminCategoryContent("suraksha", "some_id");
  assert(Boolean(!unauthDelete.success && unauthDelete.error?.includes("Unauthorized")), "Unauthenticated category delete action is rejected");

  // ---------------------------------------------------------------------------
  // 7. Admin Category Fetch Action
  // ---------------------------------------------------------------------------
  console.log("\n--- 7. Admin Category Fetch Action ---");

  const treelMainRes = await getAdminCategoryContent("treel_main");
  assert(treelMainRes.success && Array.isArray(treelMainRes.data) && treelMainRes.data.length >= 6, "getAdminCategoryContent(treel_main) returns insights");

  const tmipRes = await getAdminCategoryContent("tmip");
  assert(tmipRes.success && Array.isArray(tmipRes.data) && tmipRes.data.length >= 6, "getAdminCategoryContent(tmip) returns case studies");

  const surakshaRes = await getAdminCategoryContent("suraksha");
  assert(surakshaRes.success && Array.isArray(surakshaRes.data) && surakshaRes.data.length >= 14, "getAdminCategoryContent(suraksha) returns driver articles");

  const personalRes = await getAdminCategoryContent("personal");
  assert(personalRes.success && Array.isArray(personalRes.data) && personalRes.data.length >= 6, "getAdminCategoryContent(personal) returns TPMS blogs");

  console.log("\n=================================================");
  console.log(`VERIFICATION SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runContentCrudVerification().catch((err) => {
  console.error("Test execution fatal error:", err);
  process.exit(1);
});

