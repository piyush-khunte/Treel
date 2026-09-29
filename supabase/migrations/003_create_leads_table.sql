-- ============================================================================
-- Supabase Schema Migration: 003_create_leads_table.sql
-- Description: Production-ready CRM leads table with attribution metadata
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL DEFAULT 'tmip_campaign_lead',
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  company_name TEXT,
  fleet_size INT,
  lead_source TEXT DEFAULT 'tmip_campaign',
  campaign_type TEXT,
  ad_group TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  gclid TEXT,
  fbclid TEXT,
  landing_page TEXT,
  first_landing_page TEXT,
  referrer TEXT,
  user_agent TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Insertion policy: Allow public/anonymous and authenticated visitors to submit leads
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'leads' AND policyname = 'Anyone can submit lead'
  ) THEN
    CREATE POLICY "Anyone can submit lead" ON public.leads
      FOR INSERT WITH CHECK (true);
  END IF;
END $$;

-- Management policy: Allow service_role to read and manage leads for Admin CRM
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'leads' AND policyname = 'Service role can manage leads'
  ) THEN
    CREATE POLICY "Service role can manage leads" ON public.leads
      FOR ALL TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Indexes for Admin Panel search & CRM performance
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_type ON public.leads(type);
