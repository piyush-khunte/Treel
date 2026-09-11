import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Compass,
  Award,
  Database,
  HeartHandshake
} from "lucide-react";
import { RoleApplicationForm } from "./role-form";

interface RoleDetails {
  slug: string;
  title: string;
  team: string;
  location: string;
  employmentType: string;
  postedDate: string;
  roleSummary: string;
  aboutTheRole: string[];
  responsibilities: string[];
  mustHaves: string[];
  niceToHaves: string[];
  whatYouGet: string[];
  relatedSlugs: string[];
}

const ROLES: Record<string, RoleDetails> = {
  "senior-embedded-engineer": {
    slug: "senior-embedded-engineer",
    title: "Senior Embedded Firmware Engineer",
    team: "Engineering",
    location: "Pune",
    employmentType: "Full-time",
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
    ]
  },
  "staff-backend-engineer": {
    slug: "staff-backend-engineer",
    title: "Staff Backend Engineer (IoT & Distributed Systems)",
    team: "Engineering",
    location: "Pune",
    employmentType: "Full-time",
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
    ]
  },
  "product-manager-insights": {
    slug: "product-manager-insights",
    title: "Product Manager — Telemetry & Insights",
    team: "Product",
    location: "Hybrid",
    employmentType: "Full-time",
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
      "Experience with enterprise pilot evaluations and customer onboarding journeys."
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
    ]
  },
  "enterprise-solutions-architect": {
    slug: "enterprise-solutions-architect",
    title: "Enterprise Solutions Architect (TMIP)",
    team: "GTM",
    location: "Pune",
    employmentType: "Full-time",
    postedDate: "July 2026",
    roleSummary: "Partner with enterprise fleet technical leaders, lead 14-day technical pilots, and architect custom TMS/ERP API integrations.",
    aboutTheRole: [
      "Enterprise fleet sales at Treel are high-touch and deeply technical. When a 1,000-vehicle logistics operator evaluates TMIP, they need to know how our Vehicle Digital Twin integrates with their SAP ERP, Fleetx TMS, or custom data warehouse. You will be the trusted technical authority guiding these evaluations.",
      "In this role, you will lead pre-sales technical discovery, architect custom API data flows, manage 14-day pilot onboarding, and ensure that prospective customers experience the full economic and operational value of TMIP before contract finalization."
    ],
    responsibilities: [
      "Serve as the lead technical advisor in enterprise sales engagements with fleet CTOs, CIOs, and Operations Directors.",
      "Architect and validate custom integration topologies connecting TMIP APIs with customer ERP, TMS, and BI stacks.",
      "Lead technical setup and data flow configuration for prospective customer 14-day fleet pilots.",
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
      "Travel allowance and executive engagement budget.",
      "Direct partnership with founder and executive leadership on tier-1 enterprise commercial deals."
    ],
    relatedSlugs: [
      "product-manager-insights",
      "staff-backend-engineer",
      "senior-embedded-engineer"
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(ROLES).map((roleSlug) => ({ "role-slug": roleSlug }));
}

export async function generateMetadata({ params }: { params: Promise<{ "role-slug": string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const roleSlug = resolvedParams["role-slug"];
  const role = ROLES[roleSlug];

  if (!role) {
    return {
      title: "Role Not Found · Careers at Treel",
      description: "The requested career opening could not be found.",
    };
  }

  return {
    title: `${role.title}  ·  Careers at Treel`,
    description: role.roleSummary,
    alternates: {
      canonical: `https://treel.in/careers/${role.slug}`,
    },
    openGraph: {
      title: `${role.title}  ·  Careers at Treel`,
      description: role.roleSummary,
      url: `https://treel.in/careers/${role.slug}`,
    },
  };
}

export default async function CareersRoleSlugPage({ params }: { params: Promise<{ "role-slug": string }> }) {
  const resolvedParams = await params;
  const roleSlug = resolvedParams["role-slug"];
  const role = ROLES[roleSlug];

  if (!role) {
    notFound();
  }

  const relatedRoles = role.relatedSlugs
    .map((s) => ROLES[s])
    .filter(Boolean) as RoleDetails[];

  return (
    <div className="space-y-0 bg-[#111927] text-[#FAF7F2] font-inter">
      {/* Header & Hero */}
      <header className="relative overflow-hidden pt-24 pb-16 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
              <Link href="/careers" className="hover:text-[#FAF7F2] transition-colors">
                Careers
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[#D5573B] font-medium">{role.team}</span>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[#FAF7F2] truncate max-w-xs">{role.title}</span>
            </div>

            {/* Role Title (H1) */}
            <h1 className="font-fraunces text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">
              {role.title}
            </h1>

            {/* Status Information */} 
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#94A3B8]">
              <span className="px-2.5 py-0.5 rounded-full bg-[#D5573B]/10 border border-[#D5573B]/20 text-[#D5573B] font-semibold uppercase">
                {role.team}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#D5573B]" /> {role.location}
              </span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-[#D5573B]" /> {role.employmentType}
              </span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#D5573B]" /> Posted {role.postedDate}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="py-16 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-16">
            {/* About the role */}
            <section className="space-y-4">
              <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#FAF7F2] tracking-tight">
                About the role
              </h2>
              {role.aboutTheRole.map((para, idx) => (
                <p key={idx} className="text-base sm:text-lg text-[#94A3B8] leading-relaxed font-inter">
                  {para}
                </p>
              ))}
            </section>

            {/* What you'll do */}
            <section className="space-y-6">
              <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#FAF7F2] tracking-tight">
                What you&apos;ll do
              </h2>
              <div className="space-y-3">
                {role.responsibilities.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start gap-3.5">
                    <div className="w-5 h-5 rounded-full bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm sm:text-base text-[#FAF7F2] font-inter">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* What we're looking for */}
            <section className="space-y-8">
              <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#FAF7F2] tracking-tight">
                What we&apos;re looking for
              </h2>

              {/* Must-haves */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#D5573B] font-semibold">
                  Must-haves
                </h3>
                <div className="space-y-2.5">
                  {role.mustHaves.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#94A3B8]">
                      <span className="text-[#D5573B] font-bold mt-1">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nice-to-haves */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] font-semibold">
                  Nice-to-haves
                </h3>
                <div className="space-y-2.5">
                  {role.niceToHaves.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#94A3B8]">
                      <span className="text-[#D5573B] font-bold mt-1">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* What you get */}
            <section className="space-y-4">
              <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#FAF7F2] tracking-tight">
                What you get
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {role.whatYouGet.map((benefit, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="text-xs font-mono text-[#D5573B] font-semibold uppercase">Pillar {idx + 1}</span>
                    <p className="text-sm text-[#FAF7F2]">{benefit}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* How to apply & Functional Form */}
            <section id="apply" className="space-y-6 pt-4">
              <div className="space-y-2">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#FAF7F2] tracking-tight">
                  How to apply
                </h2>
                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-inter">
                  Submit your application below. You will be asked for your name, email, phone, resume, and an optional cover letter. We respond to every applicant within two weeks.
                </p>
              </div>

              {/* Functional Application Form */}
              <RoleApplicationForm roleTitle={role.title} />
            </section>
          </div>
        </div>
      </div>

      {/* Related Roles Strip */}
      {relatedRoles.length > 0 && (
        <section className="py-20 border-b border-white/10 bg-white/[0.01]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
            <div className="max-w-4xl space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#FAF7F2]">
                  Related open roles
                </h2>
                <Link
                  href="/careers"
                  className="text-xs font-mono uppercase tracking-wider text-[#D5573B] hover:text-[#CB4831] transition-colors flex items-center gap-1.5"
                >
                  <span>All openings</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedRoles.map((rel, idx) => (
                  <Link
                    key={idx}
                    href={`/careers/${rel.slug}`}
                    className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#D5573B]/40 transition-all group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D5573B]/10 border border-[#D5573B]/20 text-[#D5573B] font-semibold uppercase">
                          {rel.team}
                        </span>
                        <span className="text-xs text-[#94A3B8] font-mono">{rel.location}</span>
                      </div>
                      <h3 className="font-fraunces text-base font-bold text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed font-inter">
                        {rel.roleSummary}
                      </p>
                    </div>

                    <div className="pt-4 flex items-center justify-between text-xs font-mono text-[#D5573B]">
                      <span>View role</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
