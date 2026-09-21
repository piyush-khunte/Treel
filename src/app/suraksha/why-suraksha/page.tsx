import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Why Suraksha  \u00b7  Safety, Savings, Simplicity for Truck Owner-Drivers",
  description: "Three reasons truck owner-drivers install Suraksha. Safety for the driver. Savings for the business. Simplicity for the family. Full breakdown of each pillar.",
  alternates: {
    canonical: "https://treel.in/suraksha/why-suraksha",
  },
  openGraph: {
    title: "Why Suraksha  \u00b7  Safety, Savings, Simplicity for Truck Owner-Drivers",
    description: "Three reasons truck owner-drivers install Suraksha. Safety for the driver. Savings for the business. Simplicity for the family. Full breakdown of each pillar.",
    url: "https://treel.in/suraksha/why-suraksha",
  },
};

export default function SurakshaWhySurakshaPage() {
  return (
    <div className="bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="suraksha"
              items={[
                { label: "Suraksha", href: "/suraksha" },
                { label: "Why Suraksha" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              क्यों SURAKSHA?
            </div>
            <h1 className="font-anton uppercase tracking-wide text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#451A03] leading-[0.95]">
              तीन PROMISES.<br /><span className="italic text-[#DC2626]">THREE PILLARS.</span>
            </h1>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Safety, savings, simplicity. हर pillar deep detail में नीचे है। पढ़िए, देखिए, decide कीजिए।
            </p>
          </div>
        </div>
      </section>

      {/* Pillar 1: Safety */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl p-8 sm:p-10 rounded-lg bg-[#FFFBEB] border-3 border-[#DC2626] shadow-md space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-rubik text-xs font-bold px-3 py-1 rounded-full border border-[#DC2626]/30 bg-[#DC2626]/10 text-[#DC2626]">
                01 · SAFETY
              </span>
              <span className="text-xs font-semibold text-[#78350F]">Colour bar: Suraksha Red</span>
            </div>

            <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal text-[#451A03]">
              FRONT-TYRE BLOWOUTS, PREVENTED.
            </h2>

            <div className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
              Pillar header: Body (Hinglish narrative):
            </div>

            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-medium">
              Highway पे front-tyre blowout का मतलब क्या होता है, यह हर truck driver जानता है। Truck का control चला जाता है। Loaded truck 60 km/h पर भी manage करना मुश्किल होता है। और worst-case scenario में — परिवार को सिर्फ phone call से पता चलता है।
            </p>

            <p className="text-[#78350F] text-base leading-relaxed">
              Suraksha का job simple है: blowout होने से पहले warn करना। Cabin display हर tyre का pressure और temperature दिखाता है continuously. जब किसी tyre में slow leak होती है या temperature spike करता है — display red flash करता है, beep करता है। आप रुक सकते हैं, tyre check कर सकते हैं, safe रह सकते हैं।
            </p>

            <div className="pt-2 border-t border-[#451A03]/10">
              <div className="text-xs font-bold uppercase tracking-wider text-[#78350F] mb-3">
                Statistics that matter (English for clarity):
              </div>
              <ul className="space-y-2.5 text-sm text-[#451A03]">
                <li className="flex items-start gap-2">
                  <span className="text-[#DC2626] font-bold">•</span>
                  <span>40% of truck accidents in India involve tyre failures (source: Ministry of Road Transport & Highways data)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DC2626] font-bold">•</span>
                  <span>Front-tyre blowouts at 60+ km/h are among the deadliest single-vehicle accidents on Indian highways</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DC2626] font-bold">•</span>
                  <span>80% of tyre failures show warning signs 24-48 hours before the actual failure — signs a driver cannot see without a sensor</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <p className="text-[#451A03] text-sm font-semibold">
                The Suraksha promise: आपको warning मिलेगी 24-48 hours पहले। बस।
              </p>
            </div>

            <div className="pt-4 border-t-2 border-[#DC2626]/20 flex items-center justify-between flex-wrap gap-4">
              <div className="font-baloo text-2xl font-extrabold text-[#DC2626]">
                आपके परिवार की सुरक्षा
              </div>
              <Link
                href="/suraksha/safety"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-sm bg-[#DC2626] text-[#FEF3C7] hover:bg-[#B91C1C] transition-all shadow-md"
              >
                Safety details full में → <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 2: Savings */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl p-8 sm:p-10 rounded-lg bg-[#FEF3C7] border-3 border-[#EA580C] shadow-md space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-rubik text-xs font-bold px-3 py-1 rounded-full border border-[#EA580C]/30 bg-[#EA580C]/10 text-[#EA580C]">
                02 · SAVINGS
              </span>
              <span className="text-xs font-semibold text-[#78350F]">Colour bar: Marigold</span>
            </div>

            <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal text-[#451A03]">
              NINE MONTHS में पूरी कीमत वापस।
            </h2>

            <div className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
              Pillar header: Body (Hinglish narrative):
            </div>

            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-medium">
              Business perspective से देखें, तो Suraksha का ROI simple है। 10-wheeler truck configuration में ₹17,500 लगते हैं। Nine months में पूरी कीमत वापस।
            </p>

            <p className="text-[#78350F] text-base font-semibold">
              यह पैसा आता कहाँ से है?
            </p>

            <div className="space-y-3 text-sm text-[#451A03]">
              <p>
                <strong>Fuel savings (5-6%):</strong> Underinflated tyres 5-6% extra fuel consume करते हैं। Suraksha के साथ tyres हमेशा optimal pressure पे रहते हैं। एक 10-wheeler truck में monthly fuel expense ₹80,000-₹1,20,000 होता है — 5% savings मतलब ₹4,000-₹6,000 per month.
              </p>
              <p>
                <strong>Tyre life extension (5-7%):</strong> Correct pressure पे tyres 5-7% ज़्यादा चलते हैं। एक set tyres की cost ₹2,00,000-₹3,50,000 होती है। 5-7% extension मतलब thousands की savings हर tyre cycle में।
              </p>
              <p>
                <strong>Roadside towing (per event ₹5,000-₹15,000):</strong> हर blowout मतलब towing charge, downtime, missed delivery. एक roadside event save करना मतलब kit का half cost recover.
              </p>
            </div>

            <div className="pt-2 border-t border-[#451A03]/10">
              <div className="text-xs font-bold uppercase tracking-wider text-[#78350F] mb-3">
                Nine-month payback calculation:
              </div>
              <ul className="space-y-2 text-sm text-[#451A03]">
                <li className="flex items-start gap-2">
                  <span className="text-[#EA580C] font-bold">•</span>
                  <span>Fuel savings: ₹4,000-₹6,000 per month × 9 = ₹36,000-₹54,000</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#EA580C] font-bold">•</span>
                  <span>Tyre life extension: Proportional to km driven, typically ₹1,500-₹3,000 per month</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#EA580C] font-bold">•</span>
                  <span>Downtime avoidance: Variable, but 1-2 events per year is realistic</span>
                </li>
              </ul>
            </div>

            <p className="text-sm font-semibold text-[#451A03]">
              Total 9-month savings: Typically ₹40,000-₹70,000 vs kit cost of ₹17,500.
            </p>

            <div className="pt-4 border-t-2 border-[#EA580C]/20 flex items-center justify-between flex-wrap gap-4">
              <div className="font-baloo text-3xl font-extrabold text-[#DC2626]">
                पैसा वसूल
              </div>
              <Link
                href="/suraksha/savings"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-sm bg-[#EA580C] text-[#FEF3C7] hover:bg-[#C2410C] transition-all shadow-md"
              >
                Savings details full में → <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 3: Simplicity */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl p-8 sm:p-10 rounded-lg bg-[#FFFBEB] border-3 border-[#0891B2] shadow-md space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-rubik text-xs font-bold px-3 py-1 rounded-full border border-[#0891B2]/30 bg-[#0891B2]/10 text-[#0891B2]">
                03 · SIMPLICITY
              </span>
              <span className="text-xs font-semibold text-[#78350F]">Colour bar: Ganga Teal</span>
            </div>

            <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal text-[#451A03]">
              PUNCTURE SHOP पे FIT करो, CABIN में देखो।
            </h2>

            <div className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
              Pillar header: Body (Hinglish narrative):
            </div>

            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-medium">
              सबसे बड़ी बात: Suraksha simple है। कोई app नहीं। कोई subscription नहीं। कोई monthly fee नहीं। किसी mechanic की ज़रूरत नहीं।
            </p>

            <p className="text-[#78350F] text-base leading-relaxed">
              Kit खरीदिए — Truck Wheels centre या WhatsApp पर। Fit करवाइए — किसी भी puncture shop पे, 15 minute में। देखते रहिए — cabin display हर drive पे pressure और temperature दिखाता है।
            </p>

            <div className="pt-2 border-t border-[#451A03]/10">
              <div className="text-xs font-bold uppercase tracking-wider text-[#78350F] mb-3">
                क्या नहीं करना:
              </div>
              <ul className="space-y-2 text-sm text-[#451A03]">
                <li className="flex items-start gap-2">
                  <span className="text-[#0891B2] font-bold">•</span>
                  <span><strong>कोई app download नहीं करना</strong> — cabin display standalone है</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0891B2] font-bold">•</span>
                  <span><strong>कोई WiFi connection नहीं चाहिए</strong> — RF-based communication use होती है</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0891B2] font-bold">•</span>
                  <span><strong>कोई mechanic नहीं चाहिए</strong> — puncture shop वाला भी fit कर देता है</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0891B2] font-bold">•</span>
                  <span><strong>कोई tyre brand restriction नहीं</strong> — किसी भी tyre के साथ काम करता है</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0891B2] font-bold">•</span>
                  <span><strong>कोई monthly fee नहीं</strong> — one-time purchase, done</span>
                </li>
              </ul>
            </div>

            <div className="inline-block px-3 py-1 rounded-[4px] bg-[#0891B2]/10 border border-[#0891B2]/30 text-[#0891B2] font-rubik text-xs font-bold">
              No monthly fees. No app needed.
            </div>

            <p className="text-[#78350F] text-sm leading-relaxed">
              Real drivers का experience: हर महीने hundreds of trucks पे Suraksha install हो रहा है India के different clusters में। सभी installations puncture shops या Truck Wheels centres पे। Zero training required. Zero complications.
            </p>

            <div className="pt-4 border-t-2 border-[#0891B2]/20 flex items-center justify-between flex-wrap gap-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0891B2]">
                SIMPLICITY GUARANTEED
              </div>
              <Link
                href="/suraksha/simplicity"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-sm bg-[#0891B2] text-[#FEF3C7] hover:bg-[#0E7490] transition-all shadow-md"
              >
                Simplicity details full में → <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Band */}
      <section className="py-20 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FEF3C7]">
              तीन REASONS. एक KIT.<br />सिर्फ ₹17,500.
            </h2>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/suraksha/centres"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[4px] font-rubik font-bold text-base transition-all shadow-md bg-[#FEF3C7] text-[#451A03] hover:bg-white active:scale-[0.98]"
              >
                Nearest Centre <ArrowRight className="w-4 h-4 text-[#DC2626]" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}