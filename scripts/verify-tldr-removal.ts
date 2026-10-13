import fs from "fs";
import path from "path";
import { getInsightBySlug, saveInsight, deleteInsight } from "../src/lib/content/insights-storage";

async function runVerification() {
  console.log("=== STARTING TL;DR REMOVAL & KEY TAKEAWAY VERIFICATION SUITE ===\n");
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}${detail ? ` - Detail: ${detail}` : ""}`);
      failed++;
    }
  }

  try {
    // -----------------------------------------------------------------
    // TEST 1: Reference Article Data & Takeaway Retention
    // -----------------------------------------------------------------
    console.log("--- 1. Reference Article (test-persistence-slug-1791889971931) ---");
    const refArticle = await getInsightBySlug("test-persistence-slug-1791889971931");
    assert(!!refArticle, "Reference article exists in database / store");
    assert(
      refArticle?.tldr === "This is a critical TL;DR executive finding that must be preserved.",
      "Reference article preserves exact takeaway content containing literal 'TL;DR'",
      refArticle?.tldr
    );

    // -----------------------------------------------------------------
    // TEST 2: Public Insights Page Label (No TL;DR, Keeps KEY TAKEAWAY)
    // -----------------------------------------------------------------
    console.log("\n--- 2. Public Insights Article Template (/insights/[slug]) ---");
    const insightsSlugSrc = fs.readFileSync(
      path.join(process.cwd(), "src/app/insights/[slug]/page.tsx"),
      "utf-8"
    );
    assert(
      !insightsSlugSrc.includes("TL;DR · Key Takeaway") && !insightsSlugSrc.includes("TL;DR"),
      "No 'TL;DR' prefix or label in /insights/[slug]/page.tsx"
    );
    assert(
      insightsSlugSrc.includes("Key Takeaway") && insightsSlugSrc.includes("{article.tldr}"),
      "/insights/[slug]/page.tsx retains 'Key Takeaway' label and binds {article.tldr}"
    );

    // -----------------------------------------------------------------
    // TEST 3: TMIP Insights Page Label (No TL;DR, Consistent Key Takeaway)
    // -----------------------------------------------------------------
    console.log("\n--- 3. TMIP Insights Article Template (/tmip/insights/[slug]) ---");
    const tmipSlugSrc = fs.readFileSync(
      path.join(process.cwd(), "src/app/tmip/insights/[slug]/page.tsx"),
      "utf-8"
    );
    assert(
      !tmipSlugSrc.includes("TL;DR") && !tmipSlugSrc.includes("TLDR"),
      "No 'TL;DR' label in /tmip/insights/[slug]/page.tsx"
    );
    assert(
      tmipSlugSrc.includes("Key Takeaway") && tmipSlugSrc.includes("{article.tldr}"),
      "/tmip/insights/[slug]/page.tsx retains 'Key Takeaway' and binds {article.tldr}"
    );

    // -----------------------------------------------------------------
    // TEST 4: Suraksha Article Template (/suraksha/blog/[slug])
    // -----------------------------------------------------------------
    console.log("\n--- 4. Suraksha Blog Article Template (/suraksha/blog/[slug]) ---");
    const surakshaSlugSrc = fs.readFileSync(
      path.join(process.cwd(), "src/app/suraksha/blog/[slug]/page.tsx"),
      "utf-8"
    );
    assert(
      !surakshaSlugSrc.includes("TL;DR") && !surakshaSlugSrc.includes("TLDR"),
      "No 'TL;DR' label in /suraksha/blog/[slug]/page.tsx"
    );
    assert(
      surakshaSlugSrc.includes("Key Takeaway") && surakshaSlugSrc.includes("{article.keyTakeaway}"),
      "/suraksha/blog/[slug]/page.tsx retains 'Key Takeaway' and binds {article.keyTakeaway}"
    );

    // -----------------------------------------------------------------
    // TEST 5: Admin Panel Blogs Editor (/admin/blogs)
    // -----------------------------------------------------------------
    console.log("\n--- 5. Admin Panel Blog Management (/admin/blogs) ---");
    const adminBlogsSrc = fs.readFileSync(
      path.join(process.cwd(), "src/app/admin/blogs/page.tsx"),
      "utf-8"
    );
    assert(
      !adminBlogsSrc.includes("TL;DR Takeaway Box") && !adminBlogsSrc.includes("Copy TL;DR"),
      "No 'TL;DR Takeaway Box' or 'Copy TL;DR' in /admin/blogs/page.tsx"
    );
    assert(
      adminBlogsSrc.includes("Key Takeaway (Optional)") &&
      adminBlogsSrc.includes("Copy Key Takeaway") &&
      adminBlogsSrc.includes("editingItem.tldr"),
      "/admin/blogs/page.tsx has 'Key Takeaway (Optional)' label and preserves underlying editingItem.tldr mapping"
    );

    // -----------------------------------------------------------------
    // TEST 6: Audit Existing Insight Articles
    // -----------------------------------------------------------------
    console.log("\n--- 6. Existing Articles Key Takeaway Persistence ---");
    const vdt = await getInsightBySlug("vehicle-digital-twins-architecture");
    assert(
      !!vdt?.tldr && vdt.tldr.length > 20,
      "Article 'vehicle-digital-twins-architecture' has intact takeaway text",
      vdt?.tldr?.substring(0, 50) + "..."
    );

    const physics = await getInsightBySlug("physics-of-tyre-pressure-fuel-savings");
    assert(
      !!physics?.tldr && physics.tldr.length > 20,
      "Article 'physics-of-tyre-pressure-fuel-savings' has intact takeaway text",
      physics?.tldr?.substring(0, 50) + "..."
    );

    const iot = await getInsightBySlug("scaling-iot-across-indian-highways");
    assert(
      !!iot?.tldr && iot.tldr.length > 20,
      "Article 'scaling-iot-across-indian-highways' has intact takeaway text",
      iot?.tldr?.substring(0, 50) + "..."
    );

    // -----------------------------------------------------------------
    // TEST 7: Create & Save Test Article with Key Takeaway
    // -----------------------------------------------------------------
    console.log("\n--- 7. Create, Edit & Save Article with Key Takeaway ---");
    const testSlug = `verify-takeaway-${Date.now()}`;
    const created = await saveInsight({
      title: "Automated Verification Article",
      slug: testSlug,
      category: "Mobility Intelligence",
      tldr: "Autonomous vehicle telemetry provides real-time predictive failure alerts.",
      deck: "Deck summary for automated test",
      body: {
        sections: [
          {
            heading: "Technical Finding",
            paragraphs: ["Discussion of sensor calibrations and telemetry precision."]
          }
        ]
      }
    });

    assert(created.slug === testSlug, "Created test article successfully");
    assert(
      created.tldr === "Autonomous vehicle telemetry provides real-time predictive failure alerts.",
      "Created article has correct key takeaway"
    );

    // Edit test article (e.g. updating title, ensuring takeaway persists)
    const updated = await saveInsight({
      _id: created._id,
      slug: testSlug,
      title: "Updated Automated Verification Article",
    });
    assert(
      updated.tldr === "Autonomous vehicle telemetry provides real-time predictive failure alerts.",
      "Editing article preserves existing key takeaway text"
    );

    // Clean up
    await deleteInsight(created._id);
    const postCleanup = await getInsightBySlug(testSlug);
    assert(postCleanup === null, "Test article cleanly removed after verification");

    // -----------------------------------------------------------------
    // TEST 8: Full Codebase Audit for Remaining Unwanted TL;DR UI Labels
    // -----------------------------------------------------------------
    console.log("\n--- 8. Full Codebase Audit for Unwanted TL;DR UI Labels ---");
    const filesToAudit = [
      "src/app/insights/[slug]/page.tsx",
      "src/app/tmip/insights/[slug]/page.tsx",
      "src/app/suraksha/blog/[slug]/page.tsx",
      "src/app/personal/blog/[slug]/page.tsx",
      "src/app/admin/blogs/page.tsx",
      "src/app/tmip/features/maintenance/page.tsx",
      "src/app/tmip/platform/predictive-maintenance/page.tsx",
      "src/app/tmip/platform/vehicle-digital-twin/page.tsx",
      "src/app/vehicle-digital-twin/page.tsx",
    ];

    let foundUnwantedLabel = false;
    for (const relPath of filesToAudit) {
      const fullPath = path.join(process.cwd(), relPath);
      if (fs.existsSync(fullPath)) {
        const fileContent = fs.readFileSync(fullPath, "utf-8");
        // Look for literal TL;DR or TLDR in visible JSX/UI text (ignoring internal variable names like .tldr)
        const uiMatches = fileContent.match(/TL;DR|TLDR/g);
        if (uiMatches && uiMatches.length > 0) {
          console.error(`Unwanted TL;DR found in ${relPath}: ${uiMatches.length} occurrences`);
          foundUnwantedLabel = true;
        }
      }
    }
    assert(!foundUnwantedLabel, "No unwanted TL;DR or TLDR UI labels found in audited template files");

    console.log(`\n=== VERIFICATION COMPLETE: ${passed} passed, ${failed} failed ===`);
    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error("Verification suite failed with unhandled error:", err);
    process.exit(1);
  }
}

runVerification();
