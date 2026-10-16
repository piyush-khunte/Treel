import { Metadata } from "next";
import { getAdminSession } from "@/lib/admin/admin-auth";
import { redirect } from "next/navigation";
import { getAllSubscribers, getAllBroadcastLogs } from "@/lib/content/subscriber-storage";
import { getPublishedInsights } from "@/lib/content/insights-storage";
import { AdminSubscribersClient } from "./subscribers-client";

export const metadata: Metadata = {
  title: "Subscribers & Notifications · Treel Admin",
  description: "Manage global newsletter subscribers and Amazon SES email broadcasts.",
};

export default async function AdminSubscribersPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const [subscribers, broadcasts, publishedInsights] = await Promise.all([
    getAllSubscribers(),
    getAllBroadcastLogs(),
    getPublishedInsights(),
  ]);

  return (
    <AdminSubscribersClient
      initialSubscribers={subscribers}
      initialBroadcasts={broadcasts}
      publishedInsights={publishedInsights}
    />
  );
}

