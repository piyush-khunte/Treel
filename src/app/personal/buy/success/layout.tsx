import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmed — Personal TPMS",
  description: "Your Treel Personal TPMS order has been placed successfully.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PersonalOrderSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

