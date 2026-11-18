# CLAUDE.md — Direct Instructions for Claude Code / Anthropic Models

Welcome Claude! You are working on **Treel Mobility Solutions (`treel-new-web`)**, the official platform for India's leading tyre IoT, telematics, and Vehicle Digital Twin provider (by JK Tyre).

For complete in-depth project documentation, architecture details, and content databases, consult **[HANDOFF.md](./HANDOFF.md)**.

---

## 1. Golden Rules (Never Break These)

1. **NO API / WEBHOOK MENTIONS ON PUBLIC COPY (Enforced 17 Nov 2026)**
   - Never write "API", "REST API", "Developer APIs", "Webhooks", "OpenAPI", or "Web API" on customer-facing marketing, landing, or product pages.
   - Standardize on: **"Enterprise Integrations"**, **"Native Connectors"**, **"Data Pipelines"**, **"Enterprise Interfaces"**, or **"Custom Connectors"**.
   - (Internal server route handlers in `src/app/api/...` remain normal code).

2. **NO COMPETITOR BRANDS**
   - Competitor names (e.g. *Fleetx*, *Loconav*) are strictly forbidden anywhere in the web copy.

3. **RESTRICT PARTNER BRANDS**
   - Partner names (*Bajaj Finance*, *Razorpay*, *Shiprocket*) belong ONLY in Privacy, Terms, and checkout payment/tracking steps where legal disclosure is necessary.

4. **NEXT.JS 16 & REACT 19 COMPLIANCE**
   - Next.js version: `16.3.4` (App Router). Dynamic route parameters in Page and Layout components are Promises (e.g., `const { slug } = await params;`).
   - Do NOT delete the `<!-- BEGIN:nextjs-agent-rules -->` block in `AGENTS.md`.

5. **TYPE CHECK BEFORE FINISHING**
   - Always verify changes with `npx tsc --noEmit`. Zero TypeScript errors allowed.

---

## 2. The 3 Product Verticals

- **TMIP (Treel Mobility Intelligence Platform):** Enterprise B2B SaaS for commercial fleets (10 to 1,000+ trucks). Vehicle Digital Twin, sub-second telemetry, 0.5%–0.6% fuel savings, 9–12 months payback, ERP/TMS connectors.
- **Treel Suraksha:** Commercial owner-operators (1-9 trucks). Standalone solar-powered in-cab display (no phone needed while driving), blowout alerts, zero-cost EMI, 600+ Truck Wheels fitment centres.
- **Treel Personal TPMS:** Consumer passenger cars & two-wheelers. BLE sensors + Treel Care mobile app (iOS/Android), direct e-commerce checkout.

---

## 3. Storage Architecture

- **Dual-Layer Resilience:** `src/lib/data/*-store.json` (17 flat JSON stores) + Supabase database.
- If Supabase environment variables are missing, all storage modules gracefully fall back to local JSON stores without throwing errors.

---

## 4. Commands Reference

- `npm run dev`: Start Next.js development server
- `npx tsc --noEmit`: Typecheck codebase
- `npm run build`: Production build
- `npm run lint`: ESLint check
