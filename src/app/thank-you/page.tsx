import type { Metadata } from "next";
import { Suspense } from "react";
import { ThankYouClientView } from "./thank-you-client-view";

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
    <Suspense fallback={<div className="min-h-screen bg-[#0F1419]" />}>
      <ThankYouClientView />
    </Suspense>
  );
}