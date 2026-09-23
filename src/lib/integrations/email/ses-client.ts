import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { IntegrationResult } from '../common/types';
import {
  ContactLeadData,
  EmailPayload,
  OrderConfirmationData,
  PaymentReceiptData,
  SendEmailResult,
  ShippingNotificationData,
} from './types';

let sesClientInstance: SESClient | null = null;

/**
 * Checks whether AWS SES credentials and region are configured.
 */
export function isSesConfigured(): boolean {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION;
  return Boolean(
    accessKeyId &&
      secretAccessKey &&
      region &&
      accessKeyId.trim().length > 0 &&
      secretAccessKey.trim().length > 0 &&
      region.trim().length > 0
  );
}

/**
 * Lazily returns an SES client instance only when configured.
 */
function getSesClient(): SESClient | null {
  if (!isSesConfigured()) return null;
  if (!sesClientInstance) {
    sesClientInstance = new SESClient({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }
  return sesClientInstance;
}

/**
 * Sends an email via AWS SES.
 * Safely guards against missing credentials and returns SERVICE_NOT_CONFIGURED with zero external calls.
 */
export async function sendEmail(
  payload: EmailPayload
): Promise<IntegrationResult<SendEmailResult>> {
  if (!isSesConfigured()) {
    return {
      success: false,
      configured: false,
      error: {
        code: 'SERVICE_NOT_CONFIGURED',
        message:
          'AWS SES email service is currently disabled: AWS credentials (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION) are not configured.',
      },
    };
  }

  const fromEmail = payload.from || process.env.SES_FROM_EMAIL || 'support@treel.in';
  const toAddresses = Array.isArray(payload.to) ? payload.to : [payload.to];

  if (toAddresses.length === 0 || !toAddresses[0]) {
    return {
      success: false,
      configured: true,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Recipient address (to) cannot be empty.',
      },
    };
  }

  const client = getSesClient();
  if (!client) {
    return {
      success: false,
      configured: false,
      error: {
        code: 'SERVICE_NOT_CONFIGURED',
        message: 'AWS SES client could not be initialized.',
      },
    };
  }

  try {
    const command = new SendEmailCommand({
      Source: fromEmail,
      Destination: {
        ToAddresses: toAddresses,
        CcAddresses: payload.cc ? (Array.isArray(payload.cc) ? payload.cc : [payload.cc]) : undefined,
        BccAddresses: payload.bcc ? (Array.isArray(payload.bcc) ? payload.bcc : [payload.bcc]) : undefined,
      },
      Message: {
        Subject: {
          Data: payload.subject,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: payload.html,
            Charset: 'UTF-8',
          },
          ...(payload.text
            ? {
                Text: {
                  Data: payload.text,
                  Charset: 'UTF-8',
                },
              }
            : {}),
        },
      },
      ReplyToAddresses: payload.replyTo
        ? Array.isArray(payload.replyTo)
          ? payload.replyTo
          : [payload.replyTo]
        : undefined,
    });

    const response = await client.send(command);
    return {
      success: true,
      configured: true,
      data: {
        messageId: response.MessageId || '',
      },
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error sending email via SES';
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
 * Sends a notification email when a new contact lead is received.
 */
export async function sendContactLeadEmail(
  data: ContactLeadData,
  recipientEmail?: string
): Promise<IntegrationResult<SendEmailResult>> {
  const targetRecipient = recipientEmail || process.env.SES_LEADS_EMAIL || process.env.SES_FROM_EMAIL || 'support@treel.in';

  const html = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"><title>New Contact Lead</title></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background: #111827; padding: 20px; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px;">Treel Mobility Solutions — New Inquiry</h2>
          </div>
          <div style="padding: 24px;">
            <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
            ${data.phone ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : ''}
            ${data.company ? `<p><strong>Company:</strong> ${escapeHtml(data.company)}</p>` : ''}
            ${data.sourcePage ? `<p><strong>Source Page:</strong> ${escapeHtml(data.sourcePage)}</p>` : ''}
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background: #f8fafc; padding: 12px; border-radius: 4px;">${escapeHtml(data.message)}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: targetRecipient,
    subject: `New Lead from ${data.name}${data.company ? ` (${data.company})` : ''}`,
    html,
    text: `New Lead:\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nMessage:\n${data.message}`,
    replyTo: data.email,
  });
}

/**
 * Sends an order confirmation email to the customer.
 */
export async function sendOrderConfirmationEmail(
  data: OrderConfirmationData
): Promise<IntegrationResult<SendEmailResult>> {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(item.name)}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; text-align: right;">₹${(item.price * item.quantity).toLocaleString('en-IN')}</td>
      </tr>
    `
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"><title>Order Confirmation - Treel</title></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background: #0284c7; padding: 24px; color: #ffffff; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">Thank you for your order!</h1>
            <p style="margin: 8px 0 0 0; font-size: 14px; opacity: 0.9;">Order ID: ${escapeHtml(data.orderId)}</p>
          </div>
          <div style="padding: 24px;">
            <p>Hi ${escapeHtml(data.customerName)},</p>
            <p>Your order has been received and is being processed. Here are the order details:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <thead>
                <tr style="background: #f1f5f9; text-align: left;">
                  <th style="padding: 8px;">Item</th>
                  <th style="padding: 8px; text-align: center;">Qty</th>
                  <th style="padding: 8px; text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding: 8px; text-align: right; font-weight: bold;">Total:</td>
                  <td style="padding: 8px; text-align: right; font-weight: bold; color: #0284c7;">₹${data.total.toLocaleString('en-IN')}</td>
                </tr>
              </tfoot>
            </table>

            <div style="background: #f8fafc; padding: 16px; border-radius: 6px; margin-top: 20px;">
              <h4 style="margin: 0 0 8px 0; font-size: 14px;">Shipping Address:</h4>
              <p style="margin: 0; font-size: 13px; color: #64748b;">
                ${escapeHtml(data.shippingAddress.address1)}<br />
                ${data.shippingAddress.address2 ? `${escapeHtml(data.shippingAddress.address2)}<br />` : ''}
                ${escapeHtml(data.shippingAddress.city)}, ${escapeHtml(data.shippingAddress.state)} - ${escapeHtml(data.shippingAddress.pincode)}
              </p>
            </div>
          </div>
          <div style="background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0;">Treel Mobility Solutions Pvt. Ltd. | Customer Support</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: data.customerEmail,
    subject: `Order Confirmation #${data.orderId} — Treel`,
    html,
    text: `Hi ${data.customerName},\nYour order #${data.orderId} is confirmed for a total of ₹${data.total}.\nThank you for choosing Treel.`,
  });
}

/**
 * Sends a payment receipt email to the customer.
 */
export async function sendPaymentReceiptEmail(
  data: PaymentReceiptData
): Promise<IntegrationResult<SendEmailResult>> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"><title>Payment Receipt</title></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background: #059669; padding: 20px; color: #ffffff; text-align: center;">
            <h2 style="margin: 0; font-size: 22px;">Payment Successful</h2>
            <p style="margin: 6px 0 0 0; opacity: 0.9;">Receipt for Order #${escapeHtml(data.orderId)}</p>
          </div>
          <div style="padding: 24px;">
            <p>Hi ${escapeHtml(data.customerName)},</p>
            <p>We have successfully received your payment of <strong>${escapeHtml(data.currency)} ${(data.amount / 100).toLocaleString('en-IN')}</strong>.</p>
            <div style="background: #f8fafc; padding: 16px; border-radius: 6px; margin: 16px 0;">
              <p style="margin: 4px 0;"><strong>Payment ID:</strong> ${escapeHtml(data.paymentId)}</p>
              <p style="margin: 4px 0;"><strong>Order ID:</strong> ${escapeHtml(data.orderId)}</p>
              <p style="margin: 4px 0;"><strong>Status:</strong> ${escapeHtml(data.status)}</p>
              ${data.date ? `<p style="margin: 4px 0;"><strong>Date:</strong> ${escapeHtml(data.date)}</p>` : ''}
            </div>
            <p>If you have any questions, feel free to reply to this email.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: data.customerEmail,
    subject: `Payment Receipt for Order #${data.orderId} — Treel`,
    html,
    text: `Payment Receipt:\nAmount: ${data.currency} ${data.amount / 100}\nPayment ID: ${data.paymentId}\nOrder ID: ${data.orderId}\nStatus: ${data.status}`,
  });
}

/**
 * Sends a shipping notification email with AWB and tracking details.
 */
export async function sendShippingNotificationEmail(
  data: ShippingNotificationData
): Promise<IntegrationResult<SendEmailResult>> {
  const html = `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8"><title>Your Order has Shipped!</title></head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background: #3b82f6; padding: 20px; color: #ffffff; text-align: center;">
            <h2 style="margin: 0; font-size: 22px;">Your Order is on the way!</h2>
            <p style="margin: 6px 0 0 0; opacity: 0.9;">Order #${escapeHtml(data.orderId)}</p>
          </div>
          <div style="padding: 24px;">
            <p>Hi ${escapeHtml(data.customerName)},</p>
            <p>Great news! Your package has been dispatched via <strong>${escapeHtml(data.courierName)}</strong>.</p>
            <div style="background: #f8fafc; padding: 16px; border-radius: 6px; margin: 16px 0;">
              <p style="margin: 4px 0;"><strong>Courier:</strong> ${escapeHtml(data.courierName)}</p>
              <p style="margin: 4px 0;"><strong>AWB / Tracking Number:</strong> ${escapeHtml(data.awbCode)}</p>
              ${data.expectedDeliveryDate ? `<p style="margin: 4px 0;"><strong>Expected Delivery:</strong> ${escapeHtml(data.expectedDeliveryDate)}</p>` : ''}
            </div>
            ${
              data.trackingUrl
                ? `<div style="text-align: center; margin: 24px 0;">
                    <a href="${escapeHtml(data.trackingUrl)}" style="background: #3b82f6; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">Track Your Shipment</a>
                  </div>`
                : ''
            }
          </div>
        </div>
      </body>
    </html>
  `;

  return sendEmail({
    to: data.customerEmail,
    subject: `Your Treel Order #${data.orderId} Has Shipped!`,
    html,
    text: `Your order #${data.orderId} has shipped via ${data.courierName}. Tracking / AWB: ${data.awbCode}.${data.trackingUrl ? ` Track here: ${data.trackingUrl}` : ''}`,
  });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
