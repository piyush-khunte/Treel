# TREEL MOBILITY — PROJECT HANDOFF DOCUMENT
**Date:** September 29, 2026  
**Repository:** `d:/Magicworks/Projects/Treel/treel-new-web`  
**Framework:** Next.js 16.3.4 (Turbopack) · React 19 · TypeScript · Supabase · AWS SES  
**Target Domains:** `https://treel.in` (Production) · `http://localhost:3000` (Dev)

---

## 1. Executive Summary & Objective

This project successfully establishes the strict separation between the **TMIP Main Platform** and the **TMIP Paid Marketing Campaign Landing Page**, resolves a critical backend lead ingestion bug where failed database submissions falsely displayed success, and prepares production-ready CRM and notification integrations.

### Key Milestones Achieved:
1. **Route Separation Completed**:
   - `/tmip` is restored as the official **TMIP Main Platform** (technical blueprint hero, 4 readout metrics, `<TwinInteractive />` real-time digital twin viewer, 6 capabilities grid, standard navigation header).
   - `/tmip/campaign` is the dedicated **Paid Ads Landing Page** (high-converting layout matching `TMIP_Landing_Page_Final 2(1).html`, 16 interactive sections, hero lead form, ad-group variants, distraction-free topbar, `noindex` SEO directive).
2. **"Zero Fake Success" Lead Backend**:
   - Eliminated the bug where `/api/tmip/lead` returned HTTP 200 with fake `LD-...` IDs on database failure.
   - The API now returns **HTTP 500** on persistence failure.
   - The frontend form strictly checks `res.ok && result?.success`. On failure, it **blocks** the "DEMO REQUEST RECEIVED" state, **blocks** the GTM `generate_lead` dataLayer event, preserves all form inputs, re-enables the submission button, and displays an inline alert above `#submitBtn`.
3. **Database Schema & Resilience**:
   - Discovered that the remote Supabase project (`katgzyrpmegongitocxq.supabase.co`) was migrated from MongoDB (`TreelEcommerce.*`) and did not have `public.leads` in its schema cache (`PGRST205`).
   - Created [`supabase/migrations/003_create_leads_table.sql`](file:///d:/Magicworks/Projects/Treel/treel-new-web/supabase/migrations/003_create_leads_table.sql) with full marketing attribution fields, Row Level Security (RLS) policies, and performance indexes.
   - Built a dual-stage database insert in the API: attempts full schema first, and gracefully falls back to minimal schema with JSON attribution packing.
4. **Amazon SES Internal Notification Pipeline**:
   - Sends internal email notifications **only after** verified database persistence.
   - Dispatches to primary recipient (`SES_LEADS_EMAIL || SES_FROM_EMAIL || 'sales@treel.in'`) and secondary recipient (`TMIP_CAMPAIGN_SECOND_EMAIL`).
5. **Quality & Compilation Verification**:
   - `npm run lint`: **0 errors** (clean exit).
   - `npm run build`: **0 errors**; successfully compiled all **174/174 static and dynamic routes**.

---

## 2. Route Architecture & Roles

```
treel-new-web/
├── /tmip                     -> TMIP Main Platform Page (SEO Indexed, Technical Showcase)
├── /tmip/campaign            -> Dedicated Paid Campaign Landing Page (Google/Meta Ads, Noindex)
├── /api/tmip/lead            -> Lead Ingestion API (POST: validation, deduplication, Supabase, SES)
└── /admin/leads              -> Internal Admin CRM Panel (Lead lifecycle management)
```

### Detailed Route Specifications:

| Property | `/tmip` | `/tmip/campaign` |
|---|---|---|
| **File Path** | [`src/app/tmip/page.tsx`](file:///d:/Magicworks/Projects/Treel/treel-new-web/src/app/tmip/page.tsx) | [`src/app/tmip/campaign/page.tsx`](file:///d:/Magicworks/Projects/Treel/treel-new-web/src/app/tmip/campaign/page.tsx) |
| **Visual Appearance** | Matches **Screenshot 2**: Technical blueprint hero, *"From tyre monitoring to mobility intelligence."*, 4 readout metrics, `<TwinInteractive />`, 6 capabilities grid. | Matches **Screenshot 1** & HTML source: *"PREDICT BREAKDOWNS BEFORE THEY STOP YOUR FLEET"*, hero demo form, notch styling, 6-tab platform explorer, 14-day pilot guarantee, FAQ accordion. |
| **Header Component** | Full `<TmipHeader />` with Ecosystem Bar, brand mark, and multi-level platform dropdown navigation. | Standalone conversion topbar (Treel logo, toll-free call `1800 833 0233`, and direct "Book a Demo" `#demo` link). Standard header hidden via `<TmipConditionalHeader />`. |
| **Robots / SEO** | `index: true, follow: true`<br>Canonical: `https://treel.in/tmip` | `index: false, follow: true`<br>Canonical: `https://treel.in/tmip/campaign` |
| **GTM Tracking** | Standard pageview | `form_start`, `cta_click`, `platform_tab`, `generate_lead` |

---

## 3. Lead Capture & Backend Architecture (`/api/tmip/lead`)

### Pipeline Execution Flow:

```
[User Submits Form]
         │
         ▼
[1. Client-Side Validation]
   • Full Name (≥ 2 chars)
   • Indian Mobile (/^[6-9]\d{9}$/)
   • Work Email (RFC regex)
   • Company (≥ 2 chars)
   • Fleet Size selected
         │
         ▼
[2. POST /api/tmip/lead]
         │
         ├─► [Server Validation] ──(Invalid)──► Return HTTP 400 with specific field error
         │
         ├─► [Idempotency Check] ──(Within 30s)─► Return HTTP 429 ("Already received")
         │
         ▼
[3. Supabase Database Persistence (Source of Truth)]
   • Attempt 1: Full payload with native attribution columns (utm_*, gclid, fbclid, etc.)
   • Attempt 2 (Fallback): Minimal payload with attribution JSON in `message`
         │
         ├─► If DB fails ──► Log error & Return HTTP 500
         │                   │
         │                   ▼
         │             [Frontend Stays on Form]
         │             • Keeps inputs intact
         │             • Re-enables submit button
         │             • Displays red inline alert above #submitBtn
         │             • Blocks dataLayer generate_lead
         │
         ▼
[4. Amazon SES Email Notification]
   • Only triggered AFTER DB confirms row insertion with valid ID
   • Primary: SES_LEADS_EMAIL || SES_FROM_EMAIL || 'sales@treel.in'
   • Secondary: TMIP_CAMPAIGN_SECOND_EMAIL (via CC)
   • Responsive HTML email with contact details and full UTM attribution
         │
         ▼
[5. Return HTTP 201 Created]
   • Payload: { success: true, leadId: "...", timestamp: "..." }
         │
         ▼
[6. Frontend Success State]
   • Displays "Demo request received" panel
   • Fires window.dataLayer.push({ event: "generate_lead", lead_id, ... })
```

---

## 4. Complete File Inventory

### Files Created:
1. **[`src/app/tmip/campaign/page.tsx`](file:///d:/Magicworks/Projects/Treel/treel-new-web/src/app/tmip/campaign/page.tsx)**:
   - Route entry for `/tmip/campaign` with dedicated metadata (`robots: { index: false, follow: true }`).
2. **[`src/components/tmip/tmip-landing-page.tsx`](file:///d:/Magicworks/Projects/Treel/treel-new-web/src/components/tmip/tmip-landing-page.tsx)**:
   - Full 16-section interactive campaign landing page component.
   - Dynamic variant messaging (`?ag=tpms|maintenance|telematics|cost|digitaltwin`).
   - Session attribution caching (`sessionStorage.setItem('tmip_utm_*')`).
   - Accessible error rendering above `#submitBtn`.
3. **[`src/app/tmip/tmip-landing.css`](file:///d:/Magicworks/Projects/Treel/treel-new-web/src/app/tmip/tmip-landing.css)**:
   - Scoped CSS rules for `.tmip-landing` implementing dark theme typography, notch styling, radar chart, and responsive layouts.
4. **[`src/components/layout/tmip-conditional-header.tsx`](file:///d:/Magicworks/Projects/Treel/treel-new-web/src/components/layout/tmip-conditional-header.tsx)**:
   - Route inspector that renders `<TmipHeader />` on all platform routes, but suppresses it on `/tmip/campaign`.
5. **[`src/app/api/tmip/lead/route.ts`](file:///d:/Magicworks/Projects/Treel/treel-new-web/src/app/api/tmip/lead/route.ts)**:
   - Lead ingestion endpoint with strict validation, deduplication, dual-stage Supabase insert, SES notification, and proper HTTP status codes.
6. **[`supabase/migrations/003_create_leads_table.sql`](file:///d:/Magicworks/Projects/Treel/treel-new-web/supabase/migrations/003_create_leads_table.sql)**:
   - Production PostgreSQL migration for `public.leads` with RLS policies and performance indexes.

### Files Modified:
1. **[`src/app/tmip/page.tsx`](file:///d:/Magicworks/Projects/Treel/treel-new-web/src/app/tmip/page.tsx)**:
   - Restored as the TMIP Main Platform page.
2. **[`src/app/tmip/layout.tsx`](file:///d:/Magicworks/Projects/Treel/treel-new-web/src/app/tmip/layout.tsx)**:
   - Wrapped children with `<TmipConditionalHeader />`.
3. **[`src/app/admin/leads/page.tsx`](file:///d:/Magicworks/Projects/Treel/treel-new-web/src/app/admin/leads/page.tsx)**:
   - Updated CRM interface to display live lead submissions from `/tmip/campaign`.
4. **[`src/lib/admin/admin-actions.ts`](file:///d:/Magicworks/Projects/Treel/treel-new-web/src/lib/admin/admin-actions.ts)**:
   - Added Supabase actions `getAdminLeads()` and `updateAdminLeadStatus()`.
5. **[`.env.example`](file:///d:/Magicworks/Projects/Treel/treel-new-web/.env.example)**:
   - Added `TMIP_CAMPAIGN_SECOND_EMAIL` reference.

---

## 5. Database Schema & Migration Guide

### SQL Migration Script:
The migration file is located at [`supabase/migrations/003_create_leads_table.sql`](file:///d:/Magicworks/Projects/Treel/treel-new-web/supabase/migrations/003_create_leads_table.sql):

```sql
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

-- Allow public lead submission
CREATE POLICY "Anyone can submit lead" ON public.leads
  FOR INSERT WITH CHECK (true);

-- Allow service_role to manage leads
CREATE POLICY "Service role can manage leads" ON public.leads
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads(phone);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_type ON public.leads(type);
```

### Steps to Apply in Supabase:
1. Open [Supabase Dashboard](https://supabase.com/dashboard/project/katgzyrpmegongitocxq).
2. Go to **SQL Editor** in the left sidebar.
3. Paste the contents of `supabase/migrations/003_create_leads_table.sql`.
4. Click **Run**.
5. Once executed, PostgREST will automatically cache `public.leads`.

---

## 6. Environment Variables Reference

| Variable | Required In | Description / Recommended Value |
|---|---|---|
| `SUPABASE_URL` | Production & Dev | `https://katgzyrpmegongitocxq.supabase.co` |
| `SUPABASE_SECRET_KEY` | Production & Dev | Supabase Service Role Key (starts with `sb_secret_` or `eyJ...`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Production & Dev | `https://katgzyrpmegongitocxq.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Production & Dev | Supabase Anon Key (`sb_publishable_...`) |
| `AWS_ACCESS_KEY_ID` | Production | IAM User with `ses:SendEmail` permission |
| `AWS_SECRET_ACCESS_KEY` | Production | IAM Secret Key |
| `AWS_REGION` | Production | e.g. `ap-south-1` (Mumbai) |
| `SES_FROM_EMAIL` | Production | Verified SES Sender (e.g. `noreply@treel.in` or `sales@treel.in`) |
| `SES_LEADS_EMAIL` | Production | Primary leads inbox (e.g. `sales@treel.in`) |
| `TMIP_CAMPAIGN_SECOND_EMAIL` | Production | Secondary leads recipient for paid campaigns (e.g. campaign manager) |

---

## 7. Verification Test Results

### 1. Database Error Propagation Test:
- **Test**: Sent POST to `/api/tmip/lead` while `public.leads` was not yet created in remote PostgREST cache.
- **Result**:
  - API returned `HTTP 500 Internal Server Error`.
  - Body: `{"success": false, "error": "Something went wrong while submitting your request. Please try again."}`.
  - Frontend retained all user inputs, re-enabled submit button, and rendered inline error alert.
  - Zero `generate_lead` events emitted to dataLayer.

### 2. Validation Suite:
- Short name: `HTTP 400 "Please provide a valid full name."`
- Invalid phone: `HTTP 400 "Please provide a valid 10-digit Indian mobile number."`
- Invalid email: `HTTP 400 "Please provide a valid work email address."`
- Missing fleet: `HTTP 400 "Please select your fleet size."`
- Rapid duplicate: `HTTP 429 "A submission with these details was already received. Please wait a moment."`

### 3. Build & Linter Suite:
- `npm run lint`: **0 errors** (Passed).
- `npm run build`: **0 errors**. All 174 static and dynamic routes built in Turbopack.

---

## 8. Immediate Next Steps for the Next Session

1. **Apply Supabase Migration**: Run `003_create_leads_table.sql` in the Supabase SQL Editor.
2. **Verify Live Insert**: Submit a test lead on `http://localhost:3000/tmip/campaign?ag=tpms&utm_source=google&utm_medium=cpc&utm_campaign=brand_search&gclid=test12345` and verify row insertion in Supabase `leads` table.
3. **Configure AWS SES Credentials**: Add verified SES credentials and `TMIP_CAMPAIGN_SECOND_EMAIL` to the production environment when ready to enable real-time email dispatch.
