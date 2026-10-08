import type { Metadata } from "next";
import { ThankYouTracker } from "./thank-you-tracker";

export const metadata: Metadata = {
  title: "Thank you | Treel",
  description: "Thank you for contacting Treel. We'll be in touch soon.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://treel.in/thank-you",
  },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#0F1419] text-[#FAF7F2] flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center selection:bg-[#D5573B]/20 selection:text-[#FAF7F2]">
      <ThankYouTracker />
      <div className="w-full max-w-[800px] mx-auto flex flex-col items-center justify-center">
        {/* Checkmark Icon */}
        <svg
          className="w-[84px] h-[84px] sm:w-[92px] sm:h-[92px] mb-4 sm:mb-5 block mx-auto shrink-0"
          viewBox="0 0 96 96"
          aria-hidden="true"
        >
          <circle
            cx="48"
            cy="48"
            r="42"
            fill="none"
            stroke="#D5573B"
            strokeWidth="5"
            strokeDasharray="264"
            strokeDashoffset="0"
            className="opacity-25"
          />
          <path
            d="M30 50 L43 63 L67 36"
            fill="none"
            stroke="#D5573B"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Eyebrow */}
        <p className="text-[12px] sm:text-[13px] font-bold font-mono tracking-[0.14em] uppercase text-[#D5573B] mb-2 sm:mb-2.5">
          REQUEST RECEIVED
        </p>

        {/* Main Headline */}
        <h1 className="font-fraunces text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold text-[#FAF7F2] leading-[1.12] tracking-tight mb-3 sm:mb-4 max-w-[18em]">
          Thank you. <em className="italic text-[#D5573B] font-normal">We&apos;ll be in touch soon.</em>
        </h1>

        {/* Supporting Subtitle */}
        <p className="font-inter text-base sm:text-lg md:text-[19px] text-[#94A3B8] leading-relaxed max-w-[36em] mx-auto">
          Your details are with the Treel team. We&apos;ll reach out on the number or email you shared.
        </p>
      </div>
    </div>
  );
}