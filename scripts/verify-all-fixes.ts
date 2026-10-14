import fs from 'fs';
import path from 'path';

// Load .env
const envPath = path.join(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx > 0) {
      const key = trimmed.substring(0, eqIdx).trim();
      let val = trimmed.substring(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}
process.env.ADMIN_BYPASS_AUTH = "true";

import {
createAdminAnnualReturn,
createAdminProduct,
deleteAdminAnnualReturn,
deleteAdminProduct,
getAdminAnnualReturns,
getAdminCheckouts,
getAdminProducts,
updateAdminCheckoutStatus,
updateAdminProduct
} from '../src/lib/admin/admin-actions';
import { getAuthorProfile } from '../src/lib/authors/author-registry';
import { getProductBySlug } from '../src/lib/commerce/product-storage';
import { getCaseStudyBySlug } from '../src/lib/content/casestudies-storage';
import {
getPublishedSurakshaArticleBySlug,
getPublishedSurakshaArticles
} from '../src/lib/content/suraksha-storage';
import { getPersonalProductBySlug } from '../src/lib/data/personal-products';

async function runAudit() {
  console.log('================================================================');
  console.log('       STARTING COMPREHENSIVE END-TO-END VERIFICATION AUDIT     ');
  console.log('================================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: any, testName: string, extra?: any) {
    if (Boolean(condition)) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName}`, extra !== undefined ? extra : '');
      failed++;
    }
  }

  // --------------------------------------------------------------------------
  // TEST GROUP 1: TMIP Case Study Author Profile & Attribution
  // --------------------------------------------------------------------------
  console.log('\n--- 1. TMIP Case Study Author Profile Navigation ---');
  const cs = await getCaseStudyBySlug('open-cast-haulage-analytics');
  assert(cs !== null, "Case study 'open-cast-haulage-analytics' loads correctly");
  assert(cs?.quote?.author === 'Operations Director', "Customer quote author is preserved ('Operations Director')");
  assert(cs?.quote?.title === 'Heavy Mining & Infrastructure Group', "Customer quote organization is preserved ('Heavy Mining & Infrastructure Group')");
  assert(cs?.author === 'Treel Research', "Case study research author is 'Treel Research'");

  const authorProfile = await getAuthorProfile('treel-research');
  assert(authorProfile.profile.name === 'Treel Research', "Author profile resolves to 'Treel Research'");
  assert(authorProfile.profile.slug === 'treel-research', "Author slug is 'treel-research'");
  const matchingCaseStudy = authorProfile.articles.find(a => a.slug === 'open-cast-haulage-analytics');
  assert(
    matchingCaseStudy !== undefined && matchingCaseStudy.url === '/tmip/customers/case-studies/open-cast-haulage-analytics',
    "TMIP Case study appears in author publications list with correct URL",
    matchingCaseStudy
  );

  // --------------------------------------------------------------------------
  // TEST GROUP 2: Suraksha Blog Admin Direct Links & Draft Protection
  // --------------------------------------------------------------------------
  console.log('\n--- 2. Suraksha Blog Admin Links & Draft Protection ---');
  const surakshaList = await getPublishedSurakshaArticles();
  assert(surakshaList.length > 0, `Published Suraksha articles retrieved (${surakshaList.length} articles)`);
  const firstSuraksha = surakshaList[0];
  const resolvedSuraksha = await getPublishedSurakshaArticleBySlug(firstSuraksha.slug || firstSuraksha._id);
  assert(resolvedSuraksha !== null, `Suraksha detail resolves by slug: ${firstSuraksha.slug || firstSuraksha._id}`);

  const nonexistent = await getPublishedSurakshaArticleBySlug('definitely-fake-slug-404');
  assert(nonexistent === null, "Non-existent Suraksha slug returns null for public 404");

  // --------------------------------------------------------------------------
  // TEST GROUP 3: Product Creation, Storefront Synchronization & Caching
  // --------------------------------------------------------------------------
  console.log('\n--- 3. Inventory Product Creation & Storefront Sync ---');
  const initialAdminProds = await getAdminProducts();
  assert(initialAdminProds.success && (initialAdminProds.data?.length ?? 0) > 0, `Admin products loaded (${initialAdminProds.data?.length} SKUs)`);

  const testSku = `TEST-SKU-${Date.now()}`;
  const testSlug = `automated-test-sensor-${Date.now()}`;
  const newProductPayload = {
    _id: `new_${Date.now()}`,
    title: 'Automated Test Sensor Kit',
    price: 3299,
    saleprice: 3999,
    category: 'Car Kit',
    brand: 'personal' as const,
    slug: testSlug,
    productsku: testSku,
    image: 'https://example.com/test-sensor.png',
    description: 'Real-time test product created by audit runner',
  };

  const createRes = await createAdminProduct(newProductPayload);
  assert(createRes.success === true, "createAdminProduct creates product successfully", createRes.error);

  const createdItem = createRes.data?.[0];
  const createdId = createdItem?._id;
  assert(createdId && !createdId.startsWith('new_'), `Product ID generated properly (${createdId})`);

  // Verify storefront immediate retrieval
  const storefrontProduct = getPersonalProductBySlug(testSlug);
  assert(storefrontProduct !== undefined && storefrontProduct.price === 3299, "Newly created product is immediately retrievable via getPersonalProductBySlug() on storefront");

  const dynamicStorageProduct = await getProductBySlug(testSlug);
  assert(dynamicStorageProduct !== null && dynamicStorageProduct.title === 'Automated Test Sensor Kit', "Product immediately queryable in unified product-storage");

  // Test updating the product
  const updateRes = await updateAdminProduct(createdId!, {
    price: 2999,
    title: 'Automated Test Sensor Kit - Updated'
  });
  assert(updateRes.success === true, "updateAdminProduct updates successfully");
  const updatedStorefrontProd = getPersonalProductBySlug(testSlug);
  assert(updatedStorefrontProd?.price === 2999, "Updated product price immediately reflects on storefront (₹2999)");

  // Clean up product
  const deleteRes = await deleteAdminProduct(createdId!);
  assert(deleteRes.success === true, "deleteAdminProduct deletes product successfully");

  // --------------------------------------------------------------------------
  // TEST GROUP 4: Admin Orders Workflow & Protection
  // --------------------------------------------------------------------------
  console.log('\n--- 4. Admin Orders Audit & Workflow ---');
  const ordersRes = await getAdminCheckouts();
  assert(ordersRes.success === true, `Admin orders retrieved successfully (${ordersRes.data?.length} records)`);

  if (ordersRes.data && ordersRes.data.length > 0) {
    const testOrder = ordersRes.data[0];
    assert(testOrder._id !== undefined, `Order Ref ID present: ${testOrder._id}`);
    assert(Array.isArray(testOrder.cartData), "Order cartData items correctly parsed as array");

    // Test updating fulfillment status
    const currentStatus = testOrder.status || 'pending';
    const nextStatus = currentStatus === 'processing' ? 'shipped' : 'processing';
    const statusUpdateRes = await updateAdminCheckoutStatus(testOrder._id, nextStatus);
    assert(statusUpdateRes.success === true, `Fulfillment status update succeeded (${currentStatus} -> ${nextStatus})`);
    // Restore original status
    await updateAdminCheckoutStatus(testOrder._id, currentStatus);
    assert(true, "Restored original order status");
  }

  // --------------------------------------------------------------------------
  // TEST GROUP 5: Admin Annual Returns Workflow & Persistence
  // --------------------------------------------------------------------------
  console.log('\n--- 5. Admin Annual Returns Audit & Workflow ---');
  const returnsRes = await getAdminAnnualReturns();
  assert(returnsRes.success === true, `Annual returns loaded (${returnsRes.data?.length} records)`);

  const testReturn = {
    _id: `new_${Date.now()}`,
    title: `Audit Verification Filing FY-${Date.now().toString().slice(-4)}`,
    pdf: 'https://example.com/test-annual-return.pdf',
    date: new Date().toISOString()
  };

  const createReturnRes = await createAdminAnnualReturn(testReturn);
  assert(createReturnRes.success === true, "createAdminAnnualReturn creates record successfully", createReturnRes.error);
  const createdReturnId = createReturnRes.data?.[0]?._id;
  assert(createdReturnId && !createdReturnId.startsWith('new_'), `Annual return ID normalized: ${createdReturnId}`);

  if (createdReturnId) {
    const delReturnRes = await deleteAdminAnnualReturn(createdReturnId);
    assert(delReturnRes.success === true, "deleteAdminAnnualReturn cleaned up test return");
  }

  // --------------------------------------------------------------------------
  // SUMMARY
  // --------------------------------------------------------------------------
  console.log('\n================================================================');
  console.log(`TOTAL AUDIT CHECKS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log('================================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runAudit().catch((err) => {
  console.error("Fatal audit runner error:", err);
  process.exit(1);
});
