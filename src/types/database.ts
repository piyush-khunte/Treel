export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type BrandScope = "master" | "tmip" | "suraksha" | "personal";

export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "confirmed"
  | "processing"
  | "packed"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refund_pending"
  | "refunded"
  | "payment_failed";

export type LeadStatus = "new" | "contacted" | "qualified" | "closed" | "archived";

export interface Product {
  id: string;
  brand_scope: BrandScope;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  status: "active" | "draft" | "archived";
  base_price_inr: number;
  mrp_inr: number;
  tax_rate_percent: number;
  hsn_code: string;
  features: string[];
  specs: Record<string, string>;
  box_contents: string[];
  warranty_months: number;
  rating: number;
  reviews_count: number;
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  name: string;
  sensor_count: number;
  vehicle_type: "2w" | "4w" | "truck" | "bus" | "otr";
  price_inr: number;
  mrp_inr: number;
  stock_quantity: number;
  is_active: boolean;
  image_url: string;
  weight_grams: number;
  dimensions_cm: { l: number; w: number; h: number };
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string;
  is_primary: boolean;
  sort_order: number;
}

export interface CartItem {
  variant_id: string;
  sku: string;
  name: string;
  price_inr: number;
  mrp_inr: number;
  quantity: number;
  image_url: string;
  sensor_count: number;
  vehicle_type: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  coupon_code?: string;
  discount_amount_inr: number;
  subtotal_inr: number;
  tax_amount_inr: number;
  shipping_amount_inr: number;
  total_inr: number;
  updated_at: string;
}

export interface OrderCustomer {
  full_name: string;
  email: string;
  phone: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  pincode: string;
  gstin?: string;
  business_name?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  variant_id: string;
  sku: string;
  name: string;
  unit_price_inr: number;
  quantity: number;
  total_price_inr: number;
}

export interface Order {
  id: string;
  order_number: string;
  status: OrderStatus;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal_inr: number;
  discount_inr: number;
  tax_inr: number;
  shipping_inr: number;
  total_inr: number;
  currency: string;
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  shipment_tracking_number?: string;
  courier_name?: string;
  created_at: string;
  updated_at: string;
}

export interface Dealer {
  id: string;
  name: string;
  business_name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  lat: number;
  lng: number;
  is_suraksha_centre: boolean;
  is_tmip_partner: boolean;
  is_retail_dealer: boolean;
  rating: number;
  hours: string;
}

export interface LeadSubmission {
  id: string;
  type: "tmip_demo" | "suraksha_callback" | "suraksha_emi" | "contact" | "newsletter" | "dealer_inquiry";
  full_name: string;
  email?: string;
  phone: string;
  company_name?: string;
  fleet_size?: number;
  vehicle_types?: string[];
  city?: string;
  state?: string;
  pincode?: string;
  message?: string;
  status: LeadStatus;
  created_at: string;
}

export interface BlogPost {
  id: string;
  brand_scope: BrandScope;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author_name: string;
  author_role: string;
  category: string;
  tags: string[];
  reading_time_mins: number;
  cover_image: string;
  published_at: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client_name: string;
  industry: string;
  fleet_size: string;
  hero_stat: string;
  hero_stat_label: string;
  results: { metric: string; label: string }[];
  summary: string;
  challenge: string;
  solution: string;
  impact: string;
  testimonial?: { quote: string; author: string; role: string };
  cover_image: string;
  published_at: string;
}
