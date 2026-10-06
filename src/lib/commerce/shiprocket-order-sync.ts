import { isShiprocketConfigured, createShiprocketOrder, CreateShiprocketOrderPayload } from '@/lib/integrations';
import { CheckoutPayload, getSupabaseAdminClient } from './order-storage';

export interface ShiprocketSyncResult {
  success: boolean;
  configured: boolean;
  shiprocketOrderId?: number;
  shipmentId?: number;
  awbCode?: string;
  courierName?: string;
  error?: string;
}

/**
 * Transforms an ecommerce checkout order and creates a corresponding shipment order in Shiprocket.
 * Runs only after local database persistence has succeeded.
 * Returns safely if Shiprocket credentials are not configured.
 */
export async function syncOrderToShiprocket(params: {
  orderId: string;
  checkout: CheckoutPayload;
  paymentMethod: 'online' | 'cod';
}): Promise<ShiprocketSyncResult> {
  if (!isShiprocketConfigured()) {
    return {
      success: false,
      configured: false,
      error: 'Shiprocket is not configured in server environment.',
    };
  }

  const { orderId, checkout, paymentMethod } = params;
  const nameParts = (checkout.fullName || 'Valued Customer').trim().split(' ');
  const firstName = nameParts[0] || 'Valued';
  const lastName = nameParts.slice(1).join(' ') || 'Customer';

  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate()
  ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const orderItems = (checkout.items || []).map((it, idx) => ({
    name: it.name || it.title || 'Treel TPMS Smart Sensor Kit',
    sku: it.sku || it.variant_id || `TRL-ITEM-${idx + 1}`,
    units: Number(it.quantity) || 1,
    selling_price: Number(it.price_inr || it.price) || 0,
    discount: 0,
    tax: 0,
  }));

  const payload: CreateShiprocketOrderPayload = {
    order_id: orderId,
    order_date: formattedDate,
    pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION || 'Primary',
    billing_customer_name: firstName,
    billing_last_name: lastName,
    billing_address: checkout.address,
    billing_address_2: checkout.addressoptional || '',
    billing_city: checkout.city,
    billing_pincode: checkout.pincode,
    billing_state: checkout.state || 'Maharashtra',
    billing_country: 'India',
    billing_email: checkout.email || 'customer@treel.in',
    billing_phone: checkout.phone,
    shipping_is_billing: true,
    order_items: orderItems.length > 0 ? orderItems : [
      {
        name: 'Treel Smart Sensor Kit',
        sku: 'TRL-TPMS-KIT',
        units: 1,
        selling_price: checkout.totalInr,
        discount: 0,
        tax: 0,
      }
    ],
    payment_method: paymentMethod === 'cod' ? 'COD' : 'Prepaid',
    sub_total: checkout.totalInr,
    length: 18,
    breadth: 14,
    height: 6,
    weight: 0.5,
  };

  try {
    const res = await createShiprocketOrder(payload);

    if (res.success && res.data) {
      const data = res.data;
      const shiprocketOrderId = data.order_id;
      const shipmentId = data.shipment_id;
      const awbCode = data.awb_code;
      const courierName = data.courier_name;

      // Update Supabase order record if columns exist
      try {
        const supabase = getSupabaseAdminClient();
        await supabase
          .from('TreelEcommerce.checkouts')
          .update({
            shiprocket_order_id: shiprocketOrderId,
            shiprocket_shipment_id: shipmentId,
            awb_code: awbCode,
            courier_name: courierName,
          })
          .eq('_id', orderId);
      } catch {
        // Non-blocking metadata update
      }

      return {
        success: true,
        configured: true,
        shiprocketOrderId,
        shipmentId,
        awbCode,
        courierName,
      };
    } else {
      return {
        success: false,
        configured: true,
        error: res.error?.message || 'Shiprocket order creation failed.',
      };
    }
  } catch (err: any) {
    console.error('[Shiprocket Order Sync Error]', err);
    return {
      success: false,
      configured: true,
      error: err?.message || 'Network error communicating with Shiprocket.',
    };
  }
}
