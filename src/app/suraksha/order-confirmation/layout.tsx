import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Confirmed — Suraksha Truck TPMS",
  description: "Your Suraksha commercial truck TPMS kit booking has been placed successfully.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SurakshaOrderConfirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

