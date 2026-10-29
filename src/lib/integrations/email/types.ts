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
  subtotal?: number;
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

export interface SupportAcknowledgementData {
  name: string;
  email: string;
  phone?: string;
  purpose?: string;
  message: string;
  ticketId?: string;
}

export interface NewsletterWelcomeData {
  email: string;
  source?: string;
  interest?: string;
  unsubscribeUrl?: string;
}

export interface WhitepaperAccessEmailData {
  email: string;
  recipientName?: string;
  whitepaperTitle: string;
  fileFormat: string;
  length?: string;
  viewUrl: string;
  downloadUrl: string;
  coverImage?: string;
}

export interface TmipLeadConfirmationData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  fleetSize?: string | number;
  sourcePage?: string;
  interest?: string;
  formType?: string;
}

export interface SurakshaLeadConfirmationData {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  trucks?: string | number;
  preferredTime?: string;
  language?: string;
  formType?: string;
}

export interface PersonalLeadConfirmationData {
  name: string;
  email: string;
  phone?: string;
  vehicleType?: string;
  kit?: string;
  pinCode?: string;
  city?: string;
}

export interface EventRegistrationConfirmationData {
  name: string;
  email: string;
  eventName: string;
  dateTime: string;
  location: string;
  isOnline?: boolean;
  company?: string;
  role?: string;
  googleCalendarUrl?: string;
  outlookCalendarUrl?: string;
}

export interface WarrantyRegistrationConfirmationData {
  registrationId: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  productName: string;
  purchaseDate?: string;
}

export interface WarrantyClaimConfirmationData {
  claimId: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  claimIssueType: string;
  claimDescription: string;
  claimResolution?: string;
}
