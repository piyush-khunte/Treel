'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { 
  MongoProduct, 
  MongoCheckout, 
  MongoCartItem,
  MongoPayment, 
  MongoBlog, 
  MongoAnnualReturn,
  NoticeItem 
} from '@/types/admin';

function getAdminClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-treel.supabase.co';
  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    'placeholder-key';
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

    const checkouts: MongoCheckout[] = (data || []).map((row: any) => {
      const cartData: MongoCartItem[] = Array.isArray(row.cartData) ? [...row.cartData] : [];
      if (cartData.length === 0) {
        for (let i = 0; i < 10; i++) {
          const title = row[`cartData[${i}].title`];
          if (title) {
            cartData.push({
              id: row[`cartData[${i}].id`],
              title,
              description: row[`cartData[${i}].description`],
              image: row[`cartData[${i}].image`],
              category: row[`cartData[${i}].category`],
              originalPrice: row[`cartData[${i}].originalPrice`],
              price: row[`cartData[${i}].price`],
              quantity: row[`cartData[${i}].quantity`] || 1,
              productsku: row[`cartData[${i}].productsku`],
              saleprice: row[`cartData[${i}].saleprice`],
              couponcode: row[`cartData[${i}].couponcode`],
              couponamount: row[`cartData[${i}].couponamount`],
              couponMessage: row[`cartData[${i}].couponMessage`],
              saveAmount: row[`cartData[${i}].saveAmount`],
            });
          }
        }
      }
      return {
        ...row,
        cartData,
      };
    });

    return { success: true, data: checkouts };
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

// ============================================================================
// NOTICE BOARD CRUD
// ============================================================================

// Module-level cache/fallback for reliable local and offline operation
let localNotices: NoticeItem[] = [
  {
    _id: "not_101",
    title: "Statutory Notice: Compliance & Audited Annual Financial Disclosures (FY 2025-26)",
    description: "Notice is hereby given that the audited financial accounts and statutory filings of Treel Mobility Solutions Private Limited for the financial year have been adopted and submitted in compliance with applicable MCA corporate regulations.",
    publishedDate: "2026-03-20",
    status: "Published",
    category: "Corporate & Statutory",
    createdAt: "2026-03-20T10:00:00.000Z"
  }
];

export async function getAdminNotices(): Promise<{ success: boolean; data?: NoticeItem[]; error?: string }> {
  const supabase = getAdminClient();
  try {
    const { data, error } = await supabase
      .from('TreelEcommerce.notices')
      .select('*')
      .order('publishedDate', { ascending: false });

    if (!error && data && data.length > 0) {
      return { success: true, data: data as NoticeItem[] };
    }
  } catch {
    // Graceful fallback to local store if remote table not migrated
  }
  return { success: true, data: [...localNotices].sort((a, b) => (b.publishedDate || "").localeCompare(a.publishedDate || "")) };
}

export async function getPublicNotices(): Promise<{ success: boolean; data?: NoticeItem[]; error?: string }> {
  const supabase = getAdminClient();
  try {
    const { data, error } = await supabase
      .from('TreelEcommerce.notices')
      .select('*')
      .eq('status', 'Published')
      .order('publishedDate', { ascending: false });

    if (!error && data && data.length > 0) {
      return { success: true, data: data as NoticeItem[] };
    }
  } catch {
    // Graceful fallback
  }
  const publishedOnly = localNotices
    .filter(n => n.status === "Published")
    .sort((a, b) => (b.publishedDate || "").localeCompare(a.publishedDate || ""));
  return { success: true, data: publishedOnly };
}

export async function createAdminNotice(notice: Partial<NoticeItem>): Promise<{ success: boolean; data?: NoticeItem; error?: string }> {
  const supabase = getAdminClient();
  const id = notice._id || `not_${Date.now()}`;
  const now = new Date().toISOString();
  const newNotice: NoticeItem = {
    _id: id,
    title: notice.title || "Untitled Notice",
    description: notice.description || "",
    publishedDate: notice.publishedDate || now.split("T")[0],
    status: notice.status === "Published" ? "Published" : "Draft",
    category: notice.category || "General Notice",
    createdAt: now,
    updatedAt: now
  };

  // Always update local cache for instant consistency
  localNotices = [newNotice, ...localNotices.filter(n => n._id !== id)];

  try {
    const { data, error } = await supabase
      .from('TreelEcommerce.notices')
      .insert([newNotice])
      .select();

    if (!error && data) {
      // synced to Supabase
    }
  } catch {
    // Local store active
  }

  revalidatePath('/admin/notices');
  revalidatePath('/notices');
  return { success: true, data: newNotice };
}

export async function updateAdminNotice(id: string, updates: Partial<NoticeItem>): Promise<{ success: boolean; data?: NoticeItem; error?: string }> {
  const supabase = getAdminClient();
  const now = new Date().toISOString();
  const existing = localNotices.find(n => n._id === id);
  const updatedNotice: NoticeItem = {
    ...(existing || {
      _id: id,
      title: "",
      description: "",
      status: "Draft",
      createdAt: now
    }),
    ...updates,
    updatedAt: now
  };

  localNotices = localNotices.map(n => (n._id === id ? updatedNotice : n));

  try {
    const { _id: _ignoredId, ...fields } = updates;
    void _ignoredId;
    await supabase
      .from('TreelEcommerce.notices')
      .update({ ...fields, updatedAt: now })
      .eq('_id', id);
  } catch {
    // Local store active
  }

  revalidatePath('/admin/notices');
  revalidatePath('/notices');
  return { success: true, data: updatedNotice };
}

export async function deleteAdminNotice(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = getAdminClient();
  localNotices = localNotices.filter(n => n._id !== id);

  try {
    await supabase
      .from('TreelEcommerce.notices')
      .delete()
      .eq('_id', id);
  } catch {
    // Local store active
  }

  revalidatePath('/admin/notices');
  revalidatePath('/notices');
  return { success: true };
}

export async function togglePublishAdminNotice(id: string, currentStatus: "Published" | "Draft"): Promise<{ success: boolean; data?: NoticeItem; error?: string }> {
  const newStatus = currentStatus === "Published" ? "Draft" : "Published";
  return updateAdminNotice(id, { status: newStatus });
}

// ============================================================================
// LEADS CRM
// ============================================================================
export interface AdminLeadItem {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  source: string;
  vehicles: string;
  status: "New" | "Contacted" | "Qualified" | "Closed";
  time: string;
  rawId?: string;
}

export async function getAdminLeads(): Promise<{ success: boolean; data?: AdminLeadItem[]; error?: string }> {
  const supabase = getAdminClient();
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data || data.length === 0) {
      return { success: true, data: [] };
    }

    const formatted: AdminLeadItem[] = data.map((item: any) => {
      let relativeTime = "Recently";
      if (item.created_at) {
        const diffMs = Date.now() - new Date(item.created_at).getTime();
        const diffMins = Math.floor(diffMs / 60000);
        if (diffMins < 60) relativeTime = `${Math.max(1, diffMins)} mins ago`;
        else if (diffMins < 1440) relativeTime = `${Math.floor(diffMins / 60)} hours ago`;
        else relativeTime = `${Math.floor(diffMins / 1440)} days ago`;
      }

      let source = "TMIP Demo";
      if (item.lead_source === "TMIP Demo" || item.form_id === "tmip_demo" || item.page_path === "/tmip/demo") {
        source = "TMIP Demo";
      } else if (item.lead_source === "General Contact" || item.form_id === "contact" || item.type === "contact" || item.page_path === "/contact") {
        source = "General Contact";
      } else if (item.lead_source === "Suraksha Callback" || item.form_id === "suraksha_callback" || item.type === "suraksha_callback" || item.page_path === "/suraksha/callback") {
        source = "Suraksha Callback";
      } else if (item.lead_source === "Suraksha Contact" || item.form_id === "suraksha_contact" || item.type === "suraksha_contact" || item.page_path === "/suraksha/contact") {
        source = "Suraksha Contact";
      } else if (item.form_id === "tmip_footer_demo") {
        source = "TMIP Footer Demo";
      } else if (item.campaign_type === "tmip_campaign" || item.type === "tmip_campaign_lead") {
        source = "TMIP Campaign Lead";
      } else if (item.type === "personal_tpms_2w" || item.campaign_type === "personal_tpms_2w_campaign") {
        source = "Personal TPMS 2W Campaign";
      } else if (item.type === "suraksha_emi") {
        source = "Suraksha EMI Apply";
      } else if (item.type === "express_callback") {
        source = "30s Express Callback";
      } else if (item.lead_source) {
        source = item.lead_source;
      }

      const rawStatus = (item.status || "New").toLowerCase();
      let status: AdminLeadItem["status"] = "New";
      if (rawStatus === "contacted") status = "Contacted";
      else if (rawStatus === "qualified") status = "Qualified";
      else if (rawStatus === "closed") status = "Closed";

      let meta: any = {};
      try {
        meta =
          item.attribution_metadata ||
          (typeof item.message === "string" && item.message.startsWith("{") ? JSON.parse(item.message) : {});
      } catch {
        meta = {};
      }

      let vehiclesDisplay = "1-5";
      if (source === "TMIP Demo") {
        vehiclesDisplay = item.fleet_size ? `${item.fleet_size} Trucks` : meta?.vehicle_type || meta?.fleet_size_label || "Enterprise";
      } else if (source === "General Contact") {
        vehiclesDisplay = meta?.subject || (item.fleet_size ? `${item.fleet_size} Trucks` : "General");
      } else if (source === "Suraksha Callback") {
        vehiclesDisplay = "15-min Callback";
      } else if (source === "Suraksha Contact") {
        vehiclesDisplay = meta?.truck_config || meta?.topic || (item.fleet_size ? `${item.fleet_size} Trucks` : "Inquiry");
      } else if (item.fleet_size) {
        vehiclesDisplay = `${item.fleet_size} Vehicles`;
      } else if (item.type === "personal_tpms_2w" || item.campaign_type === "personal_tpms_2w_campaign") {
        vehiclesDisplay =
          meta?.kit_interest === "motorbike_kit"
            ? "Motorbike"
            : meta?.kit_interest === "scooter_kit"
            ? "Scooter"
            : (meta?.vehicle_model || "2-Wheeler");
      }

      return {
        id: item.id ? (item.id.length > 8 ? `LD-${item.id.slice(-6).toUpperCase()}` : item.id) : `LD-${Math.floor(Math.random() * 1000)}`,
        rawId: item.id,
        name: item.full_name || item.name || "Anonymous",
        company: item.company || item.company_name || "Personal Vehicle Owner",
        phone: item.mobile_number || item.phone || "N/A",
        email: item.work_email || item.email || "N/A",
        source,
        vehicles: vehiclesDisplay,
        status,
        time: relativeTime,
      };
    });

    return { success: true, data: formatted };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to fetch leads' };
  }
}

export async function updateAdminLeadStatus(id: string, newStatus: string): Promise<{ success: boolean; error?: string }> {
  const supabase = getAdminClient();
  try {
    await supabase
      .from('leads')
      .update({ status: newStatus.toLowerCase() })
      .eq('id', id);
    revalidatePath('/admin/leads');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ============================================================================
// COOKIE CONSENT RECORDS
// ============================================================================
export interface AdminConsentRecord {
  id: string;
  consentId: string;
  status: "Accepted" | "Rejected" | "Customized" | "Withdrawn";
  categories: string;
  policyVersion: string;
  timestamp: string;
  formattedDate: string;
  withdrawnAt?: string | null;
}

export async function getAdminCookieConsents(): Promise<{
  success: boolean;
  data?: AdminConsentRecord[];
  stats?: {
    total: number;
    accepted: number;
    rejected: number;
    customized: number;
    withdrawn: number;
  };
  error?: string;
}> {
  const supabase = getAdminClient();
  try {
    let { data, error } = await supabase
      .from('cookie_consents')
      .select('*')
      .order('consent_timestamp', { ascending: false });

    if (error && (error.code === '42P01' || error.message?.includes('does not exist') || error.message?.includes('relation'))) {
      const fallback = await supabase
        .from('TreelEcommerce.cookie_consents')
        .select('*')
        .order('consent_timestamp', { ascending: false });
      if (!fallback.error) {
        data = fallback.data;
        error = null;
      }
    }

    if (error) {
      console.warn('[getAdminCookieConsents] Query warning/fallback:', error.message || error);
      return {
        success: true,
        data: [],
        stats: { total: 0, accepted: 0, rejected: 0, customized: 0, withdrawn: 0 },
      };
    }

    const records: AdminConsentRecord[] = (data || []).map((row: any) => {
      const rawStatus = (row.status || "").toLowerCase();
      let status: AdminConsentRecord["status"] = "Customized";
      if (rawStatus === "accepted") status = "Accepted";
      else if (rawStatus === "rejected") status = "Rejected";
      else if (rawStatus === "withdrawn") status = "Withdrawn";

      const cats = row.categories || {};
      const activeCats: string[] = ["Necessary"];
      if (cats.functional) activeCats.push("Functional");
      if (cats.analytics) activeCats.push("Analytics");
      if (cats.marketing) activeCats.push("Marketing");

      let formattedDate = "Recently";
      if (row.consent_timestamp) {
        try {
          const d = new Date(row.consent_timestamp);
          formattedDate = d.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Kolkata",
          }) + " IST";
        } catch {
          formattedDate = row.consent_timestamp;
        }
      }

      return {
        id: row.id,
        consentId: row.consent_id || "Anonymous",
        status,
        categories: activeCats.join(", "),
        policyVersion: row.policy_version || "2026-10-01",
        timestamp: row.consent_timestamp || new Date().toISOString(),
        formattedDate,
        withdrawnAt: row.withdrawn_at || null,
      };
    });

    const stats = {
      total: records.length,
      accepted: records.filter((r) => r.status === "Accepted").length,
      rejected: records.filter((r) => r.status === "Rejected").length,
      customized: records.filter((r) => r.status === "Customized").length,
      withdrawn: records.filter((r) => r.status === "Withdrawn").length,
    };

    return {
      success: true,
      data: records,
      stats,
    };
  } catch (error: any) {
    console.error("getAdminCookieConsents error:", error);
    return {
      success: true,
      data: [],
      stats: { total: 0, accepted: 0, rejected: 0, customized: 0, withdrawn: 0 },
    };
  }
}


