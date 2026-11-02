import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Personal TPMS Support",
  description:
    "Get in touch with Treel customer care for technical queries, pairing help, warranty support, or purchase assistance for personal TPMS kits.",
  alternates: {
    canonical: "https://treel.in/personal/support/contact",
  },
  openGraph: {
    title: "Contact Personal TPMS Support",
    description:
      "Get in touch with Treel customer care for technical queries, pairing help, warranty support, or purchase assistance for personal TPMS kits.",
    url: "https://treel.in/personal/support/contact",
  },
};

export default function PersonalSupportContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

