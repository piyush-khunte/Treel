import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Pending — Personal TPMS",
  description: "Payment status for your Treel Personal TPMS order.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PersonalOrderFailedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

