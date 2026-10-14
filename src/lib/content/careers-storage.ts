import fs from "fs";
import path from "path";
import { JobOpeningRecord } from "@/types/content";
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

const STORE_PATH = path.join(process.cwd(), "src", "lib", "data", "careers-store.json");

export const SEED_CAREERS: JobOpeningRecord[] = [
  {
    _id: "job_senior_embedded_engineer",
    slug: "senior-embedded-engineer",
    title: "Senior Embedded Firmware Engineer",
    team: "Engineering",
    location: "Pune",
    type: "Full-time",
    workArrangement: "Onsite",
    postedDate: "August 2026",
    roleSummary: "Design, develop, and validate ultra-low-power BLE and sub-GHz RF embedded firmware for commercial vehicle tyre-mounted sensors.",
    aboutTheRole: [
      "Treel's edge hardware sits directly inside or on the wheel rim of heavy commercial vehicles operating across India's harshest highway and mining corridors. In this role, you will architect ultra-low-power embedded firmware running on ARM Cortex-M microcontrollers operating on single coin-cell batteries with a multi-year lifespan.",
      "You will collaborate closely with hardware design, RF validation, and cloud ingestion teams in Pune to optimize RF transmission protocols, minimize power budgets, and maintain deterministic sensor timing under extreme kinetic vibration and thermal shock."
    ],
    responsibilities: [
      "Architect and optimize bare-metal C/C++ firmware and RTOS tasks for low-power ARM Cortex-M microcontrollers.",
      "Design power-optimized RF telemetry transmission schemes over BLE and custom sub-GHz wireless protocols.",
      "Implement on-device edge anomaly scoring algorithms for tyre pressure loss gradients and thermal spikes.",
      "Collaborate with hardware teams on board bring-up, oscilloscopes/logic analyzer debugging, and circuit validation.",
      "Ensure adherence to automotive testing standards and ARAI sensor hardware certification requirements.",
      "Develop automated hardware-in-the-loop (HIL) test suites for firmware regression and endurance testing."
    ],
    mustHaves: [
      "5+ years of production experience in embedded C/C++ development for resource-constrained microcontrollers.",
      "Demonstrated track record of designing ultra-low-power devices surviving on battery power for 2+ years.",
      "Hands-on expertise with wireless protocols (BLE, proprietary RF, Bluetooth 5.0+ stacks).",
      "Proficiency with hardware test equipment: digital oscilloscopes, spectrum analyzers, power profiling tools."
    ],
    niceToHaves: [
      "Prior experience with automotive telematics, CAN bus protocols (J1939), or TPMS hardware.",
      "Familiarity with ARAI, ISO 26262, or AEC-Q100 automotive certification pipelines.",
      "Experience developing firmware update over-the-air (FOTA) bootloaders for remote edge gateways."
    ],
    whatYouGet: [
      "Competitive compensation package with equity options for senior technical contributors.",
      "Comprehensive medical insurance coverage for you and your immediate dependents.",
      "Dedicated hardware lab budget for prototyping tools, dev kits, and conference travel.",
      "A culture rooted in craft, measurement, and long-horizon engineering autonomy at our Pune HQ."
    ],
    relatedSlugs: [
      "staff-backend-engineer",
      "product-manager-insights",
      "enterprise-solutions-architect"
    ],
    status: "Published",
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z"
  },
  {
    _id: "job_staff_backend_engineer",
    slug: "staff-backend-engineer",
    title: "Staff Backend Engineer (IoT & Distributed Systems)",
    team: "Engineering",
    location: "Pune",
    type: "Full-time",
    workArrangement: "Onsite",
    postedDate: "August 2026",
    roleSummary: "Architect high-throughput telemetry ingestion pipelines and distributed state engines powering Vehicle Digital Twins for 68,000+ trucks.",
    aboutTheRole: [
      "Treel ingests millions of telemetry events every day from tens of thousands of commercial vehicles hauling freight across national highways. As Staff Backend Engineer, you will own the architectural foundation of our high-scale telemetry ingestion pipeline and the distributed Vehicle Digital Twin state model.",
      "You will work alongside machine learning researchers, data platform engineers, and front-end architects to ensure sub-second event processing, logical tenant isolation, and highly performant analytical queries for our enterprise TMIP customers."
    ],
    responsibilities: [
      "Architect and scale distributed streaming pipelines ingesting high-throughput sensor telemetry using Kafka and ClickHouse.",
      "Design and maintain the Vehicle Digital Twin state engine, tracking continuous mechanical hysteresis and thermal cycles.",
      "Build low-latency gRPC and RESTful API microservices powering client dashboards and programmatic enterprise integrations.",
      "Optimize data partitioning, indexing, and compaction strategies across multi-terabyte time-series datastores.",
      "Lead architectural reviews, set code quality standards, and mentor senior and mid-level engineering team members.",
      "Collaborate with security and SRE teams to guarantee 99.7%+ platform uptime and zero-trust data access."
    ],
    mustHaves: [
      "8+ years of distributed backend systems experience with Go, Rust, Java, or high-performance Python.",
      "Deep operational experience with streaming platforms (Apache Kafka / Pulsar) and time-series OLAP engines (ClickHouse / TimescaleDB).",
      "Proven ability to design multi-tenant cloud architectures guaranteeing logical data isolation and high query throughput.",
      "Strong understanding of distributed consensus, event-driven architecture, and containerized deployments (Kubernetes)."
    ],
    niceToHaves: [
      "Experience processing IoT, telematics, or connected automotive sensor streams at scale.",
      "Familiarity with ClickHouse schema tuning and large-scale data warehousing exports (Snowflake, BigQuery).",
      "Background in implementing strict compliance standards (SOC 2 Type II, DPDP Act 2023)."
    ],
    whatYouGet: [
      "Top-tier compensation package including significant equity grant in an industry-leading technology company.",
      "Comprehensive family health coverage with cashless hospitalization benefits.",
      "Flexible hybrid working rhythm with modern engineering facilities in Pune.",
      "Direct technical ownership of India's largest commercial vehicle telemetry dataset."
    ],
    relatedSlugs: [
      "senior-embedded-engineer",
      "product-manager-insights",
      "enterprise-solutions-architect"
    ],
    status: "Published",
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-01T00:00:00.000Z"
  },
  {
    _id: "job_product_manager_insights",
    slug: "product-manager-insights",
    title: "Product Manager — Telemetry & Insights",
    team: "Product",
    location: "Hybrid",
    type: "Full-time",
    workArrangement: "Hybrid",
    postedDate: "July 2026",
    roleSummary: "Own the core analytics, predictive maintenance features, and customer-facing dashboard experience for TMIP Enterprise.",
    aboutTheRole: [
      "Commercial fleet managers do not want raw numbers; they want deterministic operational actions that prevent breakdowns and reduce diesel spend. As Product Manager for Telemetry & Insights, you will be responsible for translating raw vehicle sensor signals into intuitive, actionable product experiences within the TMIP platform.",
      "You will bridge customer empathy with engineering rigor, spending time at fleet depots and logistics hubs to understand operational workflows, while collaborating closely with data scientists to productize predictive algorithms."
    ],
    responsibilities: [
      "Define and execute the product roadmap for TMIP's fleet intelligence analytics, alert engine, and executive reporting suite.",
      "Translate complex machine learning models (tyre wear prediction, blowout early-warning) into clear user interfaces and workflows.",
      "Conduct qualitative and quantitative research with fleet operations directors, maintenance supervisors, and CFOs.",
      "Define key product metrics, monitor feature adoption, and conduct iterative discovery cycles.",
      "Write crisp PRDs, user stories, and acceptance criteria while maintaining alignment across design and engineering teams.",
      "Partner with GTM and Customer Success teams to ensure smooth enterprise feature rollouts and user enablement."
    ],
    mustHaves: [
      "4+ years of B2B SaaS product management experience, preferably in IoT, telematics, supply chain, or developer platforms.",
      "Exceptional analytical skills with the ability to query data directly (SQL) and synthesize telemetry trends.",
      "Demonstrated ability to turn dense data streams into clean, consumer-grade enterprise interfaces.",
      "Strong technical communication skills to collaborate effectively with distributed systems and ML engineers."
    ],
    niceToHaves: [
      "Prior experience in commercial transportation, logistics tech (TMS/WMS), or industrial IoT.",
      "Familiarity with data visualization libraries, BI tools, or design systems.",
      "Experience with enterprise technical evaluations and customer onboarding journeys."
    ],
    whatYouGet: [
      "Competitive salary and equity participation in a rapidly scaling market category leader.",
      "Comprehensive medical and wellness benefits for employee and family.",
      "Flexible hybrid work policy with collaborative sprints at our Pune headquarters.",
      "The opportunity to define the category of Mobility Intelligence for India and global markets."
    ],
    relatedSlugs: [
      "enterprise-solutions-architect",
      "staff-backend-engineer",
      "senior-embedded-engineer"
    ],
    status: "Published",
    createdAt: "2026-07-01T00:00:00.000Z",
    updatedAt: "2026-07-01T00:00:00.000Z"
  },
  {
    _id: "job_enterprise_solutions_architect",
    slug: "enterprise-solutions-architect",
    title: "Enterprise Solutions Architect (TMIP)",
    team: "GTM",
    location: "Pune",
    type: "Full-time",
    workArrangement: "Onsite",
    postedDate: "July 2026",
    roleSummary: "Partner with enterprise fleet technical leaders, lead technical evaluations, and architect custom TMS/ERP API integrations.",
    aboutTheRole: [
      "Enterprise fleet sales at Treel are high-touch and deeply technical. When a 1,000-vehicle logistics operator evaluates TMIP, they need to know how our Vehicle Digital Twin integrates with their SAP ERP, TMS platforms, or custom data warehouse. You will be the trusted technical authority guiding these evaluations.",
      "In this role, you will lead pre-sales technical discovery, architect custom API data flows, manage technical onboarding, and ensure that prospective customers experience the full economic and operational value of TMIP before contract finalization."
    ],
    responsibilities: [
      "Serve as the lead technical advisor in enterprise sales engagements with fleet CTOs, CIOs, and Operations Directors.",
      "Architect and validate custom integration topologies connecting TMIP APIs with customer ERP, TMS, and BI stacks.",
      "Lead technical setup and data flow configuration for prospective enterprise fleet customers.",
      "Develop reusable reference integration code snippets, webhook listeners, and solution documentation.",
      "Assist enterprise buyers in completing technical vendor security assessments and architecture audits.",
      "Feed customer technical requirements back into the core engineering and product roadmaps."
    ],
    mustHaves: [
      "5+ years of experience as a Solutions Architect, Sales Engineer, or Technical Integration Lead in enterprise B2B software.",
      "Strong hands-on programming experience with REST APIs, webhooks, JSON, Python, and SQL.",
      "Deep understanding of enterprise software ecosystems: ERPs (SAP, Oracle), TMS platforms, and cloud data warehouses.",
      "Proven ability to articulate complex distributed systems architecture to both technical and executive stakeholders."
    ],
    niceToHaves: [
      "Experience with fleet telematics, commercial logistics systems, or industrial IoT protocols.",
      "Familiarity with enterprise IT security frameworks (SOC 2, ISO 27001, zero-trust network models).",
      "Demonstrated success partnering with enterprise sales teams on multi-year contract closures."
    ],
    whatYouGet: [
      "Attractive base salary and performance-linked enterprise bonus structure with equity options.",
      "Full family healthcare coverage including medical and personal accident insurance.",
      "Generous professional development stipend for cloud certifications and architecture symposiums.",
      "Direct impact partnering with the largest logistics operators moving India's GDP."
    ],
    relatedSlugs: [
      "product-manager-insights",
      "staff-backend-engineer",
      "senior-embedded-engineer"
    ],
    status: "Published",
    createdAt: "2026-07-01T00:00:00.000Z",
    updatedAt: "2026-07-01T00:00:00.000Z"
  }
];

export function normalizeJob(item: any): JobOpeningRecord {
  return {
    _id: String(item._id || item.id || `job_${Date.now()}`),
    slug: String(item.slug || "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "-"),
    title: item.title || "",
    team: item.team || item.department || "Engineering",
    location: item.location || "Pune",
    type: item.type || "Full-time",
    workArrangement: item.workArrangement || item.work_arrangement || "Onsite",
    postedDate: item.postedDate || item.posted_date || "Recent",
    deadline: item.deadline || undefined,
    roleSummary: item.roleSummary || item.role_summary || item.excerpt || "",
    aboutTheRole: Array.isArray(item.aboutTheRole)
      ? item.aboutTheRole
      : item.aboutTheRole
      ? [String(item.aboutTheRole)]
      : [],
    responsibilities: Array.isArray(item.responsibilities) ? item.responsibilities : [],
    mustHaves: Array.isArray(item.mustHaves) ? item.mustHaves : [],
    niceToHaves: Array.isArray(item.niceToHaves) ? item.niceToHaves : [],
    whatYouGet: Array.isArray(item.whatYouGet) ? item.whatYouGet : [],
    experienceLevel: item.experienceLevel || item.experience_level || undefined,
    applicationUrl: item.applicationUrl || item.application_url || undefined,
    relatedSlugs: Array.isArray(item.relatedSlugs) ? item.relatedSlugs : [],
    status: item.status === "Draft" ? "Draft" : item.status === "Closed" ? "Closed" : "Published",
    seoTitle: item.seoTitle || item.seo_title || undefined,
    seoDescription: item.seoDescription || item.seo_description || undefined,
    createdAt: item.createdAt || item.created_at || new Date().toISOString(),
    updatedAt: item.updatedAt || item.updated_at || new Date().toISOString(),
  };
}

export function readLocalStore(): JobOpeningRecord[] {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(normalizeJob);
      }
    }
  } catch (err) {
    console.error("readLocalStore careers error:", err);
  }
  // Initialize file with SEED_CAREERS if not exists
  writeLocalStore(SEED_CAREERS);
  return SEED_CAREERS.map(normalizeJob);
}

export function writeLocalStore(items: JobOpeningRecord[]): void {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    console.error("writeLocalStore careers error:", err);
  }
}

/**
 * Retrieves all jobs, merging remote Supabase state with local file store.
 */
export async function getAllJobs(): Promise<JobOpeningRecord[]> {
  const localItems = readLocalStore();
  const supabase = getAdminClient();

  try {
    const res = await supabase
      .from("TreelEcommerce.t_test")
      .select("*")
      .eq("testKey", "treel_career");

    if (!res.error && res.data && res.data.length > 0) {
      const synced: JobOpeningRecord[] = [];
      for (const row of res.data) {
        try {
          if (row.item) {
            synced.push(normalizeJob(JSON.parse(row.item)));
          }
        } catch {}
      }
      if (synced.length > 0) {
        const map = new Map<string, JobOpeningRecord>();
        localItems.forEach((it) => map.set(it._id, it));
        synced.forEach((it) => map.set(it._id, it));
        const merged = Array.from(map.values());
        writeLocalStore(merged);
        return merged;
      }
    }
  } catch (err) {
    console.error("getAllJobs database error:", err);
  }

  return localItems;
}

/**
 * Retrieves all published jobs for the public careers portal.
 */
export async function getPublishedJobs(): Promise<JobOpeningRecord[]> {
  const all = await getAllJobs();
  return all.filter((j) => j.status === "Published");
}

/**
 * Retrieves a single job by slug.
 */
export async function getJobBySlug(slug: string): Promise<JobOpeningRecord | null> {
  const cleanSlug = (slug || "").trim().toLowerCase();
  const all = await getAllJobs();
  const found = all.find((j) => j.slug === cleanSlug);
  return found || null;
}

/**
 * Creates or updates a job opening in both local store and Supabase.
 */
export async function saveJob(data: Partial<JobOpeningRecord>): Promise<{ success: boolean; data?: JobOpeningRecord; error?: string }> {
  const title = (data.title || "").trim();
  if (!title) {
    return { success: false, error: "Job title is required." };
  }

  let slug = (data.slug || "").trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/--+/g, "-");
  if (!slug) {
    slug = title.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/--+/g, "-");
  }

  const all = await getAllJobs();
  const now = new Date().toISOString();
  const id = data._id || `job_${slug}_${Date.now()}`;

  // Check slug uniqueness
  const conflict = all.find((j) => j.slug === slug && j._id !== id);
  if (conflict) {
    return { success: false, error: `A job opening with slug "${slug}" already exists.` };
  }

  const existing = all.find((j) => j._id === id);
  const normalized = normalizeJob({
    ...existing,
    ...data,
    _id: id,
    title,
    slug,
    updatedAt: now,
    createdAt: existing?.createdAt || now,
  });

  // 1. Local Store Update
  const localList = readLocalStore();
  const idx = localList.findIndex((j) => j._id === id);
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
      testKey: "treel_career",
      item: JSON.stringify(normalized),
      qty: normalized.status,
    });
  } catch (err) {
    console.warn("saveJob Supabase sync warning:", err);
  }

  return { success: true, data: normalized };
}

/**
 * Deletes a job opening by ID.
 */
export async function deleteJob(id: string): Promise<{ success: boolean; error?: string }> {
  const cleanId = (id || "").trim();
  if (!cleanId) return { success: false, error: "Job ID required." };

  const all = readLocalStore();
  const target = all.find((j) => j._id === cleanId || j.slug === cleanId);
  if (!target) {
    return { success: false, error: "Job opening not found." };
  }

  const filtered = all.filter((j) => j._id !== target._id);
  writeLocalStore(filtered);

  // Supabase delete
  try {
    const supabase = getAdminClient();
    await supabase
      .from("TreelEcommerce.t_test")
      .delete()
      .eq("testKey", "treel_career")
      .eq("_id", target._id);
  } catch (err) {
    console.warn("deleteJob Supabase warning:", err);
  }

  return { success: true };
}

/**
 * Toggles a job publication status between Published and Draft.
 */
export async function toggleJobPublish(id: string): Promise<{ success: boolean; data?: JobOpeningRecord; error?: string }> {
  const all = await getAllJobs();
  const target = all.find((j) => j._id === id || j.slug === id);
  if (!target) return { success: false, error: "Job opening not found." };

  const newStatus = target.status === "Published" ? "Draft" : "Published";
  return await saveJob({ ...target, status: newStatus });
}

/**
 * Closes a job opening.
 */
export async function closeJob(id: string): Promise<{ success: boolean; data?: JobOpeningRecord; error?: string }> {
  const all = await getAllJobs();
  const target = all.find((j) => j._id === id || j.slug === id);
  if (!target) return { success: false, error: "Job opening not found." };

  return await saveJob({ ...target, status: "Closed" });
}
