import type { Metadata } from "next";
import Link from "next/link";
import { UnsubscribeForm } from "./unsubscribe-form";

export const metadata: Metadata = {
  title: "Email Preferences & Unsubscribe · Treel",
  description: "Manage your email communication preferences or unsubscribe from Treel communications.",
  alternates: {
    canonical: "https://treel.in/unsubscribe",
  },
  openGraph: {
    title: "Email Preferences & Unsubscribe · Treel",
    description: "Manage your email communication preferences or unsubscribe from Treel communications.",
    url: "https://treel.in/unsubscribe",
  },
};

export default function UnsubscribePage() {
  return (
    <div className="min-h-screen bg-[#0F1419] text-[#FAF7F2] font-inter selection:bg-[#D5573B]/20 selection:text-[#FAF7F2]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-16 border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D5573B] font-semibold">
                Communication Preferences
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Manage Your <span className="italic font-normal text-[#D5573B]">Subscriptions</span>
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed">
              We respect your inbox. Choose exactly what communications you receive from Treel, or opt out of non-essential marketing emails at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Form Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl">
            <UnsubscribeForm />

            <div className="pt-12 text-center text-xs text-[#94A3B8] space-y-2">
              <p>
                Have questions about your account data or privacy rights? Review our{" "}
                <Link href="/privacy" className="text-[#D5573B] underline underline-offset-4 hover:text-[#C2492F] transition-colors">
                  Privacy Policy
                </Link>{" "}
                or contact our Data Protection desk at{" "}
                <a href="mailto:privacy@treel.in" className="text-[#D5573B] underline underline-offset-4 hover:text-[#C2492F] transition-colors">
                  privacy@treel.in
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}