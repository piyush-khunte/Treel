import { redirect } from "next/navigation";

export default function SurakshaBuySuccessRedirect() {
  // In Next.js App Router, forward query params to /suraksha/order-confirmation
  redirect("/suraksha/order-confirmation");
}
