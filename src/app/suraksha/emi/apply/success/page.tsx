import type { Metadata } from "next";
import { Suspense } from "react";
import { SurakshaEmiSuccessView } from "./success-view";

export const metadata: Metadata = {
  title: "Application Received · Suraksha EMI",
  description:
    "Your Suraksha EMI application has been received. Reference number generated. Bajaj Finance will verify your details in 24–48 hours.",
  alternates: {
    canonical: "https://treel.in/suraksha/emi/apply/success",
  },
  openGraph: {
    title: "Application Received · Suraksha EMI",
    description:
      "Your Suraksha EMI application has been received. Reference number generated. Bajaj Finance will verify your details in 24–48 hours.",
    url: "https://treel.in/suraksha/emi/apply/success",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function SurakshaEmiApplySuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FEF3C7] text-[#451A03] flex items-center justify-center font-rubik p-6">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-3 border-[#DC2626] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-semibold text-[#78350F]">Loading application confirmation...</p>
          </div>
        </div>
      }
    >
      <SurakshaEmiSuccessView />
    </Suspense>
  );
}