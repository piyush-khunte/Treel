-- ============================================================================
-- Treel Corporate Notices Table Migration
-- File: supabase/migrations/004_create_notices_table.sql
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create native notices table
CREATE TABLE IF NOT EXISTS public.notices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  _id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  published_date DATE DEFAULT CURRENT_DATE,
  publishedDate TEXT,
  status TEXT NOT NULL DEFAULT 'Draft' CHECK (status IN ('Published', 'Draft')),
  category TEXT NOT NULL DEFAULT 'General Notice',
  document_url TEXT,
  documentUrl TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Compatible alias table for legacy TreelEcommerce prefix
CREATE TABLE IF NOT EXISTS public."TreelEcommerce.notices" (
  _id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  published_date DATE DEFAULT CURRENT_DATE,
  publishedDate TEXT,
  status TEXT NOT NULL DEFAULT 'Draft' CHECK (status IN ('Published', 'Draft')),
  category TEXT NOT NULL DEFAULT 'General Notice',
  document_url TEXT,
  documentUrl TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Row Level Security (RLS)
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."TreelEcommerce.notices" ENABLE ROW LEVEL SECURITY;

-- Public can view only Published notices
CREATE POLICY "Public notices viewable by all when published" 
  ON public.notices 
  FOR SELECT 
  USING (status = 'Published');

CREATE POLICY "Public TreelEcommerce notices viewable by all when published" 
  ON public."TreelEcommerce.notices" 
  FOR SELECT 
  USING (status = 'Published');

-- Service role full access
CREATE POLICY "Service role manages notices" 
  ON public.notices 
  FOR ALL TO service_role 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "Service role manages TreelEcommerce notices" 
  ON public."TreelEcommerce.notices" 
  FOR ALL TO service_role 
  USING (true) 
  WITH CHECK (true);

-- 4. Indexes for fast lookup & chronological ordering
CREATE INDEX IF NOT EXISTS idx_notices_status ON public.notices(status);
CREATE INDEX IF NOT EXISTS idx_notices_published_date ON public.notices(published_date DESC);
CREATE INDEX IF NOT EXISTS idx_notices_created_at ON public.notices(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_te_notices_status ON public."TreelEcommerce.notices"(status);
CREATE INDEX IF NOT EXISTS idx_te_notices_published_date ON public."TreelEcommerce.notices"(published_date DESC);

