import {
  getPublishedSurakshaArticles,
  getPublishedSurakshaArticleBySlug,
  getSurakshaArticleBySlug,
  saveSurakshaArticle,
  deleteSurakshaArticle,
} from "../src/lib/content/suraksha-storage";

async function runTests() {
  console.log("=== STARTING SURAKSHA BLOG ARTICLE DETAIL VERIFICATION TESTS ===\n");
  let passed = 0;
  let failed = 0;

  function assert(condition: any, testName: string, details?: any) {
    if (Boolean(condition)) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName}`, details || "");
      failed++;
    }
  }

  // TEST 1: Retrieve published articles
  const publishedArticles = await getPublishedSurakshaArticles();
  assert(
    publishedArticles.length > 0,
    "getPublishedSurakshaArticles returns list of published articles",
    `Found ${publishedArticles.length} articles`
  );

  // TEST 2: Resolve specific seed slug
  const article1 = await getPublishedSurakshaArticleBySlug("fuel-10-tips");
  assert(
    article1 !== null && article1.slug === "fuel-10-tips",
    "getPublishedSurakshaArticleBySlug('fuel-10-tips') resolves correctly",
    article1?.title
  );

  // TEST 3: Resolve another seed slug
  const article2 = await getPublishedSurakshaArticleBySlug("safety-front-blowout");
  assert(
    article2 !== null && article2.slug === "safety-front-blowout",
    "getPublishedSurakshaArticleBySlug('safety-front-blowout') resolves correctly",
    article2?.title
  );

  // TEST 4: Case insensitive slug resolution
  const articleCaseInsensitive = await getPublishedSurakshaArticleBySlug("FUEL-10-TIPS");
  assert(
    articleCaseInsensitive !== null && articleCaseInsensitive.slug === "fuel-10-tips",
    "Slug lookup is case-insensitive ('FUEL-10-TIPS' -> 'fuel-10-tips')",
    articleCaseInsensitive?.title
  );

  // TEST 5: ID fallback lookup
  const articleById = await getPublishedSurakshaArticleBySlug("sur_1");
  assert(
    articleById !== null && (articleById.slug === "fuel-10-tips" || articleById._id === "sur_1"),
    "Slug lookup supports direct _id resolution ('sur_1')",
    articleById?.title
  );

  // TEST 6: Invalid slug returns null
  const invalidArticle = await getPublishedSurakshaArticleBySlug("non-existent-article-slug-xyz");
  assert(
    invalidArticle === null,
    "Non-existent slug returns null (triggers notFound() 404)"
  );

  // TEST 7: Draft isolation test
  const draftTest = await saveSurakshaArticle({
    title: "Draft Test Article For Highway",
    slug: "draft-test-article",
    excerpt: "This is a draft article that must not be publicly accessible",
    status: "Draft",
  });

  const publicDraftCheck = await getPublishedSurakshaArticleBySlug("draft-test-article");
  assert(
    publicDraftCheck === null,
    "Draft article is NOT returned by getPublishedSurakshaArticleBySlug (protected from public)",
    publicDraftCheck
  );

  const internalDraftCheck = await getSurakshaArticleBySlug("draft-test-article", true);
  assert(
    internalDraftCheck !== null && internalDraftCheck.status === "Draft",
    "Draft article is accessible when includeDrafts=true (admin preview support)",
    internalDraftCheck?.title
  );

  // Clean up test draft
  await deleteSurakshaArticle("draft-test-article");
  const cleanedCheck = await getSurakshaArticleBySlug("draft-test-article", true);
  assert(cleanedCheck === null, "Draft test article cleaned up successfully");

  console.log("\n========================================================");
  console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log("========================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test runner threw error:", err);
  process.exit(1);
});
