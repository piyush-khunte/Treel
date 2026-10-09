import { redirect } from "next/navigation";

export default function SurakshaBuySuccessRedirect(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // In Next.js App Router, forward query params to /suraksha/order-confirmation
  redirect("/suraksha/order-confirmation");
}
