import { 
  getAllProducts, 
  saveProduct, 
  deleteProduct, 
  getProductBySlug 
} from "../src/lib/commerce/product-storage";
import { 
  validateCartBrandServer, 
  isSurakshaProductOrItem, 
  isPersonalProductOrItem 
} from "../src/lib/commerce/brand-validator";

async function runVerification() {
  console.log("=== STARTING BRAND SEPARATION VERIFICATION SUITE ===\n");
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
    // TEST 1: Server-side brand requirement on product creation
    // -----------------------------------------------------------------
    console.log("--- 1. Product Creation Brand Requirement ---");
    let caughtBrandError = false;
    try {
      await saveProduct({
        title: "Test Brandless Product",
        price: 999,
        // no brand provided
      });
    } catch (err: any) {
      caughtBrandError = err.message.includes("Product brand is required");
    }
    assert(caughtBrandError, "Creating a product without brand must throw brand required error");

    // -----------------------------------------------------------------
    // TEST 2: Create Personal TPMS Product
    // -----------------------------------------------------------------
    console.log("\n--- 2. Create Personal TPMS Product ---");
    const testPersonalSlug = `test-personal-sku-${Date.now()}`;
    const personalProd = await saveProduct({
      title: "Test Personal TPMS Sensor Kit",
      brand: "personal",
      category: "Car Kit",
      price: 2499,
      slug: testPersonalSlug,
      productsku: "SKU-TEST-P-01",
    });
    assert(personalProd.brand === "personal", "Personal product created with brand='personal'");
    assert(personalProd.slug === testPersonalSlug, "Personal product has correct slug");

    // -----------------------------------------------------------------
    // TEST 3: Create Suraksha Commercial Product
    // -----------------------------------------------------------------
    console.log("\n--- 3. Create Treel Suraksha Commercial Product ---");
    const testSurakshaSlug = `test-suraksha-sku-${Date.now()}`;
    const surakshaProd = await saveProduct({
      title: "Test Suraksha Fleet Multi-Axle Kit",
      brand: "suraksha",
      category: "Commercial Truck Kit",
      price: 18999,
      slug: testSurakshaSlug,
      productsku: "SKU-SURAKSHA-TEST-01",
    });
    assert(surakshaProd.brand === "suraksha", "Suraksha product created with brand='suraksha'");
    assert(surakshaProd.slug === testSurakshaSlug, "Suraksha product has correct slug");

    // -----------------------------------------------------------------
    // TEST 4: Brand preservation on edit (No silent brand conversion)
    // -----------------------------------------------------------------
    console.log("\n--- 4. Brand Preservation on Edit ---");
    const updatedPersonal = await saveProduct({
      _id: personalProd._id,
      title: "Updated Personal TPMS Sensor Kit",
      price: 2999,
      // no brand passed in update -> must preserve personal
    });
    assert(updatedPersonal.brand === "personal", "Editing personal product preserves brand='personal'");
    assert(Number(updatedPersonal.price) === 2999, "Price successfully updated on personal product");

    const updatedSuraksha = await saveProduct({
      _id: surakshaProd._id,
      title: "Updated Suraksha Multi-Axle Kit",
      price: 19999,
    });
    assert(updatedSuraksha.brand === "suraksha", "Editing suraksha product preserves brand='suraksha'");

    // -----------------------------------------------------------------
    // TEST 5: Brand-specific inventory and catalogue queries
    // -----------------------------------------------------------------
    console.log("\n--- 5. Brand-Specific Inventory Queries ---");
    const allProducts = await getAllProducts(false, "all");
    const personalOnly = await getAllProducts(false, "personal");
    const surakshaOnly = await getAllProducts(false, "suraksha");

    assert(
      allProducts.some((p) => p.slug === testPersonalSlug) &&
      allProducts.some((p) => p.slug === testSurakshaSlug),
      "All Products view contains both Personal and Suraksha products"
    );

    assert(
      personalOnly.every((p) => p.brand === "personal") &&
      personalOnly.some((p) => p.slug === testPersonalSlug) &&
      !personalOnly.some((p) => p.slug === testSurakshaSlug),
      "Personal Products query contains ONLY personal products (Suraksha excluded)"
    );

    assert(
      surakshaOnly.every((p) => p.brand === "suraksha") &&
      surakshaOnly.some((p) => p.slug === testSurakshaSlug) &&
      !surakshaOnly.some((p) => p.slug === testPersonalSlug),
      "Suraksha Products query contains ONLY Suraksha products (Personal excluded)"
    );

    // -----------------------------------------------------------------
    // TEST 6: Storefront Detail Route Cross-Brand Isolation
    // -----------------------------------------------------------------
    console.log("\n--- 6. Detail Route Cross-Brand Isolation ---");
    const personalFetchFromPersonal = await getProductBySlug(testPersonalSlug, "personal");
    assert(personalFetchFromPersonal !== null, "Fetching personal product under personal scope succeeds");

    const personalFetchFromSuraksha = await getProductBySlug(testPersonalSlug, "suraksha");
    assert(personalFetchFromSuraksha === null, "Fetching personal product under suraksha scope returns null");

    const surakshaFetchFromSuraksha = await getProductBySlug(testSurakshaSlug, "suraksha");
    assert(surakshaFetchFromSuraksha !== null, "Fetching suraksha product under suraksha scope succeeds");

    const surakshaFetchFromPersonal = await getProductBySlug(testSurakshaSlug, "personal");
    assert(surakshaFetchFromPersonal === null, "Fetching suraksha product under personal scope returns null");

    // -----------------------------------------------------------------
    // TEST 7: Brand Validator Unit Tests
    // -----------------------------------------------------------------
    console.log("\n--- 7. Brand Discriminator Accuracy ---");
    assert(isPersonalProductOrItem(personalProd), "isPersonalProductOrItem is TRUE for Personal product");
    assert(!isSurakshaProductOrItem(personalProd), "isSurakshaProductOrItem is FALSE for Personal product");
    assert(isSurakshaProductOrItem(surakshaProd), "isSurakshaProductOrItem is TRUE for Suraksha product");
    assert(!isPersonalProductOrItem(surakshaProd), "isPersonalProductOrItem is FALSE for Suraksha product");

    // -----------------------------------------------------------------
    // TEST 8: Server-Side Cart & Checkout Contamination Validation
    // -----------------------------------------------------------------
    console.log("\n--- 8. Cart & Order Validation for Cross-Brand Contamination ---");
    const validPersonalCart = [
      { variant_id: "car-tpms-kit", sku: "SKU-CAR-4W", name: "Car TPMS Kit", price_inr: 3749, quantity: 1 }
    ];
    const validSurakshaCart = [
      { variant_id: "suraksha_6w", sku: "SKU-SURAKSHA-6W", name: "Suraksha Kit", price_inr: 22000, quantity: 1 }
    ];
    const contaminatedCart = [
      ...validPersonalCart,
      ...validSurakshaCart
    ];

    const res1 = validateCartBrandServer(validPersonalCart, "personal");
    assert(res1.valid === true, "Personal items in Personal cart: VALID");

    const res2 = validateCartBrandServer(validSurakshaCart, "suraksha");
    assert(res2.valid === true, "Suraksha items in Suraksha cart: VALID");

    const res3 = validateCartBrandServer(validSurakshaCart, "personal");
    assert(res3.valid === false && res3.code === "CART_BRAND_CONTAMINATION", "Suraksha item in Personal checkout: REJECTED with CART_BRAND_CONTAMINATION");

    const res4 = validateCartBrandServer(validPersonalCart, "suraksha");
    assert(res4.valid === false && res4.code === "CART_BRAND_CONTAMINATION", "Personal item in Suraksha checkout: REJECTED with CART_BRAND_CONTAMINATION");

    const res5 = validateCartBrandServer(contaminatedCart);
    assert(res5.valid === false && res5.code === "CART_BRAND_CONTAMINATION", "Mixed items in any checkout: REJECTED with CART_BRAND_CONTAMINATION");

    // -----------------------------------------------------------------
    // TEST 9: Clean up test products
    // -----------------------------------------------------------------
    console.log("\n--- 9. Cleanup Test SKUs ---");
    await deleteProduct(personalProd._id);
    await deleteProduct(surakshaProd._id);
    const postCleanupPersonal = await getProductBySlug(testPersonalSlug);
    const postCleanupSuraksha = await getProductBySlug(testSurakshaSlug);
    assert(postCleanupPersonal === null && postCleanupSuraksha === null, "Test products cleanly deleted after verification");

    console.log(`\n=== VERIFICATION COMPLETE: ${passed} passed, ${failed} failed ===`);
    if (failed > 0) {
      process.exit(1);
    }
  } catch (err) {
    console.error("Verification suite encountered an unhandled error:", err);
    process.exit(1);
  }
}

runVerification();
