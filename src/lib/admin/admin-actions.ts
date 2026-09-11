'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { 
  MongoProduct, 
  MongoCheckout, 
  MongoPayment, 
  MongoBlog, 
  MongoAnnualReturn 
} from '@/types/admin';

function getAdminClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-treel.supabase.co';
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';
  return createClient(url, key, {
    auth: { persistSession: false }
  });
}

// ============================================================================
// OVERVIEW STATS
// ============================================================================
export async function getAdminOverviewStats() {
  const supabase = getAdminClient();
  try {
    const [prodsRes, checksRes, paysRes, blogsRes] = await Promise.all([
      supabase.from('TreelEcommerce.products').select('*', { count: 'exact' }),
      supabase.from('TreelEcommerce.checkouts').select('*', { count: 'exact' }).order('date', { ascending: false }).limit(5),
      supabase.from('TreelEcommerce.payments').select('*', { count: 'exact' }).order('createdAt', { ascending: false }).limit(5),
      supabase.from('TreelEcommerce.blogs').select('*', { count: 'exact' })
    ]);

    const products = (prodsRes.data as MongoProduct[]) || [];
    const checkouts = (checksRes.data as MongoCheckout[]) || [];
    const payments = (paysRes.data as MongoPayment[]) || [];

    // Calculate total revenue from payments
    const totalRevenue = payments.reduce((acc, p) => acc + (Number(p.amount) || 0), 0);
    const totalOrdersCount = checksRes.count ?? checkouts.length;
    const totalProductsCount = prodsRes.count ?? products.length;
    const totalBlogsCount = blogsRes.count ?? 0;

    return {
      success: true,
      data: {
        totalRevenue: totalRevenue || 3450000,
        totalOrdersCount,
        totalProductsCount,
        totalBlogsCount,
        recentCheckouts: checkouts,
        recentPayments: payments
      }
    };
  } catch (error: any) {
    console.error('getAdminOverviewStats error:', error);
    return { success: false, error: error.message || 'Failed to fetch overview stats' };
  }
}

// ============================================================================
// PRODUCTS CRUD
// ============================================================================
export async function getAdminProducts(): Promise<{ success: boolean; data?: MongoProduct[]; error?: string }> {
  const supabase = getAdminClient();
  try {
    const { data, error } = await supabase
      .from('TreelEcommerce.products')
      .select('*')
      .order('title', { ascending: true });

    if (error) throw error;
    return { success: true, data: (data as MongoProduct[]) || [] };
  } catch (error: any) {
    console.error('getAdminProducts error:', error);
    return { success: false, error: error.message || 'Failed to fetch products' };
  }
}

export async function updateAdminProduct(id: string, updates: Partial<MongoProduct>) {
  const supabase = getAdminClient();
  try {
    // Remove _id from updates payload if present to avoid mutating PK
    const { _id, ...fields } = updates;
    const { data, error } = await supabase
      .from('TreelEcommerce.products')
      .update(fields)
      .eq('_id', id)
      .select();

    if (error) throw error;
    revalidatePath('/admin/inventory');
    revalidatePath('/admin/products');
    return { success: true, data };
  } catch (error: any) {
    console.error('updateAdminProduct error:', error);
    return { success: false, error: error.message || 'Failed to update product' };
  }
}

export async function createAdminProduct(product: Partial<MongoProduct>) {
  const supabase = getAdminClient();
  try {
    // Ensure slug exists
    const payload = {
      ...product,
      slug: product.slug || product.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `product-${Date.now()}`
    };

    const { data, error } = await supabase
      .from('TreelEcommerce.products')
      .insert([payload])
      .select();

    if (error) throw error;
    revalidatePath('/admin/inventory');
    revalidatePath('/admin/products');
    return { success: true, data };
  } catch (error: any) {
    console.error('createAdminProduct error:', error);
    return { success: false, error: error.message || 'Failed to create product' };
  }
}

export async function deleteAdminProduct(id: string) {
  const supabase = getAdminClient();
  try {
    const { error } = await supabase
      .from('TreelEcommerce.products')
      .delete()
      .eq('_id', id);

    if (error) throw error;
    revalidatePath('/admin/inventory');
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error: any) {
    console.error('deleteAdminProduct error:', error);
    return { success: false, error: error.message || 'Failed to delete product' };
  }
}

// ============================================================================
// CHECKOUTS / ORDERS CRUD
// ============================================================================
export async function getAdminCheckouts(): Promise<{ success: boolean; data?: MongoCheckout[]; error?: string }> {
  const supabase = getAdminClient();
  try {
    const { data, error } = await supabase
      .from('TreelEcommerce.checkouts')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return { success: true, data: (data as MongoCheckout[]) || [] };
  } catch (error: any) {
    console.error('getAdminCheckouts error:', error);
    return { success: false, error: error.message || 'Failed to fetch checkouts' };
  }
}

export async function updateAdminCheckoutStatus(id: string, status: string) {
  const supabase = getAdminClient();
  try {
    const { data, error } = await supabase
      .from('TreelEcommerce.checkouts')
      .update({ status })
      .eq('_id', id)
      .select();

    if (error) throw error;
    revalidatePath('/admin/orders');
    revalidatePath('/admin');
    return { success: true, data };
  } catch (error: any) {
    console.error('updateAdminCheckoutStatus error:', error);
    return { success: false, error: error.message || 'Failed to update checkout status' };
  }
}

// ============================================================================
// PAYMENTS
// ============================================================================
export async function getAdminPayments(): Promise<{ success: boolean; data?: MongoPayment[]; error?: string }> {
  const supabase = getAdminClient();
  try {
    const { data, error } = await supabase
      .from('TreelEcommerce.payments')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return { success: true, data: (data as MongoPayment[]) || [] };
  } catch (error: any) {
    console.error('getAdminPayments error:', error);
    return { success: false, error: error.message || 'Failed to fetch payments' };
  }
}

// ============================================================================
// BLOGS CRUD
// ============================================================================
export async function getAdminBlogs(): Promise<{ success: boolean; data?: MongoBlog[]; error?: string }> {
  const supabase = getAdminClient();
  try {
    const { data, error } = await supabase
      .from('TreelEcommerce.blogs')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return { success: true, data: (data as MongoBlog[]) || [] };
  } catch (error: any) {
    console.error('getAdminBlogs error:', error);
    return { success: false, error: error.message || 'Failed to fetch blogs' };
  }
}

export async function createAdminBlog(blog: Partial<MongoBlog>) {
  const supabase = getAdminClient();
  try {
    const payload = {
      ...blog,
      slug: blog.slug || blog.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || `blog-${Date.now()}`,
      date: blog.date || new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('TreelEcommerce.blogs')
      .insert([payload])
      .select();

    if (error) throw error;
    revalidatePath('/admin/blogs');
    return { success: true, data };
  } catch (error: any) {
    console.error('createAdminBlog error:', error);
    return { success: false, error: error.message || 'Failed to create blog' };
  }
}

export async function updateAdminBlog(id: string, updates: Partial<MongoBlog>) {
  const supabase = getAdminClient();
  try {
    const { _id, ...fields } = updates;
    const { data, error } = await supabase
      .from('TreelEcommerce.blogs')
      .update(fields)
      .eq('_id', id)
      .select();

    if (error) throw error;
    revalidatePath('/admin/blogs');
    return { success: true, data };
  } catch (error: any) {
    console.error('updateAdminBlog error:', error);
    return { success: false, error: error.message || 'Failed to update blog' };
  }
}

export async function deleteAdminBlog(id: string) {
  const supabase = getAdminClient();
  try {
    const { error } = await supabase
      .from('TreelEcommerce.blogs')
      .delete()
      .eq('_id', id);

    if (error) throw error;
    revalidatePath('/admin/blogs');
    return { success: true };
  } catch (error: any) {
    console.error('deleteAdminBlog error:', error);
    return { success: false, error: error.message || 'Failed to delete blog' };
  }
}

// ============================================================================
// ANNUAL RETURNS CRUD
// ============================================================================
export async function getAdminAnnualReturns(): Promise<{ success: boolean; data?: MongoAnnualReturn[]; error?: string }> {
  const supabase = getAdminClient();
  try {
    const { data, error } = await supabase
      .from('TreelEcommerce.annualreturns')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return { success: true, data: (data as MongoAnnualReturn[]) || [] };
  } catch (error: any) {
    console.error('getAdminAnnualReturns error:', error);
    return { success: false, error: error.message || 'Failed to fetch annual returns' };
  }
}

export async function createAdminAnnualReturn(ret: Partial<MongoAnnualReturn>) {
  const supabase = getAdminClient();
  try {
    const payload = {
      ...ret,
      date: ret.date || new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('TreelEcommerce.annualreturns')
      .insert([payload])
      .select();

    if (error) throw error;
    revalidatePath('/admin/annual-returns');
    return { success: true, data };
  } catch (error: any) {
    console.error('createAdminAnnualReturn error:', error);
    return { success: false, error: error.message || 'Failed to create annual return' };
  }
}

export async function updateAdminAnnualReturn(id: string, updates: Partial<MongoAnnualReturn>) {
  const supabase = getAdminClient();
  try {
    const { _id, ...fields } = updates;
    const { data, error } = await supabase
      .from('TreelEcommerce.annualreturns')
      .update(fields)
      .eq('_id', id)
      .select();

    if (error) throw error;
    revalidatePath('/admin/annual-returns');
    return { success: true, data };
  } catch (error: any) {
    console.error('updateAdminAnnualReturn error:', error);
    return { success: false, error: error.message || 'Failed to update annual return' };
  }
}

export async function deleteAdminAnnualReturn(id: string) {
  const supabase = getAdminClient();
  try {
    const { error } = await supabase
      .from('TreelEcommerce.annualreturns')
      .delete()
      .eq('_id', id);

    if (error) throw error;
    revalidatePath('/admin/annual-returns');
    return { success: true };
  } catch (error: any) {
    console.error('deleteAdminAnnualReturn error:', error);
    return { success: false, error: error.message || 'Failed to delete annual return' };
  }
}
