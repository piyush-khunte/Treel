import { TmipCaseStudy } from "@/types/content";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

function getAdminClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-treel.supabase.co";
  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    "placeholder-key";
  return createClient(url, key, { auth: { persistSession: false } });
}

const STORE_PATH = path.join(process.cwd(), "src", "lib", "data", "casestudies-store.json");

export const SEED_CASE_STUDIES: TmipCaseStudy[] = [
  {
    _id: "cs_1",
    slug: "1000-truck-case-study",
    industry: "Logistics",
    fleetSize: "500-2000",
    headline: "1,000 trucks. 12 months. What changed.",
    excerpt:
      "The full operational story of a large logistics fleet running TMIP for one year. Deployment timeline, operating changes, measured outcomes, and what the operator does differently now.",
    metricValue: "0.5–0.6% Fuel · 6.8% Tyre Life",
    metricLabel: "34% downtime drop across 1,000 linehaul units",
    isFeatured: true,
    status: "Published",
    customerProfile:
      "A Tier-1 Pan-India logistics enterprise operating a linehaul fleet of over 1,000 heavy commercial vehicles across long-haul freight corridors. Their operations connect primary manufacturing clusters in western India to distribution hubs across northern, eastern, and southern metropolitan markets.\n\nWith tractors logging between 10,000 and 14,000 kilometres per month, tyre replacement and diesel consumption constitute the two largest controllable line items in their operating expense structure.",
    challenge:
      "Prior to deploying TMIP, tyre maintenance relied on manual yard checks using handheld mechanical gauges during scheduled depot returns. This approach presented three structural liabilities:\n\n• Slow pressure loss in transit: Punctures occurring between transit hubs went undetected until tyre temperatures spiked to critical failure levels, destroying valuable casings.\n• Under-inflation rolling resistance: A significant portion of the fleet operated at 10-15 PSI below optimal pressure, driving up fuel burn across high-speed highway stretches.\n• Unscheduled breakdown disruption: En-route roadside tyre changes averaged 4.5 hours of vehicle downtime, triggering customer delivery SLA penalties and driver fatigue.",
    solution:
      "Treel executed a phased 90-day rollout across seven major maintenance hubs:\n\n• STAGE 01 · DAYS 1-30 — Hardware Retrofit: ARAI-certified valve-stem sensors fitted to all 18 tyre positions per tractor-trailer unit, synced to in-cabin edge telematics gateways.\n• STAGE 02 · DAYS 31-60 — TMS Integration: Native bi-directional REST webhooks linked TMIP telemetry directly into the client's custom enterprise dispatch ERP and workshop tools.\n• STAGE 03 · DAYS 61-90 — Digital Twin Activation: Predictive degradation models trained on live corridor telemetry, enabling automated dispatch notifications to route workshops.",
    quote: {
      text: "Before TMIP, we managed tyre maintenance in hindsight. If a tyre blew out on the highway, we paid the roadside fee, replaced the casing, and took the SLA hit. Today, our control room knows an axle has a 4 PSI slow leak 120 kilometres before the driver stops for fuel. That single capability changed our entire operating rhythm.",
      author: "Head of Fleet Engineering & Maintenance",
      title: "Tier-1 Pan-India Logistics Operator"
    },
    results: [
      {
        value: "0.5–0.6%",
        label: "Fuel Savings",
        delta: "vs. pre-deployment baseline",
        desc: "Measured across 18 million cumulative fleet kilometres on NH-48 and NH-44 corridors."
      },
      {
        value: "6.8%",
        label: "Tyre-Life Extension",
        delta: "Fleet median improvement",
        desc: "Average steer and drive axle casing life extended by 14,000+ kilometres before first retread."
      },
      {
        value: "34%",
        label: "Downtime Reduction",
        delta: "Trailing 12 months",
        desc: "Punctures, slow-leaks, and thermal blowouts detected and rectified at scheduled depot stops."
      },
      {
        value: "8.6 mo",
        label: "Capital Payback",
        delta: "Full deployment payback",
        desc: "Hardware fitment, cloud subscriptions, and integration costs fully amortized by operational savings."
      }
    ],
    content: `<h3>What we built together</h3><p>Treel executed a phased 90-day rollout across seven major maintenance hubs: Stage 01 (Days 1–30) retrofitted ARAI-certified valve-stem sensors to all 18 tyre positions per tractor-trailer unit. Stage 02 (Days 31–60) integrated native bi-directional REST webhooks into the client's custom enterprise dispatch ERP. Stage 03 (Days 61–90) activated digital twin predictive degradation models trained on live corridor telemetry.</p><h3>What changed</h3><p>Today, the operator's central control tower monitors 18,000+ active tyre nodes in real time. Yard inspection shifts no longer waste hours checking 1,000 healthy vehicles; instead, workshop dispatch queues are automatically generated, directing mechanics only to assets displaying active pressure or thermal variances.</p><p>By eliminating running on under-inflated tyres and preventing heat-induced blowouts, the fleet achieved a documented 0.5–0.6% fuel savings and extended median casing life by 6.8%, reaching full project capital payback in 8.6 months.</p>`
  },
  {
    _id: "cs_2",
    slug: "intercity-passenger-express",
    industry: "Passenger Transport",
    fleetSize: "500-2000",
    headline: "Eliminating high-speed tyre failures across 650 luxury intercity coaches.",
    excerpt:
      "How continuous sub-second pressure and heat telemetry eliminated thermal blowouts on high-speed western expressways.",
    metricValue: "0 Bursts",
    metricLabel: "Zero roadside tyre incidents in 18 months",
    isFeatured: false,
    status: "Published",
    customerProfile:
      "A leading private intercity coach operator managing 650 premium multi-axle sleeper and seater buses. They operate high-density overnight and express services connecting major commercial hubs across Maharashtra, Gujarat, Karnataka, and Telangana.\n\nOperating over 8 million fleet kilometres per month on high-speed concrete expressways, vehicle safety, passenger comfort, and strict timetable adherence are paramount to their brand reputation.",
    challenge:
      "In passenger transit, tyre failures are life-safety hazards. The operator sought to eliminate three critical operational liabilities:\n\n• Expressway thermal blowouts: Concrete highways during summer months caused intense heat buildup in steer and drive tyres, risking catastrophic blowouts at cruising speeds of 90 km/h.\n• Passenger stranding liabilities: Roadside punctures delayed overnight passenger services by hours, causing safety concerns and damaging customer loyalty.\n• Driver habit inconsistencies: Aggressive braking and cornering accelerated uneven tyre wear and caused discomfort for sleeping passengers.",
    solution:
      "Treel implemented a safety-prioritized TMIP configuration tailored for passenger transport operations:\n\n• In-Cab Safety Telemetry: Drivers receive clear audio-visual alerts on cab console screens 15–20 minutes before a slow leak reaches critical thermal limits.\n• Passenger Comfort Scoring: Driver scoring algorithms evaluate smooth deceleration, steady throttle, and gentle cornering to optimize passenger ride quality.",
    quote: {
      text: "When forty passengers are asleep in a coach doing 90 km/h on an expressway, safety is everything. TMIP took the guesswork out of tyre condition. In eighteen months, we haven't had a single roadside tyre emergency.",
      author: "Managing Director",
      title: "Luxury Intercity Transit Network"
    },
    results: [
      {
        value: "0 Bursts",
        label: "Zero Highway Blowouts",
        delta: "18 months continuous operations",
        desc: "Sub-second internal temperature monitoring eliminated high-speed thermal blowouts across concrete expressways."
      },
      {
        value: "100%",
        label: "Passenger Safety Record",
        delta: "Zero roadside safety incidents",
        desc: "Conservative alert thresholds caught slow leaks and abnormal drag miles before structural failure occurred."
      },
      {
        value: "0.5%",
        label: "Fleet Fuel Savings",
        delta: "Optimized highway inflation",
        desc: "Maintaining precise manufacturer cold-inflation targets reduced rolling resistance across long-distance routes."
      },
      {
        value: "99.6%",
        label: "Schedule Punctuality",
        delta: "Trailing 12-month average",
        desc: "Prevented emergency passenger-stranding events, ensuring uninterrupted intercity timetable reliability."
      }
    ],
    content: `<h3>What changed</h3><p>Across 18 months of monitored highway operations, the coach fleet experienced zero high-speed tyre blowouts. Early warning alerts allowed drivers to execute controlled stops at scheduled highway food plazas for technician tyre changes.</p><p>Standardized tyre pressure compliance across the fleet reduced rolling friction, resulting in a 5.8% reduction in diesel consumption and elevating overall timetable punctuality to 99.6%.</p><h3>Life on TMIP</h3><p>Depot technicians perform automated pre-trip tyre health inspections on tablet terminals prior to every evening departure. Operations controllers in Pune and Bangalore monitor live passenger comfort scores and corridor thermal alerts in real time, proactively coaching drivers on route management.</p>`
  },
  {
    _id: "cs_3",
    slug: "quarry-transit-tippers",
    industry: "Construction",
    fleetSize: "100-500",
    headline: "Extending tipper tyre life in severe dust-heavy quarry routes.",
    excerpt:
      "Protecting heavy multi-axle transit tippers against severe puncture cycles and carcass fatigue during massive highway paving contracts.",
    metricValue: "14% Lower Scrap",
    metricLabel: "Extended tyre casing retreadability",
    isFeatured: false,
    status: "Published",
    customerProfile:
      "A major highway engineering contractor executing multi-lane expressway and corridor paving packages. Their operations deploy 280 multi-axle tippers and heavy transit concrete mixers transporting crushed aggregate, gravel, and asphalt from crushing plants to active highway paving sectors.\n\nVehicles operate under intense 35-ton payloads across rugged quarry approaches, unpaved work sites, and paved highways, making tyre preservation and equipment availability critical to project timelines.",
    challenge:
      "Aggressive site conditions caused severe operational friction for the construction fleet:\n\n• Premature casing destruction: Jagged quarry rocks and under-inflation punctures caused deep sidewall flex and carcass fatigue, reducing casing retreadability to under 20%.\n• Paving train delays: When a transit mixer or tipper blew a tyre on a single-lane site haul road, continuous paving machines were forced to halt, risking concrete setting failures.\n• Heavy dust and vibration sensor failures: Third-party commercial telematics failed repeatedly due to fine stone dust immersion and severe suspension shocks.",
    solution:
      "Treel deployed ARAI-certified ruggedized TMIP IoT hardware engineered specifically for heavy earthmoving and construction applications:\n\n• Dust & Shock Shielding: IP67-rated internal wheel sensors protected against high-pressure washdown jets and quarry dust immersion.\n• Off-Highway Data Buffer: Autonomous edge memory logging 48+ hours of continuous vibration and pressure metrics during off-grid quarry runs.",
    quote: {
      text: "Our tippers run in brutal conditions—deep gravel, dust, and maximum loads. TMIP sensors survived the punishment and showed us exactly which tyres were losing pressure before a blowout stopped our paving gang.",
      author: "Plant & Machinery Head",
      title: "National Highway Infrastructure Developer"
    },
    results: [
      {
        value: "14% Lower",
        label: "Tyre Scrap Rate",
        delta: "Preserved casing retreadability",
        desc: "Real-time thermal monitoring prevented ply separation, unlocking two additional retread cycles per casing."
      },
      {
        value: "31%",
        label: "Downtime Reduction",
        delta: "Trailing 12-month average",
        desc: "Eliminated en-route punctures on unpaved quarry approach roads that previously stalled paving operations."
      },
      {
        value: "0.6%",
        label: "Fuel Efficiency Improvement",
        delta: "Under maximum payload cycles",
        desc: "Calibrated tyre inflation minimized rolling drag across mixed asphalt and unpaved gravel road stretches."
      },
      {
        value: "7.4 mo",
        label: "Capital Payback",
        delta: "Full deployment payback",
        desc: "Hardware fitment and software subscriptions fully amortized by casing savings and avoided batch delays."
      }
    ],
    content: `<h3>What changed</h3><p>With real-time pressure monitoring, tipper tyre casings were protected from under-inflated heat delamination. Scrap rates dropped by 14%, and average casing retreadability increased from 1.1 cycles to 2.4 cycles per tyre.</p><p>Site project managers synchronized wheel-end inspections with scheduled batching plant maintenance breaks, cutting unexpected site downtime by 31% and achieving capital payback in 7.4 months.</p><h3>Life on TMIP</h3><p>Project site supervisors now monitor live vehicle health on ruggedized mobile tablets at the batching plant gate. Tippers showing pressure loss are automatically flagged for immediate top-up at the site service bay before returning to the quarry run.</p>`
  },
  {
    _id: "cs_4",
    slug: "open-cast-haulage-analytics",
    industry: "Mining",
    fleetSize: "100-500",
    headline: "Preventing high-tonnage dumper downtime in central India mining corridors.",
    excerpt:
      "Optimizing load-pressure distribution on rigid dump trucks operating in rugged, abrasive mining pits with unforgiving production schedules.",
    metricValue: "99.4% Uptime",
    metricLabel: "Sustained shift productivity on heavy haulers",
    isFeatured: false,
    status: "Published",
    customerProfile:
      "A premier open-cast mining contractor operating in central India, managing a dedicated fleet of over 180 rigid dump trucks, heavy tippers, and articulated excavators. Their operations haul overburden and high-grade mineral ore from pit floors to primary crushing plants across round-the-clock shift schedules.\n\nWith haul trucks operating on severe gradient ramps under 40+ ton payloads, wheel-end assemblies experience intense mechanical torque, abrasive rock friction, and high thermal stress.",
    challenge:
      "In high-tonnage mining, unscheduled downtime is measured in lakhs of rupees per hour. The operator faced three structural challenges:\n\n• Haul ramp bottlenecks: A single tyre failure on a steep, single-lane pit exit halted all trailing dumpers, freezing extraction cycles across the entire pit.\n• Cellular connectivity blackouts: Deep quarry excavations frequently lost cellular signal, causing legacy cloud telematics systems to drop warning signals.\n• Premature OTR tyre scrapping: Undetected slow leaks and uneven load-drag caused intense heat buildup, destroying multi-lakh tyre casings before their first scheduled retread.",
    solution:
      "Treel deployed ARAI-certified, heavy-duty TMIP industrial sensors with IP68-rated enclosures across all wheel positions. The edge hardware included:\n\n• Offline Edge Buffer: On-vehicle edge gateways processing anomaly models locally with instant cab alarms during zero-signal runs.\n• Thermal Stress Models: Physics-informed algorithms that correlate ambient pit temperatures, axle load, and tyre inflation levels.",
    quote: {
      text: "In an open-cast pit, one stalled dumper stops twenty other trucks behind it. TMIP gave us the offline reliability we needed to catch heat spikes before a tyre blew on the ramp. It paid for itself in less than nine months.",
      author: "Operations Director",
      title: "Heavy Mining & Infrastructure Group"
    },
    results: [
      {
        value: "99.4%",
        label: "Haul Fleet Availability",
        delta: "vs. 92.1% pre-deployment baseline",
        desc: "Eliminated catastrophic wheel-end failures stalling single-lane haul ramps during round-the-clock extraction shifts."
      },
      {
        value: "22%",
        label: "Lower Tyre Scrap Rate",
        delta: "Cut-and-chip failure reduction",
        desc: "Real-time thermal threshold alerts prevented ply separation and extended casing lifespan under abrasive haulage."
      },
      {
        value: "₹2.1 Cr",
        label: "Annualized Operating Savings",
        delta: "Direct parts & downtime savings",
        desc: "Measured across heavy OTR tyre replacements, emergency towing costs, and saved production hours."
      },
      {
        value: "8.2 mo",
        label: "Capital Payback",
        delta: "Full deployment payback",
        desc: "Hardware installation, on-site edge gateways, and platform subscriptions fully amortized in under nine months."
      }
    ],
    content: `<h3>What changed</h3><p>Within 90 days of deployment, the mining operation achieved continuous sub-second visibility into wheel temperatures and pressure dynamics across all shifts.</p><p>Catastrophic tyre blowouts on active haul ramps dropped to zero over the 18-month evaluation period. Mine superintendents received predictive alerts allowing drivers to pull into maintenance lay-bys before casings suffered permanent structural damage.</p><h3>Life on TMIP</h3><p>Today, the central mine dispatch room tracks real-time thermal curves for every active dumper. Shift handover reports highlight vehicles operating near threshold tolerances, allowing workshop crews to perform targeted tyre pressure balancing and wheel rotation during scheduled shift changes.</p>`
  },
  {
    _id: "cs_5",
    slug: "cold-chain-express-transit",
    industry: "Logistics",
    fleetSize: "100-500",
    headline: "Protecting perishable pharmaceutical corridors with synchronized sensor telemetry.",
    excerpt:
      "Refrigerated linehaul operator correlates tyre rolling resistance with generator fuel draw, stabilizing transit unit costs.",
    metricValue: "₹1.4 Cr",
    metricLabel: "Annualized fuel and tyre maintenance savings",
    isFeatured: false,
    status: "Published",
    customerProfile:
      "A specialized national cold-chain logistics enterprise operating 320 temperature-controlled refrigerated trucks across north-south pharmaceutical and perishable food corridors. They serve major biopharma manufacturers and national grocery chains requiring continuous 2°C–8°C thermal compliance.\n\nTheir tractors and reefers log over 3.5 million cumulative kilometres monthly, where unscheduled delays risk catastrophic cargo spoilage and SLA penalty defaults.",
    challenge:
      "Cold chain freight combines the tight delivery windows of express logistics with high product liability. The operator faced three specific challenges:\n\n• Vulnerability to roadside breakdowns: A single roadside tyre failure in remote stretches placed multi-crore active pharmaceutical consignments at risk of reefer generator thermal exhaustion.\n• Rolling resistance & fuel draw: Tyres running at 15 PSI under-inflation increased rolling drag by 8%, compounding diesel consumption across both prime mover and trailer reefer units.\n• Pre-departure blind spots: Yard mechanics lacked automated systems to confirm tyre pressure and casing integrity before reefers departed hub facilities.",
    solution:
      "Treel fitted TMIP high-frequency wireless wheel-end sensors across all tractor and reefer trailer axle positions, synchronizing telemetry into the central fleet management interface:\n\n• Hub Pre-Dispatch Gateway: Automated gate readers verify nominal tyre pressure and wheel-end temperature before a reefer clears hub departure barriers.\n• Corridor Thermal Tracking: Continuous cloud monitoring correlating highway ambient temperatures with internal tyre inflation curves.",
    quote: {
      text: "When you carry temperature-sensitive pharma, an unscheduled stop in summer heat is a multi-crore emergency. TMIP eliminated roadside tyre failures from our transit equations and cut our fuel bill substantially.",
      author: "Chief Operating Officer",
      title: "National Cold Chain Logistics"
    },
    results: [
      {
        value: "₹1.4 Cr",
        label: "Annual Operating Savings",
        delta: "Fuel & maintenance reduction",
        desc: "Measured across optimized rolling resistance, reduced reefer generator draw, and extended tyre casing life."
      },
      {
        value: "4.8%",
        label: "Fleet Fuel Savings",
        delta: "vs. pre-deployment baseline",
        desc: "Maintaining optimal tyre inflation reduced aggregate engine drag across high-speed Western Express corridors."
      },
      {
        value: "38%",
        label: "Fewer Transit Delays",
        delta: "Trailing 12 months",
        desc: "Pre-dispatch pressure validation eliminated en-route slow-puncture stops and roadside emergency repairs."
      },
      {
        value: "99.8%",
        label: "On-Time SLA Adherence",
        delta: "Zero cargo spoilage events",
        desc: "Protecting high-value pharmaceutical and perishable cargo against unscheduled highway thermal breakdowns."
      }
    ],
    content: `<h3>What changed</h3><p>Over 14 months of operation, the cold-chain fleet recorded zero catastrophic tyre failures in transit. Pre-departure automated gate checks detected 142 slow punctures at the depot before vehicles commenced expressway transit.</p><p>Operating at calibrated nominal pressures lowered total fuel expenditure by 4.8%, delivering ₹1.4 Cr in annualized operating cost reductions while maintaining a 99.8% on-time delivery record.</p><h3>Life on TMIP</h3><p>Reefer dispatch controllers now manage vehicle readiness with green-light departure validation on their TMS screens. Fleet managers receive instant exception alerts if a trailer tyre loses more than 2 PSI during transit, directing the vehicle to scheduled service points without interrupting temperature integrity.</p>`
  },
  {
    _id: "cs_6",
    slug: "oem-pre-delivery-intelligence",
    industry: "OEM",
    fleetSize: "2000+",
    headline: "Tier-1 OEM factory integration delivering smart connected fleets from Day 1.",
    excerpt:
      "How leading commercial vehicle manufacturers embed TMIP edge telematics during pre-delivery inspection for corporate fleet buyers.",
    metricValue: "100% Pre-Configured",
    metricLabel: "Zero depot commissioning lag for fleet buyers",
    isFeatured: false,
    status: "Published",
    customerProfile:
      "A leading Indian commercial vehicle OEM producing multi-axle heavy haulage tractors, tippers, and intermediate commercial vehicles for enterprise logistics fleets, state transport corporations, and mining conglomerates.\n\nAs enterprise fleet operators shifted from raw vehicle procurement to total cost of ownership (TCO) lifecycle agreements, the OEM sought to deliver natively connected, intelligence-ready trucks directly off the assembly line.",
    challenge:
      "Fleet operators increasingly required real-time wheel-end telemetry and digital twin models on Day 1. The traditional delivery workflow created three critical pain points:\n\n• Aftermarket retrofit delays: Fleets had to immobilize newly delivered trucks for 3–5 days at regional depots for third-party sensor fitment, delaying revenue service.\n• Wiring harness tampering: Non-standardized aftermarket installations frequently spliced factory electrical harnesses, triggering electrical faults and invalidating OEM warranty clauses.\n• Warranty dispute ambiguities: OEMs lacked objective, verifiable operating history logs to determine whether premature component failures were due to manufacturing defects or operator overload.",
    solution:
      "Treel collaborated with the OEM's vehicle engineering and plant quality teams to embed TMIP intelligence directly into the manufacturing process:\n\n• Factory Line PDI Integration: Sensors are calibrated and paired to vehicle chassis numbers during final assembly line testing.\n• Instant Tenant Binding: Automated digital twin provisioning links vehicle telemetry directly to the purchasing fleet's enterprise TMIP portal at handover.",
    quote: {
      text: "Embedding TMIP directly into our pre-delivery inspection transformed our commercial value proposition. Our fleet buyers get an intelligent, connected truck ready for work on Day 1, and our service teams get transparent operating data for lifecycle support.",
      author: "Executive Vice President",
      title: "Commercial Vehicle Product Planning"
    },
    results: [
      {
        value: "100%",
        label: "Pre-Configured Telematics",
        delta: "At factory gate release",
        desc: "Sensors, edge gateway, and cryptographic digital twins fully verified before dealership handover."
      },
      {
        value: "0 Days",
        label: "Commissioning Lag",
        delta: "Zero depot retrofit delay",
        desc: "Commercial buyers deploy vehicles into revenue-generating service immediately upon delivery."
      },
      {
        value: "14.2%",
        label: "Warranty Dispute Drop",
        delta: "Objective operational history",
        desc: "Verifiable telemetry logs on thermal stress, overload, and inflation resolved component warranty claims."
      },
      {
        value: "99.7%",
        label: "Initial Signal Capture",
        delta: "Pan-India delivery tracking",
        desc: "Seamless activation and tenant binding across multi-state dealer delivery networks."
      }
    ],
    content: `<h3>What changed</h3><p>Over 2,500 commercial vehicles were rolled out with pre-configured TMIP factory intelligence across a 12-month period. Fleet buyers were able to deploy vehicles into commercial operation immediately upon delivery with zero retrofit downtime.</p><p>The OEM's service engineering group reduced warranty claim disputes by 14.2% by utilizing verifiable historical operating logs (inflation pressure, thermal cycles, and axle load patterns) to resolve warranty inquiries objectively.</p><h3>Life on TMIP</h3><p>Dealership sales teams now provide enterprise buyers with instant QR-code vehicle onboarding at delivery. The OEM's engineering headquarters monitors aggregate reliability benchmarks across different geographies, using real-world operational stress telemetry to guide future chassis and powertrain refinements.</p>`
  }
];

function readLocalStore(): TmipCaseStudy[] {
  try {
    if (fs.existsSync(STORE_PATH)) {
      const raw = fs.readFileSync(STORE_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Hydrate any seed item that is missing content or results without overwriting custom admin modifications
        let changed = false;
        const merged = parsed.map((item) => {
          const seed = SEED_CASE_STUDIES.find((s) => s.slug === item.slug || s._id === item._id);
          if (seed) {
            let updated = false;
            const res = { ...item };
            if (!res.content && seed.content) {
              res.content = seed.content;
              updated = true;
            }
            if ((!res.results || res.results.length === 0) && seed.results && seed.results.length > 0) {
              res.results = seed.results;
              updated = true;
            }
            if (!res.quote && seed.quote) {
              res.quote = seed.quote;
              updated = true;
            }
            if (!res.customerProfile && seed.customerProfile && (!res.sections || res.sections.length === 0) && !res.updatedAt) {
              res.customerProfile = seed.customerProfile;
              updated = true;
            }
            if (updated) {
              changed = true;
              return res;
            }
          }
          return item;
        });

        // Ensure all seed studies are present if missing
        for (const seed of SEED_CASE_STUDIES) {
          if (!merged.some((m) => m.slug === seed.slug || m._id === seed._id)) {
            merged.push(seed);
            changed = true;
          }
        }

        if (changed) {
          writeLocalStore(merged);
        }
        return merged;
      }
    }
  } catch (err) {
    console.error("readLocalStore case studies error:", err);
  }
  writeLocalStore(SEED_CASE_STUDIES);
  return [...SEED_CASE_STUDIES];
}

function writeLocalStore(items: TmipCaseStudy[]): void {
  try {
    const dir = path.dirname(STORE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORE_PATH, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    console.error("writeLocalStore case studies error:", err);
  }
}

export async function getAllCaseStudies(includeDrafts = true): Promise<TmipCaseStudy[]> {
  const localItems = readLocalStore();
  const supabase = getAdminClient();

  try {
    const { data, error } = await supabase
      .from("TreelEcommerce.t_test")
      .select("*")
      .eq("testKey", "treel_casestudy");

    if (!error && data && data.length > 0) {
      try {
        const parsed = JSON.parse(data[0].testValue);
        if (Array.isArray(parsed) && parsed.length > 0) {
          writeLocalStore(parsed);
          return includeDrafts ? parsed : parsed.filter((item) => item.status === "Published");
        }
      } catch (e) {
        console.error("Failed to parse TreelEcommerce.t_test treel_casestudy payload:", e);
      }
    }
  } catch {
    // Suppress and fallback gracefully
  }

  return includeDrafts ? localItems : localItems.filter((item) => item.status === "Published");
}

export async function getPublishedCaseStudies(): Promise<TmipCaseStudy[]> {
  return getAllCaseStudies(false);
}

export async function getCaseStudyBySlug(slug: string): Promise<TmipCaseStudy | null> {
  const all = await getAllCaseStudies(true);
  const clean = decodeURIComponent(slug).trim().toLowerCase();
  const found = all.find((item) => item.slug.toLowerCase() === clean || item._id.toLowerCase() === clean);
  return found || null;
}

export async function saveCaseStudy(cs: Partial<TmipCaseStudy>): Promise<TmipCaseStudy> {
  const all = await getAllCaseStudies(true);
  const now = new Date().toISOString();

  const id = cs._id && !cs._id.startsWith("new_") ? cs._id : `cs_${Date.now()}`;
  const existingIdx = all.findIndex((c) => c._id === id || (cs.slug && c.slug.toLowerCase() === cs.slug.toLowerCase()));
  const existing = existingIdx >= 0 ? all[existingIdx] : undefined;

  const slug = (
    cs.slug ||
    existing?.slug ||
    cs.headline?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") ||
    `case-study-${Date.now()}`
  ).trim();

  const fullCaseStudy: TmipCaseStudy = {
    _id: id,
    slug,
    industry: cs.industry || existing?.industry || "Logistics",
    fleetSize: cs.fleetSize || existing?.fleetSize || "100-500",
    headline: cs.headline || existing?.headline || "Untitled Case Study",
    excerpt: cs.excerpt !== undefined ? cs.excerpt : (existing?.excerpt || ""),
    metricValue: cs.metricValue || existing?.metricValue || "0.5–0.6% Fuel Savings",
    metricLabel: cs.metricLabel || existing?.metricLabel || "Operating advantage",
    isFeatured: cs.isFeatured !== undefined ? !!cs.isFeatured : (existing?.isFeatured ?? false),
    status: cs.status ? (cs.status === "Draft" ? "Draft" : "Published") : (existing?.status || "Published"),
    sections: cs.sections !== undefined ? cs.sections : (existing?.sections || []),
    customerProfile: cs.customerProfile !== undefined ? cs.customerProfile : (existing?.customerProfile || ""),
    challenge: cs.challenge !== undefined ? cs.challenge : (existing?.challenge || ""),
    solution: cs.solution !== undefined ? cs.solution : (existing?.solution || ""),
    quote: cs.quote !== undefined ? cs.quote : existing?.quote,
    author: cs.author !== undefined ? cs.author : (existing?.author || "Treel Research"),
    authorRole: cs.authorRole !== undefined ? cs.authorRole : (existing?.authorRole || "Mobility Intelligence Research Group"),
    results: cs.results !== undefined ? cs.results : (existing?.results || []),
    content: cs.content !== undefined ? cs.content : (existing?.content || ""),
    createdAt: existing?.createdAt || cs.createdAt || now,
    updatedAt: now,
  };

  let updatedList: TmipCaseStudy[];
  if (existingIdx >= 0) {
    updatedList = [...all];
    updatedList[existingIdx] = fullCaseStudy;
  } else {
    updatedList = [fullCaseStudy, ...all];
  }

  writeLocalStore(updatedList);

  // Sync to Supabase t_test table
  try {
    const supabase = getAdminClient();
    await supabase.from("TreelEcommerce.t_test").upsert([
      {
        testKey: "treel_casestudy",
        testValue: JSON.stringify(updatedList),
      }
    ], { onConflict: "testKey" });
  } catch (err) {
    console.error("Supabase sync error for case study:", err);
  }

  return fullCaseStudy;
}

export async function deleteCaseStudy(idOrSlug: string): Promise<boolean> {
  const all = await getAllCaseStudies(true);
  const clean = idOrSlug.toLowerCase();
  const filtered = all.filter((c) => c._id.toLowerCase() !== clean && c.slug.toLowerCase() !== clean);
  if (filtered.length === all.length) return false;

  writeLocalStore(filtered);

  try {
    const supabase = getAdminClient();
    await supabase.from("TreelEcommerce.t_test").upsert([
      {
        testKey: "treel_casestudy",
        testValue: JSON.stringify(filtered),
      }
    ], { onConflict: "testKey" });
  } catch (err) {
    console.error("Supabase sync error deleting case study:", err);
  }

  return true;
}
