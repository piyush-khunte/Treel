import fs from "fs";
import path from "path";
import { EventItemRecord } from "@/types/content";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
  const url = (
    process.env.SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://placeholder-treel.supabase.co"
  ).replace(/^['"]|['"]$/g, "");
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

const STORE_PATH = path.join(process.cwd(), "src", "lib", "data", "events-store.json");

export const SEED_EVENTS: EventItemRecord[] = [
  {
    _id: "evt_fleet_telematics_summit_2026",
    slug: "fleet-telematics-summit-2026",
    name: "National Commercial Fleet & Telematics Summit 2026",
    title: "National Commercial Fleet & Telematics Summit 2026",
    type: "Conference",
    dateTime: "14–16 October 2026 · 09:30 AM IST",
    location: "Hall 4, Pragati Maidan, New Delhi, India",
    isOnline: false,
    excerpt: "Keynote presentation on Vehicle Digital Twins and operational findings from 68,000 active commercial haulage vehicles.",
    about: [
      "The National Commercial Fleet & Telematics Summit brings together chief operating officers, fleet directors, and automotive technology innovators from across the Indian subcontinent. As logistics corridors expand and vehicle payloads scale, operating efficiency requires real-time physics models rather than simple GPS pings.",
      "Treel Mobility Solutions will deliver the keynote presentation on 'Operating Vehicle Digital Twins at National Scale: Telemetry Findings from 68,000 Commercial Vehicles'. Join our technical leadership to explore how thermodynamic wheel-end sensing transforms fleet unit economics and virtually eliminates highway tyre blowouts."
    ],
    agenda: [
      {
        time: "09:30 AM – 10:30 AM",
        title: "Keynote: Beyond GPS — Transforming Commercial Haulage with Wheel Telemetry",
        speaker: "Manish Ingale (Founder, Treel Mobility)",
        desc: "An architectural deep-dive into how sensor ingestion at 24 Hz decodes tire degradation, axle balance, and fuel drag before physical breakdown occurs."
      },
      {
        time: "11:00 AM – 12:30 PM",
        title: "Panel: The CFO Dilemma — Fleet Payback and Real-World ROI in 2026",
        speaker: "Executive Fleet Directors & Treel Analytics Team",
        desc: "Case studies from 500+ vehicle fleet operators demonstrating how sub-second telemetry achieves median payback in 9 months."
      },
      {
        time: "02:00 PM – 03:30 PM",
        title: "Live Hardware & Digital Twin Demonstration",
        speaker: "Treel Systems Engineering Team",
        desc: "Live interactive bench testing of IP69K military-rated sensors under high thermal and mechanical stress profiles."
      }
    ],
    speakers: [
      {
        name: "Manish Ingale",
        role: "Founder & CEO",
        org: "Treel Mobility Solutions",
        bio: "Founded Treel in 2018 with the vision of converting commercial vehicle wheel dynamics into actionable enterprise intelligence. Leading architecture and national OEM deployments."
      },
      {
        name: "Dr. Vikram Seth",
        role: "Head of Mobility Data Science",
        org: "Treel Mobility Solutions",
        bio: "Specializes in thermodynamic modeling, multi-axle load distribution inference, and predictive machine learning models for high-tonnage freight transport."
      }
    ],
    featured: true,
    status: "Upcoming",
    publicationStatus: "Published",
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z"
  },
  {
    _id: "evt_zero_roadside_blowouts_webinar",
    slug: "zero-roadside-blowouts-webinar",
    name: "Zero Roadside Blowouts: The Predictive Maintenance Playbook",
    title: "Zero Roadside Blowouts: The Predictive Maintenance Playbook",
    type: "Webinar",
    dateTime: "12 November 2026 · 03:00 PM IST",
    location: "Online (Live Interactive Zoom with Q&A)",
    isOnline: true,
    excerpt: "Technical walkthrough on configuring sub-second thermal telemetry to flag micro-leaks before roadside tyre blowouts occur.",
    about: [
      "Roadside tyre failures remain the number-one driver of unscheduled commercial vehicle downtime in India, causing severe delays, cargo loss, and highway accidents. Yet over 85% of catastrophic carcass failures show distinct thermodynamic anomalies hours before failure.",
      "In this live 75-minute technical masterclass, Treel's systems engineering team demonstrates how to transition from reactive roadside repairs to deterministic maintenance schedules using live Vehicle Digital Twins."
    ],
    agenda: [
      {
        time: "03:00 PM – 03:20 PM",
        title: "The Physics of Tyre Failure: Heat, Load, and Decay Gradients",
        speaker: "Engineering Team",
        desc: "Why traditional pressure checks at fuel stations miss micro-punctures and bead-seat leaks."
      },
      {
        time: "03:20 PM – 03:50 PM",
        title: "Configuring Real-Time Alert Workflows for Dispatch & Depot Teams",
        speaker: "Product Operations Lead",
        desc: "Step-by-step guidance on setting threshold parameters to dispatch mechanics during scheduled loading windows."
      },
      {
        time: "03:50 PM – 04:15 PM",
        title: "Open Live Q&A with Treel Telematics Architects",
        speaker: "Treel Engineering Panel",
        desc: "Direct troubleshooting, integration questions with existing ERP/FMS platforms, and API walkthrough."
      }
    ],
    speakers: [
      {
        name: "Rajesh Kulkarni",
        role: "VP of Product Engineering",
        org: "Treel Mobility Solutions",
        bio: "Over 15 years in automotive embedded systems and commercial vehicle telematics. Directs Treel's firmware and telemetry ingest pipelines."
      }
    ],
    featured: false,
    status: "Upcoming",
    publicationStatus: "Published",
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z"
  },
  {
    _id: "evt_pune_mobility_roundtable",
    slug: "pune-mobility-engineering-roundtable",
    name: "Pune Commercial Mobility Engineering Roundtable",
    title: "Pune Commercial Mobility Engineering Roundtable",
    type: "In-person",
    dateTime: "4 December 2026 · 05:00 PM IST",
    location: "Treel R&D Centre, Baner Tech Park, Pune, Maharashtra",
    isOnline: false,
    excerpt: "Engineering deep-dive with Treel hardware architects on IP69K sensor telemetry and high-vibration off-highway durability.",
    about: [
      "An invitation-only technical roundtable bringing together Pune's premier automotive hardware, IoT, and embedded firmware engineers. Explore the challenges of sub-second sensor telemetry in harsh operating conditions across India's industrial freight routes.",
      "Tour Treel's hardware test laboratory, examine our latest ARAI-certified sensor prototypes, and network with engineers building the future of connected mobility."
    ],
    agenda: [
      {
        time: "05:00 PM – 05:45 PM",
        title: "Welcome & R&D Laboratory Tour",
        speaker: "Treel Lab Director",
        desc: "Behind-the-scenes walkthrough of environmental stress testing, RF chamber calibration, and battery endurance test stations."
      },
      {
        time: "05:45 PM – 07:00 PM",
        title: "Technical Panel: Hardware Resilience Under 60°C Road Temps and 50G Impacts",
        speaker: "Hardware Engineering Leads",
        desc: "Designing IP69K electronics for multi-year maintenance-free service life on heavy commercial axles."
      },
      {
        time: "07:00 PM – 08:00 PM",
        title: "Networking Dinner & Drinks",
        speaker: "All Attendees",
        desc: "Connect with fellow hardware and software engineers in the Pune automotive tech ecosystem."
      }
    ],
    speakers: [
      {
        name: "Sanjay Deshmukh",
        role: "Director of Hardware Engineering",
        org: "Treel Mobility Solutions",
        bio: "Leading sensor packaging, piezoelectric transducer integration, and long-range BLE telemetry design."
      }
    ],
    featured: false,
    status: "Upcoming",
    publicationStatus: "Published",
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z"
  },
  {
    _id: "evt_past_india_ev_expo_2026",
    slug: "india-ev-commercial-fleet-expo-2026",
    name: "India EV & Commercial Fleet Expo 2026",
    title: "India EV & Commercial Fleet Expo 2026",
    type: "Conference",
    dateTime: "August 2026",
    location: "New Delhi",
    isOnline: false,
    excerpt: "Presentation on commercial fleet electrification and telematics integration.",
    materialUrl: "/research/roi-fleet-intelligence",
    materialLabel: "View Session Paper",
    status: "Completed",
    publicationStatus: "Published",
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z"
  },
  {
    _id: "evt_past_heavy_haulage_safety",
    slug: "heavy-haulage-safety-cost-optimization",
    name: "Heavy Haulage Safety & Cost Optimization",
    title: "Heavy Haulage Safety & Cost Optimization",
    type: "Roundtable",
    dateTime: "June 2026",
    location: "Kolkata",
    isOnline: false,
    excerpt: "Executive session on haulage safety and predictive maintenance.",
    materialUrl: "/research/data-architecture",
    materialLabel: "Download Executive Deck",
    status: "Completed",
    publicationStatus: "Published",
    createdAt: "2026-06-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z"
  },
  {
    _id: "evt_past_jk_tyre_leadership",
    slug: "jk-tyre-treel-logistics-leadership-conclave",
    name: "JK Tyre & Treel Logistics Leadership Conclave",
    title: "JK Tyre & Treel Logistics Leadership Conclave",
    type: "Keynote",
    dateTime: "April 2026",
    location: "Bengaluru",
    isOnline: false,
    excerpt: "Logistics leadership gathering on connected fleet intelligence.",
    materialUrl: "/insights/from-telemetry-to-reasoning",
    materialLabel: "Read Summary",
    status: "Completed",
    publicationStatus: "Published",
    createdAt: "2026-04-01T00:00:00.000Z",
    updatedAt: "2026-04-01T00:00:00.000Z"
  }
];

export function normalizeEvent(item: any): EventItemRecord {
  return {
    _id: String(item._id || item.id || `evt_${Date.now()}`),
    slug: String(item.slug || "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "-"),
    name: item.name || item.title || "",
    title: item.title || item.name || "",
    type: item.type || "Conference",
    dateTime: item.dateTime || item.date_time || item.date || "",
    startDate: item.startDate || item.start_date || undefined,
    endDate: item.endDate || item.end_date || undefined,
    location: item.location || "",
    isOnline: Boolean(item.isOnline ?? item.is_online ?? false),
    excerpt: item.excerpt || item.description || "",
    about: Array.isArray(item.about) ? item.about : item.about ? [String(item.about)] : [],
    agenda: Array.isArray(item.agenda) ? item.agenda : [],
    speakers: Array.isArray(item.speakers) ? item.speakers : [],
    materialUrl: item.materialUrl || item.material_url || undefined,
    materialLabel: item.materialLabel || item.material_label || undefined,
    registrationUrl: item.registrationUrl || item.registration_url || undefined,
    bannerUrl: item.bannerUrl || item.banner_url || item.image || undefined,
    image: item.image || item.bannerUrl || item.banner_url || undefined,
    featured: Boolean(item.featured ?? item.isFeatured ?? false),
    status: item.status || "Upcoming",
    publicationStatus: item.publicationStatus === "Draft" ? "Draft" : "Published",
    seoTitle: item.seoTitle || item.seo_title || undefined,
    seoDescription: item.seoDescription || item.seo_description || undefined,
    createdAt: item.createdAt || item.created_at || new Date().toISOString(),
    updatedAt: item.updatedAt || item.updated_at || new Date().toISOString(),
  };
}

export function readLocalStore(): EventItemRecord[] {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeEvent);
      }
    }
  } catch (err) {
    console.error("readLocalStore events error:", err);
  }
  // Initialize file with SEED_EVENTS if not exists
  writeLocalStore(SEED_EVENTS);
  return SEED_EVENTS.map(normalizeEvent);
}

export function writeLocalStore(items: EventItemRecord[]): void {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    console.error("writeLocalStore events error:", err);
  }
}

/**
 * Retrieves all events, merging remote Supabase state with local file store.
 */
export async function getAllEvents(): Promise<EventItemRecord[]> {
  const localItems = readLocalStore();
  const supabase = getAdminClient();

  try {
    const res = await supabase
      .from("TreelEcommerce.t_test")
      .select("*")
      .eq("testKey", "treel_event");

    if (!res.error && res.data && res.data.length > 0) {
      const synced: EventItemRecord[] = [];
      for (const row of res.data) {
        try {
          if (row.item) {
            synced.push(normalizeEvent(JSON.parse(row.item)));
          }
        } catch {}
      }
      if (synced.length > 0) {
        const map = new Map<string, EventItemRecord>();
        localItems.forEach((it) => map.set(it._id, it));
        synced.forEach((it) => map.set(it._id, it));
        const merged = Array.from(map.values());
        writeLocalStore(merged);
        return merged;
      }
    }
  } catch (err) {
    console.error("getAllEvents database error:", err);
  }

  return localItems;
}

/**
 * Retrieves all published events for public presentation.
 */
export async function getPublishedEvents(): Promise<EventItemRecord[]> {
  const all = await getAllEvents();
  return all.filter((e) => e.publicationStatus === "Published");
}

/**
 * Retrieves a single event by slug.
 */
export async function getEventBySlug(slug: string): Promise<EventItemRecord | null> {
  const cleanSlug = (slug || "").trim().toLowerCase();
  const all = await getAllEvents();
  const found = all.find((e) => e.slug === cleanSlug);
  return found || null;
}

/**
 * Creates or updates an event in both local store and Supabase.
 */
export async function saveEvent(data: Partial<EventItemRecord>): Promise<{ success: boolean; data?: EventItemRecord; error?: string }> {
  const name = (data.name || data.title || "").trim();
  if (!name) {
    return { success: false, error: "Event name / title is required." };
  }

  let slug = (data.slug || "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/--+/g, "-");
  if (!slug) {
    slug = name.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/--+/g, "-");
  }

  const all = await getAllEvents();
  const now = new Date().toISOString();
  const id = data._id || `evt_${slug}_${Date.now()}`;

  // Check slug uniqueness
  const conflict = all.find((e) => e.slug === slug && e._id !== id);
  if (conflict) {
    return { success: false, error: `An event with slug "${slug}" already exists.` };
  }

  const existing = all.find((e) => e._id === id);
  const normalized = normalizeEvent({
    ...existing,
    ...data,
    _id: id,
    name,
    title: name,
    slug,
    updatedAt: now,
    createdAt: existing?.createdAt || now,
  });

  // 1. Local Store Update
  const localList = readLocalStore();
  const idx = localList.findIndex((e) => e._id === id);
  if (idx >= 0) {
    localList[idx] = normalized;
  } else {
    localList.unshift(normalized);
  }
  writeLocalStore(localList);

  // 2. Supabase Sync
  try {
    const supabase = getAdminClient();
    await supabase.from("TreelEcommerce.t_test").upsert({
      _id: normalized._id,
      testKey: "treel_event",
      item: JSON.stringify(normalized),
      qty: normalized.publicationStatus,
    });
  } catch (err) {
    console.warn("saveEvent Supabase sync warning:", err);
  }

  return { success: true, data: normalized };
}

/**
 * Deletes an event by ID.
 */
export async function deleteEvent(id: string): Promise<{ success: boolean; error?: string }> {
  const cleanId = (id || "").trim();
  if (!cleanId) return { success: false, error: "Event ID required." };

  const all = readLocalStore();
  const target = all.find((e) => e._id === cleanId || e.slug === cleanId);
  if (!target) {
    return { success: false, error: "Event not found." };
  }

  const filtered = all.filter((e) => e._id !== target._id);
  writeLocalStore(filtered);

  // Supabase delete
  try {
    const supabase = getAdminClient();
    await supabase
      .from("TreelEcommerce.t_test")
      .delete()
      .eq("testKey", "treel_event")
      .eq("_id", target._id);
  } catch (err) {
    console.warn("deleteEvent Supabase warning:", err);
  }

  return { success: true };
}

/**
 * Toggles an event publication status between Published and Draft.
 */
export async function toggleEventPublish(id: string): Promise<{ success: boolean; data?: EventItemRecord; error?: string }> {
  const all = await getAllEvents();
  const target = all.find((e) => e._id === id || e.slug === id);
  if (!target) return { success: false, error: "Event not found." };

  const newStatus = target.publicationStatus === "Published" ? "Draft" : "Published";
  return await saveEvent({ ...target, publicationStatus: newStatus });
}
