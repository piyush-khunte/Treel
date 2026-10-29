'use server';

import { getAdminSession } from '@/lib/admin/admin-auth';
import {
fromSupabaseBlogRow,
getAllBlogsFromDb,
getBlogBySlugFromDb,
getPublishedBlogsFromDb,
toSupabaseBlogPayload
} from '@/lib/blogs/blog-storage';
import {
deleteCoupon,
getAllCoupons,
saveCoupon,
toggleCouponStatus,
} from '@/lib/commerce/coupon-storage';
import {
deleteProduct,
getAllProducts,
saveProduct,
} from '@/lib/commerce/product-storage';
import {
deleteCaseStudy,
getAllCaseStudies,
saveCaseStudy
} from '@/lib/content/casestudies-storage';
import {
deleteInsight,
getAllInsights,
saveInsight
} from '@/lib/content/insights-storage';
import {
deleteSurakshaArticle,
getAllSurakshaArticles,
saveSurakshaArticle
} from '@/lib/content/suraksha-storage';
import { getAllNotices,removeNotice,saveNotice } from '@/lib/notices/notice-storage';
import { validateAndNormalizeDriveUrl,validateNoticeWordCount } from '@/lib/notices/notice-utils';
import { getAllConsentRecords,getConsentStats } from '@/lib/privacy/consent-storage';
import {
  readLocalAnnualReturns,
  writeLocalAnnualReturns,
  sortAnnualReturns
} from '@/lib/content/annual-returns-storage';
import {
AdminConsentRecord,
AdminCoupon,
CouponCategory,
MongoAnnualReturn,
MongoBlog,
MongoCartItem,
MongoCheckout,
MongoPayment,
MongoProduct,
NoticeItem,
ProductBrand
} from '@/types/admin';
import {
ContentCategoryType
} from '@/types/content';
import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

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
    const [prodsRes, checksCountRes, recentChecksRes, allPaysRes, recentPaysRes, blogsRes] = await Promise.all([
      supabase.from('TreelEcommerce.products').select('*', { count: 'exact', head: true }),
      supabase.from('TreelEcommerce.checkouts').select('*', { count: 'exact', head: true }),
      supabase.from('TreelEcommerce.checkouts').select('*').order('date', { ascending: false }).limit(5),
      supabase.from('TreelEcommerce.payments').select('amount', { count: 'exact' }),
      supabase.from('TreelEcommerce.payments').select('*').order('createdAt', { ascending: false }).limit(5),
      supabase.from('TreelEcommerce.blogs').select('*', { count: 'exact', head: true })
    ]);

    const checkouts = (recentChecksRes.data as MongoCheckout[]) || [];
    const payments = (recentPaysRes.data as MongoPayment[]) || [];

    // Calculate total revenue from ALL payments in the table (normalizing paise >= 50000 to rupees)
    const allPaymentRecords = (allPaysRes.data as { amount?: number | string }[]) || [];
    const totalRevenue = allPaymentRecords.reduce((acc, p) => {
      const num = Number(p.amount) || 0;
      return acc + (num >= 50000 ? num / 100 : num);
    }, 0);

    const totalPaidOrdersCount = allPaysRes.count ?? allPaymentRecords.length;
    const totalOrdersCount = checksCountRes.count ?? checkouts.length;
    const totalProductsCount = prodsRes.count ?? 20;
    const totalBlogsCount = blogsRes.count ?? 6;

    return {
      success: true,
      data: {
        totalRevenue,
        totalPaidOrdersCount,
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
        revalidatePath("/tmip/customers/case-studies/[slug]", "page");
        if (saved.slug) {
          revalidatePath(`/tmip/customers/case-studies/${saved.slug}`);
        }
        if (payload.slug && payload.slug !== saved.slug) {
          revalidatePath(`/tmip/customers/case-studies/${payload.slug}`);
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
        revalidatePath("/tmip/customers/case-studies/[slug]", "page");
        if (saved.slug) {
          revalidatePath(`/tmip/customers/case-studies/${saved.slug}`);
        }
        if (payload.slug && payload.slug !== saved.slug) {
          revalidatePath(`/tmip/customers/case-studies/${payload.slug}`);
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
      const local = readLocalAnnualReturns();
      const newRecord: MongoAnnualReturn = {
        _id: finalId,
        title: (payload.title as string) || '',
        pdf: (payload.pdf as string) || '',
        date: payload.date || new Date().toISOString(),
      };
      const updatedLocal = sortAnnualReturns([
        ...local.filter((i) => i._id !== finalId),
        newRecord,
      ]);
      writeLocalAnnualReturns(updatedLocal);
      revalidatePath('/admin/annual-returns');
      revalidatePath('/annual-reports');
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
    const fields = { ...updates };
    delete fields._id;
    const { data, error } = await supabase
      .from('TreelEcommerce.annualreturns')
      .update(fields)
      .eq('_id', id)
      .select();

    if (error) throw error;
    try {
      const local = readLocalAnnualReturns();
      const updatedLocal = sortAnnualReturns(
        local.map((item) => (item._id === id ? { ...item, ...fields } : item))
      );
      writeLocalAnnualReturns(updatedLocal);
      revalidatePath('/admin/annual-returns');
      revalidatePath('/annual-reports');
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
      const local = readLocalAnnualReturns();
      const updatedLocal = local.filter((item) => item._id !== id);
      writeLocalAnnualReturns(updatedLocal);
      revalidatePath('/admin/annual-returns');
      revalidatePath('/annual-reports');
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
export type AdminLeadCategory =
  | "campaign"
  | "contact_form"
  | "demo"
  | "whitepaper"
  | "suraksha"
  | "support";

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
  category?: AdminLeadCategory;
  isGeneralEnquiry?: boolean;
  campaignType?: string;
  formId?: string;
  leadSource?: string;
  pagePath?: string;
  landingPage?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  message?: string;
  subject?: string;
  attributionMetadata?: Record<string, any>;
  createdAt?: string;
}

export async function getAdminLeads(categoryFilter?: string): Promise<{ success: boolean; data?: AdminLeadItem[]; error?: string }> {
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

      const cType = (item.campaign_type || "").toLowerCase();
      const lSource = (item.lead_source || "").toLowerCase();
      const fId = (item.form_id || "").toLowerCase();
      const pPath = (item.page_path || "").toLowerCase();
      const lPage = (item.landing_page || "").toLowerCase();
      const uCamp = (item.utm_campaign || "").toLowerCase();

      let meta: any = {};
      try {
        meta =
          item.attribution_metadata ||
          (typeof item.message === "string" && item.message.startsWith("{") ? JSON.parse(item.message) : {});
      } catch {
        meta = {};
      }
      const rawSubject = (meta?.subject || meta?.category || "").trim();

      // Reliable classification based on schema & persisted fields
      const isCampaign =
        cType.includes("campaign") ||
        lSource.includes("campaign") ||
        lSource.includes("landing page") ||
        lSource === "car_tpms_popup" ||
        lSource === "suraksha emi apply" ||
        fId === "suraksha_emi_apply" ||
        fId === "bike_tpms_callback" ||
        fId === "car_tpms_callback" ||
        fId === "generic_tpms_callback" ||
        fId === "events-subscription" ||
        pPath.startsWith("/lp") ||
        pPath.includes("/campaign") ||
        pPath === "/suraksha/emi/apply" ||
        pPath === "/events" ||
        lPage.includes("/lp") ||
        lPage.includes("/campaign") ||
        Boolean(uCamp);

      const isContactForm =
        !isCampaign &&
        (fId === "contact" ||
          cType === "contact_form" ||
          lSource === "general contact" ||
          pPath === "/contact");

      const isGeneralEnquiry =
        isContactForm &&
        (rawSubject === "" || rawSubject.toLowerCase().includes("general") || rawSubject.toLowerCase() === "general inquiry");

      const isWhitepaper =
        fId === "tmip_whitepaper_access" ||
        cType === "tmip_whitepaper" ||
        lSource === "whitepaper download" ||
        pPath.includes("whitepaper");

      const isDemo =
        !isCampaign &&
        !isWhitepaper &&
        (fId === "tmip_demo" || lSource === "tmip demo" || pPath === "/tmip/demo");

      const isSuraksha =
        !isCampaign &&
        (fId.startsWith("suraksha") ||
          lSource.startsWith("suraksha") ||
          cType.startsWith("suraksha") ||
          pPath.startsWith("/suraksha"));

      const isSupport =
        !isCampaign &&
        (fId.startsWith("personal_") ||
          lSource === "personal support" ||
          cType.startsWith("personal_") ||
          pPath.startsWith("/personal/support"));

      let category: AdminLeadCategory = "campaign";
      if (isCampaign) {
        category = "campaign";
      } else if (isContactForm) {
        category = "contact_form";
      } else if (isWhitepaper) {
        category = "whitepaper";
      } else if (isDemo) {
        category = "demo";
      } else if (isSuraksha) {
        category = "suraksha";
      } else if (isSupport) {
        category = "support";
      }

      // Display source label
      let source = "TMIP Demo";
      if (isCampaign) {
        if (cType.includes("personal_tpms_2w") || lSource.includes("bike")) {
          source = "Personal TPMS 2W Campaign";
        } else if (cType.includes("personal_tpms_4w") || lSource.includes("car")) {
          source = "Personal TPMS 4W Campaign";
        } else if (cType.includes("personal_tpms_generic") || pPath === "/lp/tpms") {
          source = "Personal TPMS Generic Campaign";
        } else if (cType.includes("suraksha") || fId === "suraksha_emi_apply") {
          source = "Suraksha EMI Apply";
        } else if (fId === "events-subscription" || pPath === "/events") {
          source = "TMIP Events Subscription";
        } else {
          source = "TMIP Campaign Lead";
        }
      } else if (isWhitepaper) {
        source = "Whitepaper Download";
      } else if (isDemo) {
        source = "TMIP Demo";
      } else if (isContactForm) {
        source = "General Contact";
      } else if (isSuraksha) {
        source = fId === "suraksha_contact" || lSource.includes("contact") ? "Suraksha Contact" : "Suraksha Callback";
      } else if (isSupport) {
        source = fId.includes("warranty") ? "Warranty Claim" : "Personal Support";
      } else if (item.lead_source) {
        source = item.lead_source;
      }

      const rawStatus = (item.status || "New").toLowerCase();
      let status: AdminLeadItem["status"] = "New";
      if (rawStatus === "contacted") status = "Contacted";
      else if (rawStatus === "qualified") status = "Qualified";
      else if (rawStatus === "closed") status = "Closed";

      let vehiclesDisplay = "1-5";
      if (source === "TMIP Demo") {
        vehiclesDisplay = item.fleet_size ? `${item.fleet_size} Trucks` : meta?.vehicle_type || meta?.fleet_size_label || "Enterprise";
      } else if (source === "Personal Support" || source.includes("Support") || source.includes("Warranty")) {
        vehiclesDisplay = meta?.category || meta?.subject || "Support Inquiry";
      } else if (source === "General Contact") {
        vehiclesDisplay = rawSubject || (item.fleet_size ? `${item.fleet_size} Trucks` : "General");
      } else if (source === "Suraksha Callback") {
        vehiclesDisplay = "15-min Callback";
      } else if (source === "Suraksha Contact") {
        vehiclesDisplay = meta?.truck_config || meta?.topic || (item.fleet_size ? `${item.fleet_size} Trucks` : "Inquiry");
      } else if (source === "Whitepaper Download") {
        vehiclesDisplay = meta?.whitepaperTitle || "Whitepaper";
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
        category,
        isGeneralEnquiry,
        campaignType: item.campaign_type || undefined,
        formId: item.form_id || undefined,
        leadSource: item.lead_source || undefined,
        pagePath: item.page_path || undefined,
        landingPage: item.landing_page || undefined,
        utmSource: item.utm_source || undefined,
        utmMedium: item.utm_medium || undefined,
        utmCampaign: item.utm_campaign || undefined,
        message: typeof item.message === "string" ? item.message : undefined,
        subject: rawSubject || undefined,
        attributionMetadata: meta,
        createdAt: item.created_at || undefined,
      };
    });

    if (categoryFilter && categoryFilter !== "ALL") {
      const filtered = formatted.filter((item) => {
        if (categoryFilter === "CAMPAIGN") return item.category === "campaign";
        if (categoryFilter === "GENERAL_ENQUIRY") return item.category === "contact_form" && item.isGeneralEnquiry;
        if (categoryFilter === "CONTACT_FORM") return item.category === "contact_form";
        if (categoryFilter === "DEMO") return item.category === "demo";
        if (categoryFilter === "WHITEPAPER") return item.category === "whitepaper";
        if (categoryFilter === "SURAKSHA") return item.category === "suraksha";
        if (categoryFilter === "SUPPORT") return item.category === "support";
        return true;
      });
      return { success: true, data: filtered };
    }

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
  void productId;
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
  void productId;
  void currentStatus;
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

// ============================================================================
// EVENTS MANAGEMENT
// ============================================================================

export async function getAdminEventsListAction(): Promise<{
  success: boolean;
  data?: import('@/types/content').EventItemRecord[];
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { getAllEvents } = await import('@/lib/content/events-storage');
    const events = await getAllEvents();
    return { success: true, data: events };
  } catch (err: any) {
    console.error('getAdminEventsListAction error:', err);
    return { success: false, error: err.message || 'Failed to fetch events.' };
  }
}

export async function saveEventAction(
  data: Partial<import('@/types/content').EventItemRecord>
): Promise<{
  success: boolean;
  data?: import('@/types/content').EventItemRecord;
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { saveEvent } = await import('@/lib/content/events-storage');
    const res = await saveEvent(data);
    if (res.success && res.data) {
      revalidatePath('/events');
      if (res.data.slug) {
        revalidatePath(`/events/${res.data.slug}`);
      }
      revalidatePath('/admin/events');
    }
    return res;
  } catch (err: any) {
    console.error('saveEventAction error:', err);
    return { success: false, error: err.message || 'Failed to save event.' };
  }
}

export async function deleteEventAction(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { deleteEvent } = await import('@/lib/content/events-storage');
    const res = await deleteEvent(id);
    if (res.success) {
      revalidatePath('/events');
      revalidatePath('/admin/events');
    }
    return res;
  } catch (err: any) {
    console.error('deleteEventAction error:', err);
    return { success: false, error: err.message || 'Failed to delete event.' };
  }
}

export async function toggleEventPublishAction(
  id: string
): Promise<{
  success: boolean;
  data?: import('@/types/content').EventItemRecord;
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { toggleEventPublish } = await import('@/lib/content/events-storage');
    const res = await toggleEventPublish(id);
    if (res.success && res.data) {
      revalidatePath('/events');
      if (res.data.slug) {
        revalidatePath(`/events/${res.data.slug}`);
      }
      revalidatePath('/admin/events');
    }
    return res;
  } catch (err: any) {
    console.error('toggleEventPublishAction error:', err);
    return { success: false, error: err.message || 'Failed to toggle event publish status.' };
  }
}

// ============================================================================
// CAREERS MANAGEMENT
// ============================================================================

export async function getAdminCareersListAction(): Promise<{
  success: boolean;
  data?: import('@/types/content').JobOpeningRecord[];
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { getAllJobs } = await import('@/lib/content/careers-storage');
    const jobs = await getAllJobs();
    return { success: true, data: jobs };
  } catch (err: any) {
    console.error('getAdminCareersListAction error:', err);
    return { success: false, error: err.message || 'Failed to fetch careers.' };
  }
}

export async function saveJobAction(
  data: Partial<import('@/types/content').JobOpeningRecord>
): Promise<{
  success: boolean;
  data?: import('@/types/content').JobOpeningRecord;
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { saveJob } = await import('@/lib/content/careers-storage');
    const res = await saveJob(data);
    if (res.success && res.data) {
      revalidatePath('/careers');
      if (res.data.slug) {
        revalidatePath(`/careers/${res.data.slug}`);
      }
      revalidatePath('/admin/careers');
    }
    return res;
  } catch (err: any) {
    console.error('saveJobAction error:', err);
    return { success: false, error: err.message || 'Failed to save job.' };
  }
}

export async function deleteJobAction(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { deleteJob } = await import('@/lib/content/careers-storage');
    const res = await deleteJob(id);
    if (res.success) {
      revalidatePath('/careers');
      revalidatePath('/admin/careers');
    }
    return res;
  } catch (err: any) {
    console.error('deleteJobAction error:', err);
    return { success: false, error: err.message || 'Failed to delete job.' };
  }
}

export async function toggleJobPublishAction(
  id: string
): Promise<{
  success: boolean;
  data?: import('@/types/content').JobOpeningRecord;
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { toggleJobPublish } = await import('@/lib/content/careers-storage');
    const res = await toggleJobPublish(id);
    if (res.success && res.data) {
      revalidatePath('/careers');
      if (res.data.slug) {
        revalidatePath(`/careers/${res.data.slug}`);
      }
      revalidatePath('/admin/careers');
    }
    return res;
  } catch (err: any) {
    console.error('toggleJobPublishAction error:', err);
    return { success: false, error: err.message || 'Failed to toggle job publish status.' };
  }
}

export async function closeJobAction(
  id: string
): Promise<{
  success: boolean;
  data?: import('@/types/content').JobOpeningRecord;
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { closeJob } = await import('@/lib/content/careers-storage');
    const res = await closeJob(id);
    if (res.success && res.data) {
      revalidatePath('/careers');
      if (res.data.slug) {
        revalidatePath(`/careers/${res.data.slug}`);
      }
      revalidatePath('/admin/careers');
    }
    return res;
  } catch (err: any) {
    console.error('closeJobAction error:', err);
    return { success: false, error: err.message || 'Failed to close job.' };
  }
}

// ============================================================================
// WHITEPAPERS MANAGEMENT
// ============================================================================

export async function getAdminWhitepapersListAction(): Promise<{
  success: boolean;
  data?: import('@/types/content').WhitepaperRecord[];
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { getAllWhitepapers } = await import('@/lib/content/whitepapers-storage');
    const items = await getAllWhitepapers();
    return { success: true, data: items };
  } catch (err: any) {
    console.error('getAdminWhitepapersListAction error:', err);
    return { success: false, error: err.message || 'Failed to fetch whitepapers.' };
  }
}

export async function saveWhitepaperAction(
  data: Partial<import('@/types/content').WhitepaperRecord>
): Promise<{
  success: boolean;
  data?: import('@/types/content').WhitepaperRecord;
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { saveWhitepaper } = await import('@/lib/content/whitepapers-storage');
    const res = await saveWhitepaper(data);
    if (res.success && res.data) {
      revalidatePath('/tmip/whitepapers');
      revalidatePath('/research');
      if (res.data.slug) {
        revalidatePath(`/tmip/whitepapers/${res.data.slug}`);
      }
      revalidatePath('/admin/whitepapers');
    }
    return res;
  } catch (err: any) {
    console.error('saveWhitepaperAction error:', err);
    return { success: false, error: err.message || 'Failed to save whitepaper.' };
  }
}

export async function deleteWhitepaperAction(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { deleteWhitepaper } = await import('@/lib/content/whitepapers-storage');
    const res = await deleteWhitepaper(id);
    if (res.success) {
      revalidatePath('/tmip/whitepapers');
      revalidatePath('/research');
      revalidatePath('/admin/whitepapers');
    }
    return res;
  } catch (err: any) {
    console.error('deleteWhitepaperAction error:', err);
    return { success: false, error: err.message || 'Failed to delete whitepaper.' };
  }
}

export async function toggleWhitepaperPublishAction(
  id: string
): Promise<{
  success: boolean;
  data?: import('@/types/content').WhitepaperRecord;
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { toggleWhitepaperPublish } = await import('@/lib/content/whitepapers-storage');
    const res = await toggleWhitepaperPublish(id);
    if (res.success && res.data) {
      revalidatePath('/tmip/whitepapers');
      revalidatePath('/research');
      if (res.data.slug) {
        revalidatePath(`/tmip/whitepapers/${res.data.slug}`);
      }
      revalidatePath('/admin/whitepapers');
    }
    return res;
  } catch (err: any) {
    console.error('toggleWhitepaperPublishAction error:', err);
    return { success: false, error: err.message || 'Failed to toggle whitepaper publish status.' };
  }
}







// ============================================================================
// PRESS & MEDIA MANAGEMENT
// ============================================================================

export async function getAdminPressListAction(): Promise<{
  success: boolean;
  data?: import('@/types/content').PressItemRecord[];
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { getAllPressItems } = await import('@/lib/content/press-storage');
    const items = await getAllPressItems(true);
    return { success: true, data: items };
  } catch (err: any) {
    console.error('getAdminPressListAction error:', err);
    return { success: false, error: err.message || 'Failed to fetch press items.' };
  }
}

export async function savePressItemAction(
  data: Partial<import('@/types/content').PressItemRecord>
): Promise<{
  success: boolean;
  data?: import('@/types/content').PressItemRecord;
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { savePressItem } = await import('@/lib/content/press-storage');
    const res = await savePressItem(data);
    if (res.success && res.data) {
      revalidatePath('/press');
      revalidatePath('/admin/press');
      if (res.data.slug) {
        revalidatePath(`/press/${res.data.year || '2026'}/${res.data.slug}`);
      }
    }
    return res;
  } catch (err: any) {
    console.error('savePressItemAction error:', err);
    return { success: false, error: err.message || 'Failed to save press release.' };
  }
}

export async function deletePressItemAction(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { deletePressItem } = await import('@/lib/content/press-storage');
    const res = await deletePressItem(id);
    if (res.success) {
      revalidatePath('/press');
      revalidatePath('/admin/press');
    }
    return res;
  } catch (err: any) {
    console.error('deletePressItemAction error:', err);
    return { success: false, error: err.message || 'Failed to delete press release.' };
  }
}

export async function togglePressPublishAction(
  id: string
): Promise<{
  success: boolean;
  data?: import('@/types/content').PressItemRecord;
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { togglePressPublish } = await import('@/lib/content/press-storage');
    const res = await togglePressPublish(id);
    if (res.success && res.data) {
      revalidatePath('/press');
      revalidatePath('/admin/press');
      if (res.data.slug) {
        revalidatePath(`/press/${res.data.year || '2026'}/${res.data.slug}`);
      }
    }
    return res;
  } catch (err: any) {
    console.error('togglePressPublishAction error:', err);
    return { success: false, error: err.message || 'Failed to toggle press release status.' };
  }
}

// ============================================================================
// MEDIA KIT MANAGEMENT
// ============================================================================

export async function getAdminMediaKitListAction(): Promise<{
  success: boolean;
  data?: import('@/types/content').MediaKitItemRecord[];
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { getAllMediaKitItems } = await import('@/lib/content/mediakit-storage');
    const items = await getAllMediaKitItems(true);
    return { success: true, data: items };
  } catch (err: any) {
    console.error('getAdminMediaKitListAction error:', err);
    return { success: false, error: err.message || 'Failed to fetch media kit items.' };
  }
}

export async function saveMediaKitItemAction(
  data: Partial<import('@/types/content').MediaKitItemRecord>
): Promise<{
  success: boolean;
  data?: import('@/types/content').MediaKitItemRecord;
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { saveMediaKitItem } = await import('@/lib/content/mediakit-storage');
    const res = await saveMediaKitItem(data);
    if (res.success && res.data) {
      revalidatePath('/media-kit', 'page');
      revalidatePath('/admin/media-kit', 'page');
    }
    return res;
  } catch (err: any) {
    console.error('saveMediaKitItemAction error:', err);
    return { success: false, error: err.message || 'Failed to save media kit asset.' };
  }
}

export async function deleteMediaKitItemAction(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { deleteMediaKitItem } = await import('@/lib/content/mediakit-storage');
    const res = await deleteMediaKitItem(id);
    if (res.success) {
      revalidatePath('/media-kit', 'page');
      revalidatePath('/admin/media-kit', 'page');
    }
    return res;
  } catch (err: any) {
    console.error('deleteMediaKitItemAction error:', err);
    return { success: false, error: err.message || 'Failed to delete media kit asset.' };
  }
}

export async function toggleMediaKitPublishAction(
  id: string
): Promise<{
  success: boolean;
  data?: import('@/types/content').MediaKitItemRecord;
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { toggleMediaKitPublish } = await import('@/lib/content/mediakit-storage');
    const res = await toggleMediaKitPublish(id);
    if (res.success && res.data) {
      revalidatePath('/media-kit', 'page');
      revalidatePath('/admin/media-kit', 'page');
    }
    return res;
  } catch (err: any) {
    console.error('toggleMediaKitPublishAction error:', err);
    return { success: false, error: err.message || 'Failed to toggle media kit publish status.' };
  }
}


// ============================================================================
// WARRANTY MANAGEMENT
// ============================================================================

export async function getAdminWarrantyListAction(): Promise<{
  success: boolean;
  data?: import('@/types/content').WarrantyRecord[];
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { getAllWarranties } = await import('@/lib/content/warranty-storage');
    const items = await getAllWarranties();
    return { success: true, data: items };
  } catch (err: any) {
    console.error('getAdminWarrantyListAction error:', err);
    return { success: false, error: err.message || 'Failed to fetch warranty records.' };
  }
}

export async function saveWarrantyAction(
  data: Partial<import('@/types/content').WarrantyRecord>
): Promise<{
  success: boolean;
  data?: import('@/types/content').WarrantyRecord;
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { saveWarranty } = await import('@/lib/content/warranty-storage');
    const res = await saveWarranty(data);
    if (res.success && res.data) {
      revalidatePath('/admin/warranties');
    }
    return res;
  } catch (err: any) {
    console.error('saveWarrantyAction error:', err);
    return { success: false, error: err.message || 'Failed to save warranty record.' };
  }
}

export async function updateWarrantyStatusAction(
  id: string,
  status: import('@/types/content').WarrantyStatus,
  adminNotes?: string
): Promise<{
  success: boolean;
  data?: import('@/types/content').WarrantyRecord;
  error?: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { updateWarrantyStatus } = await import('@/lib/content/warranty-storage');
    const res = await updateWarrantyStatus(id, status, adminNotes, session.username);
    if (res.success && res.data) {
      revalidatePath('/admin/warranties');
    }
    return res;
  } catch (err: any) {
    console.error('updateWarrantyStatusAction error:', err);
    return { success: false, error: err.message || 'Failed to update warranty status.' };
  }
}

export async function deleteWarrantyAction(
  id: string
): Promise<{ success: boolean; error?: string }> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { deleteWarranty } = await import('@/lib/content/warranty-storage');
    const res = await deleteWarranty(id);
    if (res.success) {
      revalidatePath('/admin/warranties');
    }
    return res;
  } catch (err: any) {
    console.error('deleteWarrantyAction error:', err);
    return { success: false, error: err.message || 'Failed to delete warranty record.' };
  }
}

// ============================================================================
// SUBSCRIBERS & BROADCAST MANAGEMENT
// ============================================================================

export async function getAdminSubscribersAction() {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { getAllSubscribers, getAllBroadcastLogs } = await import('@/lib/content/subscriber-storage');
    const [subscribers, broadcasts] = await Promise.all([
      getAllSubscribers(),
      getAllBroadcastLogs(),
    ]);

    const activeCount = subscribers.filter((s) => s.status === 'confirmed').length;
    const unsubscribedCount = subscribers.filter((s) => s.status === 'unsubscribed').length;

    return {
      success: true,
      data: {
        subscribers,
        broadcasts,
        stats: {
          totalSubscribers: subscribers.length,
          activeCount,
          unsubscribedCount,
          totalBroadcasts: broadcasts.length,
        },
      },
    };
  } catch (err: any) {
    console.error('getAdminSubscribersAction error:', err);
    return { success: false, error: err.message || 'Failed to fetch subscribers.' };
  }
}

export async function unsubscribeAdminSubscriberAction(
  query: { token?: string; email?: string }
): Promise<{ success: boolean; message?: string; error?: string }> {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { unsubscribeByTokenOrEmail } = await import('@/lib/content/subscriber-storage');
    const result = await unsubscribeByTokenOrEmail(query);
    if (result.success) {
      revalidatePath('/admin/subscribers');
    }
    return {
      success: result.success,
      message: result.message,
    };
  } catch (err: any) {
    console.error('unsubscribeAdminSubscriberAction error:', err);
    return { success: false, error: err.message || 'Failed to unsubscribe user.' };
  }
}

export async function deleteAdminSubscriberAction(idOrEmail: string) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { deleteSubscriber } = await import('@/lib/content/subscriber-storage');
    const ok = await deleteSubscriber(idOrEmail);
    if (ok) {
      revalidatePath('/admin/subscribers');
    }
    return { success: ok };
  } catch (err: any) {
    console.error('deleteAdminSubscriberAction error:', err);
    return { success: false, error: err.message || 'Failed to delete subscriber.' };
  }
}

export async function sendAdminTestBroadcastAction(articleSlug: string, testEmail: string) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  if (!testEmail || !testEmail.trim()) {
    return { success: false, error: 'Test recipient email is required.' };
  }

  try {
    const { getInsightBySlug } = await import('@/lib/content/insights-storage');
    const { dispatchInsightNotification } = await import('@/lib/content/insights-broadcast');

    const article = await getInsightBySlug(articleSlug);
    if (!article) {
      return { success: false, error: `Insight article not found for slug "${articleSlug}".` };
    }

    const result = await dispatchInsightNotification(article, {
      testEmail: testEmail.trim(),
    });

    return {
      success: result.success,
      data: result,
      message: result.success
        ? `Test notification sent successfully to ${testEmail}.`
        : `Test notification failed: ${result.error || 'Unknown error'}`,
    };
  } catch (err: any) {
    console.error('sendAdminTestBroadcastAction error:', err);
    return { success: false, error: err.message || 'Failed to send test broadcast.' };
  }
}

export async function triggerAdminBroadcastAction(articleSlug: string, force = false) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Admin login required.' };
  }

  try {
    const { getInsightBySlug } = await import('@/lib/content/insights-storage');
    const { dispatchInsightNotification } = await import('@/lib/content/insights-broadcast');

    const article = await getInsightBySlug(articleSlug);
    if (!article) {
      return { success: false, error: `Insight article not found for slug "${articleSlug}".` };
    }

    const result = await dispatchInsightNotification(article, { force });

    revalidatePath('/admin/subscribers');

    return {
      success: result.success,
      data: result,
      message: result.skipped
        ? result.reason
        : `Broadcast completed. Delivered: ${result.deliveredCount}, Failed: ${result.failedCount}.`,
    };
  } catch (err: any) {
    console.error('triggerAdminBroadcastAction error:', err);
    return { success: false, error: err.message || 'Failed to trigger broadcast.' };
  }
}
