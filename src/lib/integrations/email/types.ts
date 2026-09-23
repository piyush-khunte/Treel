export interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
}

export interface SendEmailResult {
  messageId: string;
}

export interface ContactLeadData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
  sourcePage?: string;
  metadata?: Record<string, unknown>;
}

export interface OrderConfirmationItem {
  id?: string;
  name: string;
  quantity: number;
  price: number;
  sku?: string;
}

export interface OrderConfirmationData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: OrderConfirmationItem[];
  subtotal: number;
  tax?: number;
  shipping?: number;
  total: number;
  shippingAddress: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    pincode: string;
  };
}

export interface PaymentReceiptData {
  paymentId: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  status: string;
  date?: string;
}

export interface ShippingNotificationData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  courierName: string;
  awbCode: string;
  trackingUrl?: string;
  expectedDeliveryDate?: string;
}
