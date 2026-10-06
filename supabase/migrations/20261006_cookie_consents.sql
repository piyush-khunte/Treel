-- ============================================================================
-- MIGRATION: 20261006_cookie_consents.sql
-- PURPOSE: Store anonymous visitor cookie consent audit records
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.cookie_consents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  consent_id TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL CHECK (status IN ('accepted', 'rejected', 'customized', 'withdrawn')),
  categories JSONB NOT NULL DEFAULT '{"necessary": true, "functional": false, "analytics": false, "marketing": false}'::jsonb,
  policy_version TEXT NOT NULL DEFAULT '2026-10-01',
  consent_timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  withdrawn_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for performance & audit lookups
CREATE INDEX IF NOT EXISTS idx_cookie_consents_consent_id ON public.cookie_consents(consent_id);
CREATE INDEX IF NOT EXISTS idx_cookie_consents_timestamp ON public.cookie_consents(consent_timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_cookie_consents_status ON public.cookie_consents(status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.cookie_consents ENABLE ROW LEVEL SECURITY;

-- Allow anonymous visitors and service role to insert consent records
DROP POLICY IF EXISTS "Public no direct access" ON public.cookie_consents;
DROP POLICY IF EXISTS "Allow anon consent insert" ON public.cookie_consents;
CREATE POLICY "Allow anon consent insert" ON public.cookie_consents
  FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon consent update" ON public.cookie_consents;
CREATE POLICY "Allow anon consent update" ON public.cookie_consents
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow anon consent select" ON public.cookie_consents;
CREATE POLICY "Allow anon consent select" ON public.cookie_consents
  FOR SELECT
  USING (true);

-- Allow service role full access for backend server actions & APIs
DROP POLICY IF EXISTS "Service role full access" ON public.cookie_consents;
CREATE POLICY "Service role full access" ON public.cookie_consents
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
