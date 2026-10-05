import { createClient } from '@supabase/supabase-js';
import { MongoCartItem } from '@/types/admin';

export function getSupabaseAdminClient() {
  const url =
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://placeholder-treel.supabase.co';
  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    'placeholder-key';
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

// Exact set of columns existing in the Supabase 'TreelEcommerce.checkouts' table
const ALLOWED_CHECKOUT_COLUMNS = new Set([
  '_id',
  'contact',
  'country',
  'firstname',
  'lastname',
  'address',
  'addressoptional',
  'city',
  'state',
  'pin',
  'phone',
  'status',
  'price',
  'date',
  '__v',
  'cartData[0].title',
  'cartData[1].title',
  'cartData[2].title',
  'cartData[0].description',
  'cartData[1].description',
  'cartData[2].description',
  'cartData[0].image',
  'cartData[1].image',
  'cartData[2].image',
  'cartData[0].category',
  'cartData[1].category',
  'cartData[2].category',
  'cartData[0].id',
  'cartData[1].id',
  'cartData[2].id',
  'cartData[0].originalPrice',
  'cartData[1].originalPrice',
  'cartData[2].originalPrice',
  'cartData[0].price',
  'cartData[1].price',
  'cartData[2].price',
  'cartData[0].quantity',
  'cartData[1].quantity',
  'cartData[2].quantity',
  'cartData[0].productsku',
  'cartData[1].productsku',
  'cartData[2].productsku',
  'cartData[0].saleprice',
  'cartData[1].saleprice',
  'cartData[2].saleprice',
  'cartData[0].couponcode',
  'cartData[1].couponcode',
  'cartData[2].couponcode',
  'cartData[0].couponamount',
  'cartData[1].couponamount',
  'cartData[2].couponamount',
  'cartData[0].couponMessage',
  'cartData[0].saveAmount',
]);

const ALLOWED_PAYMENT_COLUMNS = new Set([
  '_id',
  'payment_id',
  'order_id',
  'amount',
  'customer_name',
  'product_name',
  'created_at',
  'createdAt',
  'updatedAt',
  '__v',
]);

export interface CheckoutPayload {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  addressoptional?: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'online' | 'cod';
  items: Array<{
    variant_id?: string;
    sku?: string;
    name?: string;
    title?: string;
    price_inr?: number;
    price?: number;
    quantity: number;
    image_url?: string;
    image?: string;
    category?: string;
    vehicle_type?: string;
  }>;
  subtotalInr?: number;
  discountInr?: number;
  totalInr: number;
  couponCode?: string;
}

export async function persistOrderToSupabase(params: {
  checkout: CheckoutPayload;
  orderRef?: string;
  status?: string;
  paymentInfo?: {
    payment_id: string;
    order_id: string;
    amount: number;
  };
}): Promise<{ success: boolean; orderId: string; error?: string }> {
  const supabase = getSupabaseAdminClient();
  const { checkout, paymentInfo } = params;

  const orderRef =
    params.orderRef ||
    `TRL-${params.paymentInfo ? 'ORD' : 'COD'}-${Date.now().toString().slice(-6)}`;

  const nameParts = (checkout.fullName || 'Valued Customer').trim().split(' ');
  const firstname = nameParts[0] || 'Valued';
  const lastname = nameParts.slice(1).join(' ') || 'Customer';

  const cartItems: MongoCartItem[] = (checkout.items || []).map((it) => ({
    id: it.variant_id || it.sku || '',
    title: it.name || it.title || 'Treel TPMS Kit',
    price: it.price_inr || it.price || 0,
    quantity: it.quantity || 1,
    productsku: it.sku || 'TRL-TPMS',
    category: it.vehicle_type || it.category || 'Personal TPMS',
    image: it.image_url || it.image || '',
    couponcode: checkout.couponCode || null,
    couponamount: checkout.discountInr || null,
  }));

  // Populate flattened columns up to index 2 (max 3 items supported by schema)
  const flattenedCart: Record<string, any> = {};
  cartItems.slice(0, 3).forEach((it, idx) => {
    flattenedCart[`cartData[${idx}].title`] = it.title;
    flattenedCart[`cartData[${idx}].price`] = it.price;
    flattenedCart[`cartData[${idx}].quantity`] = it.quantity;
    flattenedCart[`cartData[${idx}].productsku`] = it.productsku;
    flattenedCart[`cartData[${idx}].category`] = it.category;
    flattenedCart[`cartData[${idx}].image`] = it.image;
    flattenedCart[`cartData[${idx}].id`] = it.id;
    if (it.couponcode) flattenedCart[`cartData[${idx}].couponcode`] = it.couponcode;
    if (it.couponamount) flattenedCart[`cartData[${idx}].couponamount`] = it.couponamount;
  });

  const now = new Date().toISOString();

  const rawCheckoutRecord: Record<string, any> = {
    _id: orderRef,
    firstname,
    lastname,
    contact: checkout.email || '',
    phone: checkout.phone || '',
    address: checkout.address || '',
    addressoptional: checkout.addressoptional || '',
    city: checkout.city || '',
    state: checkout.state || 'Maharashtra',
    pin: checkout.pincode || '',
    country: 'India',
    price: checkout.totalInr,
    status: params.status || (paymentInfo ? 'processing' : 'pending'),
    date: now,
    __v: 0,
    ...flattenedCart,
  };

  // Strictly filter only columns that exist in the PostgREST schema cache to prevent PGRST204 errors
  const sanitizedCheckoutRecord: Record<string, any> = {};
  for (const [key, value] of Object.entries(rawCheckoutRecord)) {
    if (ALLOWED_CHECKOUT_COLUMNS.has(key) && value !== undefined) {
      sanitizedCheckoutRecord[key] = value;
    }
  }

  try {
    const { error: chkError } = await supabase
      .from('TreelEcommerce.checkouts')
      .insert([sanitizedCheckoutRecord]);

    if (chkError) {
      console.error('Supabase checkout insert error:', chkError);
      return { success: false, orderId: orderRef, error: chkError.message };
    }

    if (paymentInfo) {
      const productNames =
        cartItems
          .map((it) => `${it.title} (x${it.quantity})`)
          .join(', ') || 'Treel TPMS Kit';

      const rawPaymentRecord: Record<string, any> = {
        _id: `PAY-${Date.now()}`,
        payment_id: paymentInfo.payment_id,
        order_id: paymentInfo.order_id,
        amount: paymentInfo.amount,
        customer_name: checkout.fullName,
        product_name: productNames,
        createdAt: now,
        created_at: now,
        __v: 0,
      };

      const sanitizedPaymentRecord: Record<string, any> = {};
      for (const [key, value] of Object.entries(rawPaymentRecord)) {
        if (ALLOWED_PAYMENT_COLUMNS.has(key) && value !== undefined) {
          sanitizedPaymentRecord[key] = value;
        }
      }

      const { error: payError } = await supabase
        .from('TreelEcommerce.payments')
        .insert([sanitizedPaymentRecord]);

      if (payError) {
        console.error('Supabase payment insert error:', payError);
      }
    }

    return { success: true, orderId: orderRef };
  } catch (err: any) {
    console.error('persistOrderToSupabase unexpected error:', err);
    return { success: false, orderId: orderRef, error: err?.message || 'Database error' };
  }
}

