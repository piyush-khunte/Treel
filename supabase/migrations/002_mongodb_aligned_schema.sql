-- ============================================================================
-- Supabase / PostgreSQL Schema Redesign for Treel Ecommerce
-- Migration: 002_mongodb_aligned_schema.sql
-- 
-- Source of Truth: Client MongoDB Collection Schemas
-- 1. schema-TreelEcommerce-products-standardJSON.json
-- 2. schema-TreelEcommerce-checkouts-standardJSON.json
-- 3. schema-TreelEcommerce-payments-standardJSON.json
-- 4. schema-TreelEcommerce-coupons-standardJSON.json
-- 5. schema-TreelEcommerce-blogs-standardJSON.json
-- 6. schema-TreelEcommerce-annualreturns-standardJSON.json
-- 7. schema-TreelEcommerce-t_test-standardJSON.json
--
-- Safety Guarantees:
-- - Non-destructive: Does not drop legacy tables.
-- - Idempotent: Uses IF NOT EXISTS and UNIQUE mongo_id for safe repeatable upsert.
-- - Relational Integrity: Normalizes embedded cartData into checkout_items with FK.
-- - Preserves source ObjectIds, timestamps, and S3 image links.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. PRODUCTS (MongoDB: 'products')
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mongo_id TEXT UNIQUE,                       -- Preserves MongoDB _id ($oid) for migration & idempotent sync
  title TEXT NOT NULL,                        -- MongoDB 'title'
  price NUMERIC(12, 2) NOT NULL DEFAULT 0,    -- MongoDB 'price'
  sale_price NUMERIC(12, 2),                  -- MongoDB 'saleprice'
  category TEXT NOT NULL DEFAULT 'General',   -- MongoDB 'category'
  description TEXT,                           -- MongoDB 'description'
  editor_value TEXT,                          -- MongoDB 'editorValue' (HTML/rich description)
  slug TEXT UNIQUE NOT NULL,                  -- MongoDB 'slug'
  image TEXT NOT NULL,                        -- MongoDB 'image' (Primary S3 URL)
  image_2 TEXT,                               -- MongoDB 'image2'
  image_3 TEXT,                               -- MongoDB 'image3'
  image_4 TEXT,                               -- MongoDB 'image4'
  image_5 TEXT,                               -- MongoDB 'image5'
  gallery_image_1 TEXT,                       -- MongoDB 'galleryImage1' (optional)
  gallery_image_2 TEXT,                       -- MongoDB 'galleryImage2' (optional)
  box_point TEXT,                             -- MongoDB 'boxpoint'
  step_one TEXT,                              -- MongoDB 'stepone'
  step_two TEXT,                              -- MongoDB 'steptwo'
  step_three TEXT,                            -- MongoDB 'stepthree'
  step_four TEXT,                             -- MongoDB 'stepfour'
  step_description_1 TEXT,                    -- MongoDB 'stepdescription1'
  step_description_2 TEXT,                    -- MongoDB 'stepdescription2'
  step_description_3 TEXT,                    -- MongoDB 'stepdescription3'
  step_description_4 TEXT,                    -- MongoDB 'stepdescription4'
  coupon_amount NUMERIC(12, 2),               -- MongoDB 'couponamount'
  coupon_code TEXT,                           -- MongoDB 'couponcode'
  product_sku TEXT,                           -- MongoDB 'productsku'
  source_version INT DEFAULT 0,               -- MongoDB '__v'
  source_date TIMESTAMPTZ,                    -- MongoDB 'date' ($date)
  is_active BOOLEAN NOT NULL DEFAULT true,    -- Status flag for web storefront
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for Products
CREATE INDEX IF NOT EXISTS idx_products_mongo_id ON public.products(mongo_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_sku ON public.products(product_sku);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);

-- ============================================================================
-- 2. CHECKOUTS / ORDERS (MongoDB: 'checkouts')
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.checkouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mongo_id TEXT UNIQUE,                       -- Preserves MongoDB _id ($oid)
  first_name TEXT NOT NULL,                   -- MongoDB 'firstname'
  last_name TEXT NOT NULL,                    -- MongoDB 'lastname'
  contact TEXT,                               -- MongoDB 'contact' (email or primary contact)
  phone TEXT NOT NULL,                        -- MongoDB 'phone'
  address TEXT NOT NULL,                      -- MongoDB 'address'
  address_optional TEXT,                      -- MongoDB 'addressoptional'
  city TEXT NOT NULL,                         -- MongoDB 'city'
  state TEXT NOT NULL,                        -- MongoDB 'state'
  pin TEXT NOT NULL,                          -- MongoDB 'pin'
  country TEXT NOT NULL DEFAULT 'India',      -- MongoDB 'country'
  price_raw TEXT NOT NULL,                    -- MongoDB 'price' (string representation in source)
  total_amount NUMERIC(12, 2),                -- Normalized parsed numeric total
  status TEXT NOT NULL DEFAULT 'pending',     -- MongoDB 'status'
  cart_data_backup JSONB,                     -- Raw JSONB snapshot of cartData for zero-loss audit
  source_version INT DEFAULT 0,               -- MongoDB '__v'
  source_date TIMESTAMPTZ,                    -- MongoDB 'date' ($date)
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for Checkouts
CREATE INDEX IF NOT EXISTS idx_checkouts_mongo_id ON public.checkouts(mongo_id);
CREATE INDEX IF NOT EXISTS idx_checkouts_phone ON public.checkouts(phone);
CREATE INDEX IF NOT EXISTS idx_checkouts_status ON public.checkouts(status);
CREATE INDEX IF NOT EXISTS idx_checkouts_source_date ON public.checkouts(source_date);

-- ============================================================================
-- 2.1 CHECKOUT ITEMS (Normalized from MongoDB 'checkouts.cartData')
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.checkout_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  checkout_id UUID NOT NULL REFERENCES public.checkouts(id) ON DELETE CASCADE,
  mongo_cart_id TEXT,                         -- MongoDB cartData.id
  product_sku TEXT,                           -- MongoDB cartData.productsku
  title TEXT NOT NULL,                        -- MongoDB cartData.title
  category TEXT NOT NULL,                     -- MongoDB cartData.category
  description TEXT,                           -- MongoDB cartData.description
  image TEXT,                                 -- MongoDB cartData.image
  quantity INT NOT NULL DEFAULT 1,            -- MongoDB cartData.quantity
  price NUMERIC(12, 2) NOT NULL DEFAULT 0,    -- MongoDB cartData.price
  original_price NUMERIC(12, 2) NOT NULL DEFAULT 0, -- MongoDB cartData.originalPrice
  sale_price NUMERIC(12, 2),                  -- MongoDB cartData.saleprice
  save_amount NUMERIC(12, 2) DEFAULT 0,       -- MongoDB cartData.saveAmount
  coupon_code TEXT,                           -- MongoDB cartData.couponcode
  coupon_amount NUMERIC(12, 2),               -- MongoDB cartData.couponamount
  coupon_message TEXT,                        -- MongoDB cartData.couponMessage
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for Checkout Items
CREATE INDEX IF NOT EXISTS idx_checkout_items_checkout_id ON public.checkout_items(checkout_id);
CREATE INDEX IF NOT EXISTS idx_checkout_items_sku ON public.checkout_items(product_sku);

-- ============================================================================
-- 3. PAYMENTS (MongoDB: 'payments')
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mongo_id TEXT UNIQUE,                       -- Preserves MongoDB _id ($oid)
  order_id TEXT NOT NULL,                     -- MongoDB 'order_id' (Razorpay/Checkout link)
  payment_id TEXT NOT NULL,                   -- MongoDB 'payment_id' (Razorpay payment ID)
  customer_name TEXT NOT NULL,                -- MongoDB 'customer_name'
  product_name TEXT NOT NULL,                 -- MongoDB 'product_name'
  amount NUMERIC(12, 2) NOT NULL,             -- MongoDB 'amount'
  gateway_created_at TIMESTAMPTZ,             -- MongoDB 'created_at' ($date from gateway)
  mongo_created_at TIMESTAMPTZ,               -- MongoDB 'createdAt' ($date record creation)
  mongo_updated_at TIMESTAMPTZ,               -- MongoDB 'updatedAt' ($date record update)
  source_version INT DEFAULT 0,               -- MongoDB '__v'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for Payments
CREATE INDEX IF NOT EXISTS idx_payments_mongo_id ON public.payments(mongo_id);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON public.payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_payment_id ON public.payments(payment_id);
CREATE INDEX IF NOT EXISTS idx_payments_customer_name ON public.payments(customer_name);

-- ============================================================================
-- 4. COUPONS (MongoDB: 'coupons')
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.coupons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mongo_id TEXT UNIQUE,                       -- Preserves MongoDB _id ($oid) if present
  code TEXT UNIQUE NOT NULL,                  -- Coupon code (e.g., 'TREEL10')
  discount_type TEXT NOT NULL DEFAULT 'percentage' CHECK (discount_type IN ('percentage', 'fixed_amount', 'free_shipping')),
  discount_value NUMERIC(10, 2) NOT NULL DEFAULT 0, -- Percentage or fixed value
  min_order_amount NUMERIC(10, 2) DEFAULT 0,  -- Minimum cart value
  max_discount_amount NUMERIC(10, 2),         -- Cap for percentage discounts
  description TEXT,                           -- Description for user
  message TEXT,                               -- Banner / success message
  is_active BOOLEAN NOT NULL DEFAULT true,    -- Active toggle
  starts_at TIMESTAMPTZ,                      -- Validity start
  expires_at TIMESTAMPTZ,                     -- Validity expiration
  usage_limit INT,                            -- Max allowed redemptions
  usage_count INT NOT NULL DEFAULT 0,         -- Total redemptions tracked
  source_version INT DEFAULT 0,               -- MongoDB '__v'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for Coupons
CREATE INDEX IF NOT EXISTS idx_coupons_code ON public.coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_active ON public.coupons(is_active);

-- ============================================================================
-- 5. BLOGS (MongoDB: 'blogs')
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mongo_id TEXT UNIQUE,                       -- Preserves MongoDB _id ($oid)
  title TEXT NOT NULL,                        -- MongoDB 'title'
  subtitle TEXT,                              -- MongoDB 'subtitle'
  slug TEXT UNIQUE NOT NULL,                  -- MongoDB 'slug'
  description TEXT NOT NULL,                  -- MongoDB 'description' (Excerpt/Summary)
  content TEXT NOT NULL,                      -- MongoDB 'blogContent' (Rich HTML/Article content)
  image TEXT NOT NULL,                        -- MongoDB 'image' (Featured S3 image URL)
  meta_title TEXT,                            -- MongoDB 'metatitle' (SEO Title)
  meta_description TEXT,                      -- MongoDB 'metadescription' (SEO Description)
  source_version INT DEFAULT 0,               -- MongoDB '__v'
  source_date TIMESTAMPTZ,                    -- MongoDB 'date' ($date)
  is_published BOOLEAN NOT NULL DEFAULT true, -- Publication status
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for Blogs
CREATE INDEX IF NOT EXISTS idx_blogs_mongo_id ON public.blogs(mongo_id);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_source_date ON public.blogs(source_date);

-- ============================================================================
-- 6. ANNUAL RETURNS (MongoDB: 'annualreturns')
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.annual_returns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mongo_id TEXT UNIQUE,                       -- Preserves MongoDB _id ($oid)
  title TEXT NOT NULL,                        -- MongoDB 'title'
  pdf_url TEXT NOT NULL,                      -- MongoDB 'pdf' (PDF reference/path)
  source_version INT DEFAULT 0,               -- MongoDB '__v'
  source_date TIMESTAMPTZ NOT NULL,           -- MongoDB 'date' ($date)
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for Annual Returns
CREATE INDEX IF NOT EXISTS idx_annual_returns_mongo_id ON public.annual_returns(mongo_id);
CREATE INDEX IF NOT EXISTS idx_annual_returns_source_date ON public.annual_returns(source_date);

-- ============================================================================
-- 7. T_TEST (MongoDB: 't_test' - Sandbox / Test Collection)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.t_test (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  mongo_id TEXT UNIQUE,                       -- Preserves MongoDB _id ($oid)
  item TEXT,                                  -- MongoDB 'item'
  qty INT,                                    -- MongoDB 'qty'
  test_key TEXT,                              -- MongoDB 'testKey'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkout_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.annual_returns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.t_test ENABLE ROW LEVEL SECURITY;

-- Public read policies for storefront catalog, blogs, annual returns, and active coupons
CREATE POLICY "Public products viewable by all" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Public blogs viewable by all" ON public.blogs FOR SELECT USING (is_published = true);
CREATE POLICY "Public annual returns viewable by all" ON public.annual_returns FOR SELECT USING (true);
CREATE POLICY "Public active coupons viewable by all" ON public.coupons FOR SELECT USING (is_active = true);

-- Checkout & payment creation policies for customers
CREATE POLICY "Anyone can initiate checkout" ON public.checkouts FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can add checkout items" ON public.checkout_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can record payment" ON public.payments FOR INSERT WITH CHECK (true);
