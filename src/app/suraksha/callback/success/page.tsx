import type { Metadata } from "next";
import { SurakshaCallbackSuccessView } from "./success-view";

export const metadata: Metadata = {
  title: "Callback Request Received  \u00b7  Suraksha",
  description: "Your callback request has been received. Suraksha team will call you at your preferred time.",
  alternates: {
    canonical: "https://treel.in/suraksha/callback/success",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Callback Request Received  \u00b7  Suraksha",
    description: "Your callback request has been received. Suraksha team will call you at your preferred time.",
    url: "https://treel.in/suraksha/callback/success",
  },
};

export default function SurakshaCallbackSuccessPage() {
  return <SurakshaCallbackSuccessView />;
}