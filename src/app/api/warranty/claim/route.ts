import { NextRequest, NextResponse } from "next/server";
import { submitWarrantyClaimSubmission } from "@/lib/content/warranty-storage";
import { isSesConfigured, sendWarrantyClaimConfirmationEmail } from "@/lib/integrations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request payload format." },
        { status: 400 }
      );
    }

    const orderId = (body.orderId || body.order_id || "").trim();
    const customerEmail = (body.customerEmail || body.email || "").trim().toLowerCase();
    const claimIssueType = (body.claimIssueType || body.issueType || "Sensor not working").trim();
    const claimDescription = (body.claimDescription || body.description || body.message || "").trim();
    const claimResolution = (body.claimResolution || body.resolution || "Replacement").trim();
    const customerName = (body.customerName || body.name || "").trim();
    const customerPhone = (body.customerPhone || body.phone || "").trim();

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Order ID is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail || !emailRegex.test(customerEmail)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!claimDescription) {
      return NextResponse.json(
        { success: false, error: "Please provide a brief description of the issue." },
        { status: 400 }
      );
    }

    const res = await submitWarrantyClaimSubmission({
      orderId,
      customerEmail,
      claimIssueType,
      claimDescription,
      claimResolution,
      customerName: customerName || undefined,
      customerPhone: customerPhone || undefined,
    });

    if (!res.success || !res.data) {
      return NextResponse.json(
        { success: false, error: res.error || "Failed to record warranty claim." },
        { status: 500 }
      );
    }

    // Dispatch confirmation email from hello@treel.in to customer
    if (isSesConfigured() && res.data) {
      try {
        await sendWarrantyClaimConfirmationEmail({
          claimId: res.data.registrationId,
          orderId: res.data.orderId,
          customerName: res.data.customerName || customerName || "Customer",
          customerEmail: res.data.customerEmail,
          customerPhone: res.data.customerPhone || customerPhone,
          claimIssueType: res.data.claimIssueType || claimIssueType,
          claimDescription: res.data.claimDescription || claimDescription,
        });
      } catch (mailErr) {
        console.warn("[Warranty Claim] Confirmation email error:", mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      data: res.data,
      claimId: res.data.registrationId,
      message: "Warranty claim submitted successfully.",
    });
  } catch (err: any) {
    console.error("API /api/warranty/claim error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal server error during claim submission." },
      { status: 500 }
    );
  }
}

