import {
  isRazorpayConfigured,
  isRazorpayWebhookConfigured,
  createRazorpayOrder,
  verifyPaymentSignature,
  verifyWebhookSignature,
  isSesConfigured,
  sendEmail,
  sendContactLeadEmail,
  sendOrderConfirmationEmail,
  sendPaymentReceiptEmail,
  sendShippingNotificationEmail,
  isShiprocketConfigured,
  checkServiceability,
  createShiprocketOrder,
  trackShipment,
} from './index';
import crypto from 'crypto';

async function runVerification() {
  console.log('====================================================');
  console.log('INTEGRATION TEST 1: DISABLED STATE VERIFICATION');
  console.log('====================================================');

  // Verify Razorpay disabled
  console.log('Razorpay configured:', isRazorpayConfigured());
  console.log('Razorpay webhook configured:', isRazorpayWebhookConfigured());
  if (isRazorpayConfigured() || isRazorpayWebhookConfigured()) {
    throw new Error('FAIL: Razorpay should be disabled by default!');
  }

  const rzpOrder = await createRazorpayOrder({ amount: 50000 });
  console.log('createRazorpayOrder response:', rzpOrder);
  if (rzpOrder.configured !== false || rzpOrder.error?.code !== 'SERVICE_NOT_CONFIGURED') {
    throw new Error('FAIL: Razorpay order creation did not return SERVICE_NOT_CONFIGURED');
  }

  const rzpVerify = verifyPaymentSignature({
    razorpay_order_id: 'order_test_123',
    razorpay_payment_id: 'pay_test_123',
    razorpay_signature: 'dummy_sig',
  });
  console.log('verifyPaymentSignature response:', rzpVerify);
  if (rzpVerify.configured !== false || rzpVerify.error?.code !== 'SERVICE_NOT_CONFIGURED') {
    throw new Error('FAIL: Razorpay payment verify did not return SERVICE_NOT_CONFIGURED');
  }

  const rzpWebhook = verifyWebhookSignature({
    rawBody: '{"event":"payment.captured"}',
    signature: 'dummy_sig',
  });
  console.log('verifyWebhookSignature response:', rzpWebhook);
  if (rzpWebhook.configured !== false || rzpWebhook.error?.code !== 'SERVICE_NOT_CONFIGURED') {
    throw new Error('FAIL: Razorpay webhook verify did not return SERVICE_NOT_CONFIGURED');
  }

  // Verify AWS SES disabled
  console.log('\nSES configured:', isSesConfigured());
  if (isSesConfigured()) {
    throw new Error('FAIL: SES should be disabled by default!');
  }

  const sesSend = await sendEmail({
    to: 'test@example.com',
    subject: 'Test',
    html: '<p>Test</p>',
  });
  console.log('sendEmail response:', sesSend);
  if (sesSend.configured !== false || sesSend.error?.code !== 'SERVICE_NOT_CONFIGURED') {
    throw new Error('FAIL: SES sendEmail did not return SERVICE_NOT_CONFIGURED');
  }

  const sesLead = await sendContactLeadEmail({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello Treel',
  });
  console.log('sendContactLeadEmail response:', sesLead);
  if (sesLead.configured !== false || sesLead.error?.code !== 'SERVICE_NOT_CONFIGURED') {
    throw new Error('FAIL: SES sendContactLeadEmail did not return SERVICE_NOT_CONFIGURED');
  }

  const sesOrder = await sendOrderConfirmationEmail({
    orderId: 'ORD-1234',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    items: [{ name: 'Treel Personal TPMS Internal', quantity: 1, price: 3499 }],
    subtotal: 3499,
    total: 3499,
    shippingAddress: {
      address1: '123 Main St',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
    },
  });
  console.log('sendOrderConfirmationEmail response:', sesOrder);
  if (sesOrder.configured !== false || sesOrder.error?.code !== 'SERVICE_NOT_CONFIGURED') {
    throw new Error('FAIL: SES sendOrderConfirmationEmail did not return SERVICE_NOT_CONFIGURED');
  }

  const sesReceipt = await sendPaymentReceiptEmail({
    paymentId: 'pay_123',
    orderId: 'ORD-1234',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    amount: 349900,
    currency: 'INR',
    status: 'captured',
  });
  console.log('sendPaymentReceiptEmail response:', sesReceipt);
  if (sesReceipt.configured !== false || sesReceipt.error?.code !== 'SERVICE_NOT_CONFIGURED') {
    throw new Error('FAIL: SES sendPaymentReceiptEmail did not return SERVICE_NOT_CONFIGURED');
  }

  const sesShipping = await sendShippingNotificationEmail({
    orderId: 'ORD-1234',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    courierName: 'Delhivery',
    awbCode: 'DEL123456789',
  });
  console.log('sendShippingNotificationEmail response:', sesShipping);
  if (sesShipping.configured !== false || sesShipping.error?.code !== 'SERVICE_NOT_CONFIGURED') {
    throw new Error('FAIL: SES sendShippingNotificationEmail did not return SERVICE_NOT_CONFIGURED');
  }

  // Verify Shiprocket disabled
  console.log('\nShiprocket configured:', isShiprocketConfigured());
  if (isShiprocketConfigured()) {
    throw new Error('FAIL: Shiprocket should be disabled by default!');
  }

  const srServiceability = await checkServiceability({
    pickup_postcode: '411001',
    delivery_postcode: '110001',
  });
  console.log('checkServiceability response:', srServiceability);
  if (srServiceability.configured !== false || srServiceability.error?.code !== 'SERVICE_NOT_CONFIGURED') {
    throw new Error('FAIL: Shiprocket checkServiceability did not return SERVICE_NOT_CONFIGURED');
  }

  const srOrder = await createShiprocketOrder({
    order_id: 'ORD-1234',
    order_date: '2026-09-23 15:30',
    billing_customer_name: 'John Doe',
    billing_address: '123 Main St',
    billing_city: 'Pune',
    billing_pincode: '411001',
    billing_state: 'Maharashtra',
    billing_email: 'john@example.com',
    billing_phone: '9876543210',
    shipping_is_billing: true,
    order_items: [{ name: 'Treel TPMS', sku: 'TRL-001', units: 1, selling_price: 3499 }],
    payment_method: 'Prepaid',
    sub_total: 3499,
    weight: 0.5,
  });
  console.log('createShiprocketOrder response:', srOrder);
  if (srOrder.configured !== false || srOrder.error?.code !== 'SERVICE_NOT_CONFIGURED') {
    throw new Error('FAIL: Shiprocket createShiprocketOrder did not return SERVICE_NOT_CONFIGURED');
  }

  const srTrack = await trackShipment({ awbCode: '123456789' });
  console.log('trackShipment response:', srTrack);
  if (srTrack.configured !== false || srTrack.error?.code !== 'SERVICE_NOT_CONFIGURED') {
    throw new Error('FAIL: Shiprocket trackShipment did not return SERVICE_NOT_CONFIGURED');
  }

  console.log('====================================================');
  console.log('INTEGRATION TEST 2: LOCAL CRYPTO LOGIC VERIFICATION');
  console.log('====================================================');
  // Test timing-safe HMAC signature verification in isolation
  const mockSecret = 'test_secret_key_123';
  const orderId = 'order_ABC123';
  const paymentId = 'pay_XYZ789';
  const validSignature = crypto
    .createHmac('sha256', mockSecret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  process.env.RAZORPAY_KEY_ID = 'test_id';
  process.env.RAZORPAY_KEY_SECRET = mockSecret;

  const validResult = verifyPaymentSignature({
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: validSignature,
  });
  console.log('HMAC verification with valid signature:', validResult);
  if (!validResult.success || !validResult.data?.verified) {
    throw new Error('FAIL: Valid HMAC signature failed verification');
  }

  const invalidResult = verifyPaymentSignature({
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: 'tampered_signature_hex_value_1234567890abcdef',
  });
  console.log('HMAC verification with invalid signature:', invalidResult);
  if (invalidResult.success || invalidResult.data?.verified) {
    throw new Error('FAIL: Invalid HMAC signature passed verification');
  }

  // Clean up mock env vars
  delete process.env.RAZORPAY_KEY_ID;
  delete process.env.RAZORPAY_KEY_SECRET;

  console.log('\nALL VERIFICATION CHECKS PASSED PERFECTLY!');
}

runVerification().catch((err) => {
  console.error('VERIFICATION ERROR:', err);
  process.exit(1);
});
