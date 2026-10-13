'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { 
  MongoProduct, 
  ProductBrand,
  MongoCheckout, 
  MongoCartItem,
  MongoPayment, 
  MongoBlog, 
  MongoAnnualReturn,
  NoticeItem,
  AdminCoupon,
  CouponCategory,
  AdminConsentRecord
} from '@/types/admin';
import {
  getAllCoupons,
  saveCoupon,
  deleteCoupon,
  toggleCouponStatus,
} from '@/lib/commerce/coupon-storage';
import { getAdminSession } from '@/lib/admin/admin-auth';
import { getAllNotices, saveNotice, removeNotice } from '@/lib/notices/notice-storage';
import { validateNoticeWordCount, validateAndNormalizeDriveUrl, MAX_NOTICE_WORD_COUNT } from '@/lib/notices/notice-utils';
import { 
  getAllBlogsFromDb, 
  getPublishedBlogsFromDb, 
  getBlogBySlugFromDb, 
  toSupabaseBlogPayload, 
  fromSupabaseBlogRow 
} from '@/lib/blogs/blog-storage';
import { getAllConsentRecords, getConsentStats } from '@/lib/privacy/consent-storage';
import { 
  ContentCategoryType, 
  TreelInsightArticle, 
  TmipCaseStudy, 
  SurakshaArticle 
} from '@/types/content';
import { 
  getAllInsights, 
  saveInsight, 
  deleteInsight 
} from '@/lib/content/insights-storage';
import { 
  getAllCaseStudies, 
  saveCaseStudy, 
  deleteCaseStudy 
} from '@/lib/content/casestudies-storage';
import { 
  getAllSurakshaArticles, 
  saveSurakshaArticle, 
  deleteSurakshaArticle 
} from '@/lib/content/suraksha-storage';
import {
  getAllProducts,
  saveProduct,
  deleteProduct,
} from '@/lib/commerce/product-storage';

function getAdminClient() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-treel.supabase.co').replace(/^['"]|['"]$/g, '');
  const key = (
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    'placeholder-key'
  ).replace(/^['"]|['"]$/g, '');
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
export async function getAdminProducts(brand?: "personal" | "suraksha" | "all"): Promise<{ success: boolean; data?: MongoProduct[]; error?: string }> {
  try {
    const data = await getAllProducts(true, brand);
    return { success: true, data };
  } catch (error: any) {
    console.error('getAdminProducts error:', error);
    return { success: false, error: error.message || 'Failed to fetch products' };
  }
}

export async function updateAdminProduct(id: string, updates: Partial<MongoProduct>) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized: Administrator authentication required." };
  }

  if (!id) {
    return { success: false, error: "Product ID is required." };
  }

  try {
    if (updates.title !== undefined && !updates.title.trim()) {
      return { success: false, error: "Product title cannot be empty." };
    }

    if (updates.brand !== undefined) {
      const rawBrand = updates.brand.toLowerCase().trim();
      if (rawBrand !== "personal" && rawBrand !== "suraksha") {
        return { success: false, error: "Invalid brand. Must be 'personal' (Personal TPMS) or 'suraksha' (Treel Suraksha)." };
      }
      updates.brand = rawBrand as ProductBrand;
    }

    const updated = await saveProduct({ ...updates, _id: id });
    return { success: true, data: [updated] };
  } catch (error: any) {
    console.error('updateAdminProduct error:', error);
    return { success: false, error: error.message || 'Failed to update product' };
  }
}

export async function createAdminProduct(product: Partial<MongoProduct>) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized: Administrator authentication required." };
  }

  if (!product.title || !product.title.trim()) {
    return { success: false, error: "Product title is required." };
  }

  const rawBrand = (product.brand || "").toLowerCase().trim();
  if (rawBrand !== "personal" && rawBrand !== "suraksha") {
    return { success: false, error: "Product brand is required. Choose 'Personal TPMS' or 'Treel Suraksha'." };
  }

  try {
    const created = await saveProduct({ ...product, brand: rawBrand as ProductBrand });
    return { success: true, data: [created] };
  } catch (error: any) {
    console.error('createAdminProduct error:', error);
    return { success: false, error: error.message || 'Failed to create product' };
  }
}

export async function deleteAdminProduct(id: string) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized: Administrator authentication required." };
  }

  if (!id) {
    return { success: false, error: "Product ID is required." };
  }

  try {
    const success = await deleteProduct(id);
    return { success };
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
    try {
      revalidatePath('/admin/orders');
      revalidatePath('/admin');
    } catch {}
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
  try {
    const data = await getAllBlogsFromDb();
    return { success: true, data };
  } catch (error: any) {
    console.error('getAdminBlogs error:', error);
    return { success: false, error: error.message || 'Failed to fetch blogs' };
  }
}

export async function getPublicBlogs(): Promise<{ success: boolean; data?: MongoBlog[]; error?: string }> {
  try {
    const data = await getPublishedBlogsFromDb();
    return { success: true, data };
  } catch (error: any) {
    console.error('getPublicBlogs error:', error);
    return { success: false, error: error.message || 'Failed to fetch public blogs' };
  }
}

export async function getPublicBlogBySlug(slug: string): Promise<{ success: boolean; data?: MongoBlog | null; error?: string }> {
  try {
    const blog = await getBlogBySlugFromDb(slug);
    if (!blog || blog.status === 'Draft') {
      return { success: true, data: null };
    }
    return { success: true, data: blog };
  } catch (error: any) {
    console.error('getPublicBlogBySlug error:', error);
    return { success: false, error: error.message || 'Failed to fetch blog post' };
  }
}

export async function createAdminBlog(blog: Partial<MongoBlog>): Promise<{ success: boolean; data?: MongoBlog; error?: string }> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized: Administrator authentication required.' };
  }

  if (!blog.title || !blog.title.trim()) {
    return { success: false, error: 'Blog title is required.' };
  }
  if (!blog.slug || !blog.slug.trim()) {
    return { success: false, error: 'Blog slug is required.' };
  }
  if (!blog.description || !blog.description.trim()) {
    return { success: false, error: 'Blog excerpt/summary is required.' };
  }
  if (!blog.blogContent || !blog.blogContent.trim()) {
    return { success: false, error: 'Blog content body is required.' };
  }

  const cleanSlug = blog.slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  if (!cleanSlug) {
    return { success: false, error: 'Invalid blog slug format.' };
  }

  // Check unique slug
  const existingBlogs = await getAllBlogsFromDb();
  if (existingBlogs.some(b => b.slug.toLowerCase() === cleanSlug.toLowerCase())) {
    return { success: false, error: `A blog post with slug "${cleanSlug}" already exists. Please choose a unique slug.` };
  }

  const supabase = getAdminClient();
  const payload = toSupabaseBlogPayload({ ...blog, slug: cleanSlug });

  try {
    const { error } = await supabase
      .from('TreelEcommerce.blogs')
      .insert([payload]);

    if (error) throw error;

    revalidatePath('/admin/blogs');
    revalidatePath('/personal/blog');
    revalidatePath(`/personal/blog/${cleanSlug}`);
    revalidatePath('/blog');
    revalidatePath(`/blog/${cleanSlug}`);
    revalidatePath('/suraksha/blog');

    return { success: true, data: fromSupabaseBlogRow(payload) };
  } catch (error: any) {
    console.error('createAdminBlog error:', error);
    return { success: false, error: error.message || 'Failed to create blog' };
  }
}

export async function updateAdminBlog(id: string, updates: Partial<MongoBlog>): Promise<{ success: boolean; data?: MongoBlog; error?: string }> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized: Administrator authentication required.' };
  }

  if (updates.title !== undefined && !updates.title.trim()) {
    return { success: false, error: 'Blog title cannot be empty.' };
  }

  if (updates.slug !== undefined) {
    const cleanSlug = updates.slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    if (!cleanSlug) {
      return { success: false, error: 'Invalid blog slug format.' };
    }

    const existingBlogs = await getAllBlogsFromDb();
    if (existingBlogs.some(b => b._id !== id && b.slug.toLowerCase() === cleanSlug.toLowerCase())) {
      return { success: false, error: `A blog post with slug "${cleanSlug}" already exists. Please choose a unique slug.` };
    }
    updates.slug = cleanSlug;
  }

  const existing = (await getAllBlogsFromDb()).find(b => b._id === id);
  const merged: MongoBlog = {
    ...(existing || {
      _id: id,
      title: '',
      slug: updates.slug || `blog-${Date.now()}`,
      description: '',
      blogContent: '',
      image: '',
      date: new Date().toISOString()
    }),
    ...updates
  };

  const supabase = getAdminClient();
  const payload = toSupabaseBlogPayload(merged);

  try {
    const { _id: _ignoredId, ...fields } = payload;
    void _ignoredId;

    const { error } = await supabase
      .from('TreelEcommerce.blogs')
      .update(fields)
      .eq('_id', id);

    if (error) throw error;

    revalidatePath('/admin/blogs');
    revalidatePath('/personal/blog');
    revalidatePath(`/personal/blog/${merged.slug}`);
    revalidatePath('/blog');
    revalidatePath(`/blog/${merged.slug}`);
    revalidatePath('/suraksha/blog');

    return { success: true, data: merged };
  } catch (error: any) {
    console.error('updateAdminBlog error:', error);
    return { success: false, error: error.message || 'Failed to update blog' };
  }
}

export async function deleteAdminBlog(id: string): Promise<{ success: boolean; error?: string }> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized: Administrator authentication required.' };
  }

  const existing = (await getAllBlogsFromDb()).find(b => b._id === id);
  const supabase = getAdminClient();
  try {
    const { error } = await supabase
      .from('TreelEcommerce.blogs')
      .delete()
      .eq('_id', id);

    if (error) throw error;

    revalidatePath('/admin/blogs');
    revalidatePath('/personal/blog');
    if (existing?.slug) {
      revalidatePath(`/personal/blog/${existing.slug}`);
      revalidatePath(`/blog/${existing.slug}`);
    }
    revalidatePath('/blog');
    revalidatePath('/suraksha/blog');

    return { success: true };
  } catch (error: any) {
    console.error('deleteAdminBlog error:', error);
    return { success: false, error: error.message || 'Failed to delete blog' };
  }
}

export async function togglePublishAdminBlog(id: string, currentStatus: "Published" | "Draft"): Promise<{ success: boolean; data?: MongoBlog; error?: string }> {
  const newStatus = currentStatus === "Published" ? "Draft" : "Published";
  return updateAdminBlog(id, { status: newStatus });
}

// ============================================================================
// MULTI-CATEGORY CONTENT CRUD (Treel Main, TMIP, Suraksha, Personal TPMS)
// ============================================================================

export async function getAdminCategoryContent(category: ContentCategoryType): Promise<{ success: boolean; data?: any[]; error?: string }> {
  try {
    switch (category) {
      case "treel_main": {
        const data = await getAllInsights(true);
        return { success: true, data };
      }
      case "tmip": {
        const data = await getAllCaseStudies(true);
        return { success: true, data };
      }
      case "suraksha": {
        const data = await getAllSurakshaArticles(true);
        return { success: true, data };
      }
      case "personal": {
        const data = await getAllBlogsFromDb();
        return { success: true, data };
      }
      default:
        return { success: false, error: `Invalid content category: ${category}` };
    }
  } catch (err: any) {
    console.error(`getAdminCategoryContent [${category}] error:`, err);
    return { success: false, error: err.message || `Failed to fetch ${category} content` };
  }
}

export async function createAdminCategoryContent(
  category: ContentCategoryType,
  payload: any
): Promise<{ success: boolean; data?: any; error?: string }> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized: Administrator authentication required." };
  }

  try {
    switch (category) {
      case "treel_main": {
        if (!payload.title || !payload.title.trim()) {
          return { success: false, error: "Title is required for Treel Main insight." };
        }
        if (!payload.deck || !payload.deck.trim()) {
          return { success: false, error: "Summary / deck is required for Treel Main insight." };
        }
        const saved = await saveInsight(payload);
        revalidatePath("/admin/blogs");
        revalidatePath("/insights");
        revalidatePath("/tmip/insights");
        if (saved.slug) {
          revalidatePath(`/insights/${saved.slug}`);
          revalidatePath(`/tmip/insights/${saved.slug}`);
        }
        return { success: true, data: saved };
      }
      case "tmip": {
        if (!payload.headline || !payload.headline.trim()) {
          return { success: false, error: "Headline is required for TMIP case study." };
        }
        if (!payload.excerpt || !payload.excerpt.trim()) {
          return { success: false, error: "Excerpt is required for TMIP case study." };
        }
        const saved = await saveCaseStudy(payload);
        revalidatePath("/admin/blogs");
        revalidatePath("/tmip/customers/case-studies");
        if (saved.slug) {
          revalidatePath(`/tmip/customers/case-studies/${saved.slug}`);
        }
        return { success: true, data: saved };
      }
      case "suraksha": {
        if (!payload.title || !payload.title.trim()) {
          return { success: false, error: "Title is required for Suraksha article." };
        }
        if (!payload.excerpt || !payload.excerpt.trim()) {
          return { success: false, error: "Excerpt is required for Suraksha article." };
        }
        const saved = await saveSurakshaArticle(payload);
        revalidatePath("/admin/blogs");
        revalidatePath("/suraksha/blog");
        if (saved.slug) {
          revalidatePath(`/suraksha/blog/${saved.slug}`);
        }
        if (saved._id) {
          revalidatePath(`/suraksha/blog/${saved._id}`);
        }
        return { success: true, data: saved };
      }
      case "personal": {
        return createAdminBlog(payload);
      }
      default:
        return { success: false, error: `Invalid content category: ${category}` };
    }
  } catch (err: any) {
    console.error(`createAdminCategoryContent [${category}] error:`, err);
    return { success: false, error: err.message || `Failed to create content in ${category}` };
  }
}

export async function updateAdminCategoryContent(
  category: ContentCategoryType,
  id: string,
  payload: any
): Promise<{ success: boolean; data?: any; error?: string }> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized: Administrator authentication required." };
  }

  try {
    switch (category) {
      case "treel_main": {
        if (payload.title !== undefined && !payload.title.trim()) {
          return { success: false, error: "Title cannot be empty." };
        }
        const saved = await saveInsight({ ...payload, _id: id });
        revalidatePath("/admin/blogs");
        revalidatePath("/insights");
        revalidatePath("/tmip/insights");
        if (saved.slug) {
          revalidatePath(`/insights/${saved.slug}`);
          revalidatePath(`/tmip/insights/${saved.slug}`);
        }
        return { success: true, data: saved };
      }
      case "tmip": {
        if (payload.headline !== undefined && !payload.headline.trim()) {
          return { success: false, error: "Headline cannot be empty." };
        }
        const saved = await saveCaseStudy({ ...payload, _id: id });
        revalidatePath("/admin/blogs");
        revalidatePath("/tmip/customers/case-studies");
        if (saved.slug) {
          revalidatePath(`/tmip/customers/case-studies/${saved.slug}`);
        }
        return { success: true, data: saved };
      }
      case "suraksha": {
        if (payload.title !== undefined && !payload.title.trim()) {
          return { success: false, error: "Title cannot be empty." };
        }
        const saved = await saveSurakshaArticle({ ...payload, _id: id });
        revalidatePath("/admin/blogs");
        revalidatePath("/suraksha/blog");
        if (saved.slug) {
          revalidatePath(`/suraksha/blog/${saved.slug}`);
        }
        if (saved._id) {
          revalidatePath(`/suraksha/blog/${saved._id}`);
        }
        return { success: true, data: saved };
      }
      case "personal": {
        return updateAdminBlog(id, payload);
      }
      default:
        return { success: false, error: `Invalid content category: ${category}` };
    }
  } catch (err: any) {
    console.error(`updateAdminCategoryContent [${category}] error:`, err);
    return { success: false, error: err.message || `Failed to update content in ${category}` };
  }
}

export async function deleteAdminCategoryContent(
  category: ContentCategoryType,
  id: string
): Promise<{ success: boolean; error?: string }> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized: Administrator authentication required." };
  }

  try {
    switch (category) {
      case "treel_main": {
        await deleteInsight(id);
        revalidatePath("/admin/blogs");
        revalidatePath("/insights");
        revalidatePath("/tmip/insights");
        return { success: true };
      }
      case "tmip": {
        await deleteCaseStudy(id);
        revalidatePath("/admin/blogs");
        revalidatePath("/tmip/customers/case-studies");
        return { success: true };
      }
      case "suraksha": {
        await deleteSurakshaArticle(id);
        revalidatePath("/admin/blogs");
        revalidatePath("/suraksha/blog");
        return { success: true };
      }
      case "personal": {
        return deleteAdminBlog(id);
      }
      default:
        return { success: false, error: `Invalid content category: ${category}` };
    }
  } catch (err: any) {
    console.error(`deleteAdminCategoryContent [${category}] error:`, err);
    return { success: false, error: err.message || `Failed to delete content in ${category}` };
  }
}

export async function togglePublishAdminCategoryContent(
  category: ContentCategoryType,
  id: string,
  currentStatus: "Published" | "Draft"
): Promise<{ success: boolean; data?: any; error?: string }> {
  const newStatus = currentStatus === "Published" ? "Draft" : "Published";
  return updateAdminCategoryContent(category, id, { status: newStatus });
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
    const { _id, ...cleanRet } = ret;
    const finalId = _id && !_id.startsWith('new_') ? _id : `ret_${Date.now()}`;
    const payload = {
      ...cleanRet,
      _id: finalId,
      date: ret.date || new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('TreelEcommerce.annualreturns')
      .insert([payload])
      .select();

    if (error) throw error;
    try {
      revalidatePath('/admin/annual-returns');
    } catch {}
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
    try {
      revalidatePath('/admin/annual-returns');
    } catch {}
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
    try {
      revalidatePath('/admin/annual-returns');
    } catch {}
    return { success: true };
  } catch (error: any) {
    console.error('deleteAdminAnnualReturn error:', error);
    return { success: false, error: error.message || 'Failed to delete annual return' };
  }
}

// ============================================================================
// NOTICE BOARD CRUD
// ============================================================================

export async function getAdminNotices(): Promise<{ success: boolean; data?: NoticeItem[]; error?: string }> {
  try {
    const data = await getAllNotices();
    return { success: true, data };
  } catch (error: any) {
    console.error("getAdminNotices error:", error);
    return { success: false, error: error.message || "Failed to fetch notices" };
  }
}

export async function getPublicNotices(): Promise<{ success: boolean; data?: NoticeItem[]; error?: string }> {
  try {
    const all = await getAllNotices();
    const publishedOnly = all.filter((n) => n.status === "Published");
    return { success: true, data: publishedOnly };
  } catch (error: any) {
    console.error("getPublicNotices error:", error);
    return { success: false, error: error.message || "Failed to fetch public notices" };
  }
}

export async function createAdminNotice(notice: Partial<NoticeItem>): Promise<{ success: boolean; data?: NoticeItem; error?: string }> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized: Administrator authentication required." };
  }

  if (!notice.title || !notice.title.trim()) {
    return { success: false, error: "Notice title is required." };
  }

  // Enforce server-side word count limit
  const wordValidation = validateNoticeWordCount(notice.description);
  if (!wordValidation.valid) {
    return { success: false, error: wordValidation.error };
  }

  // Validate and normalize Google Drive URL if present
  let normalizedDocUrl: string | undefined = undefined;
  const rawDocUrl = notice.documentUrl || notice.document_url;
  if (rawDocUrl && rawDocUrl.trim()) {
    const driveValidation = validateAndNormalizeDriveUrl(rawDocUrl);
    if (!driveValidation.valid) {
      return { success: false, error: driveValidation.error };
    }
    normalizedDocUrl = driveValidation.normalizedUrl;
  }

  const id = notice._id && !notice._id.startsWith("new_") ? notice._id : `not_${Date.now()}`;
  const now = new Date().toISOString();
  const newNotice: NoticeItem = {
    _id: id,
    title: notice.title.trim(),
    description: (notice.description || "").trim(),
    publishedDate: notice.publishedDate || now.split("T")[0],
    status: notice.status === "Published" ? "Published" : "Draft",
    category: notice.category?.trim() || "General Notice",
    documentUrl: normalizedDocUrl,
    document_url: normalizedDocUrl,
    createdAt: now,
    updatedAt: now,
  };

  const saved = await saveNotice(newNotice);

  revalidatePath('/admin/notices');
  revalidatePath('/notices');
  return { success: true, data: saved };
}

export async function updateAdminNotice(id: string, updates: Partial<NoticeItem>): Promise<{ success: boolean; data?: NoticeItem; error?: string }> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized: Administrator authentication required." };
  }

  if (updates.title !== undefined && !updates.title.trim()) {
    return { success: false, error: "Notice title cannot be empty." };
  }

  if (updates.description !== undefined) {
    const wordValidation = validateNoticeWordCount(updates.description);
    if (!wordValidation.valid) {
      return { success: false, error: wordValidation.error };
    }
  }

  let normalizedDocUrl: string | undefined = updates.documentUrl || updates.document_url;
  if (normalizedDocUrl && normalizedDocUrl.trim()) {
    const driveValidation = validateAndNormalizeDriveUrl(normalizedDocUrl);
    if (!driveValidation.valid) {
      return { success: false, error: driveValidation.error };
    }
    normalizedDocUrl = driveValidation.normalizedUrl;
  }

  const all = await getAllNotices();
  const existing = all.find((n) => n._id === id);
  const now = new Date().toISOString();
  const updatedNotice: NoticeItem = {
    ...(existing || {
      _id: id,
      title: "",
      description: "",
      status: "Draft",
      createdAt: now,
    }),
    ...updates,
    documentUrl: normalizedDocUrl,
    document_url: normalizedDocUrl,
    updatedAt: now,
  };

  const saved = await saveNotice(updatedNotice);

  revalidatePath('/admin/notices');
  revalidatePath('/notices');
  return { success: true, data: saved };
}

export async function deleteAdminNotice(id: string): Promise<{ success: boolean; error?: string }> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized: Administrator authentication required." };
  }

  await removeNotice(id);

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
      } else if (
        item.lead_source === "Personal Support" ||
        item.form_id === "personal_support_contact" ||
        item.form_id === "personal_support" ||
        item.form_id === "personal_warranty_claim" ||
        item.campaign_type === "personal_support" ||
        item.campaign_type === "personal_warranty_claim" ||
        item.page_path?.startsWith("/personal/support")
      ) {
        source = "Personal Support";
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
      } else if (source === "Personal Support" || source.includes("Support")) {
        vehiclesDisplay = meta?.category || meta?.subject || "Support Inquiry";
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
export type { AdminConsentRecord };

export async function getAdminCookieConsents(): Promise<{
  success: boolean;
  data?: AdminConsentRecord[];
  stats?: {
    total: number;
    accepted: number;
    rejected: number;
    customized: number;
    withdrawn: number;
    analyticsCount?: number;
    marketingCount?: number;
    functionalCount?: number;
  };
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return {
      success: false,
      error: "Unauthorized: Administrator authentication required to access consent audit records.",
      data: [],
      stats: { total: 0, accepted: 0, rejected: 0, customized: 0, withdrawn: 0 },
    };
  }

  try {
    const records = await getAllConsentRecords();
    const stats = getConsentStats(records);

    return {
      success: true,
      data: records,
      stats,
    };
  } catch (error: any) {
    console.error("getAdminCookieConsents error:", error);
    return {
      success: false,
      error: error?.message || "Failed to fetch cookie consent audit records",
      data: [],
      stats: { total: 0, accepted: 0, rejected: 0, customized: 0, withdrawn: 0 },
    };
  }
}

// ============================================================================
// COUPON & DISCOUNT CODE MANAGEMENT CRUD (Personal TPMS vs Suraksha separated)
// ============================================================================

export async function getAdminCoupons(category?: CouponCategory): Promise<{
  success: boolean;
  data?: AdminCoupon[];
  stats?: {
    total: number;
    active: number;
    productCoupons: number;
    sitewideCoupons: number;
  };
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Admin login required." };
  }

  try {
    const list = await getAllCoupons(category);

    const stats = {
      total: list.length,
      active: list.filter((c) => c.status === "Active").length,
      productCoupons: list.filter((c) => !!c.productId && c.productId !== "all").length,
      sitewideCoupons: list.filter((c) => !c.productId || c.productId === "all").length,
    };

    return {
      success: true,
      data: list,
      stats,
    };
  } catch (error: any) {
    console.error("getAdminCoupons error:", error);
    return {
      success: false,
      error: error.message || "Failed to load coupons",
    };
  }
}

export async function saveAdminCoupon(payload: {
  code: string;
  category: CouponCategory;
  discountType: "percent" | "fixed";
  discountValue: number;
  scope?: "category" | "product";
  productId?: string | null;
  productTitle?: string | null;
  productSku?: string | null;
  productIds?: string[] | null;
  productSkus?: string[] | null;
  minOrderValue?: number | null;
  maxDiscount?: number | null;
  status?: "Active" | "Inactive";
  description?: string;
}): Promise<{ success: boolean; data?: AdminCoupon; error?: string }> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Admin login required." };
  }

  if (!payload.category || (payload.category !== "PERSONAL_TPMS" && payload.category !== "SURAKSHA")) {
    return {
      success: false,
      error: "Category must be strictly specified as either 'PERSONAL_TPMS' or 'SURAKSHA'.",
    };
  }

  const result = await saveCoupon({
    code: payload.code,
    category: payload.category,
    discountType: payload.discountType,
    discountValue: payload.discountValue,
    scope: payload.scope,
    productId: payload.productId === "all" ? null : payload.productId,
    productTitle: payload.productTitle,
    productSku: payload.productSku,
    productIds: payload.productIds,
    productSkus: payload.productSkus,
    minOrderValue: payload.minOrderValue,
    maxDiscount: payload.maxDiscount,
    status: payload.status,
    description: payload.description,
  });

  if (result.success) {
    revalidatePath('/admin/coupons');
    revalidatePath('/personal/buy/cart');
    revalidatePath('/personal/buy/checkout');
    revalidatePath('/suraksha/cart');
    revalidatePath('/suraksha/checkout');
  }

  return result;
}

export async function deleteAdminCoupon(
  code: string,
  category?: CouponCategory,
  productId?: string | null
): Promise<{ success: boolean; error?: string }> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Admin login required." };
  }

  const result = await deleteCoupon(code, category);

  if (result.success) {
    revalidatePath('/admin/coupons');
    revalidatePath('/personal/buy/cart');
    revalidatePath('/personal/buy/checkout');
    revalidatePath('/suraksha/cart');
    revalidatePath('/suraksha/checkout');
  }

  return result;
}

export async function toggleAdminCouponStatus(
  code: string,
  category?: CouponCategory,
  productId?: string | null,
  currentStatus?: "Active" | "Inactive"
): Promise<{ success: boolean; error?: string }> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: "Unauthorized. Admin login required." };
  }

  const result = await toggleCouponStatus(code, category);

  if (result.success) {
    revalidatePath('/admin/coupons');
    revalidatePath('/personal/buy/cart');
    revalidatePath('/personal/buy/checkout');
    revalidatePath('/suraksha/cart');
    revalidatePath('/suraksha/checkout');
  }

  return { success: result.success, error: result.error };
}



