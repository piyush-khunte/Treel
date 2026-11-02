import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking Status — Suraksha Truck TPMS",
  description: "Booking status for your Treel Suraksha truck kit order.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SurakshaBuyFailedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

