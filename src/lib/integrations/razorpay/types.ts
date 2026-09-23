export interface RazorpayOrderOptions {
  amount: number; // in INR (will be converted to paise internally) or in paise
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
  partial_payment?: boolean;
}

export interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt?: string;
  offer_id?: string | null;
  status: 'created' | 'attempted' | 'paid';
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
}

export interface RazorpayPaymentVerificationInput {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface RazorpayPaymentVerificationResult {
  verified: boolean;
  orderId: string;
  paymentId: string;
}

export interface RazorpayWebhookVerificationInput {
  rawBody: string;
  signature: string;
}
