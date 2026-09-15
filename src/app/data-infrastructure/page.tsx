import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowRight, 
  ShieldCheck, 
  Database, 
  Lock, 
  Server, 
  Activity, 
  FileText, 
  CheckCircle2,
  Cpu,
  Layers,
  Zap
} from "lucide-react";
import { TreelSignature } from "@/components/corporate/treel-signature";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Data Infrastructure · Treel",
  description: "Treel operates India's largest connected commercial vehicle dataset. 68,000 vehicles under active management, sub-second telemetry, eight years of longitudinal data. Infrastructure, governance, and privacy.",
  alternates: {
    canonical: "https://treel.in/data-infrastructure",
  },
  openGraph: {
    title: "Data Infrastructure · Treel",
    description: "Treel operates India's largest connected commercial vehicle dataset. 68,000 vehicles under active management, sub-second telemetry, eight years of longitudinal data. Infrastructure, governance, and privacy.",
    url: "https://treel.in/data-infrastructure",
  },
};

export default function DataInfrastructurePage() {
  const metrics = [
    {
      value: "68,412",
      label: "Vehicles under active management",
      detail: "Continuous telemetry reporting from commercial fleets"
    },
    {
      value: "Sub-second",
      label: "Telemetry ingestion latency",
      detail: "Near-instantaneous wheel-end sensor ingestion"
    },
    {
      value: "8 Years",
      label: "Longitudinal vehicle dataset",
      detail: "Empirical operational data from Indian highways"
    },
    {
      value: "Billions",
      label: "Measurements processed annually",
      detail: "Operating telemetry fleets bet their business on"
    }
  ];

  const privacyPillars = [
    {
      title: "We do not sell customer data.",
      statement: "Not aggregated, not anonymised, not to third parties. Ever."
    },
    {
      title: "We do not train shared competitive models.",
      statement: "We do not use customer data to train models that benefit competing fleets. Model training happens strictly within customer boundaries."
    },
    {
      title: "No mandatory secondary consent.",
      statement: "We do not require customers to consent to secondary use of their data as a condition of using the platform. Consent for research or benchmarking is opt-in, revocable, and separate from the operating contract."
    }
  ];

  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div 
          className="absolute -top-24 -right-24 w-[500px] h-[500px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(213, 87, 59, 0.12) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <TreelSignature variant="compact" />
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                DATA INFRASTRUCTURE
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              India&apos;s largest connected commercial vehicle dataset.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              68,412 vehicles under active management. Sub-second telemetry from each. Eight years of longitudinal data. This is the foundation Treel&apos;s mobility intelligence platform runs on.
            </p>
          </div>
        </div>
      </section>

      {/* Scale Section */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-10">
            <div className="space-y-4">
              <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
                What the numbers mean.
              </h2>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
                Sixty-eight thousand vehicles report to the Treel platform continuously. Each vehicle generates several million telemetry points per year. Across the fleet, we process billions of measurements. This is not a research dataset. It is an operating dataset that fleets bet their business on every day.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((m, idx) => (
                <div key={idx} className="p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-3 flex flex-col justify-between hover:border-[#D5573B]/40 transition-all duration-300">
                  <div className="font-fraunces text-3xl sm:text-4xl font-medium text-[#D5573B] tracking-tight">
                    {m.value}
                  </div>
                  <div>
                    <div className="font-fraunces text-sm font-medium text-[#FAF7F2]">
                      {m.label}
                    </div>
                    <div className="text-xs text-[#94A3B8] font-inter mt-1 leading-normal">
                      {m.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-10">
            <div className="space-y-4">
              <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
                How the infrastructure holds up.
              </h2>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
                Every Vehicle Digital Twin is persisted independently. State updates are eventually consistent within seconds; history is immutable and append-only. The infrastructure runs on cloud regions with automatic failover. Backup and disaster recovery are exercised quarterly.
              </p>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
                The architecture is designed for two properties that matter most to enterprise fleet operators: <strong className="text-[#FAF7F2] font-semibold">availability</strong> (the platform is up when the fleet needs it, currently 99.7 percent trailing 90-day) and <strong className="text-[#FAF7F2] font-semibold">integrity</strong> (the data you queried yesterday is the data you queried today; nothing shifts silently).
              </p>
            </div>

            {/* Data Flow Visual Area */}
            <div className="w-full rounded-lg bg-white/[0.03] border border-white/[0.08] p-6 sm:p-8 relative overflow-hidden shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="text-xs font-jetbrains font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
                  END-TO-END TELEMETRY PIPELINE
                </div>
                <div className="text-xs font-jetbrains font-mono text-[#94A3B8]">
                  99.7% Trailing Availability
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#D5573B]/15 border border-[#D5573B]/30 flex items-center justify-center text-[#D5573B]">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-semibold text-[#FAF7F2]">01 · Wheel Sensors</div>
                  <div className="text-[11px] text-[#94A3B8] leading-tight">Rim and valve transducers measure chamber pressure &amp; heat.</div>
                </div>

                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#D5573B]/15 border border-[#D5573B]/30 flex items-center justify-center text-[#D5573B]">
                    <Server className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-semibold text-[#FAF7F2]">02 · Edge Gateway</div>
                  <div className="text-[11px] text-[#94A3B8] leading-tight">Store-and-forward buffers maintain continuity in dead zones.</div>
                </div>

                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#D5573B]/15 border border-[#D5573B]/30 flex items-center justify-center text-[#D5573B]">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-semibold text-[#FAF7F2]">03 · Cloud Stream</div>
                  <div className="text-[11px] text-[#94A3B8] leading-tight">Sub-second ingestion pipeline with automatic regional failover.</div>
                </div>

                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#D5573B]/15 border border-[#D5573B]/30 flex items-center justify-center text-[#D5573B]">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-semibold text-[#FAF7F2]">04 · Digital Twin</div>
                  <div className="text-[11px] text-[#94A3B8] leading-tight">State updates in seconds; immutable, append-only history.</div>
                </div>

                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.06] space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-[#D5573B]/15 border border-[#D5573B]/30 flex items-center justify-center text-[#D5573B]">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-semibold text-[#FAF7F2]">05 · Fleet Action</div>
                  <div className="text-[11px] text-[#94A3B8] leading-tight">Turnaround dispatch, real-time alerts, and ERP export.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Governance Section */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Data governance.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              Every customer&apos;s data is logically isolated. Access controls are role-based and audited. Retention policies are configured per customer. Right-to-delete requests are processed within the timeframes required by the India DPDP Act 2023 and, for future EU deployments, GDPR. We publish our full{" "}
              <Link href="/privacy" className="underline hover:text-white transition-colors">
                privacy policy
              </Link>{" "}
              and a{" "}
              <Link href="/tmip/security" className="underline hover:text-white transition-colors">
                security page
              </Link>{" "}
              for enterprise buyers who need to complete vendor assessments.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Stance Section */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              What we do not do.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {privacyPillars.map((p, idx) => (
                <div key={idx} className="p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] mb-2">
                      <Lock className="w-4 h-4" />
                    </div>
                    <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2]">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-inter">
                    {p.statement}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Whitepaper Callout */}
      <section className="py-20 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl">
            <div className="p-8 sm:p-10 rounded-lg bg-white/[0.03] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2 max-w-xl">
                <div className="text-xs font-jetbrains font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
                  TECHNICAL DOCUMENTATION
                </div>
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
                  For technical buyers.
                </h2>
                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-inter">
                  For enterprise buyers, engineering teams, or research collaborators who need architecture depth, we publish a technical whitepaper on the data infrastructure.
                </p>
              </div>

              <Button asChild variant="treel" size="lg" className="whitespace-nowrap">
                <Link href="/research/data-architecture" className="inline-flex items-center gap-2">
                  <span>Read the whitepaper</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Discuss integration.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              Connect directly with our engineering and platform architecture team in Pune to evaluate integration with your enterprise fleet systems.
            </p>
            <div className="pt-2">
              <Button asChild variant="treel" size="lg">
                <Link href="/contact" className="inline-flex items-center gap-2">
                  <span>Talk to engineering</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}