import type { Metadata } from "next";
import Link from "next/link";
import { 
  Phone, 
  Smartphone, 
  Mail, 
  Users, 
  MapPin, 
  Clock, 
  ExternalLink,
  ShieldCheck
} from "lucide-react";
import { CorporateContactForm } from "./contact-form";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Contact Treel · Get in Touch",
  description: "Contact Treel Mobility Solutions. Enterprise sales, media inquiries, partnerships, general questions. Toll-free 1800 833 0233 or email hello@treel.in.",
  alternates: {
    canonical: "https://treel.in/contact",
  },
  openGraph: {
    title: "Contact Treel · Get in Touch",
    description: "Contact Treel Mobility Solutions. Enterprise sales, media inquiries, partnerships, general questions. Toll-free 1800 833 0233 or email hello@treel.in.",
    url: "https://treel.in/contact",
  },
};

export default function ContactPage() {
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
            <Breadcrumb
              variant="corporate"
              items={[
                { label: "Home", href: "/" },
                { label: "Contact" },
              ]}
            />
            <div className="flex items-center gap-3">
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                CONTACT
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              Get in touch.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              Whether you&apos;re evaluating TMIP for your fleet, planning coverage of Treel, exploring a partnership, or just want to reach us — start here.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form & Direct Contact Block */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Form Section */}
            <div className="lg:col-span-7 bg-white/[0.03] border border-white/[0.08] rounded-lg p-8 sm:p-10 space-y-8 shadow-xl">
              <div className="space-y-3">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium tracking-tight text-[#FAF7F2]">
                  Send us a note
                </h2>
                <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed font-inter">
                  Fill out the form and we&apos;ll route your message to the right team. Response time varies by subject: enterprise inquiries within 4 business hours, media within 1 business day, everything else within 2 business days.
                </p>
              </div>

              <CorporateContactForm />
            </div>

            {/* Right Column: Direct Contact & Business Hours */}
            <div className="lg:col-span-5 space-y-8">
              {/* Direct Contact Block */}
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-8 space-y-6 shadow-sm">
                <h2 className="font-fraunces text-2xl font-medium tracking-tight text-[#FAF7F2]">
                  Or reach us directly
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Tile 1 · Toll-free */}
                  <a
                    href="tel:+918008330233"
                    className="p-5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 group block"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] mb-3 group-hover:scale-105 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-jetbrains font-mono uppercase tracking-wider text-[#94A3B8]">
                      Toll-Free (India)
                    </div>
                    <div className="text-base font-semibold text-[#FAF7F2] mt-1 group-hover:text-[#D5573B] transition-colors">
                      1800 833 0233
                    </div>
                  </a>

                  {/* Tile 2 · Mobile */}
                  <a
                    href="tel:+919112000174"
                    className="p-5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 group block"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] mb-3 group-hover:scale-105 transition-transform">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-jetbrains font-mono uppercase tracking-wider text-[#94A3B8]">
                      Mobile
                    </div>
                    <div className="text-base font-semibold text-[#FAF7F2] mt-1 group-hover:text-[#D5573B] transition-colors">
                      +91 91120 00174
                    </div>
                  </a>

                  {/* Tile 3 · Email */}
                  <a
                    href="mailto:hello@treel.in"
                    className="p-5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 group block"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] mb-3 group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-jetbrains font-mono uppercase tracking-wider text-[#94A3B8]">
                      General inquiries
                    </div>
                    <div className="text-base font-semibold text-[#FAF7F2] mt-1 group-hover:text-[#D5573B] transition-colors">
                      hello@treel.in
                    </div>
                  </a>

                  {/* Tile 4 · Careers */}
                  <Link
                    href="/careers"
                    className="p-5 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 group block"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] mb-3 group-hover:scale-105 transition-transform">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-jetbrains font-mono uppercase tracking-wider text-[#94A3B8]">
                      Careers
                    </div>
                    <div className="text-base font-semibold text-[#FAF7F2] mt-1 group-hover:text-[#D5573B] transition-colors">
                      See open roles →
                    </div>
                  </Link>
                </div>
              </div>

              {/* Business Hours Block */}
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-8 space-y-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B]">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                    Business hours
                  </h3>
                </div>
                <p className="text-[#94A3B8] text-sm leading-relaxed font-inter">
                  Monday to Friday, 8:00 AM to 8:00 PM IST.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Address Section */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-3">
              <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2]">
                Visit us
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
              {/* Address Card */}
              <div className="md:col-span-6 bg-white/[0.03] border border-white/[0.08] rounded-lg p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B]">
                    <MapPin className="w-5 h-5" />
                  </div>

                  <div className="space-y-1 text-sm sm:text-base text-[#94A3B8] font-inter leading-relaxed">
                    <p className="font-semibold text-[#FAF7F2] text-base sm:text-lg">Treel Mobility Solutions Private Limited</p>
                    <p>S.No. 6/1B, 6/4, 7/4, Plot No. 02</p>
                    <p>Laxmi Vishnupuram Amenities Business</p>
                    <p>NDA Road, Village Shivane</p>
                    <p>Tal. Haveli, Pune</p>
                    <p>Maharashtra 411023</p>
                    <p>India</p>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href="https://maps.app.goo.gl/VjJUeqtM8iBgHsXH8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] font-semibold text-sm transition-all shadow-sm bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831]"
                  >
                    <span>Get directions</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Map Embed / Location Card */}
              <div className="md:col-span-6 bg-white/[0.03] border border-white/[0.08] rounded-lg overflow-hidden min-h-[300px] relative flex flex-col justify-between p-8">
                <div className="space-y-2">
                  <div className="text-xs font-jetbrains font-mono uppercase tracking-wider text-[#D5573B] font-semibold">
                    Headquarters Location
                  </div>
                  <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                    Pune Technology Hub
                  </h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Conveniently situated off NDA Road in Shivane, Pune, connecting engineering, hardware validation, and global operations.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <a
                    href="https://maps.app.goo.gl/VjJUeqtM8iBgHsXH8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-jetbrains font-mono text-[#D5573B] hover:underline flex items-center gap-1.5 font-semibold"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
