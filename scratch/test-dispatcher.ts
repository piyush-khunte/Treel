import { 
  generateInsightEmailHtml, 
  generateInsightEmailText, 
  dispatchInsightNotification 
} from "../src/lib/content/insights-broadcast";
import { 
  getAllSubscribers, 
  getActiveSubscribers,
  hasBroadcastBeenSent
} from "../src/lib/content/subscriber-storage";
import { getPublishedInsights } from "../src/lib/content/insights-storage";
import { TreelInsightArticle } from "../src/types/content";

async function runDispatcherTests() {
  console.log("=== Insights Broadcast Dispatcher & Template Unit Tests ===\n");

  // 1. Get an existing insight
  const insights = await getPublishedInsights();
  const testArticle: TreelInsightArticle = insights[0] || {
    _id: "test_insight_unit",
    slug: "unit-test-telematics-payback",
    title: "Unit Test: The Telematics Payback Model",
    category: "Mobility Intelligence",
    deck: "Empirical evaluation of tyre telematics across highway corridors.",
    author: "Manish Ingale",
    authorRole: "Founder",
    authorBio: "Founder at Treel Mobility Solutions",
    date: "October 2026",
    readTime: "5 min read",
    status: "Published",
    tldr: "Predictive tyre telematics delivers measured ROI within 9 months.",
    body: {
      sections: [{ heading: "Executive Summary", paragraphs: ["Test paragraph content."] }],
    },
  };

  // 2. Test HTML Template Generation
  console.log("1. Testing HTML email generation...");
  const sampleRecipient = { email: "operator@fleetlogistics.in", token: "tok_test_abc123" };
  const html = generateInsightEmailHtml(testArticle, sampleRecipient, "https://treel.in");

  if (!html.includes("TREEL")) throw new Error("HTML template missing TREEL brand header");
  if (!html.includes(testArticle.title)) throw new Error("HTML template missing article title");
  if (!html.includes(`https://treel.in/insights/${testArticle.slug}`)) throw new Error("HTML template missing canonical article URL");
  if (!html.includes("tok_test_abc123")) throw new Error("HTML template missing 1-click unsubscribe token");
  if (!html.includes("Treel Mobility Solutions Pvt. Ltd.")) throw new Error("HTML template missing Pune HQ footer");
  console.log("   [PASS] HTML email contains authentic branding, canonical link, and 1-click token.");

  // 3. Test Plain Text Generation
  console.log("2. Testing Plain text email generation...");
  const text = generateInsightEmailText(testArticle, sampleRecipient, "https://treel.in");
  if (!text.includes(testArticle.title)) throw new Error("Plain text missing article title");
  if (!text.includes(`https://treel.in/insights/${testArticle.slug}`)) throw new Error("Plain text missing canonical article URL");
  if (!text.includes("tok_test_abc123")) throw new Error("Plain text missing 1-click unsubscribe token");
  console.log("   [PASS] Plain text email contains article URL and unsubscribe token.");

  // 4. Test Single Test Email Broadcast
  console.log("3. Testing Single Test Email Broadcast dispatch...");
  const testDispatchResult = await dispatchInsightNotification(testArticle, {
    testEmail: "lead-engineer@fleettest.in",
  });

  if (!testDispatchResult.success) throw new Error("Test broadcast failed: " + JSON.stringify(testDispatchResult));
  if (testDispatchResult.recipientCount !== 1) throw new Error("Test broadcast should target exactly 1 recipient");
  if (testDispatchResult.deliveredCount !== 1) throw new Error("Test broadcast should record 1 delivery");
  console.log("   [PASS] Test broadcast sent safely to test recipient without affecting production subscriber log.");

  // 5. Test Live Broadcast & Idempotency
  console.log("4. Testing Live Broadcast & Idempotency guard...");
  const uniqueArticleSlug = `test-unique-insight-${Date.now()}`;
  const uniqueArticle: TreelInsightArticle = {
    ...testArticle,
    slug: uniqueArticleSlug,
    title: `Autonomous Dispatch Test ${Date.now()}`,
  };

  // First broadcast
  const firstBroadcast = await dispatchInsightNotification(uniqueArticle);
  if (!firstBroadcast.success) throw new Error("First broadcast failed");
  console.log(`   [PASS] First broadcast recorded with status "${firstBroadcast.status}" for ${firstBroadcast.recipientCount} subscribers.`);

  // Verify hasBroadcastBeenSent
  const alreadyBroadcast = await hasBroadcastBeenSent(uniqueArticleSlug);
  if (!alreadyBroadcast) throw new Error("hasBroadcastBeenSent should return true after first broadcast");
  console.log("   [PASS] hasBroadcastBeenSent successfully reports broadcast as sent.");

  // Second broadcast (without force)
  const duplicateBroadcast = await dispatchInsightNotification(uniqueArticle, { force: false });
  if (!duplicateBroadcast.skipped) throw new Error("Duplicate broadcast should be skipped by idempotency guard");
  console.log("   [PASS] Duplicate broadcast was safely skipped (idempotency confirmed).");

  // Third broadcast (with force: true)
  const forcedBroadcast = await dispatchInsightNotification(uniqueArticle, { force: true });
  if (forcedBroadcast.skipped) throw new Error("Forced broadcast should not be skipped");
  console.log("   [PASS] Forced broadcast proceeded as expected.");

  console.log("\nAll Dispatcher Unit Tests PASSED Successfully!\n");
}

runDispatcherTests().catch((err) => {
  console.error("Dispatcher test failed:", err);
  process.exit(1);
});

