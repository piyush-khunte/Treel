import {
  getAllCoupons,
  getCouponByCode,
  saveCoupon,
  deleteCoupon,
} from "../src/lib/commerce/coupon-storage";
import {
  validateCouponServer,
  getAvailableCouponsServer,
} from "../src/lib/commerce/coupon-validator";

async function runTests() {
  console.log("=== STARTING COUPON SEPARATION VERIFICATION TESTS ===\n");
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

  // TEST 1: Retrieve Personal TPMS coupons
  console.log("\n--- TEST GROUP 1: STORAGE CATEGORY ISOLATION ---");
  const personalCoupons = await getAllCoupons("PERSONAL_TPMS");
  assert(
    personalCoupons.length > 0 &&
      personalCoupons.every((c) => c.category === "PERSONAL_TPMS"),
    "getAllCoupons('PERSONAL_TPMS') returns ONLY Personal TPMS coupons",
    personalCoupons.map((c) => ({ code: c.code, cat: c.category }))
  );

  // TEST 2: Retrieve Suraksha coupons
  const surakshaCoupons = await getAllCoupons("SURAKSHA");
  assert(
    surakshaCoupons.length > 0 &&
      surakshaCoupons.every((c) => c.category === "SURAKSHA"),
    "getAllCoupons('SURAKSHA') returns ONLY Suraksha Commercial coupons",
    surakshaCoupons.map((c) => ({ code: c.code, cat: c.category }))
  );

  // TEST 3: Cross-contamination check in storage
  const personalHasSurakshaCode = personalCoupons.some(
    (c) => c.code === "SURAKSHA10" || c.code === "FLEET10"
  );
  assert(
    !personalHasSurakshaCode,
    "Personal coupons storage does not contain SURAKSHA10 or FLEET10"
  );

  const surakshaHasPersonalCode = surakshaCoupons.some(
    (c) =>
      c.code === "TREEL10" ||
      c.code === "WELCOME10" ||
      c.code === "FREESHIP" ||
      c.code === "TREEL500"
  );
  assert(
    !surakshaHasPersonalCode,
    "Suraksha coupons storage does not contain TREEL10, WELCOME10, FREESHIP, or TREEL500"
  );

  console.log("\n--- TEST GROUP 2: PERSONAL TPMS CART VALIDATION ---");
  const personalCartItems = [
    {
      id: "676f8544e26fc67c08c8a6bc",
      variant_id: "trl_4w_kit",
      name: "Car TPMS Kit - 4 Sensors",
      price_inr: 3749,
      quantity: 1,
      category: "Car Kit",
    },
  ];

  // TEST 4: Valid Personal coupon in Personal cart
  const treel10OnPersonal = await validateCouponServer({
    code: "TREEL10",
    items: personalCartItems,
    subtotalInr: 3749,
    brand: "personal",
  });
  assert(
    treel10OnPersonal.valid && treel10OnPersonal.discountAmountInr === 375,
    "TREEL10 applied successfully to Personal cart (10% discount = ₹375)",
    treel10OnPersonal
  );

  // TEST 5: Suraksha coupon in Personal cart MUST BE REJECTED
  const suraksha10OnPersonal = await validateCouponServer({
    code: "SURAKSHA10",
    items: personalCartItems,
    subtotalInr: 3749,
    brand: "personal",
  });
  assert(
    !suraksha10OnPersonal.valid &&
      (suraksha10OnPersonal.message.includes("Suraksha") ||
        suraksha10OnPersonal.error?.includes("Suraksha")),
    "SURAKSHA10 is REJECTED in Personal cart with clear brand mismatch message",
    suraksha10OnPersonal
  );

  // TEST 6: FLEET10 in Personal cart MUST BE REJECTED
  const fleet10OnPersonal = await validateCouponServer({
    code: "FLEET10",
    items: personalCartItems,
    subtotalInr: 3749,
    brand: "personal",
  });
  assert(
    !fleet10OnPersonal.valid &&
      (fleet10OnPersonal.message.includes("Suraksha") ||
        fleet10OnPersonal.error?.includes("Suraksha")),
    "FLEET10 is REJECTED in Personal cart with clear brand mismatch message",
    fleet10OnPersonal
  );

  console.log("\n--- TEST GROUP 3: SURAKSHA CART VALIDATION ---");
  const surakshaCartItems = [
    {
      id: "suraksha_10w",
      variant_id: "suraksha_10_tyre",
      name: "Treel Suraksha Commercial Safety Kit (10 Tyres)",
      sku: "SKU-SURAKSHA-10TYRE",
      price_inr: 1700,
      quantity: 10,
      vehicle_type: "truck",
      category: "commercial",
    },
  ];
  const surakshaSubtotal = 17000;

  // TEST 7: Valid Suraksha coupon in Suraksha cart
  const suraksha10OnSuraksha = await validateCouponServer({
    code: "SURAKSHA10",
    items: surakshaCartItems,
    subtotalInr: surakshaSubtotal,
    brand: "suraksha",
  });
  assert(
    suraksha10OnSuraksha.valid &&
      suraksha10OnSuraksha.discountAmountInr === 1700,
    "SURAKSHA10 applied successfully to Suraksha cart (10% discount = ₹1,700)",
    suraksha10OnSuraksha
  );

  // TEST 8: TREEL10 in Suraksha cart MUST BE REJECTED
  const treel10OnSuraksha = await validateCouponServer({
    code: "TREEL10",
    items: surakshaCartItems,
    subtotalInr: surakshaSubtotal,
    brand: "suraksha",
  });
  assert(
    !treel10OnSuraksha.valid &&
      (treel10OnSuraksha.message.includes("Personal TPMS") ||
        treel10OnSuraksha.error?.includes("Personal TPMS")),
    "TREEL10 is REJECTED in Suraksha cart with clear brand mismatch message",
    treel10OnSuraksha
  );

  // TEST 9: WELCOME10 in Suraksha cart MUST BE REJECTED
  const welcome10OnSuraksha = await validateCouponServer({
    code: "WELCOME10",
    items: surakshaCartItems,
    subtotalInr: surakshaSubtotal,
    brand: "suraksha",
  });
  assert(
    !welcome10OnSuraksha.valid &&
      (welcome10OnSuraksha.message.includes("Personal TPMS") ||
        welcome10OnSuraksha.error?.includes("Personal TPMS")),
    "WELCOME10 is REJECTED in Suraksha cart with clear brand mismatch message",
    welcome10OnSuraksha
  );

  console.log("\n--- TEST GROUP 4: AVAILABLE COUPONS MODAL ISOLATION ---");
  // TEST 10: Available coupons for Personal brand
  const personalOffers = await getAvailableCouponsServer({
    brand: "personal",
    subtotalInr: 3749,
  });
  const personalHasSurakshaOffer = personalOffers.some(
    (o) => o.code === "SURAKSHA10" || o.code === "FLEET10" || o.brand !== "personal"
  );
  assert(
    personalOffers.length > 0 && !personalHasSurakshaOffer,
    "getAvailableCouponsServer('personal') contains ZERO Suraksha coupons",
    personalOffers.map((o) => o.code)
  );

  // TEST 11: Available coupons for Suraksha brand
  const surakshaOffers = await getAvailableCouponsServer({
    brand: "suraksha",
    subtotalInr: 17000,
  });
  const surakshaHasPersonalOffer = surakshaOffers.some(
    (o) =>
      o.code === "TREEL10" ||
      o.code === "WELCOME10" ||
      o.code === "FREESHIP" ||
      o.code === "TREEL500" ||
      o.brand !== "suraksha"
  );
  assert(
    surakshaOffers.length > 0 && !surakshaHasPersonalOffer,
    "getAvailableCouponsServer('suraksha') contains ZERO Personal TPMS coupons",
    surakshaOffers.map((o) => o.code)
  );

  console.log("\n--- TEST GROUP 5: SERVER-SIDE VALIDATION & PERSISTENCE ---");
  // TEST 12: Creating coupon without valid category MUST FAIL
  const invalidCatResult = await saveCoupon({
    code: "TESTFAIL99",
    category: "INVALID_CAT" as any,
    discountType: "percent",
    discountValue: 10,
  });
  assert(
    !invalidCatResult.success &&
      invalidCatResult.error?.includes("Category must be strictly specified"),
    "saveCoupon without valid category ('PERSONAL_TPMS' | 'SURAKSHA') is rejected server-side",
    invalidCatResult
  );

  // TEST 13: Create a new Suraksha coupon
  const testSurakshaCoupon = await saveCoupon({
    code: "TESTSURAKSHA25",
    category: "SURAKSHA",
    discountType: "percent",
    discountValue: 25,
    description: "Automated test coupon for Suraksha",
  });
  assert(
    testSurakshaCoupon.success &&
      testSurakshaCoupon.data?.category === "SURAKSHA",
    "Successfully created TESTSURAKSHA25 with category: 'SURAKSHA'"
  );

  // Verify it works on Suraksha but is rejected on Personal
  const testOnSuraksha = await validateCouponServer({
    code: "TESTSURAKSHA25",
    items: surakshaCartItems,
    subtotalInr: surakshaSubtotal,
    brand: "suraksha",
  });
  assert(
    testOnSuraksha.valid && testOnSuraksha.discountAmountInr === 4250,
    "Newly created TESTSURAKSHA25 applies to Suraksha cart (25% = ₹4,250)"
  );

  const testOnPersonal = await validateCouponServer({
    code: "TESTSURAKSHA25",
    items: personalCartItems,
    subtotalInr: 3749,
    brand: "personal",
  });
  assert(
    !testOnPersonal.valid,
    "Newly created TESTSURAKSHA25 is strictly REJECTED on Personal cart"
  );

  // Clean up test coupon
  await deleteCoupon("TESTSURAKSHA25", "SURAKSHA");
  const cleanedCheck = await getCouponByCode("TESTSURAKSHA25");
  assert(cleanedCheck === null, "Successfully deleted test coupon TESTSURAKSHA25");

  console.log("\n--- TEST GROUP 6: EXACT PRODUCT-LEVEL ELIGIBILITY (THE TEST213OCT BUG FIX) ---");
  const suraksha6WheelItem = {
    id: "suraksha_6w",
    sku: "SKU-SURAKSHA-6W",
    productsku: "SKU-SURAKSHA-6W",
    name: "Treel Suraksha Commercial Safety Kit (6 Tyres)",
    title: "Treel Suraksha Commercial Safety Kit (6 Tyres)",
    price_inr: 10200,
    price: 10200,
    quantity: 6,
    tyreCount: 6,
  };

  const suraksha12WheelItem = {
    id: "suraksha_12w",
    sku: "SKU-SURAKSHA-12W",
    productsku: "SKU-SURAKSHA-12W",
    name: "Treel Suraksha Commercial Safety Kit (12 Tyres)",
    title: "Treel Suraksha Commercial Safety Kit (12 Tyres)",
    price_inr: 20400,
    price: 20400,
    quantity: 12,
    tyreCount: 12,
  };

  // TEST 14: TEST213OCT (configured for 6W) applied to 6W cart -> MUST SUCCEED
  const test213On6W = await validateCouponServer({
    code: "TEST213OCT",
    items: [suraksha6WheelItem],
    subtotalInr: 10200,
    brand: "suraksha",
  });
  assert(
    test213On6W.valid && test213On6W.discountAmountInr === 1020,
    "TEST213OCT applies successfully to 6-Wheel Suraksha kit (10% discount = ₹1,020)",
    test213On6W
  );

  // TEST 15: TEST213OCT applied to 12W cart -> MUST BE REJECTED!
  const test213On12W = await validateCouponServer({
    code: "TEST213OCT",
    items: [suraksha12WheelItem],
    subtotalInr: 20400,
    brand: "suraksha",
  });
  assert(
    !test213On12W.valid,
    "TEST213OCT is strictly REJECTED on 12-Wheel Suraksha cart (product mismatch)",
    test213On12W
  );

  // TEST 16: Available coupons modal for 12W cart MUST NOT show TEST213OCT
  const availableFor12W = await getAvailableCouponsServer({
    brand: "suraksha",
    subtotalInr: 20400,
    items: [suraksha12WheelItem],
  });
  const hasTest213In12WModal = availableFor12W.some((c) => c.code === "TEST213OCT");
  assert(
    !hasTest213In12WModal,
    "getAvailableCouponsServer for 12-Wheel cart EXCLUDES 6-Wheel-only TEST213OCT coupon",
    availableFor12W.map((c) => c.code)
  );

  // TEST 17: Available coupons modal for 6W cart MUST show TEST213OCT
  const availableFor6W = await getAvailableCouponsServer({
    brand: "suraksha",
    subtotalInr: 10200,
    items: [suraksha6WheelItem],
  });
  const hasTest213In6WModal = availableFor6W.some((c) => c.code === "TEST213OCT");
  assert(
    hasTest213In6WModal,
    "getAvailableCouponsServer for 6-Wheel cart INCLUDES TEST213OCT coupon",
    availableFor6W.map((c) => c.code)
  );

  // TEST 18: Zero product selection on product-specific coupon is prohibited
  const zeroProductSave = await saveCoupon({
    code: "FAILNOPROD",
    category: "SURAKSHA",
    scope: "product",
    discountType: "percent",
    discountValue: 10,
    productIds: [],
  });
  assert(
    !zeroProductSave.success &&
      zeroProductSave.error?.includes("At least one specific product must be selected"),
    "saveCoupon prohibits product-specific coupon with 0 products selected",
    zeroProductSave
  );

  // TEST 19: Multi-product coupon creation and validation
  const multiProductCoupon = await saveCoupon({
    code: "TESTMULTI610",
    category: "SURAKSHA",
    scope: "product",
    discountType: "percent",
    discountValue: 20,
    productIds: ["suraksha_6w", "suraksha_10w"],
    productSkus: ["SKU-SURAKSHA-6W", "SKU-SURAKSHA-10W"],
  });
  assert(
    multiProductCoupon.success,
    "Successfully created multi-product coupon TESTMULTI610 for 6W and 10W"
  );

  const multiOn6W = await validateCouponServer({
    code: "TESTMULTI610",
    items: [suraksha6WheelItem],
    subtotalInr: 10200,
    brand: "suraksha",
  });
  assert(multiOn6W.valid, "TESTMULTI610 is valid on 6-Wheel cart");

  const multiOn12W = await validateCouponServer({
    code: "TESTMULTI610",
    items: [suraksha12WheelItem],
    subtotalInr: 20400,
    brand: "suraksha",
  });
  assert(!multiOn12W.valid, "TESTMULTI610 is rejected on 12-Wheel cart");

  await deleteCoupon("TESTMULTI610", "SURAKSHA");

  // TEST 20: Mixed cart discount calculation strictly on eligible items
  console.log("\n--- TEST GROUP 7: MIXED CART DISCOUNTING BASIS ---");
  const personalMixedCart = [
    {
      id: "676f8544e26fc67c08c8a6bc",
      variant_id: "trl_4w_kit",
      name: "Car TPMS Kit - 4 Sensors",
      price_inr: 3749,
      quantity: 1,
      category: "Car Kit",
    },
    {
      id: "6a325020daabdfd882c42038",
      variant_id: "trl_2w_kit",
      name: "2W TPMS Kit : Bike",
      price_inr: 2500,
      quantity: 1,
      category: "Bike Kit",
      productsku: "MotorbikesSKU",
      sku: "MotorbikesSKU",
    },
  ];
  // TEST13OCTOBER is 15% on Bike Kit (₹2,500). Subtotal is 3749 + 2500 = ₹6,249.
  // 15% of ₹2,500 = ₹375.
  const bikeCouponOnMixedCart = await validateCouponServer({
    code: "TEST13OCTOBER",
    items: personalMixedCart,
    subtotalInr: 6249,
    brand: "personal",
  });
  assert(
    bikeCouponOnMixedCart.valid && bikeCouponOnMixedCart.discountAmountInr === 375,
    "Product coupon TEST13OCTOBER calculates 15% discount ONLY on Bike item (₹375), not entire cart",
    bikeCouponOnMixedCart
  );

  // Summary
  console.log("\n========================================================");
  console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log("========================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error("Test runner threw uncaught exception:", err);
  process.exit(1);
});
