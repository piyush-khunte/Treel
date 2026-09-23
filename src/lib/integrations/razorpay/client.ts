import crypto from 'crypto';
import { IntegrationResult } from '../common/types';
import {
  RazorpayOrder,
  RazorpayOrderOptions,
  RazorpayPaymentVerificationInput,
  RazorpayPaymentVerificationResult,
  RazorpayWebhookVerificationInput,
} from './types';

/**
 * Checks whether Razorpay credentials are fully configured in the server environment.
 * Never exposes credentials to client-side code.
 */
export function isRazorpayConfigured(): boolean {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  return Boolean(keyId && keySecret && keyId.trim().length > 0 && keySecret.trim().length > 0);
}

/**
 * Checks whether Razorpay webhook secret is configured.
 */
export function isRazorpayWebhookConfigured(): boolean {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  return Boolean(webhookSecret && webhookSecret.trim().length > 0);
}

/**
 * Creates a Razorpay order via the Razorpay Orders REST API.
 * Safely returns SERVICE_NOT_CONFIGURED if credentials are not configured.
 */
export async function createRazorpayOrder(
  options: RazorpayOrderOptions
): Promise<IntegrationResult<RazorpayOrder>> {
  if (!isRazorpayConfigured()) {
    return {
      success: false,
      configured: false,
      error: {
        code: 'SERVICE_NOT_CONFIGURED',
        message: 'Razorpay integration is currently disabled: RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are not configured.',
      },
    };
  }

  const keyId = process.env.RAZORPAY_KEY_ID!;
  const keySecret = process.env.RAZORPAY_KEY_SECRET!;

  // Validate amount
  if (!options.amount || options.amount <= 0) {
    return {
      success: false,
      configured: true,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid order amount specified. Amount must be greater than zero.',
      },
    };
  }

  try {
    const authHeader = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify({
        amount: Math.round(options.amount), // Amount in paise
        currency: options.currency || 'INR',
        receipt: options.receipt,
        notes: options.notes,
        partial_payment: options.partial_payment || false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        configured: true,
        error: {
          code: 'EXTERNAL_API_ERROR',
          message: errorData?.error?.description || `Razorpay order creation failed with status ${response.status}`,
          details: errorData,
        },
      };
    }

    const orderData = (await response.json()) as RazorpayOrder;
    return {
      success: true,
      configured: true,
      data: orderData,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown network error while contacting Razorpay';
    return {
      success: false,
      configured: true,
      error: {
        code: 'EXTERNAL_API_ERROR',
        message,
      },
    };
  }
}

/**
 * Verifies Razorpay payment signature using HMAC SHA256.
 * Uses timing-safe string comparison to prevent timing attacks.
 */
export function verifyPaymentSignature(
  input: RazorpayPaymentVerificationInput
): IntegrationResult<RazorpayPaymentVerificationResult> {
  if (!isRazorpayConfigured()) {
    return {
      success: false,
      configured: false,
      error: {
        code: 'SERVICE_NOT_CONFIGURED',
        message: 'Razorpay integration is currently disabled: RAZORPAY_KEY_SECRET is not configured.',
      },
    };
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = input;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return {
      success: false,
      configured: true,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Missing required payment verification fields (order_id, payment_id, or signature).',
      },
    };
  }

  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET!;
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(payload)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const actualBuffer = Buffer.from(razorpay_signature, 'utf8');

    const isMatch =
      expectedBuffer.length === actualBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, actualBuffer);

    if (!isMatch) {
      return {
        success: false,
        configured: true,
        error: {
          code: 'AUTHENTICATION_FAILED',
          message: 'Payment verification failed: Signature mismatch.',
        },
        data: {
          verified: false,
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
        },
      };
    }

    return {
      success: true,
      configured: true,
      data: {
        verified: true,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error verifying Razorpay signature';
    return {
      success: false,
      configured: true,
      error: {
        code: 'EXTERNAL_API_ERROR',
        message,
      },
    };
  }
}

/**
 * Verifies Razorpay Webhook signature using HMAC SHA256 against raw webhook request body.
 */
export function verifyWebhookSignature(
  input: RazorpayWebhookVerificationInput
): IntegrationResult<boolean> {
  if (!isRazorpayWebhookConfigured()) {
    return {
      success: false,
      configured: false,
      error: {
        code: 'SERVICE_NOT_CONFIGURED',
        message: 'Razorpay webhook integration is currently disabled: RAZORPAY_WEBHOOK_SECRET is not configured.',
      },
    };
  }

  const { rawBody, signature } = input;

  if (!rawBody || !signature) {
    return {
      success: false,
      configured: true,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Missing rawBody or signature for webhook verification.',
      },
    };
  }

  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const actualBuffer = Buffer.from(signature, 'utf8');

    const isMatch =
      expectedBuffer.length === actualBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, actualBuffer);

    return {
      success: isMatch,
      configured: true,
      data: isMatch,
      ...(isMatch
        ? {}
        : {
            error: {
              code: 'AUTHENTICATION_FAILED',
              message: 'Webhook signature verification failed.',
            },
          }),
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error verifying webhook signature';
    return {
      success: false,
      configured: true,
      error: {
        code: 'EXTERNAL_API_ERROR',
        message,
      },
    };
  }
}
