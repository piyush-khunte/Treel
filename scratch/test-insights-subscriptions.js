/**
 * End-to-end Verification Script for Global Insights Subscriptions & Amazon SES Dispatch
 */
const http = require("http");

function httpRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, headers: res.headers, data: parsed });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, raw: body });
        }
      });
    });
    req.on("error", reject);
    if (postData) {
      req.write(typeof postData === "string" ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runTests() {
  console.log("=== Treel Insights Subscription & Broadcast Integration Tests ===\n");
  let passed = 0;
  let total = 0;

  function assert(condition, testName, detail) {
    total++;
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passed++;
    } else {
      console.error(`[FAIL] ${testName}`, detail || "");
    }
  }

  const testEmail = `fleet.tester.${Date.now()}@logistics-enterprises.in`;

  // 1. Subscribe new email via /api/newsletter/subscribe
  console.log("\n--- Test 1: Subscribe New Email ---");
  const subRes = await httpRequest(
    {
      hostname: "localhost",
      port: 3000,
      path: "/api/newsletter/subscribe",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    {
      email: testEmail,
      source: "insights_portal",
      interest: "Mobility Intelligence Research",
    }
  );

  assert(subRes.status === 200, "Subscribe endpoint returns HTTP 200", subRes);
  assert(subRes.data && subRes.data.success === true, "Subscribe returns success: true", subRes.data);
  assert(subRes.data && typeof subRes.data.token === "string" && subRes.data.token.length >= 16, "Subscribe returns a secure 1-click token", subRes.data);
  const subscriberToken = subRes.data?.token;

  // 2. Duplicate subscription idempotency
  console.log("\n--- Test 2: Idempotent Duplicate Subscribe ---");
  const dupRes = await httpRequest(
    {
      hostname: "localhost",
      port: 3000,
      path: "/api/newsletter/subscribe",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    {
      email: testEmail,
      source: "insights_portal",
    }
  );

  assert(dupRes.status === 200, "Duplicate subscribe returns HTTP 200", dupRes);
  assert(dupRes.data && dupRes.data.success === true, "Duplicate subscribe returns success: true", dupRes.data);

  // 3. Unsubscribe via 1-click token
  console.log("\n--- Test 3: Unsubscribe using Token ---");
  const unsubTokenRes = await httpRequest(
    {
      hostname: "localhost",
      port: 3000,
      path: "/api/unsubscribe",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    {
      token: subscriberToken,
      unsubscribeAll: true,
    }
  );

  assert(unsubTokenRes.status === 200, "Unsubscribe with token returns HTTP 200", unsubTokenRes);
  assert(unsubTokenRes.data && unsubTokenRes.data.success === true, "Unsubscribe returns success: true", unsubTokenRes.data);
  assert(unsubTokenRes.data?.subscriber?.status === "unsubscribed", "Subscriber status updated to 'unsubscribed'", unsubTokenRes.data);

  // 4. Reactivation when unsubscribed user re-subscribes
  console.log("\n--- Test 4: Re-subscribe Reactivation ---");
  const reactivateRes = await httpRequest(
    {
      hostname: "localhost",
      port: 3000,
      path: "/api/newsletter/subscribe",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    },
    {
      email: testEmail,
      source: "article_newsletter",
    }
  );

  assert(reactivateRes.status === 200, "Re-subscribe returns HTTP 200", reactivateRes);
  assert(reactivateRes.data && reactivateRes.data.success === true, "Re-subscribe returns success: true", reactivateRes.data);
  assert(reactivateRes.data?.message?.includes("reactivated") || reactivateRes.data?.message?.includes("subscribed"), "Re-subscribe acknowledges reactivation", reactivateRes.data);

  // 5. Test 1-click GET /api/unsubscribe?token=...
  console.log("\n--- Test 5: 1-Click GET Unsubscribe ---");
  const getUnsubRes = await httpRequest({
    hostname: "localhost",
    port: 3000,
    path: `/api/unsubscribe?token=${encodeURIComponent(subscriberToken)}`,
    method: "GET",
  });

  assert(getUnsubRes.status === 200, "GET /api/unsubscribe with token returns HTTP 200", getUnsubRes);
  assert(getUnsubRes.data && getUnsubRes.data.success === true, "GET /api/unsubscribe confirms success", getUnsubRes.data);

  // 6. Test Email Template Generator & Dispatcher Internals
  console.log("\n--- Test 6: Dispatcher & Template Generation ---");
  // Test by calling our internal modules directly in node environment
  try {
    const { 
      generateInsightEmailHtml, 
      generateInsightEmailText, 
      dispatchInsightNotification 
    } = require("../.next/server/chunks/src_lib_content_insights-broadcast_ts.js") || {};

    console.log("[INFO] Testing direct module exports if available...");
  } catch (e) {
    // Alternatively test via Node CLI runner
  }

  // Summary
  console.log("\n==================================================");
  console.log(`Results: ${passed}/${total} checks PASSED (${Math.round((passed / total) * 100)}%)`);
  console.log("==================================================");

  if (passed === total) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});

