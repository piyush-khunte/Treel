import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Share2, ShoppingCart, CheckCircle2, ShieldCheck } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

interface ArticleData {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  deck: string;
  paragraphs: string[];
  keyTakeaways: string[];
}

const ARTICLES: Record<string, ArticleData> = {
  "why-factory-tpms-isnt-enough": {
    slug: "why-factory-tpms-isnt-enough",
    title: "Why Your Car's Factory TPMS Isn't Enough for Indian Roads",
    category: "Road Safety",
    readTime: "4 min read",
    date: "12 Sep 2026",
    author: "Treel Automotive Team",
    authorRole: "Vehicle Telemetry & Road Safety Desk",
    deck: "Most OEM indirect TPMS systems only illuminate an alert icon after pressure drops 25% below placard. Discover why continuous real-time telemetry changes roadside safety.",
    paragraphs: [
      "Most modern passenger cars sold in India come equipped with what manufacturers call 'indirect TPMS'. Unlike dedicated wireless sensor systems, indirect TPMS does not actually measure tyre air pressure. Instead, it estimates rotational speed differences through the ABS wheel speed sensors.",
      "By the time an indirect system illuminates a warning on your dashboard, your tyre has often lost between 20% and 30% of its recommended pressure. At highway speeds—such as 100 to 120 km/h on the Mumbai-Pune Expressway or Samruddhi Mahamarg—driving on a tyre with 22 PSI instead of 32 PSI leads to severe sidewall overheating and dangerous blowout risks.",
      "Treel Personal TPMS utilizes direct BLE 5.0 valve sensors with sub-second accuracy. Every 3 seconds, actual numeric pressure (accurate to ±0.5 PSI) and temperature (accurate to ±1°C) are beamed directly to your smartphone and smartwatch, giving you true early warnings before heat builds up."
    ],
    keyTakeaways: [
      "Indirect factory TPMS cannot display live numeric PSI or internal air temperature.",
      "Underinflated tyres heat up rapidly at highway speeds, accelerating tread separation.",
      "Direct Treel BLE sensors detect micro-punctures within seconds of picking up a nail."
    ]
  },
  "how-to-check-tyre-pressure-correctly": {
    slug: "how-to-check-tyre-pressure-correctly",
    title: "How to Check Tyre Pressure the Right Way (With or Without TPMS)",
    category: "How-To Guides",
    readTime: "5 min read",
    date: "08 Sep 2026",
    author: "Karan Verma",
    authorRole: "Senior Automotive Specialist",
    deck: "Cold vs hot pressure calibration, seasonal variations in Indian weather, and avoiding common gas station digital meter misreadings.",
    paragraphs: [
      "A common mistake made by Indian drivers is checking tyre pressure after driving several kilometres to a fuel station. Friction against the tarmac and internal air compression raise tyre temperature, which artificially inflates pressure by 3 to 6 PSI.",
      "If you fill air into a warm tyre up to your vehicle's placard rating (e.g. 32 PSI), once the tyre cools down overnight, the true pressure will drop to 27 PSI, leaving your vehicle severely underinflated for the next morning's drive.",
      "Always measure pressure when tyres are cold (having rested for at least 3 hours or driven less than 1.5 km at low speed). With Treel TPMS, you can simply open your mobile app before starting the engine and view cold PSI across all 4 tyres from the comfort of your living room."
    ],
    keyTakeaways: [
      "Always calibrate tyre pressure cold before starting your journey.",
      "Petrol pump digital gauges frequently suffer calibration drift of up to 4–5 PSI.",
      "Continuous wireless sensors eliminate manual checking with dirty valve stems."
    ]
  },
  "monsoon-tyre-care-guide": {
    slug: "monsoon-tyre-care-guide",
    title: "Monsoon Tyre Care: What to Watch for and When",
    category: "Tyre Care",
    readTime: "6 min read",
    date: "01 Sep 2026",
    author: "Aditi Rao",
    authorRole: "Automotive Safety Operations",
    deck: "Waterlogging, aquaplaning risks, and why proper tread depth combined with accurate PSI prevents dangerous highway skids during Indian monsoons.",
    paragraphs: [
      "Monsoons in India transform highways into unpredictable water channels. Aquaplaning occurs when water builds up between your tyre and the road surface faster than the tread grooves can evacuate it, causing the car to hydroplane uncontrollably.",
      "While tread depth is critical, tyre pressure is equally decisive. An underinflated tyre has a collapsed center contact patch, reducing water evacuation channels and causing hydroplaning at speeds as low as 60 km/h.",
      "Maintaining the exact manufacturer-recommended PSI ensures that the tyre tread grooves remain wide open and rigid, channeling liters of standing water away from the contact patch every second."
    ],
    keyTakeaways: [
      "Minimum recommended wet-weather tread depth is 3mm for highway driving.",
      "Under-inflation reduces water evacuation channel width by up to 35%.",
      "Real-time pressure telemetry ensures optimal contact footprint in heavy downpours."
    ]
  },
  "cost-of-driving-underinflated-tyres": {
    slug: "cost-of-driving-underinflated-tyres",
    title: "The Real Cost of Driving on Underinflated Tyres in India",
    category: "Tyre Care",
    readTime: "3 min read",
    date: "24 Aug 2026",
    author: "Treel Engineering",
    authorRole: "Telematics & Energy Research",
    deck: "How a 4 PSI pressure drop costs an Indian car owner up to ₹14,000 in premature tread wear and wasted fuel efficiency every single year.",
    paragraphs: [
      "Every 3 PSI drop below recommended pressure increases rolling resistance by approximately 6%, which directly translates to a 2% to 3% penalty on fuel economy.",
      "For a typical Indian commuter driving 15,000 km annually with fuel costs of ₹1,00,000, under-inflation quietly wastes ₹3,000 to ₹5,000 in excess petrol or diesel.",
      "Even more substantial is tyre lifespan reduction: shoulder wear accelerates drastically on underinflated tyres, reducing tyre life from 50,000 km to under 35,000 km. Replacing a set of four premium passenger tyres prematurely adds ₹20,000 to ₹40,000 in unexpected ownership expenses."
    ],
    keyTakeaways: [
      "4 PSI underinflation burns 2.5% more fuel on daily city and highway commutes.",
      "Accelerated shoulder scrubbing reduces usable tyre life by 25–30%.",
      "Personal TPMS pays for itself within 12 to 18 months through fuel and tyre longevity."
    ]
  },
  "highway-tyre-safety-thermal-science": {
    slug: "highway-tyre-safety-thermal-science",
    title: "Highway Tyre Safety: Temperature, Pressure, and Blowout Science",
    category: "Road Safety",
    readTime: "5 min read",
    date: "18 Aug 2026",
    author: "Dr. Sandeep Nair",
    authorRole: "Materials & Sensor Telemetry Lead",
    deck: "Understanding heat buildup inside radial tyres at triple-digit speeds on concrete expressways like Samruddhi Mahamarg and Delhi-Mumbai Expressway.",
    paragraphs: [
      "Modern high-speed concrete expressways in India generate intense frictional heat during summer and peak daytime hours. When an underinflated tyre flexes repeatedly at 120 km/h, the rubber compound and steel belts experience continuous mechanical hysteresis.",
      "Internal air temperatures can easily climb above 85°C. At this temperature, the bonding vulcanization between the rubber tread and internal steel belts weakens rapidly, dramatically escalating the probability of sudden tread de-lamination.",
      "Treel TPMS provides continuous internal chamber temperature monitoring. If tyre temperature exceeds safe operating thresholds (typically >75°C), the driver receives immediate audio and visual warnings to reduce speed and take a rest stop before a blowout occurs."
    ],
    keyTakeaways: [
      "Hysteresis in underinflated tyre sidewalls generates dangerous internal heat at 100+ km/h.",
      "Concrete expressways increase tyre operating temperatures by 12–18°C over asphalt.",
      "Continuous thermal telemetry provides an early warning buffer before catastrophic blowouts."
    ]
  },
  "app-update-apple-watch-widgets": {
    slug: "app-update-apple-watch-widgets",
    title: "Treel Care Mobile App v2.4: Apple Watch & Widget Upgrades",
    category: "Product Updates",
    readTime: "2 min read",
    date: "10 Aug 2026",
    author: "Treel Mobile Team",
    authorRole: "iOS & Android Engineering",
    deck: "Discover the new haptic feedback complications on Apple Watch, dark mode refinements, and one-tap CSV drive telemetry export.",
    paragraphs: [
      "We are excited to announce Treel Care App v2.4, now live on both the Apple App Store and Google Play Store. This update brings full Apple Watch complication support, allowing drivers to check all 4 tyre pressures with a single glance at their wrist.",
      "The new iOS 18 Home Screen and Lock Screen widgets provide instantaneous tyre status before you even step into your car. If any tyre is below 28 PSI, the widget icon tints amber with the exact deficit indicated.",
      "For motorsport enthusiasts and long-distance road trippers, v2.4 introduces high-frequency telemetry CSV export, logging speed, ambient heat, and tyre pressure variations across your journey."
    ],
    keyTakeaways: [
      "Live Apple Watch complications with custom haptic pressure drop alerts.",
      "Lock screen widgets for one-second pre-drive pressure verification.",
      "Telemetry CSV export for fleet tracking and performance enthusiasts."
    ]
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return { title: "Article Not Found · Treel Personal TPMS" };

  return {
    title: `${article.title} · Treel Personal TPMS Blog`,
    description: article.deck,
    alternates: {
      canonical: `https://treel.in/personal/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.deck,
      url: `https://treel.in/personal/blog/${article.slug}`,
    },
  };
}

export default async function PersonalArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES[slug];

  if (!article) {
    notFound();
  }

  const otherArticles = Object.values(ARTICLES).filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Header / Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 border-b border-black/[0.06] bg-gradient-to-b from-white to-[#F3F4F6]/60">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-10 space-y-6">
          <Breadcrumb
            variant="personal"
            items={[
              { label: "Personal TPMS", href: "/personal" },
              { label: "Blog", href: "/personal/blog" },
              { label: article.category },
            ]}
          />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
            {article.category}
          </div>

          <h1 className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827] leading-[1.15]">
            {article.title}
          </h1>

          <p className="text-[#4B5563] text-lg sm:text-xl leading-relaxed font-manrope font-medium">
            {article.deck}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B7280] font-semibold pt-2 border-t border-black/[0.06]">
            <span className="flex items-center gap-1.5 text-[#111827]">
              <User className="w-3.5 h-3.5 text-[#2563EB]" /> {article.author} · {article.authorRole}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#2563EB]" /> {article.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#2563EB]" /> {article.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="py-16 bg-white">
        <div className="max-w-[840px] mx-auto px-6 sm:px-10 space-y-8">
          {/* Key Takeaways Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F9FAFB] border border-black/[0.08] space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#2563EB]">
              <ShieldCheck className="w-4 h-4" />
              <span>Key Takeaways</span>
            </div>
            <ul className="space-y-2.5">
              {article.keyTakeaways.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#374151]">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Paragraphs */}
          <div className="space-y-6 text-base sm:text-lg text-[#374151] leading-relaxed">
            {article.paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Back to Blog & Purchase CTA */}
          <div className="pt-12 border-t border-black/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/personal/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> Back to all articles
            </Link>

            <Link
              href="/personal/buy"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2563EB] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#1D4ED8] transition-all shadow-md"
            >
              <ShoppingCart className="w-4 h-4" /> Buy Personal TPMS (₹8,999)
            </Link>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {otherArticles.length > 0 && (
        <section className="py-16 bg-[#F9FAFB] border-t border-black/[0.06]">
          <div className="max-w-[1000px] mx-auto px-6 sm:px-10 space-y-8">
            <h3 className="text-xl font-extrabold text-[#111827]">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/personal/blog/${rel.slug}`}
                  className="p-6 rounded-2xl bg-white border border-black/[0.06] hover:border-[#2563EB]/40 hover:shadow-md transition-all space-y-3 group block"
                >
                  <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
                    {rel.category} · {rel.readTime}
                  </span>
                  <h4 className="text-lg font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-[#6B7280] line-clamp-2">
                    {rel.deck}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
