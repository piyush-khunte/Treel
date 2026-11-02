import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Booking Checkout — Suraksha",
  description: "Complete your booking for Treel Suraksha commercial truck TPMS safety kit.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SurakshaCheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

