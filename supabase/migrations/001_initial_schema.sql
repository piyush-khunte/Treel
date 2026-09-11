-- Supabase Schema for Treel Revamp
-- Run this in your Supabase SQL Editor or via Supabase CLI

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_scope TEXT NOT NULL CHECK (brand_scope IN ('master', 'tmip', 'suraksha', 'personal')),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  tagline TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
  base_price_inr NUMERIC(10, 2) NOT NULL DEFAULT 0,
  mrp_inr NUMERIC(10, 2) NOT NULL DEFAULT 0,
  tax_rate_percent NUMERIC(5, 2) NOT NULL DEFAULT 18.00,
  hsn_code TEXT NOT NULL DEFAULT '87089900',
  features JSONB NOT NULL DEFAULT '[]',
  specs JSONB NOT NULL DEFAULT '{}',
  box_contents JSONB NOT NULL DEFAULT '[]',
  warranty_months INT NOT NULL DEFAULT 12,
  rating NUMERIC(3, 2) NOT NULL DEFAULT 4.8,
  reviews_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Product Variants
CREATE TABLE IF NOT EXISTS public.product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  sku TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  sensor_count INT NOT NULL DEFAULT 4,
  vehicle_type TEXT NOT NULL DEFAULT '4w',
  price_inr NUMERIC(10, 2) NOT NULL,
  mrp_inr NUMERIC(10, 2) NOT NULL,
  stock_quantity INT NOT NULL DEFAULT 100,
  is_active BOOLEAN NOT NULL DEFAULT true,
  image_url TEXT,
  weight_grams INT DEFAULT 250,
  dimensions_cm JSONB DEFAULT '{"l": 15, "w": 10, "h": 5}'
);

-- Product Images
CREATE TABLE IF NOT EXISTS public.product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0
);

-- Dealers & Service Centres
CREATE TABLE IF NOT EXISTS public.dealers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  pincode TEXT NOT NULL,
  lat NUMERIC(9, 6) NOT NULL,
  lng NUMERIC(9, 6) NOT NULL,
  is_suraksha_centre BOOLEAN NOT NULL DEFAULT true,
  is_tmip_partner BOOLEAN NOT NULL DEFAULT false,
  is_retail_dealer BOOLEAN NOT NULL DEFAULT true,
  rating NUMERIC(3, 2) NOT NULL DEFAULT 4.8,
  hours TEXT DEFAULT '9:00 AM - 8:00 PM (Mon-Sat)'
);

-- Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending_payment',
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address JSONB NOT NULL,
  gstin TEXT,
  business_name TEXT,
  subtotal_inr NUMERIC(10, 2) NOT NULL,
  discount_inr NUMERIC(10, 2) NOT NULL DEFAULT 0,
  tax_inr NUMERIC(10, 2) NOT NULL,
  shipping_inr NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total_inr NUMERIC(10, 2) NOT NULL,
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  shipment_tracking_number TEXT,
  courier_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  variant_id UUID,
  sku TEXT NOT NULL,
  name TEXT NOT NULL,
  unit_price_inr NUMERIC(10, 2) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  total_price_inr NUMERIC(10, 2) NOT NULL
);

-- Lead & Form Submissions
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  company_name TEXT,
  fleet_size INT,
  vehicle_types JSONB DEFAULT '[]',
  city TEXT,
  state TEXT,
  pincode TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Content & Blog
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_scope TEXT NOT NULL CHECK (brand_scope IN ('master', 'tmip', 'suraksha', 'personal')),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL,
  category TEXT NOT NULL,
  tags JSONB DEFAULT '[]',
  reading_time_mins INT DEFAULT 5,
  cover_image TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Case Studies
CREATE TABLE IF NOT EXISTS public.case_studies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  client_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  fleet_size TEXT NOT NULL,
  hero_stat TEXT NOT NULL,
  hero_stat_label TEXT NOT NULL,
  results JSONB NOT NULL DEFAULT '[]',
  summary TEXT NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  impact TEXT NOT NULL,
  testimonial JSONB,
  cover_image TEXT,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dealers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Public read policies for catalog and content
CREATE POLICY "Public products viewable by all" ON public.products FOR SELECT USING (status = 'active');
CREATE POLICY "Public variants viewable by all" ON public.product_variants FOR SELECT USING (is_active = true);
CREATE POLICY "Public images viewable by all" ON public.product_images FOR SELECT USING (true);
CREATE POLICY "Public dealers viewable by all" ON public.dealers FOR SELECT USING (true);
CREATE POLICY "Public blog posts viewable by all" ON public.blog_posts FOR SELECT USING (true);
CREATE POLICY "Public case studies viewable by all" ON public.case_studies FOR SELECT USING (true);

-- Leads insert policy for anyone
CREATE POLICY "Anyone can submit lead" ON public.leads FOR INSERT WITH CHECK (true);
