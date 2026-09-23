// Central export for all third-party backend integrations

// Common Types
export * from './common/types';

// Razorpay Integration
export * from './razorpay/types';
export {
  isRazorpayConfigured,
  isRazorpayWebhookConfigured,
  createRazorpayOrder,
  verifyPaymentSignature,
  verifyWebhookSignature,
} from './razorpay/client';

// AWS SES Email Integration
export * from './email/types';
export {
  isSesConfigured,
  sendEmail,
  sendContactLeadEmail,
  sendOrderConfirmationEmail,
  sendPaymentReceiptEmail,
  sendShippingNotificationEmail,
} from './email/ses-client';

// Shiprocket Logistics Integration
export * from './shiprocket/types';
export {
  isShiprocketConfigured,
  checkServiceability,
  createShiprocketOrder,
  trackShipment,
} from './shiprocket/client';
