import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Play, Clock, ShieldCheck, CheckCircle2, Wrench, AlertTriangle } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { WhatsAppCircularIcon } from "@/components/ui/whatsapp-circular-icon";
import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";

export const metadata: Metadata = {
  title: "How to Install Suraksha · How Suraksha Works",
  description: "Installing the Suraksha safety kit takes fifteen minutes. Get it fitted at any puncture shop or Truck Wheels centre. Full step-by-step guide.",
  alternates: {
    canonical: "https://treel.in/suraksha/how-it-works",
  },
  openGraph: {
    title: "How to Install Suraksha · How Suraksha Works",
    description: "Installing the Suraksha safety kit takes fifteen minutes. Get it fitted at any puncture shop or Truck Wheels centre. Full step-by-step guide.",
    url: "https://treel.in/suraksha/how-it-works",
  },
};

export default function SurakshaHowItWorksPage() {
  return (
    <div className="bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="suraksha"
              items={[
                { label: "Suraksha", href: "/suraksha" },
                { label: "How It Works" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              HOW IT WORKS
            </div>
            <h1 className="font-anton uppercase tracking-wide text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#451A03] leading-[0.95]">
              FIFTEEN MINUTES.<br /><span className="italic text-[#DC2626]">THAT&apos;S ALL IT TAKES.</span>
            </h1>
            <SurakshaRotator
              page="5.3"
              className="font-baloo text-xl sm:text-2xl font-bold text-[#DC2626] tracking-wide"
            >
              फिट करवाइए, चालू कीजिए और चलाइए।
            </SurakshaRotator>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Installing Suraksha is simple. No mechanic is required. Visit a puncture shop or Truck Wheels Centre and the installation can be completed in fifteen minutes.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Installation Video Section */}
      <section className="py-12 sm:py-16 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border-2 border-[#451A03]/15 bg-[#FFFBEB] p-4 sm:p-6 shadow-md space-y-4">
              {/* Video Player Visual Frame */}
              <div 
                className="relative aspect-video w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#1C120C] via-[#2D160C] to-[#451A03] border-2 border-[#451A03]/25 shadow-inner flex flex-col justify-between p-4 sm:p-8 select-none group"
                role="region"
                aria-label="Installation walkthrough video player"
              >
                {/* Background Tech Texture / Radial Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.22)_0,transparent_70%)] pointer-events-none" />
                <div 
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: "linear-gradient(rgba(254,243,199,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(254,243,199,0.1) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />

                {/* Top Overlay Badges */}
                <div className="relative z-10 flex items-center justify-between gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DC2626] text-[#FEF3C7] text-xs font-bold uppercase tracking-wider shadow-sm">
                    <Wrench className="w-3.5 h-3.5" />
                    Installation Walkthrough
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[#FEF3C7] text-xs font-semibold border border-[#FEF3C7]/20">
                    <Clock className="w-3 h-3 text-[#EA580C]" />
                    3:00 Min
                  </span>
                </div>

                {/* Center Play Button & Title */}
                <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center space-y-3">
                  <div className="relative">
                    <div className="absolute -inset-3 rounded-full bg-[#DC2626]/20 animate-ping opacity-60" />
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#DC2626] text-[#FEF3C7] flex items-center justify-center shadow-2xl group-hover:scale-105 group-hover:bg-[#EF4444] transition-all cursor-pointer border-2 border-[#FEF3C7]/40">
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-1 fill-[#FEF3C7]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-anton uppercase tracking-wide text-xl sm:text-2xl text-[#FEF3C7] drop-shadow-sm">
                      15-MINUTE FITMENT WALKTHROUGH
                    </h3>
                    <p className="text-xs sm:text-sm text-[#FEF3C7]/80 font-medium">
                      In-Cab Display Mount · 4 Wheel Sensors · Automatic Calibration
                    </p>
                  </div>
                </div>

                {/* Bottom Overlay Bar */}
                <div className="relative z-10 flex items-center justify-between text-xs text-[#FEF3C7]/90 pt-2 border-t border-white/10">
                  <span className="font-medium">Suraksha Driver Safety Series</span>
                  <span className="text-[#EA580C] font-bold uppercase tracking-wider">Audio: Hindi Narration</span>
                </div>
              </div>

              {/* Customer-Facing Caption & Info Bar */}
              <div className="pt-3 border-t border-[#451A03]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                <div className="flex items-center gap-2.5 text-[#451A03] font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" />
                  <span>3-minute installation walkthrough — narrated in Hindi with step-by-step guidance</span>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs text-[#78350F] font-bold uppercase tracking-wider bg-[#FEF3C7] px-3 py-1 rounded border border-[#451A03]/10 self-start sm:self-auto">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#059669]" />
                  Zero tools needed
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three Steps Section */}
      <section className="py-16 sm:py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                INSTALLATION PROCESS
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                THREE STEPS. FIFTEEN MINUTES. FITTED.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {/* Step 1 */}
              <div className="p-6 rounded-xl bg-[#FEF3C7] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-anton text-4xl text-[#DC2626]">01</span>
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#DC2626]/10 text-[#DC2626]">
                      Step 1 · Buy
                    </span>
                  </div>
                  <h3 className="font-anton text-2xl uppercase text-[#451A03]">GET YOUR KIT</h3>
                  <p className="text-[#78350F] text-sm leading-relaxed">
                    Pick up your kit at any Truck Wheels centre, or order on WhatsApp for direct delivery. Easy EMI is available through Bajaj Finance.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#451A03]/10 text-xs font-bold text-[#DC2626] uppercase">
                  Time: 5–10 minutes
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-xl bg-[#FEF3C7] border-2 border-[#451A03]/15 hover:border-[#EA580C] transition-all shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-anton text-4xl text-[#EA580C]">02</span>
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EA580C]/10 text-[#EA580C]">
                      Step 2 · Install
                    </span>
                  </div>
                  <h3 className="font-anton text-2xl uppercase text-[#451A03]">GET IT FITTED</h3>
                  <p className="text-[#78350F] text-sm leading-relaxed">
                    Visit any roadside puncture shop or Truck Wheels centre. In fifteen minutes, the display is mounted in your cabin and the sensors are secured to your tyre valves.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#451A03]/10 text-xs font-bold text-[#EA580C] uppercase">
                  Time: 15 minutes
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-xl bg-[#FEF3C7] border-2 border-[#451A03]/15 hover:border-[#0891B2] transition-all shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-anton text-4xl text-[#0891B2]">03</span>
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#0891B2]/10 text-[#0891B2]">
                      Step 3 · Monitor
                    </span>
                  </div>
                  <h3 className="font-anton text-2xl uppercase text-[#451A03]">MONITOR IN REAL TIME</h3>
                  <p className="text-[#78350F] text-sm leading-relaxed">
                    The in-cabin display continuously shows tyre pressure and temperature. If an issue develops, the display beeps and alerts you. No app or subscription required.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#451A03]/10 text-xs font-bold text-[#0891B2] uppercase">
                  Time: Every drive
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. In-Cab Display Section */}
      <section className="py-16 sm:py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                IN-CAB EXPERIENCE
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                WHAT THE DISPLAY SHOWS
              </h2>
              <p className="text-[#78350F] text-lg mt-2 font-medium">
                Continuous tyre telemetry right in front of the driver.
              </p>
            </div>

            {/* In-Cab Display Visual Mockup */}
            <div className="rounded-2xl border-2 border-[#451A03]/20 bg-[#1A120B] p-6 sm:p-8 text-[#FEF3C7] shadow-xl space-y-6">
              {/* Simulated Display Screen Bezel */}
              <div className="border border-[#FEF3C7]/20 rounded-xl bg-black/70 p-4 sm:p-6 shadow-inner space-y-5">
                {/* Top Row: System Status */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#10B981] animate-pulse" />
                    <span className="font-mono text-sm sm:text-base font-bold text-[#10B981] tracking-wider">
                      ALL OK · TYRE TELEMETRY ACTIVE
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#FEF3C7]/60">SURAKSHA DISPLAY v1</span>
                </div>

                {/* Center: Vehicle Schematic & 4 Tyre Readouts */}
                <div className="grid grid-cols-2 gap-4 sm:gap-8 py-2">
                  {/* Front Left */}
                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FEF3C7]/70">Front Left (FL)</span>
                    <div className="text-xl sm:text-2xl font-mono font-bold text-[#10B981]">120 PSI</div>
                    <div className="text-xs font-mono text-[#FEF3C7]/80">42°C · Normal</div>
                  </div>

                  {/* Front Right */}
                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center sm:items-end text-center sm:text-right space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FEF3C7]/70">Front Right (FR)</span>
                    <div className="text-xl sm:text-2xl font-mono font-bold text-[#10B981]">120 PSI</div>
                    <div className="text-xs font-mono text-[#FEF3C7]/80">41°C · Normal</div>
                  </div>

                  {/* Rear Left */}
                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center sm:items-start text-center sm:text-left space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FEF3C7]/70">Rear Left (RL)</span>
                    <div className="text-xl sm:text-2xl font-mono font-bold text-[#10B981]">125 PSI</div>
                    <div className="text-xs font-mono text-[#FEF3C7]/80">44°C · Normal</div>
                  </div>

                  {/* Rear Right */}
                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center sm:items-end text-center sm:text-right space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#FEF3C7]/70">Rear Right (RR)</span>
                    <div className="text-xl sm:text-2xl font-mono font-bold text-[#10B981]">125 PSI</div>
                    <div className="text-xs font-mono text-[#FEF3C7]/80">45°C · Normal</div>
                  </div>
                </div>

                {/* Bottom Row: Alert Log Summary */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#FEF3C7]/70">
                  <span>Alert History: No active faults</span>
                  <span className="text-[#10B981]">Safe Operation Mode</span>
                </div>
              </div>

              {/* Breakdown Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-[#261A10] border border-[#FEF3C7]/15 space-y-1.5">
                  <span className="font-bold text-[#10B981] text-sm block">Top Row (System Status)</span>
                  <p className="text-xs text-[#FEF3C7]/80 leading-relaxed">
                    <code className="text-[#10B981] font-mono">ALL OK</code> (green) or alert messages (red) when pressure or temperature needs attention.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#261A10] border border-[#FEF3C7]/15 space-y-1.5">
                  <span className="font-bold text-[#EA580C] text-sm block">Center (Vehicle Layout)</span>
                  <p className="text-xs text-[#FEF3C7]/80 leading-relaxed">
                    Truck outline with 4 tyre positions mapping exact physical wheel placement on the road.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#261A10] border border-[#FEF3C7]/15 space-y-1.5">
                  <span className="font-bold text-[#0891B2] text-sm block">Each Tyre Telemetry</span>
                  <p className="text-xs text-[#FEF3C7]/80 leading-relaxed">
                    Real-time pressure (PSI), temperature (°C), and live status colour (green / yellow / red).
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#261A10] border border-[#FEF3C7]/15 space-y-1.5">
                  <span className="font-bold text-[#FEF3C7] text-sm block">Bottom Row (Alert History)</span>
                  <p className="text-xs text-[#FEF3C7]/80 leading-relaxed">
                    Event memory tracking the last 3 critical alert events for easy post-trip review.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Alerts Section */}
      <section className="py-16 sm:py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                ALERT SYSTEM
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                CRITICAL ALERT TYPES
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Alert 1 */}
              <div className="p-6 rounded-xl bg-[#FEF3C7] border-2 border-[#DC2626] space-y-4 shadow-sm">
                <div className="inline-block px-2.5 py-1 rounded-[4px] bg-[#DC2626]/10 text-[#DC2626] font-anton text-sm uppercase">
                  PRESSURE LOW
                </div>
                <div className="space-y-2 text-sm">
                  <div className="text-[#451A03]"><strong>Trigger:</strong> Tyre pressure drops below safe threshold</div>
                  <div className="text-[#78350F]"><strong>Display shows:</strong> Red flashing on affected tyre + audio alert</div>
                  <div className="pt-2 border-t border-[#451A03]/10 font-bold text-[#DC2626]">Action: Pull over safely and inspect the tyre</div>
                </div>
              </div>

              {/* Alert 2 */}
              <div className="p-6 rounded-xl bg-[#FEF3C7] border-2 border-[#EA580C] space-y-4 shadow-sm">
                <div className="inline-block px-2.5 py-1 rounded-[4px] bg-[#EA580C]/10 text-[#EA580C] font-anton text-sm uppercase">
                  TEMPERATURE HIGH
                </div>
                <div className="space-y-2 text-sm">
                  <div className="text-[#451A03]"><strong>Trigger:</strong> Tyre temperature exceeds safe range (85°C+)</div>
                  <div className="text-[#78350F]"><strong>Display shows:</strong> Orange flashing + warning tone</div>
                  <div className="pt-2 border-t border-[#451A03]/10 font-bold text-[#EA580C]">Action: Reduce speed. Allow tyre to cool at next stop</div>
                </div>
              </div>

              {/* Alert 3 */}
              <div className="p-6 rounded-xl bg-[#FEF3C7] border-2 border-[#DC2626] space-y-4 shadow-sm">
                <div className="inline-block px-2.5 py-1 rounded-[4px] bg-[#DC2626]/10 text-[#DC2626] font-anton text-sm uppercase">
                  RAPID DEFLATION
                </div>
                <div className="space-y-2 text-sm">
                  <div className="text-[#451A03]"><strong>Trigger:</strong> Rapid pressure drop (puncture in progress)</div>
                  <div className="text-[#78350F]"><strong>Display shows:</strong> Red flashing + continuous urgent alarm</div>
                  <div className="pt-2 border-t border-[#451A03]/10 font-bold text-[#DC2626]">Action: Stop immediately and pull off the roadway</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Maintenance Tips */}
      <section className="py-16 sm:py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                CARE & MAINTENANCE
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                MAINTENANCE BEST PRACTICES
              </h2>
              <p className="text-[#78350F] text-lg mt-2 font-medium">
                Simple care guidelines for peak reliability.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-xl bg-[#FFFBEB] border-2 border-[#451A03]/15 shadow-sm">
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-base text-[#451A03]">
                  <span className="text-[#DC2626] font-bold mt-0.5">•</span>
                  <span>Reassign sensors to their correct wheel positions whenever tyres are rotated</span>
                </li>
                <li className="flex items-start gap-3 text-base text-[#451A03]">
                  <span className="text-[#DC2626] font-bold mt-0.5">•</span>
                  <span>If road mud accumulates on sensors, gently wipe clean with a damp cloth</span>
                </li>
                <li className="flex items-start gap-3 text-base text-[#451A03]">
                  <span className="text-[#DC2626] font-bold mt-0.5">•</span>
                  <span>Protect the in-cabin display from continuous harsh direct sunlight when parked</span>
                </li>
                <li className="flex items-start gap-3 text-base text-[#451A03]">
                  <span className="text-[#DC2626] font-bold mt-0.5">•</span>
                  <span>Replace sensors within the 3-year replacement window before batteries deplete</span>
                </li>
                <li className="flex items-start gap-3 text-base text-[#451A03]">
                  <span className="text-[#DC2626] font-bold mt-0.5">•</span>
                  <span>If you ever need assistance, send a photo via WhatsApp and our support team will guide you</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQs Section */}
      <section className="py-16 sm:py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                QUESTIONS
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                Common questions
              </h2>
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-6 rounded-xl bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  Does Suraksha work with any tyre brand?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Yes. Suraksha works with any commercial tyre brand, including JK Tyre, MRF, Apollo, CEAT, Bridgestone, Michelin, and all standard truck tyres.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  Do sensors need to be reinstalled after tyre rotation?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  No. The sensors remain on the wheels. Simply update the wheel positions on the display or swap the sensor caps to match.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  Is support available on WhatsApp?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Yes. WhatsApp support provides 24/7 automated assistance, with human specialists available during business hours. Toll-free phone support is also available.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  How many trucks can use a single kit?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Each kit is engineered for one truck. For multiple trucks, separate kits are required. Bulk fleet pricing is available via WhatsApp or our sales desk.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  Are replacement sensors available if lost or stolen?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Yes. Manufacturing defects are covered under the 3-year warranty with free replacement. For accidental physical loss or theft, individual replacement sensors can be purchased separately.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/suraksha/faqs"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] font-rubik font-bold text-base transition-all shadow-md bg-[#DC2626] text-[#FEF3C7] hover:bg-[#B91C1C]"
              >
                Read All FAQs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Ready to install CTA Band */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-5xl sm:text-6xl font-normal tracking-tight text-[#FEF3C7]">
              READY TO INSTALL?
            </h2>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/suraksha/centres"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[4px] font-rubik font-bold text-base transition-all shadow-md bg-[#FEF3C7] text-[#451A03] hover:bg-white active:scale-[0.98]"
              >
                Nearest Centre <ArrowRight className="w-4 h-4 text-[#DC2626]" />
              </Link>
              <WhatsAppCircularIcon
                href="/suraksha/whatsapp"
                size="lg"
                title="Chat on WhatsApp"
                ariaLabel="Chat on WhatsApp"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}