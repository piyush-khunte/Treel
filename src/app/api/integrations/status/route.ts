import { NextResponse } from 'next/server';
import {
  isRazorpayConfigured,
  isRazorpayEventSecretConfigured,
  isSesConfigured,
  isShiprocketConfigured,
} from '@/lib/integrations';
import { getAdminSession } from '@/lib/admin/admin-auth';
import { ADMIN_ROLE } from '@/lib/admin/admin-constants';

export async function GET() {
  // Integration configuration details are internal — admins only.
  const session = await getAdminSession();
  if (!session || session.role !== ADMIN_ROLE) {
    return NextResponse.json(
      { success: false, error: { code: 'AUTHENTICATION_FAILED', message: 'Admin authentication required.' } },
      { status: 401 }
    );
  }

  const status = {
    timestamp: new Date().toISOString(),
    integrations: {
      razorpay: {
        configured: isRazorpayConfigured(),
        eventSecretConfigured: isRazorpayEventSecretConfigured(),
        status: isRazorpayConfigured() ? 'active' : 'disabled',
        requiredEnvVars: ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET', 'RAZORPAY_WEBHOOK_SECRET'],
        missingEnvVars: [
          !process.env.RAZORPAY_KEY_ID && 'RAZORPAY_KEY_ID',
          !process.env.RAZORPAY_KEY_SECRET && 'RAZORPAY_KEY_SECRET',
          !process.env.RAZORPAY_WEBHOOK_SECRET && 'RAZORPAY_WEBHOOK_SECRET',
        ].filter(Boolean),
      },
      awsSes: {
        configured: isSesConfigured(),
        status: isSesConfigured() ? 'active' : 'disabled',
        requiredEnvVars: ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION', 'SES_FROM_EMAIL'],
        missingEnvVars: [
          !process.env.AWS_ACCESS_KEY_ID && 'AWS_ACCESS_KEY_ID',
          !process.env.AWS_SECRET_ACCESS_KEY && 'AWS_SECRET_ACCESS_KEY',
          !process.env.AWS_REGION && 'AWS_REGION',
          !process.env.SES_FROM_EMAIL && 'SES_FROM_EMAIL',
        ].filter(Boolean),
      },
      shiprocket: {
        configured: isShiprocketConfigured(),
        status: isShiprocketConfigured() ? 'active' : 'disabled',
        requiredEnvVars: ['SHIPROCKET_EMAIL', 'SHIPROCKET_PASSWORD', 'SHIPROCKET_PICKUP_LOCATION'],
        missingEnvVars: [
          !process.env.SHIPROCKET_EMAIL && 'SHIPROCKET_EMAIL',
          !process.env.SHIPROCKET_PASSWORD && 'SHIPROCKET_PASSWORD',
        ].filter(Boolean),
      },
    },
    message: 'Backend integration architecture active. Third-party live calls safely disabled pending credentials.',
  };

  return NextResponse.json(status);
}
