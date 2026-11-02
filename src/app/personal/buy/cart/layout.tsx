import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart — Personal TPMS",
  description:
    "Review your selected Treel TPMS sensors, car kits, and accessories before proceeding to secure checkout.",
  alternates: {
    canonical: "https://treel.in/personal/buy/cart",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function PersonalBuyCartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

