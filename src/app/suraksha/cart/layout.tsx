import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart — Suraksha Truck TPMS",
  description:
    "Review selected Treel Suraksha commercial vehicle tyre pressure monitoring kits and accessories before completing your booking.",
  alternates: {
    canonical: "https://treel.in/suraksha/cart",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function SurakshaCartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

