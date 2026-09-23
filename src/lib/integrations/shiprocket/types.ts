export interface ShiprocketAuthResponse {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  company_id: number;
  created_at: string;
  token: string;
}

export interface ServiceabilityCheckParams {
  pickup_postcode: string;
  delivery_postcode: string;
  weight?: number; // in kg (e.g. 0.5)
  cod?: 0 | 1;
}

export interface ServiceabilityCourierItem {
  courier_company_id: number;
  courier_name: string;
  rate: number;
  etd: string;
  estimated_delivery_days: string | number;
  is_surface: boolean;
  call_courier: number;
  cod: number;
}

export interface ServiceabilityResult {
  status: number;
  data: {
    available_courier_companies: ServiceabilityCourierItem[];
    recommended_courier_company_id?: number;
  };
}

export interface ShiprocketOrderItem {
  name: string;
  sku: string;
  units: number;
  selling_price: number;
  discount?: number;
  tax?: number;
  hsn?: number | string;
}

export interface CreateShiprocketOrderPayload {
  order_id: string;
  order_date: string; // YYYY-MM-DD HH:mm
  pickup_location?: string;
  channel_id?: string;
  comment?: string;
  billing_customer_name: string;
  billing_last_name?: string;
  billing_address: string;
  billing_address_2?: string;
  billing_city: string;
  billing_pincode: string;
  billing_state: string;
  billing_country?: string;
  billing_email: string;
  billing_phone: string;
  shipping_is_billing: boolean;
  shipping_customer_name?: string;
  shipping_last_name?: string;
  shipping_address?: string;
  shipping_address_2?: string;
  shipping_city?: string;
  shipping_pincode?: string;
  shipping_country?: string;
  shipping_state?: string;
  shipping_email?: string;
  shipping_phone?: string;
  order_items: ShiprocketOrderItem[];
  payment_method: 'Prepaid' | 'COD';
  shipping_charges?: number;
  giftwrap_charges?: number;
  transaction_charges?: number;
  total_discount?: number;
  sub_total: number;
  length?: number; // in cm
  breadth?: number; // in cm
  height?: number; // in cm
  weight: number; // in kg
}

export interface CreateShiprocketOrderResponse {
  order_id: number;
  shipment_id: number;
  status: string;
  status_code: number;
  onboarding_completed_now: number;
  awb_code?: string;
  courier_company_id?: string;
  courier_name?: string;
}

export interface ShiprocketTrackingScan {
  date: string;
  status: string;
  activity: string;
  location: string;
  'sr-status': string;
}

export interface ShiprocketTrackingResult {
  track_status: number;
  shipment_status: number;
  shipment_track?: Array<{
    id: number;
    awb_code: string;
    courier_company_id?: number;
    courier_name: string;
    current_status: string;
    origin: string;
    destination: string;
    pickup_date?: string;
    delivered_date?: string;
    scans?: ShiprocketTrackingScan[];
  }>;
  shipment_track_activities?: ShiprocketTrackingScan[];
  track_url?: string;
}
