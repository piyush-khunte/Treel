import type { Metadata } from "next";
import { Suspense } from "react";
import SurakshaBuyClient from "./buy-client";

export const metadata: Metadata = {
  title: "Get Suraksha · Commercial Truck TPMS Safety Kit · ₹1,700/Tyre",
  description:
    "Order your Treel Suraksha truck tyre safety kit online. ₹1,700 per tyre with in-cab display, ARAI sensors, 3-year warranty and express delivery in India.",
  alternates: {
    canonical: "https://treel.in/suraksha/buy",
  },
  openGraph: {
    title: "Get Suraksha · Commercial Truck TPMS Safety Kit · ₹1,700/Tyre",
    description:
      "Order your Treel Suraksha truck tyre safety kit online. ₹1,700 per tyre with in-cab display, ARAI sensors, 3-year warranty and express delivery in India.",
    url: "https://treel.in/suraksha/buy",
  },
};

export default function SurakshaBuyPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#FEF3C7] text-[#451A03] font-rubik min-h-screen py-24 px-6 flex flex-col items-center justify-center text-center">
          <h1 className="font-anton text-4xl sm:text-5xl text-[#451A03] uppercase mb-3">
            Buy Treel Suraksha Truck TPMS Safety Kit
          </h1>
          <p className="text-[#78350F] text-base max-w-xl mb-6">
            Transparent commercial vehicle pricing at ₹1,700 per tyre with in-cab display and 3-year warranty.
          </p>
          <div className="animate-pulse text-sm font-bold">Loading Suraksha Kit Configurator...</div>
        </div>
      }
    >
      <SurakshaBuyClient />
    </Suspense>
  );
}
