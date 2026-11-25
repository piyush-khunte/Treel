-- =============================================================================
-- 20261125_lockdown_rls.sql — Security audit fix SEC-15
--
-- Locks every table in the public schema down to the service role.
--
-- Why this is safe for the website:
--   * All database access in the app happens server-side (API routes, server actions,
--     server components) with SUPABASE_SECRET_KEY / SUPABASE_SERVICE_ROLE_KEY, which
--     BYPASSES Row Level Security. As of 25 Nov 2026 no browser code queries tables
--     (src/lib/supabase/client.ts is not imported anywhere), and server code no longer
--     falls back to the publishable/anon key.
--   * The publishable/anon key is public by design (it can be read from any browser).
--     Any table without RLS, or with a policy granting anon/public access, can be read
--     or written by anyone holding that key — e.g. orders, payments, leads, subscribers.
--
-- BEFORE RUNNING:
--   1. Confirm the production deployment has SUPABASE_SECRET_KEY (or
--      SUPABASE_SERVICE_ROLE_KEY) set in Vercel. Without it the site falls back to the
--      local JSON stores.
--   2. Run the "inspect" query at the bottom first and keep a copy of the output so the
--      dropped policies can be recreated if ever needed.
--
-- Run in: Supabase Dashboard → SQL Editor (as the postgres role).
-- =============================================================================

BEGIN;

-- 1. Enable RLS on every table in the public schema (including the
--    "TreelEcommerce.*" tables, leads, notices, personal_reviews, cookie_consents, …).
DO $$
DECLARE
  t record;
BEGIN
  FOR t IN
    SELECT schemaname, tablename
    FROM pg_tables
    WHERE schemaname = 'public'
  LOOP
    EXECUTE format('ALTER TABLE %I.%I ENABLE ROW LEVEL SECURITY', t.schemaname, t.tablename);
  END LOOP;
END $$;

-- 2. Drop every policy on public tables that applies to the anon role, the
--    authenticated role, or PUBLIC (all roles). The app never uses those roles for
--    table access, so these policies only widen exposure.
DO $$
DECLARE
  p record;
BEGIN
  FOR p IN
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND (roles && ARRAY['anon', 'authenticated', 'public']::name[])
  LOOP
    RAISE NOTICE 'Dropping policy % on %.%', p.policyname, p.schemaname, p.tablename;
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', p.policyname, p.schemaname, p.tablename);
  END LOOP;
END $$;

COMMIT;

-- -----------------------------------------------------------------------------
-- Storage (optional, review first): the "reviews", "documents" and "products"
-- buckets are written only by server routes with the service key. Public READ of
-- files works through the bucket's "public" flag and needs no policy. If any
-- storage.objects policy lets anon INSERT/UPDATE/DELETE, remove it:
--
--   SELECT policyname, cmd, roles FROM pg_policies
--   WHERE schemaname = 'storage' AND tablename = 'objects';
--
--   DROP POLICY "<policy name>" ON storage.objects;
-- -----------------------------------------------------------------------------

-- -----------------------------------------------------------------------------
-- Inspect / verify (run before and after):
--
--   -- Tables without RLS (should return no rows after this migration):
--   SELECT schemaname, tablename FROM pg_tables
--   WHERE schemaname = 'public' AND NOT rowsecurity;
--
--   -- Remaining policies on public tables (should not mention anon/public/authenticated):
--   SELECT tablename, policyname, cmd, roles, qual, with_check
--   FROM pg_policies WHERE schemaname = 'public' ORDER BY tablename;
-- -----------------------------------------------------------------------------
