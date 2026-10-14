import fs from "fs";
import path from "path";
import { MongoProduct, ProductBrand } from "@/types/admin";
import { PERSONAL_PRODUCTS, PersonalProduct, normalizePersonalCategory } from "@/lib/data/personal-products";
import { SURAKSHA_DEFAULT_PRODUCTS } from "@/lib/data/suraksha-products";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

export function resolveProductBrand(p: Partial<MongoProduct>): ProductBrand {
  const explicit = (p.brand || "").toLowerCase().trim();
  if (explicit === "suraksha") return "suraksha";
  if (explicit === "personal") return "personal";

  // Check authoritative seed membership
  if (p._id && PERSONAL_PRODUCTS.some((seed) => seed.id === p._id)) {
    return "personal";
  }
  if (p._id && SURAKSHA_DEFAULT_PRODUCTS.some((seed) => seed._id === p._id)) {
    return "suraksha";
  }

  // Check reliable Suraksha indicators
  const cat = (p.category || "").toLowerCase();
  const sku = (p.productsku || "").toUpperCase();
  const title = (p.title || "").toLowerCase();
  const slug = (p.slug || "").toLowerCase();

  if (
    cat.includes("suraksha") ||
    cat.includes("commercial") ||
    cat.includes("truck") ||
    sku.includes("SURAKSHA") ||
    title.includes("suraksha") ||
    slug.includes("suraksha")
  ) {
    return "suraksha";
  }

  // Check reliable Personal TPMS indicators
  if (
    cat === "car kit" ||
    cat === "bike kit" ||
    cat === "upgrade kit" ||
    sku.includes("CAR") ||
    sku.includes("BIKE") ||
    sku.includes("MOTOR") ||
    sku.includes("CRUISER") ||
    sku.includes("MTRAC") ||
    title.includes("2w") ||
    title.includes("4w")
  ) {
    return "personal";
  }

  return "personal";
}

function getAdminClient() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-treel.supabase.co").replace(/^['"]|['"]$/g, "");
  const key = (
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    "placeholder-key"
  ).replace(/^['"]|['"]$/g, "");
  return createClient(url, key, { auth: { persistSession: false } });
}

export function generateObjectId(): string {
  const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, "0");
  const random = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
  return timestamp + random;
}

const STORE_PATH = path.join(process.cwd(), "src", "lib", "data", "products-store.json");

function mapPersonalToMongo(p: PersonalProduct): MongoProduct {
  const brand = (p.brand as ProductBrand) || "personal";
  return {
    _id: p.id,
    brand,
    brand_scope: brand,
    title: p.title,
    price: p.price,
    saleprice: p.saleprice,
    category: p.category,
    description: p.description,
    slug: p.slug,
    image: p.image,
    image2: p.image2 || undefined,
    image3: p.image3 || undefined,
    image4: p.image4 || undefined,
    image5: p.image5 || undefined,
    galleryImage1: p.galleryImage1 || undefined,
    galleryImage2: p.galleryImage2 || undefined,
    boxpoint: p.boxpoint || undefined,
    editorValue: p.editorValue || undefined,
    stepone: p.stepone || undefined,
    steptwo: p.steptwo || undefined,
    stepthree: p.stepthree || undefined,
    stepfour: p.stepfour || undefined,
    stepdescription1: p.stepdescription1 || undefined,
    stepdescription2: p.stepdescription2 || undefined,
    stepdescription3: p.stepdescription3 || undefined,
    stepdescription4: p.stepdescription4 || undefined,
    couponamount: p.couponamount,
    couponcode: p.couponcode,
    productsku: p.productsku || undefined,
    date: p.date || undefined,
  };
}

export function mapMongoToPersonal(p: MongoProduct): PersonalProduct {
  const resolvedBrand = p.brand || resolveProductBrand(p);
  const normalizedCategory = resolvedBrand === "personal"
    ? normalizePersonalCategory(p.category)
    : (p.category || "Commercial Truck Kit");

  return {
    id: p._id,
    brand: resolvedBrand,
    title: p.title,
    price: Number(p.price) || 0,
    saleprice: p.saleprice !== null && p.saleprice !== undefined ? Number(p.saleprice) : null,
    category: normalizedCategory as any,
    description: p.description || "",
    slug: p.slug,
    image: p.image,
    image2: p.image2 || null,
    image3: p.image3 || null,
    image4: p.image4 || null,
    image5: p.image5 || null,
    galleryImage1: p.galleryImage1 || null,
    galleryImage2: p.galleryImage2 || null,
    boxpoint: p.boxpoint || null,
    editorValue: p.editorValue || null,
    stepone: p.stepone || null,
    steptwo: p.steptwo || null,
    stepthree: p.stepthree || null,
    stepfour: p.stepfour || null,
    stepdescription1: p.stepdescription1 || null,
    stepdescription2: p.stepdescription2 || null,
    stepdescription3: p.stepdescription3 || null,
    stepdescription4: p.stepdescription4 || null,
    couponamount: p.couponamount || null,
    couponcode: p.couponcode || null,
    productsku: p.productsku || null,
    date: p.date || null,
  };
}

function ensureCanonicalProducts(items: MongoProduct[]): { products: MongoProduct[]; modified: boolean } {
  let modified = false;
  const current = [...items];

  // 1. Ensure Personal TPMS initial seeds exist
  const personalInitial = PERSONAL_PRODUCTS.map(mapPersonalToMongo);
  for (const seed of personalInitial) {
    const exists = current.some(
      (p) => p._id === seed._id || (p.slug && seed.slug && p.slug === seed.slug)
    );
    if (!exists) {
      current.push(seed);
      modified = true;
    }
  }

  // 2. Ensure Suraksha Commercial initial seeds exist
  for (const seed of SURAKSHA_DEFAULT_PRODUCTS) {
    const exists = current.some(
      (p) =>
        p._id === seed._id ||
        (p.slug && seed.slug && p.slug === seed.slug) ||
        (p.productsku && seed.productsku && p.productsku.toUpperCase() === seed.productsku.toUpperCase())
    );
    if (!exists) {
      current.push(seed);
      modified = true;
    }
  }

  return { products: current, modified };
}

function readLocalStore(): MongoProduct[] {
  let items: MongoProduct[] = [];
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        items = parsed.map((item: any) => ({
          ...item,
          brand: item.brand || resolveProductBrand(item),
          brand_scope: item.brand_scope || item.brand || resolveProductBrand(item),
        })) as MongoProduct[];
      }
    }
  } catch (err) {
    console.error("Failed to read products-store.json:", err);
  }

  const { products, modified } = ensureCanonicalProducts(items);
  if (modified || !fs.existsSync(STORE_PATH)) {
    writeLocalStore(products);
  }
  return products;
}

function writeLocalStore(items: MongoProduct[]): void {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write products-store.json:", err);
  }
}

const SUPABASE_PRODUCT_COLUMNS = new Set([
  "_id",
  "title",
  "price",
  "saleprice",
  "category",
  "editorValue",
  "description",
  "slug",
  "image",
  "image2",
  "image3",
  "image4",
  "image5",
  "boxpoint",
  "stepone",
  "steptwo",
  "stepdescription1",
  "stepdescription2",
  "stepdescription3",
  "stepdescription4",
  "date",
  "__v",
  "stepfour",
  "stepthree",
  "couponamount",
  "couponcode",
  "productsku",
  "galleryImage1",
  "galleryImage2",
]);

export function toSupabaseProductPayload(product: MongoProduct): Record<string, any> {
  const payload: Record<string, any> = {};
  for (const key of Object.keys(product)) {
    if (SUPABASE_PRODUCT_COLUMNS.has(key)) {
      payload[key] = (product as any)[key];
    }
  }
  return payload;
}

export async function getAllProducts(
  refreshRemote = true,
  brandFilter?: "personal" | "suraksha" | "all"
): Promise<MongoProduct[]> {
  const localItems = readLocalStore();
  let items = localItems;

  if (refreshRemote) {
    try {
      const supabase = getAdminClient();
      const { data, error } = await supabase
        .from("TreelEcommerce.products")
        .select("*")
        .order("title", { ascending: true });

      if (!error && data && data.length > 0) {
        const remoteProducts = data.map((item: any) => ({
          ...item,
          brand: item.brand || resolveProductBrand(item),
          brand_scope: item.brand_scope || item.brand || resolveProductBrand(item),
        })) as MongoProduct[];

        // Merge remote products with localItems so local newly added/edited items are preserved
        const mergedMap = new Map<string, MongoProduct>();
        for (const p of remoteProducts) {
          mergedMap.set(p._id, p);
        }
        for (const lp of localItems) {
          if (!mergedMap.has(lp._id)) {
            const existsBySlug = remoteProducts.some((rp) => rp.slug === lp.slug);
            if (!existsBySlug) {
              mergedMap.set(lp._id, lp);
            }
          }
        }

        const merged = Array.from(mergedMap.values());
        const { products } = ensureCanonicalProducts(merged);
        writeLocalStore(products);
        items = products;
      }
    } catch (err) {
      // Suppress network errors and gracefully use localItems
    }
  }

  if (brandFilter && brandFilter !== "all") {
    return items.filter((p) => (p.brand || resolveProductBrand(p)) === brandFilter);
  }

  return items;
}

export async function getProductBySlug(
  slug: string,
  brandFilter?: "personal" | "suraksha"
): Promise<MongoProduct | null> {
  const all = await getAllProducts(true, brandFilter);
  const clean = decodeURIComponent(slug).trim().toLowerCase();
  const found = all.find((p) => {
    const itemSlug = (p.slug || "").trim().toLowerCase();
    const itemId = (p._id || "").trim().toLowerCase();
    return itemSlug === clean || itemId === clean;
  });
  if (!found) return null;

  if (brandFilter) {
    const b = found.brand || resolveProductBrand(found);
    if (b !== brandFilter) return null;
  }

  return found;
}

export async function saveProduct(product: Partial<MongoProduct>): Promise<MongoProduct> {
  if (!product.title || !product.title.trim()) {
    throw new Error("Product title is required.");
  }

  const all = await getAllProducts(true);
  const now = new Date().toISOString();

  const isNew = !product._id || product._id.startsWith("new_");
  const id = isNew ? generateObjectId() : product._id!;

  let existingIdx = -1;
  if (!isNew) {
    existingIdx = all.findIndex((p) => p._id === id);
  }
  const existing = existingIdx >= 0 ? all[existingIdx] : undefined;

  // Enforce server-side brand validation
  let resolvedBrand: ProductBrand;
  if (!existing) {
    // Brand is required for new product creation
    const rawBrand = (product.brand || "").toLowerCase().trim();
    if (rawBrand !== "personal" && rawBrand !== "suraksha") {
      throw new Error("Product brand is required. Must be 'personal' (Personal TPMS) or 'suraksha' (Treel Suraksha).");
    }
    resolvedBrand = rawBrand as ProductBrand;
  } else {
    // When editing an existing product, preserve its actual brand unless explicitly and validly updated
    if (product.brand && (product.brand === "personal" || product.brand === "suraksha")) {
      resolvedBrand = product.brand as ProductBrand;
    } else {
      resolvedBrand = (existing.brand as ProductBrand) || resolveProductBrand(existing);
    }
  }

  const rawSlug = (
    product.slug ||
    existing?.slug ||
    product.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") ||
    `product-${Date.now()}`
  ).trim();

  // Prevent slug collision with other products
  const slugCollision = all.find((p) => p._id !== id && (p.slug || "").toLowerCase() === rawSlug.toLowerCase());
  if (slugCollision) {
    if (isNew) {
      throw new Error(`A product with slug "${rawSlug}" already exists ("${slugCollision.title}"). Please choose a unique slug.`);
    } else {
      throw new Error(`Cannot change slug to "${rawSlug}" because it is already used by "${slugCollision.title}".`);
    }
  }
  const slug = rawSlug;

  let finalCategory: string;
  if (resolvedBrand === "personal") {
    const rawCat = product.category?.trim() || existing?.category;
    finalCategory = rawCat ? normalizePersonalCategory(rawCat) : "Car Kit";
  } else {
    finalCategory = product.category?.trim() || existing?.category || "Commercial Truck Kit";
  }

  const fullProduct: MongoProduct = {
    _id: id,
    brand: resolvedBrand,
    brand_scope: resolvedBrand,
    title: product.title.trim(),
    price: Number(product.price) || 0,
    saleprice: product.saleprice !== undefined && product.saleprice !== null ? Number(product.saleprice) : null,
    category: finalCategory,
    description: product.description !== undefined ? product.description : (existing?.description || ""),
    slug,
    image: product.image || existing?.image || "",
    image2: product.image2 !== undefined ? product.image2 : existing?.image2,
    image3: product.image3 !== undefined ? product.image3 : existing?.image3,
    image4: product.image4 !== undefined ? product.image4 : existing?.image4,
    image5: product.image5 !== undefined ? product.image5 : existing?.image5,
    galleryImage1: product.galleryImage1 !== undefined ? product.galleryImage1 : existing?.galleryImage1,
    galleryImage2: product.galleryImage2 !== undefined ? product.galleryImage2 : existing?.galleryImage2,
    boxpoint: product.boxpoint !== undefined ? product.boxpoint : existing?.boxpoint,
    editorValue: product.editorValue !== undefined ? product.editorValue : existing?.editorValue,
    stepone: product.stepone !== undefined ? product.stepone : existing?.stepone,
    steptwo: product.steptwo !== undefined ? product.steptwo : existing?.steptwo,
    stepthree: product.stepthree !== undefined ? product.stepthree : existing?.stepthree,
    stepfour: product.stepfour !== undefined ? product.stepfour : existing?.stepfour,
    stepdescription1: product.stepdescription1 !== undefined ? product.stepdescription1 : existing?.stepdescription1,
    stepdescription2: product.stepdescription2 !== undefined ? product.stepdescription2 : existing?.stepdescription2,
    stepdescription3: product.stepdescription3 !== undefined ? product.stepdescription3 : existing?.stepdescription3,
    stepdescription4: product.stepdescription4 !== undefined ? product.stepdescription4 : existing?.stepdescription4,
    couponamount: product.couponamount !== undefined ? product.couponamount : existing?.couponamount,
    couponcode: product.couponcode !== undefined ? product.couponcode : existing?.couponcode,
    productsku: product.productsku || existing?.productsku || slug,
    date: existing?.date || product.date || now,
    status: product.status || existing?.status || "active",
    stock: product.stock !== undefined ? Number(product.stock) : (existing?.stock !== undefined ? existing.stock : 100),
  };

  let updatedList: MongoProduct[];
  if (existingIdx >= 0) {
    updatedList = [...all];
    updatedList[existingIdx] = fullProduct;
  } else {
    updatedList = [fullProduct, ...all];
  }

  writeLocalStore(updatedList);

  // Sync to Supabase TreelEcommerce.products
  try {
    const supabase = getAdminClient();
    const payload = toSupabaseProductPayload(fullProduct);
    const { error: sbError } = await supabase
      .from("TreelEcommerce.products")
      .upsert([payload], { onConflict: "_id" });

    if (sbError) {
      console.error("Supabase sync error for product:", sbError);
    }
  } catch (err) {
    console.error("Supabase sync error for product:", err);
  }

  // Bust caches safely
  try {
    revalidatePath("/admin/inventory");
    revalidatePath("/admin/products");
    revalidatePath("/personal/buy");
    revalidatePath("/personal/product");
    revalidatePath("/suraksha/pricing");
    revalidatePath("/suraksha/buy");
    revalidatePath("/suraksha/product");
    revalidatePath("/api/products");
  } catch {
    // Outside Next.js request lifecycle
  }

  return fullProduct;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const all = await getAllProducts(true);
  const clean = id.toLowerCase();
  const filtered = all.filter((p) => p._id.toLowerCase() !== clean && p.slug.toLowerCase() !== clean);
  if (filtered.length === all.length) return false;

  writeLocalStore(filtered);

  try {
    const supabase = getAdminClient();
    await supabase
      .from("TreelEcommerce.products")
      .delete()
      .or(`_id.eq.${id},slug.eq.${id}`);
  } catch (err) {
    console.error("Supabase sync error deleting product:", err);
  }

  try {
    revalidatePath("/admin/inventory");
    revalidatePath("/admin/products");
    revalidatePath("/personal/buy");
    revalidatePath("/personal/product");
    revalidatePath("/suraksha/pricing");
    revalidatePath("/suraksha/buy");
    revalidatePath("/suraksha/product");
    revalidatePath("/api/products");
  } catch {
    // Outside Next.js request lifecycle
  }

  return true;
}
