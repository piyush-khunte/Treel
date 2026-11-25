import { NextRequest, NextResponse } from 'next/server';
import {
  isSesConfigured,
  sendContactLeadEmail,
  sendEmail,
  sendOrderConfirmationEmail,
  sendPaymentReceiptEmail,
  sendShippingNotificationEmail,
  sendSupportAcknowledgementEmail,
  sendNewsletterWelcomeEmail,
} from '@/lib/integrations';
import { getAdminSession } from '@/lib/admin/admin-auth';
import { ADMIN_ROLE } from '@/lib/admin/admin-constants';

/**
 * This endpoint can send arbitrary email through Treel's SES identity, so it is
 * restricted to authenticated admins. Public forms send their own emails server-side.
 */
async function requireAdmin(): Promise<NextResponse | null> {
  const session = await getAdminSession();
  if (!session || session.role !== ADMIN_ROLE) {
    return NextResponse.json(
      { success: false, error: { code: 'AUTHENTICATION_FAILED', message: 'Admin authentication required.' } },
      { status: 401 }
    );
  }
  return null;
}

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const configured = isSesConfigured();
  return NextResponse.json({
    service: 'aws-ses',
    configured,
    status: configured ? 'active' : 'disabled',
    message: configured
      ? 'AWS SES credentials configured.'
      : 'AWS SES integration disabled: missing AWS credentials.',
  });
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  if (!isSesConfigured()) {
    return NextResponse.json(
      {
        success: false,
        configured: false,
        error: {
          code: 'SERVICE_NOT_CONFIGURED',
          message: 'AWS SES email service is currently disabled. Server credentials are not configured.',
        },
      },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();

    // Check for typed transactional requests
    if (body.type === 'contact_lead') {
      const result = await sendContactLeadEmail(body.data, body.recipientEmail);
      return NextResponse.json(result, { status: result.success ? 200 : 400 });
    }

    if (body.type === 'order_confirmation') {
      const result = await sendOrderConfirmationEmail(body.data);
      return NextResponse.json(result, { status: result.success ? 200 : 400 });
    }

    if (body.type === 'payment_receipt') {
      const result = await sendPaymentReceiptEmail(body.data);
      return NextResponse.json(result, { status: result.success ? 200 : 400 });
    }

    if (body.type === 'shipping_notification') {
      const result = await sendShippingNotificationEmail(body.data);
      return NextResponse.json(result, { status: result.success ? 200 : 400 });
    }

    if (body.type === 'support_acknowledgement') {
      const result = await sendSupportAcknowledgementEmail(body.data);
      return NextResponse.json(result, { status: result.success ? 200 : 400 });
    }

    if (body.type === 'newsletter_welcome') {
      const result = await sendNewsletterWelcomeEmail(body.data);
      return NextResponse.json(result, { status: result.success ? 200 : 400 });
    }

    // Default: raw email payload
    const result = await sendEmail(body);
    const status = result.success ? 200 : result.error?.code === 'SERVICE_NOT_CONFIGURED' ? 503 : 400;
    return NextResponse.json(result, { status });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Invalid request payload';
    return NextResponse.json(
      {
        success: false,
        configured: true,
        error: {
          code: 'VALIDATION_ERROR',
          message,
        },
      },
      { status: 400 }
    );
  }
}
