import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Secure Checkout — Personal TPMS",
  description: "Complete your order securely for Treel Personal TPMS tyre sensors and car kits.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PersonalCheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

