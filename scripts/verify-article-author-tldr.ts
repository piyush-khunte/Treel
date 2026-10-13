import { getInsightBySlug } from "../src/lib/content/insights-storage";
import { getAuthorProfile } from "../src/lib/authors/author-registry";
import { slugifyAuthor } from "../src/lib/authors/author-utils";
import fs from "fs";
import path from "path";

async function runVerification() {
  console.log("=== STARTING VERIFICATION ===\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName} ${detail ? `- ${detail}` : ""}`);
      failed++;
    }
  }

  // 1. Incomplete Vehicle Digital Twins article fix
  const insight = await getInsightBySlug("vehicle-digital-twins-architecture");
  assert(!!insight, "Vehicle Digital Twins article fetched successfully");
  assert(
    insight?.body?.sections?.length === 3,
    "Article has all 3 complete sections",
    `Found: ${insight?.body?.sections?.length}`
  );

  const headings = insight?.body?.sections?.map((s) => s.heading) || [];
  assert(
    headings[0] === "The Limits of Raw Telemetry",
    "Section 1: The Limits of Raw Telemetry is present"
  );
  assert(
    headings[1] === "The Three-Layer Architecture of the Vehicle Digital Twin",
    "Section 2: The Three-Layer Architecture of the Vehicle Digital Twin is present"
  );
  assert(
    headings[2] === "From Reactive Downtime to Financial Predictability",
    "Section 3: From Reactive Downtime to Financial Predictability is present"
  );

  // 2. Removal of TL;DR branding/box from public page and admin
  const insightsPageSrc = fs.readFileSync(
    path.join(__dirname, "../src/app/insights/[slug]/page.tsx"),
    "utf-8"
  );
  assert(
    !insightsPageSrc.includes("<span>TL;DR</span>"),
    "TL;DR callout block removed from /insights/[slug]/page.tsx"
  );
  assert(
    !insightsPageSrc.includes("TL;DR Callout Block"),
    "TL;DR comments removed from /insights/[slug]/page.tsx"
  );

  const adminBlogsSrc = fs.readFileSync(
    path.join(__dirname, "../src/app/admin/blogs/page.tsx"),
    "utf-8"
  );
  assert(
    !adminBlogsSrc.includes("TL;DR Takeaway Box"),
    "TL;DR Takeaway Box field and label removed from /admin/blogs"
  );
  assert(
    adminBlogsSrc.includes("Article Sections") &&
      adminBlogsSrc.includes("Add Section") &&
      adminBlogsSrc.includes("Move Section Up"),
    "Multi-Section Article Editor present in /admin/blogs with Add & Reorder buttons"
  );

  // 3. Clickable author profiles site-wide
  assert(
    slugifyAuthor("Manish Ingale") === "manish-ingale",
    "Author slug generator correctly produces 'manish-ingale'"
  );

  const manishProfile = await getAuthorProfile("manish-ingale");
  assert(
    manishProfile.profile.name === "Manish Ingale",
    "Manish Ingale author profile exists with verified name"
  );
  assert(
    manishProfile.profile.isFounder === true,
    "Manish Ingale verified as Founder"
  );
  assert(
    manishProfile.articles.length >= 2,
    `Manish Ingale authored articles aggregated (found ${manishProfile.articles.length} articles)`
  );

  assert(
    insightsPageSrc.includes("/authors/${slugifyAuthor(article.author)}"),
    "Author profile linked in /insights/[slug]/page.tsx header and bio card"
  );

  const surakshaPageSrc = fs.readFileSync(
    path.join(__dirname, "../src/app/suraksha/blog/[slug]/page.tsx"),
    "utf-8"
  );
  assert(
    surakshaPageSrc.includes("/authors/${slugifyAuthor(article.author"),
    "Author profile linked in /suraksha/blog/[slug]/page.tsx"
  );

  const personalPageSrc = fs.readFileSync(
    path.join(__dirname, "../src/app/personal/blog/[slug]/page.tsx"),
    "utf-8"
  );
  assert(
    personalPageSrc.includes("/authors/${slugifyAuthor(article.author"),
    "Author profile linked in /personal/blog/[slug]/page.tsx"
  );

  // 4. RSS text removal while preserving feeds
  const articleClientSrc = fs.readFileSync(
    path.join(__dirname, "../src/app/insights/[slug]/article-client.tsx"),
    "utf-8"
  );
  assert(
    !articleClientSrc.includes("Also available via RSS") &&
      !articleClientSrc.includes("Subscribe via RSS"),
    "RSS promotional text removed from /insights/[slug]/article-client.tsx"
  );

  const insightsClientSrc = fs.readFileSync(
    path.join(__dirname, "../src/app/insights/insights-client.tsx"),
    "utf-8"
  );
  assert(
    !insightsClientSrc.includes("Also available via RSS"),
    "RSS promotional text removed from /insights/insights-client.tsx"
  );

  const tmipRssRouteSrc = fs.readFileSync(
    path.join(__dirname, "../src/app/tmip/insights/rss.xml/route.ts"),
    "utf-8"
  );
  assert(
    tmipRssRouteSrc.includes("<rss version=\"2.0\""),
    "RSS feed endpoint intact and functional at /tmip/insights/rss.xml"
  );

  console.log(`\n=== RESULTS: ${passed} PASSED, ${failed} FAILED ===`);
  if (failed > 0) process.exit(1);
}

runVerification();
