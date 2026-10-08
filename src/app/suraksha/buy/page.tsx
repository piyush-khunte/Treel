import type { Metadata } from "next";
import { Suspense } from "react";
import SurakshaBuyClient from "./buy-client";

export const metadata: Metadata = {
  title: "Get Suraksha · Commercial Truck TPMS Safety Kit · ₹1,700/Tyre",
  description:
    "Order your Treel Suraksha truck tyre safety kit online. ₹1,700 per tyre with in-cab display, ARAI certified sensors, 3-year warranty and free express delivery across India.",
  alternates: {
    canonical: "https://treel.in/suraksha/buy",
  },
  openGraph: {
    title: "Get Suraksha · Commercial Truck TPMS Safety Kit · ₹1,700/Tyre",
    description:
      "Order your Treel Suraksha truck tyre safety kit online. ₹1,700 per tyre with in-cab display, ARAI certified sensors, 3-year warranty and free express delivery across India.",
    url: "https://treel.in/suraksha/buy",
  },
};

export default function SurakshaBuyPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#FEF3C7] text-[#451A03] font-rubik min-h-screen py-24 flex items-center justify-center">
          <div className="animate-pulse text-lg font-bold">Loading Suraksha Kit Configurator...</div>
        </div>
      }
    >
      <SurakshaBuyClient />
    </Suspense>
  );
}
