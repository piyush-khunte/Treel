import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { getCanonicalSiteUrl } from '@/lib/utils/url';
import { IntegrationResult } from '../common/types';
import {
  ContactLeadData,
  EmailPayload,
  OrderConfirmationData,
  PaymentReceiptData,
  SendEmailResult,
  ShippingNotificationData,
  SupportAcknowledgementData,
  NewsletterWelcomeData,
  WhitepaperAccessEmailData,
  TmipLeadConfirmationData,
  SurakshaLeadConfirmationData,
  PersonalLeadConfirmationData,
  EventRegistrationConfirmationData,
  WarrantyRegistrationConfirmationData,
  WarrantyClaimConfirmationData,
} from './types';

let sesClientInstance: SESClient | null = null;

/**
 * Checks whether AWS SES credentials and region are configured.
 */
export function isSesConfigured(): boolean {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_SES_REGION || (process.env.HOST?.includes('us-east-1') ? 'us-east-1' : process.env.AWS_REGION) || 'us-east-1';
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
    const region = process.env.AWS_SES_REGION || (process.env.HOST?.includes('us-east-1') ? 'us-east-1' : process.env.AWS_REGION) || 'us-east-1';
    sesClientInstance = new SESClient({
      region,
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

  const rawFrom = payload.from || process.env.SES_FROM_EMAIL || process.env.FROM_EMAIL || 'hello@treel.in';
  const fromEmail = rawFrom.includes('<') ? rawFrom : `Treel <${rawFrom}>`;

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
 * Reproduces the authentic Treel template from reference CheckoutForm.jsx with responsive styling.
 */
export async function sendOrderConfirmationEmail(
  data: OrderConfirmationData
): Promise<IntegrationResult<SendEmailResult>> {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #111827; font-weight: 500;">
          ${escapeHtml(item.name)}
          ${item.sku ? `<div style="font-size: 12px; color: #6b7280; font-family: monospace;">SKU: ${escapeHtml(item.sku)}</div>` : ''}
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #374151; text-align: center;">
          ${item.quantity}
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #374151; text-align: right;">
          ₹${Number(item.price).toLocaleString('en-IN')}
        </td>
        <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-size: 14px; color: #111827; font-weight: 600; text-align: right;">
          ₹${(Number(item.price) * item.quantity).toLocaleString('en-IN')}
        </td>
      </tr>
    `
    )
    .join('');

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Treel Order Confirmation</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #d5d5d5; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #d5d5d5; padding: 20px 0;">
          <tbody>
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                  <tbody>
                    <!-- Header Section with Treel Brand -->
                    <tr>
                      <td style="padding: 24px 32px; background-color: #111111;">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tbody>
                            <tr>
                              <td align="left">
                                <a href="https://treel.in" target="_blank" style="text-decoration: none;">
                                  <span style="font-size: 24px; font-weight: 800; letter-spacing: 2px; color: #ffffff;">TREEL</span>
                                </a>
                              </td>
                              <td align="right" style="color: #9ca3af; font-size: 12px; font-family: monospace;">
                                ORDER #${escapeHtml(data.orderId)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    <!-- Status Hero Banner -->
                    <tr>
                      <td style="padding: 32px 32px 24px 32px; background-color: #ffffff;">
                        <h1 style="color: #111111; font-size: 22px; font-weight: 700; line-height: 28px; margin: 0 0 16px 0;">
                          Your Treel order confirmation
                        </h1>
                        <div style="background-color: #f3f4f6; padding: 14px 18px; border-radius: 6px; margin-bottom: 20px;">
                          <p style="color: #111111; font-size: 15px; margin: 0; line-height: 22px;">
                            Hello <strong>${escapeHtml(data.customerName)}</strong>,
                          </p>
                        </div>
                        <p style="color: #059669; font-size: 20px; font-weight: 700; margin: 0; line-height: 26px;">
                          Your order has been placed successfully.
                        </p>
                      </td>
                    </tr>

                    <!-- Order Details & Billing Address -->
                    <tr>
                      <td style="padding: 0 32px 24px 32px;">
                        <table width="100%" cellpadding="16" cellspacing="0" border="0" style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px;">
                          <tbody>
                            <tr>
                              <td width="50%" valign="top" style="border-right: 1px solid #e5e7eb;">
                                <h3 style="font-size: 14px; font-weight: 700; color: #374151; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">Order Details</h3>
                                <p style="font-size: 13px; color: #4b5563; margin: 0; line-height: 20px;">
                                  <strong>Email:</strong> ${escapeHtml(data.customerEmail)}<br />
                                  ${data.customerPhone ? `<strong>Phone:</strong> ${escapeHtml(data.customerPhone)}<br />` : ''}
                                  <strong>Order ID:</strong> ${escapeHtml(data.orderId)}
                                </p>
                              </td>
                              <td width="50%" valign="top">
                                <h3 style="font-size: 14px; font-weight: 700; color: #374151; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">Shipping Address</h3>
                                <p style="font-size: 13px; color: #4b5563; margin: 0; line-height: 20px;">
                                  ${escapeHtml(data.customerName)}<br />
                                  ${escapeHtml(data.shippingAddress.address1)}<br />
                                  ${data.shippingAddress.address2 ? `${escapeHtml(data.shippingAddress.address2)}<br />` : ''}
                                  ${escapeHtml(data.shippingAddress.city)}, ${escapeHtml(data.shippingAddress.state)} - ${escapeHtml(data.shippingAddress.pincode)}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    <!-- Line Items Table -->
                    <tr>
                      <td style="padding: 0 32px 24px 32px;">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
                          <thead>
                            <tr style="background-color: #f3f4f6;">
                              <th align="left" style="padding: 10px 16px; font-size: 12px; font-weight: 700; color: #4b5563; text-transform: uppercase;">Product</th>
                              <th align="center" style="padding: 10px 16px; font-size: 12px; font-weight: 700; color: #4b5563; text-transform: uppercase;">Qty</th>
                              <th align="right" style="padding: 10px 16px; font-size: 12px; font-weight: 700; color: #4b5563; text-transform: uppercase;">Unit Price</th>
                              <th align="right" style="padding: 10px 16px; font-size: 12px; font-weight: 700; color: #4b5563; text-transform: uppercase;">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${itemsHtml}
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    <!-- Totals Calculation -->
                    <tr>
                      <td style="padding: 0 32px 32px 32px;">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f9fafb; border-radius: 6px; padding: 16px;">
                          <tbody>
                            <tr>
                              <td align="right" style="padding: 6px 0; font-size: 14px; color: #4b5563;">Sub-Total:</td>
                              <td align="right" width="120" style="padding: 6px 0 6px 16px; font-size: 14px; color: #111827; font-weight: 600;">
                                ₹${data.total.toLocaleString('en-IN')}
                              </td>
                            </tr>
                            <tr>
                              <td align="right" style="padding: 8px 0 0 0; font-size: 16px; font-weight: 700; color: #111827; border-top: 1px solid #e5e7eb;">Order Total:</td>
                              <td align="right" width="120" style="padding: 8px 0 0 16px; font-size: 18px; font-weight: 700; color: #059669; border-top: 1px solid #e5e7eb;">
                                ₹${data.total.toLocaleString('en-IN')}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    <!-- Support Help Notice -->
                    <tr>
                      <td style="padding: 0 32px 24px 32px; text-align: center;">
                        <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; padding: 14px; font-size: 13px; color: #1e40af;">
                          <strong>Need assistance with installation or tracking?</strong><br />
                          Call our toll-free customer support helpline: <strong>1800 833 0233</strong> or email <a href="mailto:hello@treel.in" style="color: #2563eb; text-decoration: underline;">hello@treel.in</a>
                        </div>
                      </td>
                    </tr>

                    <!-- Dark Brand Footer matching Reference site -->
                    <tr>
                      <td style="padding: 24px 32px; background-color: #111111; color: #9ca3af; font-size: 12px; line-height: 18px;">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tbody>
                            <tr>
                              <td valign="top" style="color: #d1d5db;">
                                <strong>Treel Mobility Solutions Private Limited</strong><br />
                                S.No.6/1B, 6/4, 7/4, Laxmi Vishnupuram, NDA Road, Vill. Shivane, Pune, Maharashtra 411023, India<br />
                                GST NO: 123456789
                              </td>
                              <td align="right" valign="top" style="color: #9ca3af;">
                                <a href="https://treel.in" style="color: #ffffff; text-decoration: none; font-weight: 600;">Visit treel.in</a><br />
                                <span style="font-size: 11px;">Mobility Intelligence</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `;

  const text = `Treel Order Confirmation #${data.orderId}\n\nHello ${data.customerName},\n\nYour order has been placed successfully for a total of ₹${data.total.toLocaleString('en-IN')}.\n\nItems:\n${data.items.map((it) => `- ${it.name} x ${it.quantity}: ₹${(it.price * it.quantity).toLocaleString('en-IN')}`).join('\n')}\n\nShipping Address:\n${data.customerName}\n${data.shippingAddress.address1}\n${data.shippingAddress.city}, ${data.shippingAddress.state} - ${data.shippingAddress.pincode}\n\nSupport Helpline: 1800 833 0233 (Toll-Free) | hello@treel.in\nTreel Mobility Solutions Pvt. Ltd., Pune, Maharashtra 411023`;

  return sendEmail({
    to: data.customerEmail,
    subject: `Order Confirmation #${data.orderId} — Treel`,
    html,
    text,
  });
}

/**
 * Sends a customer acknowledgement email when a support inquiry is submitted.
 * Reproduces the authentic copy and layout from reference support.js.
 */
export async function sendSupportAcknowledgementEmail(
  data: SupportAcknowledgementData
): Promise<IntegrationResult<SendEmailResult>> {
  const baseUrl = getCanonicalSiteUrl();
  const unsubscribeUrl = `${baseUrl}/unsubscribe?email=${encodeURIComponent(data.email)}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Thank You for Reaching Out to TREEL Support</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4; padding: 24px 0;">
          <tbody>
            <tr>
              <td align="center">
                <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                  <tbody>
                    <!-- Header -->
                    <tr>
                      <td style="padding: 24px; background-color: #111827; text-align: center;">
                        <h1 style="color: #ffffff; font-size: 20px; margin: 0; letter-spacing: 0.5px;">Thank You for Reaching Out to Mr. TREEL Support</h1>
                        ${data.ticketId ? `<p style="color: #9ca3af; font-size: 12px; margin: 6px 0 0 0; font-family: monospace;">Ticket Ref: ${escapeHtml(data.ticketId)}</p>` : ''}
                      </td>
                    </tr>

                    <!-- Customer Greeting -->
                    <tr>
                      <td style="padding: 28px 32px 16px 32px; font-size: 15px; line-height: 1.6; color: #374151;">
                        <p style="margin: 0 0 14px 0;">Dear <strong>${escapeHtml(data.name)}</strong>,</p>
                        <p style="margin: 0 0 14px 0;">
                          Thank you for getting in touch with us! We&apos;ve received your inquiry, and our support team is reviewing your request. We&apos;re here to assist you, and a specialist will get back to you as soon as possible.
                        </p>
                      </td>
                    </tr>

                    <!-- Request Summary Table -->
                    <tr>
                      <td style="padding: 0 32px 24px 32px;">
                        <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 20px;">
                          <h3 style="color: #111827; font-size: 16px; margin: 0 0 14px 0;">Here&apos;s a summary of your request:</h3>
                          <table role="presentation" width="100%" cellpadding="6" cellspacing="0" border="0" style="font-size: 14px; border-collapse: collapse;">
                            <tbody>
                              <tr>
                                <td style="width: 140px; font-weight: bold; color: #4b5563; padding: 6px 0;">Name:</td>
                                <td style="color: #111827; padding: 6px 0;">${escapeHtml(data.name)}</td>
                              </tr>
                              <tr>
                                <td style="width: 140px; font-weight: bold; color: #4b5563; padding: 6px 0;">Email:</td>
                                <td style="color: #111827; padding: 6px 0;">${escapeHtml(data.email)}</td>
                              </tr>
                              ${data.phone ? `
                              <tr>
                                <td style="width: 140px; font-weight: bold; color: #4b5563; padding: 6px 0;">Phone Number:</td>
                                <td style="color: #111827; padding: 6px 0;">${escapeHtml(data.phone)}</td>
                              </tr>` : ''}
                              ${data.purpose ? `
                              <tr>
                                <td style="width: 140px; font-weight: bold; color: #4b5563; padding: 6px 0;">Purpose:</td>
                                <td style="color: #111827; padding: 6px 0;">${escapeHtml(data.purpose)}</td>
                              </tr>` : ''}
                              <tr>
                                <td valign="top" style="width: 140px; font-weight: bold; color: #4b5563; padding: 6px 0;">Message:</td>
                                <td style="color: #111827; padding: 6px 0; white-space: pre-wrap;">${escapeHtml(data.message)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>

                    <!-- Sign-off & Support Desk details -->
                    <tr>
                      <td style="padding: 0 32px 28px 32px; font-size: 14px; line-height: 1.6; color: #374151;">
                        <p style="margin: 0 0 10px 0;">We appreciate your patience, and we look forward to helping you!</p>
                        <p style="margin: 0; font-weight: bold; color: #111827;">Best regards,</p>
                        <p style="margin: 4px 0 0 0; color: #4b5563;">
                          <strong>The TREEL Support Team</strong><br />
                          Treel Mobility Solutions Pvt. Ltd.<br />
                          Email: <a href="mailto:hello@treel.in" style="color: #2563eb; text-decoration: underline;">hello@treel.in</a><br />
                          Toll-Free Helpline: <strong>1800 833 0233</strong><br />
                          Website: <a href="https://treel.in" style="color: #2563eb; text-decoration: underline;">https://treel.in</a>
                        </p>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="padding: 16px 24px; background-color: #f9fafb; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af; text-align: center;">
                        You are receiving this confirmation because you contacted Treel customer support.<br />
                        <span style="display: inline-block; margin-top: 4px;">
                          To unsubscribe from further updates or manage email preferences, <a href="${escapeHtml(unsubscribeUrl)}" style="color: #2563eb; text-decoration: underline;">click here</a>.
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `;

  const text = `Thank You for Reaching Out to Mr. TREEL Support\n\nDear ${data.name},\n\nThank you for getting in touch with us! We have received your inquiry, and our support team is reviewing your request.\n\nSummary of your request:\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nPurpose: ${data.purpose || 'General Inquiry'}\nMessage:\n${data.message}\n\nBest regards,\nThe TREEL Support Team\nhello@treel.in | 1800 833 0233 | https://treel.in\n\nTo manage preferences or unsubscribe from further updates:\n${unsubscribeUrl}`;

  return sendEmail({
    to: data.email,
    subject: "Thank You for Reaching Out to TREEL Support",
    html,
    text,
  });
}

/**
 * Sends a welcome / subscription confirmation email to a new subscriber.
 */
export async function sendNewsletterWelcomeEmail(
  data: NewsletterWelcomeData
): Promise<IntegrationResult<SendEmailResult>> {
  const baseUrl = getCanonicalSiteUrl();
  const unsubscribeUrl = data.unsubscribeUrl || `${baseUrl}/unsubscribe?email=${encodeURIComponent(data.email)}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Welcome to Treel Mobility Intelligence</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0f1419; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #faf7f2;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0f1419; padding: 32px 0;">
          <tbody>
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #141b22; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px; overflow: hidden;">
                  <tbody>
                    <tr>
                      <td style="padding: 28px 32px; background-color: #090d11; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                        <span style="font-size: 22px; font-weight: 800; letter-spacing: 2px; color: #faf7f2;">TREEL</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 36px 32px;">
                        <h2 style="font-size: 24px; color: #faf7f2; margin: 0 0 16px 0; font-weight: 700;">
                          Welcome to Treel Updates &amp; Research
                        </h2>
                        <p style="font-size: 15px; line-height: 1.6; color: #94a3b8; margin: 0 0 20px 0;">
                          You have successfully subscribed to Treel Mobility Intelligence dispatches, event announcements, and technical research whitepapers.
                        </p>
                        <div style="background-color: rgba(213, 87, 59, 0.1); border: 1px solid rgba(213, 87, 59, 0.3); border-radius: 6px; padding: 18px; margin-bottom: 24px;">
                          <p style="font-size: 13px; color: #faf7f2; margin: 0; line-height: 20px;">
                            <strong>What to expect:</strong> Monthly research notes from India&apos;s connected tyre telematics dataset, firmware updates, and event invitations. No spam, ever.
                          </p>
                        </div>
                        <p style="font-size: 13px; color: #64748b; margin: 0;">
                          Need to manage your communication preferences? You can <a href="${escapeHtml(unsubscribeUrl)}" style="color: #d5573b; text-decoration: underline;">update your preferences or unsubscribe anytime</a>.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 18px 32px; background-color: #090d11; border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 11px; color: #64748b; text-align: center;">
                        Treel Mobility Solutions Pvt. Ltd. | S.No.6/1B, NDA Road, Pune, Maharashtra 411023
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `;

  const text = `Welcome to Treel Mobility Intelligence\n\nYou have successfully subscribed to Treel research updates and mobility intelligence.\n\nTo manage your preferences or unsubscribe at any time, visit:\n${unsubscribeUrl}\n\nTreel Mobility Solutions Pvt. Ltd., Pune, Maharashtra 411023`;

  return sendEmail({
    to: data.email,
    subject: "Welcome to Treel Mobility Intelligence & Updates",
    html,
    text,
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

/**
 * Sends whitepaper document access details and secure download links.
 */
export async function sendWhitepaperAccessEmail(
  data: WhitepaperAccessEmailData
): Promise<IntegrationResult<SendEmailResult>> {
  const recipientGreeting = data.recipientName ? `Hi ${escapeHtml(data.recipientName)},` : "Hello,";
  const isPdf = data.fileFormat.toUpperCase() === "PDF";

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Your TMIP Whitepaper Access</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #050a17; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #f1f5f9;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #050a17; padding: 32px 0;">
          <tbody>
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #0b1220; border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; overflow: hidden;">
                  <tbody>
                    <tr>
                      <td style="padding: 24px 32px; background-color: #030712; border-bottom: 1px solid rgba(59, 130, 246, 0.2);">
                        <span style="font-size: 20px; font-weight: 800; letter-spacing: 2px; color: #3b82f6;">TREEL TMIP</span>
                        <span style="font-size: 11px; color: #94a3b8; margin-left: 8px; text-transform: uppercase; letter-spacing: 1px;">Research Library</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 36px 32px;">
                        <p style="font-size: 15px; color: #94a3b8; margin: 0 0 16px 0;">
                          ${recipientGreeting}
                        </p>
                        <h2 style="font-size: 22px; color: #f1f5f9; margin: 0 0 16px 0; font-weight: 700; line-height: 1.3;">
                          ${escapeHtml(data.whitepaperTitle)}
                        </h2>
                        <p style="font-size: 14px; line-height: 1.6; color: #94a3b8; margin: 0 0 24px 0;">
                          Thank you for your interest in TMIP research. Your document (${escapeHtml(data.fileFormat)}${data.length ? ` · ${escapeHtml(data.length)}` : ""}) is ready for access.
                        </p>
                        <div style="background-color: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.25); border-radius: 6px; padding: 20px; margin-bottom: 28px; text-align: center;">
                          <a href="${escapeHtml(data.downloadUrl)}" style="background-color: #3b82f6; color: #ffffff; padding: 12px 28px; border-radius: 4px; font-size: 14px; font-weight: bold; text-decoration: none; display: inline-block; margin-right: 8px;">
                            Download ${escapeHtml(data.fileFormat)}
                          </a>
                          ${
                            isPdf
                              ? `<a href="${escapeHtml(data.viewUrl)}" style="background-color: rgba(255, 255, 255, 0.05); color: #94a3b8; border: 1px solid rgba(255, 255, 255, 0.2); padding: 11px 20px; border-radius: 4px; font-size: 14px; text-decoration: none; display: inline-block;">
                                  View Online
                                </a>`
                              : ""
                          }
                        </div>
                        <p style="font-size: 12px; color: #64748b; line-height: 1.5; margin: 0;">
                          This document link is uniquely generated for your request and remains valid for 48 hours. If you need any assistance, reach out to us at <a href="mailto:support@treel.in" style="color: #3b82f6;">support@treel.in</a>.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 18px 32px; background-color: #030712; border-top: 1px solid rgba(59, 130, 246, 0.15); font-size: 11px; color: #64748b; text-align: center;">
                        Treel Mobility Solutions Pvt. Ltd. | S.No.6/1B, NDA Road, Pune, Maharashtra 411023
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `;

  const text = `Treel TMIP Research Whitepaper\n\n${data.whitepaperTitle}\n\nYour document is ready for download:\n${data.downloadUrl}\n\n${isPdf ? `View in browser: ${data.viewUrl}\n\n` : ""}This access link is valid for 48 hours.\n\nTreel Mobility Solutions Pvt. Ltd., Pune, Maharashtra 411023`;

  return sendEmail({
    to: data.email,
    subject: `Your Whitepaper: ${data.whitepaperTitle} · TMIP Research`,
    html,
    text,
  });
}


/**
 * Sends a confirmation email to a user who submitted a TMIP demo or enterprise lead request.
 */
export async function sendTmipLeadConfirmationEmail(
  data: TmipLeadConfirmationData
): Promise<IntegrationResult<SendEmailResult>> {
  const greeting = data.name ? `Dear ${escapeHtml(data.name)},` : "Hello,";
  const baseUrl = getCanonicalSiteUrl();
  const unsubscribeUrl = `${baseUrl}/unsubscribe?email=${encodeURIComponent(data.email)}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Thank You for Contacting Treel TMIP</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #050a17; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #050a17; padding: 32px 0;">
          <tbody>
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #0b1220; border: 1px solid rgba(59, 130, 246, 0.25); border-radius: 8px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
                  <tbody>
                    <tr>
                      <td style="padding: 24px 32px; background-color: #030712; border-bottom: 2px solid #3b82f6;">
                        <span style="font-size: 20px; font-weight: 800; letter-spacing: 2px; color: #3b82f6;">TREEL TMIP</span>
                        <span style="font-size: 11px; color: #94a3b8; margin-left: 8px; text-transform: uppercase; letter-spacing: 1px;">Enterprise Telematics</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 36px 32px;">
                        <h2 style="font-size: 22px; color: #f1f5f9; margin: 0 0 16px 0; font-weight: 700;">
                          Thank You for Your Enterprise Inquiry
                        </h2>
                        <p style="font-size: 14px; line-height: 1.6; color: #94a3b8; margin: 0 0 20px 0;">
                          ${greeting}
                        </p>
                        <p style="font-size: 14px; line-height: 1.6; color: #cbd5e1; margin: 0 0 24px 0;">
                          We have successfully received your request for Treel TMIP Tyre &amp; Mobility Intelligence. Our systems engineering and commercial fleet consulting team is reviewing your fleet parameters and will contact you at earliest to schedule your tailored demonstration.
                        </p>

                        <div style="background-color: #050a17; border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 6px; padding: 20px; margin-bottom: 24px;">
                          <h3 style="color: #f1f5f9; font-size: 13px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 1px; font-family: monospace;">
                            Inquiry Summary
                          </h3>
                          <table width="100%" cellpadding="4" cellspacing="0" border="0" style="font-size: 13px; color: #cbd5e1;">
                            <tbody>
                              <tr>
                                <td style="width: 130px; color: #64748b;">Full Name:</td>
                                <td style="color: #f1f5f9; font-weight: 600;">${escapeHtml(data.name || "N/A")}</td>
                              </tr>
                              <tr>
                                <td style="color: #64748b;">Work Email:</td>
                                <td style="color: #3b82f6;">${escapeHtml(data.email)}</td>
                              </tr>
                              ${data.phone ? `<tr><td style="color: #64748b;">Phone:</td><td style="color: #f1f5f9;">${escapeHtml(data.phone)}</td></tr>` : ""}
                              ${data.company ? `<tr><td style="color: #64748b;">Company:</td><td style="color: #f1f5f9; font-weight: 600;">${escapeHtml(data.company)}</td></tr>` : ""}
                              ${data.fleetSize ? `<tr><td style="color: #64748b;">Fleet Size:</td><td style="color: #10b981; font-weight: 600;">${escapeHtml(String(data.fleetSize))} Commercial Vehicles</td></tr>` : ""}
                            </tbody>
                          </table>
                        </div>

                        <p style="font-size: 13px; color: #94a3b8; line-height: 1.6; margin: 0 0 16px 0;">
                          In the meantime, feel free to explore our technical research library at <a href="https://treel.in/tmip" style="color: #3b82f6; text-decoration: underline;">https://treel.in/tmip</a> or reply directly to this email if you have specific operational requirements.
                        </p>

                        <p style="margin: 24px 0 0 0; font-size: 13px; color: #cbd5e1;">
                          Best regards,<br />
                          <strong>The Treel TMIP Team</strong><br />
                          <span style="color: #64748b; font-size: 12px;">Email: hello@treel.in · Toll-Free: 1800 833 0233</span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 18px 32px; background-color: #030712; border-top: 1px solid rgba(59, 130, 246, 0.15); font-size: 11px; color: #64748b; text-align: center;">
                        Treel Mobility Solutions Pvt. Ltd. | S.No.6/1B, NDA Road, Pune, Maharashtra 411023<br />
                        <span style="display: inline-block; margin-top: 6px;">
                          To unsubscribe from further updates or manage communication preferences, <a href="${escapeHtml(unsubscribeUrl)}" style="color: #d5573b; text-decoration: underline;">click here</a>.
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `;

  const text = `Thank You for Your Interest in Treel TMIP\n\n${greeting}\n\nWe have received your enterprise inquiry for Treel TMIP Fleet Intelligence. Our team will review your fleet profile and get in touch within 24 business hours to schedule your demonstration.\n\nSummary:\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "N/A"}\nCompany: ${data.company || "N/A"}\nFleet Size: ${data.fleetSize || "N/A"}\n\nBest regards,\nThe Treel TMIP Team\nhello@treel.in | 1800 833 0233 | https://treel.in\n\nTo manage preferences or unsubscribe from further updates:\n${unsubscribeUrl}`;

  return sendEmail({
    to: data.email,
    from: "Treel <hello@treel.in>",
    subject: "Thank You for Your Interest in Treel TMIP · Confirmation",
    html,
    text,
  });
}

/**
 * Sends a confirmation email to a user who submitted a Suraksha fleet inquiry or callback request.
 */
export async function sendSurakshaLeadConfirmationEmail(
  data: SurakshaLeadConfirmationData
): Promise<IntegrationResult<SendEmailResult>> {
  const greeting = data.name ? `Dear ${escapeHtml(data.name)},` : "Hello,";
  const baseUrl = getCanonicalSiteUrl();
  const unsubscribeUrl = `${baseUrl}/unsubscribe?email=${encodeURIComponent(data.email)}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Thank You for Contacting Treel Suraksha</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0b0f19; padding: 32px 0;">
          <tbody>
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #111827; border: 1px solid rgba(234, 88, 12, 0.3); border-radius: 8px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
                  <tbody>
                    <tr>
                      <td style="padding: 24px 32px; background-color: #030712; border-bottom: 2px solid #ea580c;">
                        <span style="font-size: 20px; font-weight: 800; letter-spacing: 2px; color: #f97316;">TREEL SURAKSHA</span>
                        <span style="font-size: 11px; color: #9ca3af; margin-left: 8px; text-transform: uppercase; letter-spacing: 1px;">Commercial Fleet Safety</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 36px 32px;">
                        <h2 style="font-size: 22px; color: #f8fafc; margin: 0 0 16px 0; font-weight: 700;">
                          We Received Your Suraksha Request
                        </h2>
                        <p style="font-size: 14px; line-height: 1.6; color: #9ca3af; margin: 0 0 20px 0;">
                          ${greeting}
                        </p>
                        <p style="font-size: 14px; line-height: 1.6; color: #e5e7eb; margin: 0 0 24px 0;">
                          Thank you for reaching out to Treel Suraksha. Our commercial fleet consultant is preparing your tyre safety and fuel-saving assessment. A specialist will call you shortly on your registered number.
                        </p>

                        <div style="background-color: #030712; border: 1px solid rgba(234, 88, 12, 0.2); border-radius: 6px; padding: 20px; margin-bottom: 24px;">
                          <h3 style="color: #f8fafc; font-size: 13px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 1px; font-family: monospace;">
                            Request Details
                          </h3>
                          <table width="100%" cellpadding="4" cellspacing="0" border="0" style="font-size: 13px; color: #e5e7eb;">
                            <tbody>
                              <tr>
                                <td style="width: 140px; color: #9ca3af;">Name:</td>
                                <td style="color: #f8fafc; font-weight: 600;">${escapeHtml(data.name || "Fleet Owner")}</td>
                              </tr>
                              ${data.phone ? `<tr><td style="color: #9ca3af;">Mobile:</td><td style="color: #f97316; font-weight: 600;">${escapeHtml(data.phone)}</td></tr>` : ""}
                              ${data.city ? `<tr><td style="color: #9ca3af;">City / Hub:</td><td style="color: #f8fafc;">${escapeHtml(data.city)}</td></tr>` : ""}
                              ${data.trucks ? `<tr><td style="color: #9ca3af;">Commercial Trucks:</td><td style="color: #10b981; font-weight: 600;">${escapeHtml(String(data.trucks))}</td></tr>` : ""}
                              ${data.preferredTime ? `<tr><td style="color: #9ca3af;">Preferred Call Time:</td><td style="color: #f8fafc;">${escapeHtml(data.preferredTime)}</td></tr>` : ""}
                              ${data.language ? `<tr><td style="color: #9ca3af;">Language:</td><td style="color: #f8fafc;">${escapeHtml(data.language)}</td></tr>` : ""}
                            </tbody>
                          </table>
                        </div>

                        <p style="margin: 24px 0 0 0; font-size: 13px; color: #e5e7eb;">
                          Best regards,<br />
                          <strong>The Treel Suraksha Team</strong><br />
                          <span style="color: #9ca3af; font-size: 12px;">Email: hello@treel.in · Toll-Free: 1800 833 0233</span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 18px 32px; background-color: #030712; border-top: 1px solid rgba(234, 88, 12, 0.15); font-size: 11px; color: #6b7280; text-align: center;">
                        Treel Mobility Solutions Pvt. Ltd. | S.No.6/1B, NDA Road, Pune, Maharashtra 411023<br />
                        <span style="display: inline-block; margin-top: 6px;">
                          To unsubscribe from further updates or manage communication preferences, <a href="${escapeHtml(unsubscribeUrl)}" style="color: #d5573b; text-decoration: underline;">click here</a>.
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `;

  const text = `Thank You for Contacting Treel Suraksha\n\n${greeting}\n\nWe have received your request for Treel Suraksha commercial vehicle safety solutions. Our fleet specialist will contact you on your registered phone number.\n\nDetails:\nName: ${data.name}\nPhone: ${data.phone || "N/A"}\nCity: ${data.city || "N/A"}\nTrucks: ${data.trucks || "N/A"}\n\nBest regards,\nThe Treel Suraksha Team\nhello@treel.in | 1800 833 0233 | https://treel.in\n\nTo manage preferences or unsubscribe from further updates:\n${unsubscribeUrl}`;

  return sendEmail({
    to: data.email,
    from: "Treel <hello@treel.in>",
    subject: "Thank You for Contacting Treel Suraksha · Confirmation",
    html,
    text,
  });
}

/**
 * Sends a confirmation email to a user who submitted a Personal TPMS inquiry.
 */
export async function sendPersonalLeadConfirmationEmail(
  data: PersonalLeadConfirmationData
): Promise<IntegrationResult<SendEmailResult>> {
  const greeting = data.name ? `Dear ${escapeHtml(data.name)},` : "Hello,";
  const baseUrl = getCanonicalSiteUrl();
  const unsubscribeUrl = `${baseUrl}/unsubscribe?email=${encodeURIComponent(data.email)}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Thank You for Contacting Treel Personal TPMS</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0f1419; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #faf7f2;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0f1419; padding: 32px 0;">
          <tbody>
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #141b22; border: 1px solid rgba(213, 87, 59, 0.3); border-radius: 8px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
                  <tbody>
                    <tr>
                      <td style="padding: 24px 32px; background-color: #090d11; border-bottom: 2px solid #d5573b;">
                        <span style="font-size: 20px; font-weight: 800; letter-spacing: 2px; color: #d5573b;">TREEL</span>
                        <span style="font-size: 11px; color: #94a3b8; margin-left: 8px; text-transform: uppercase; letter-spacing: 1px;">Smart TPMS for Cars &amp; Bikes</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 36px 32px;">
                        <h2 style="font-size: 22px; color: #faf7f2; margin: 0 0 16px 0; font-weight: 700;">
                          Thank You for Choosing Treel
                        </h2>
                        <p style="font-size: 14px; line-height: 1.6; color: #94a3b8; margin: 0 0 20px 0;">
                          ${greeting}
                        </p>
                        <p style="font-size: 14px; line-height: 1.6; color: #cbd5e1; margin: 0 0 24px 0;">
                          Thank you for your interest in Treel Personal TPMS wireless tyre monitoring systems. We have received your inquiry and our support team will reach out with kit availability, vehicle compatibility, and purchasing assistance.
                        </p>

                        <div style="background-color: #090d11; border: 1px solid rgba(213, 87, 59, 0.2); border-radius: 6px; padding: 20px; margin-bottom: 24px;">
                          <h3 style="color: #faf7f2; font-size: 13px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 1px; font-family: monospace;">
                            Inquiry Overview
                          </h3>
                          <table width="100%" cellpadding="4" cellspacing="0" border="0" style="font-size: 13px; color: #cbd5e1;">
                            <tbody>
                              <tr>
                                <td style="width: 140px; color: #64748b;">Full Name:</td>
                                <td style="color: #faf7f2; font-weight: 600;">${escapeHtml(data.name || "Customer")}</td>
                              </tr>
                              <tr>
                                <td style="color: #64748b;">Email:</td>
                                <td style="color: #d5573b;">${escapeHtml(data.email)}</td>
                              </tr>
                              ${data.phone ? `<tr><td style="color: #64748b;">Phone:</td><td style="color: #faf7f2;">${escapeHtml(data.phone)}</td></tr>` : ""}
                              ${data.kit || data.vehicleType ? `<tr><td style="color: #64748b;">Product / Kit:</td><td style="color: #10b981; font-weight: 600;">${escapeHtml(data.kit || data.vehicleType || "TPMS Kit")}</td></tr>` : ""}
                              ${data.city ? `<tr><td style="color: #64748b;">Location:</td><td style="color: #faf7f2;">${escapeHtml(data.city)}</td></tr>` : ""}
                            </tbody>
                          </table>
                        </div>

                        <p style="margin: 24px 0 0 0; font-size: 13px; color: #cbd5e1;">
                          Best regards,<br />
                          <strong>The Treel Personal Support Team</strong><br />
                          <span style="color: #64748b; font-size: 12px;">Email: hello@treel.in · Toll-Free: 1800 833 0233 · https://treel.in</span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 18px 32px; background-color: #090d11; border-top: 1px solid rgba(213, 87, 59, 0.15); font-size: 11px; color: #64748b; text-align: center;">
                        Treel Mobility Solutions Pvt. Ltd. | S.No.6/1B, NDA Road, Pune, Maharashtra 411023<br />
                        <span style="display: inline-block; margin-top: 6px;">
                          To unsubscribe from further updates or manage communication preferences, <a href="${escapeHtml(unsubscribeUrl)}" style="color: #d5573b; text-decoration: underline;">click here</a>.
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `;

  const text = `Thank You for Choosing Treel Personal TPMS\n\n${greeting}\n\nWe have received your inquiry for Treel Personal TPMS wireless tyre monitoring systems. Our support team will connect with you shortly.\n\nInquiry Details:\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "N/A"}\nKit: ${data.kit || data.vehicleType || "Personal TPMS"}\n\nBest regards,\nThe Treel Personal Support Team\nhello@treel.in | 1800 833 0233 | https://treel.in\n\nTo manage preferences or unsubscribe from further updates:\n${unsubscribeUrl}`;

  return sendEmail({
    to: data.email,
    from: "Treel <hello@treel.in>",
    subject: "Thank You for Your Interest in Treel Personal TPMS",
    html,
    text,
  });
}

/**
 * Sends an event registration confirmation email with session details and calendar buttons.
 */
export async function sendEventRegistrationConfirmationEmail(
  data: EventRegistrationConfirmationData
): Promise<IntegrationResult<SendEmailResult>> {
  const greeting = data.name ? `Hi ${escapeHtml(data.name)},` : "Hello,";
  const baseUrl = getCanonicalSiteUrl();
  const unsubscribeUrl = `${baseUrl}/unsubscribe?email=${encodeURIComponent(data.email)}`;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Registration Confirmed: ${escapeHtml(data.eventName)}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0f1419; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #faf7f2;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0f1419; padding: 32px 0;">
          <tbody>
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #141b22; border: 1px solid rgba(213, 87, 59, 0.35); border-radius: 8px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
                  <tbody>
                    <tr>
                      <td style="padding: 24px 32px; background-color: #090d11; border-bottom: 2px solid #d5573b;">
                        <span style="font-size: 20px; font-weight: 800; letter-spacing: 2px; color: #faf7f2;">TREEL</span>
                        <span style="font-size: 11px; color: #d5573b; margin-left: 8px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700;">EVENTS</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 36px 32px;">
                        <div style="display: inline-block; padding: 4px 10px; background-color: rgba(213, 87, 59, 0.15); border: 1px solid rgba(213, 87, 59, 0.3); border-radius: 4px; font-size: 11px; font-family: monospace; color: #d5573b; font-weight: bold; text-transform: uppercase; margin-bottom: 16px;">
                          OFFICIAL REGISTRATION CONFIRMED
                        </div>
                        <h2 style="font-size: 24px; color: #faf7f2; margin: 0 0 14px 0; font-weight: 700; line-height: 1.25;">
                          ${escapeHtml(data.eventName)}
                        </h2>
                        <p style="font-size: 14px; line-height: 1.6; color: #94a3b8; margin: 0 0 24px 0;">
                          ${greeting} Your seat has been reserved. Below are your session access details and direct links to save the event to your calendar.
                        </p>

                        <div style="background-color: #090d11; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 6px; padding: 20px; margin-bottom: 28px;">
                          <table width="100%" cellpadding="6" cellspacing="0" border="0" style="font-size: 14px; color: #cbd5e1;">
                            <tbody>
                              <tr>
                                <td style="width: 120px; color: #64748b; font-weight: 600;">Date &amp; Time:</td>
                                <td style="color: #faf7f2; font-weight: 600;">${escapeHtml(data.dateTime)}</td>
                              </tr>
                              <tr>
                                <td style="color: #64748b; font-weight: 600;">Location:</td>
                                <td style="color: #00e5ff;">${escapeHtml(data.location)}</td>
                              </tr>
                              ${data.company ? `<tr><td style="color: #64748b; font-weight: 600;">Attendee:</td><td style="color: #faf7f2;">${escapeHtml(data.name)} (${escapeHtml(data.company)})</td></tr>` : ""}
                            </tbody>
                          </table>
                        </div>

                        ${(data.googleCalendarUrl || data.outlookCalendarUrl) ? `
                          <div style="text-align: center; margin-bottom: 28px; padding: 18px; background-color: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 6px;">
                            <p style="font-size: 12px; font-family: monospace; text-transform: uppercase; color: #94a3b8; margin: 0 0 12px 0; font-weight: 600;">
                              Add to your calendar
                            </p>
                            ${data.googleCalendarUrl ? `<a href="${escapeHtml(data.googleCalendarUrl)}" style="background-color: #d5573b; color: #ffffff; padding: 10px 20px; border-radius: 4px; font-size: 13px; font-weight: bold; text-decoration: none; display: inline-block; margin: 4px 6px;">Google Calendar</a>` : ""}
                            ${data.outlookCalendarUrl ? `<a href="${escapeHtml(data.outlookCalendarUrl)}" style="background-color: rgba(255, 255, 255, 0.1); color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.2); padding: 9px 18px; border-radius: 4px; font-size: 13px; font-weight: bold; text-decoration: none; display: inline-block; margin: 4px 6px;">Outlook Calendar</a>` : ""}
                          </div>
                        ` : ""}

                        <p style="font-size: 12px; color: #64748b; line-height: 1.6; margin: 0;">
                          Need to modify your attendee information or ask a technical question in advance? Simply email us at <a href="mailto:hello@treel.in" style="color: #d5573b;">hello@treel.in</a>.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 18px 32px; background-color: #090d11; border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 11px; color: #64748b; text-align: center;">
                        Treel Mobility Solutions Pvt. Ltd. | S.No.6/1B, NDA Road, Pune, Maharashtra 411023<br />
                        <span style="display: inline-block; margin-top: 6px;">
                          To unsubscribe from further updates or manage communication preferences, <a href="${escapeHtml(unsubscribeUrl)}" style="color: #d5573b; text-decoration: underline;">click here</a>.
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `;

  const text = `Registration Confirmed: ${data.eventName}\n\n${greeting}\n\nYour registration for ${data.eventName} has been confirmed.\n\nDate & Time: ${data.dateTime}\nLocation: ${data.location}\n\nWe look forward to seeing you.\n\nQuestions? Email hello@treel.in\nTreel Mobility Solutions Pvt. Ltd.\n\nTo manage preferences or unsubscribe from further updates:\n${unsubscribeUrl}`;

  return sendEmail({
    to: data.email,
    from: "Treel <hello@treel.in>",
    subject: `Registration Confirmed: ${data.eventName} · Treel Events`,
    html,
    text,
  });
}

/**
 * Sends a confirmation email when a customer registers their 12-month TPMS product warranty.
 */
export async function sendWarrantyRegistrationConfirmationEmail(
  data: WarrantyRegistrationConfirmationData
): Promise<IntegrationResult<SendEmailResult>> {
  const greeting = data.customerName ? `Dear ${escapeHtml(data.customerName)},` : "Hello,";

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Warranty Registration Confirmed: ${escapeHtml(data.registrationId)}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0f1419; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #faf7f2;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0f1419; padding: 32px 0;">
          <tbody>
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #141b22; border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
                  <tbody>
                    <tr>
                      <td style="padding: 24px 32px; background-color: #090d11; border-bottom: 2px solid #10b981;">
                        <span style="font-size: 20px; font-weight: 800; letter-spacing: 2px; color: #faf7f2;">TREEL</span>
                        <span style="font-size: 11px; color: #10b981; margin-left: 8px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Warranty Desk</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 36px 32px;">
                        <h2 style="font-size: 22px; color: #faf7f2; margin: 0 0 14px 0; font-weight: 700;">
                          Warranty Protection Active
                        </h2>
                        <p style="font-size: 14px; line-height: 1.6; color: #94a3b8; margin: 0 0 20px 0;">
                          ${greeting}
                        </p>
                        <p style="font-size: 14px; line-height: 1.6; color: #cbd5e1; margin: 0 0 24px 0;">
                          Your product warranty registration has been approved. Your Treel TPMS hardware is now protected under our 12-Month Comprehensive Manufacturer Warranty.
                        </p>

                        <div style="background-color: #090d11; border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 6px; padding: 20px; margin-bottom: 24px;">
                          <h3 style="color: #10b981; font-size: 13px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 1px; font-family: monospace;">
                            Warranty Certificate
                          </h3>
                          <table width="100%" cellpadding="4" cellspacing="0" border="0" style="font-size: 13px; color: #cbd5e1;">
                            <tbody>
                              <tr>
                                <td style="width: 140px; color: #64748b;">Registration ID:</td>
                                <td style="color: #faf7f2; font-weight: 700; font-family: monospace;">${escapeHtml(data.registrationId)}</td>
                              </tr>
                              <tr>
                                <td style="color: #64748b;">Order ID:</td>
                                <td style="color: #faf7f2; font-weight: 600;">${escapeHtml(data.orderId)}</td>
                              </tr>
                              <tr>
                                <td style="color: #64748b;">Product:</td>
                                <td style="color: #faf7f2;">${escapeHtml(data.productName)}</td>
                              </tr>
                              <tr>
                                <td style="color: #64748b;">Coverage Duration:</td>
                                <td style="color: #10b981; font-weight: 600;">12 Months (Active)</td>
                              </tr>
                              <tr>
                                <td style="color: #64748b;">Registered Email:</td>
                                <td style="color: #3b82f6;">${escapeHtml(data.customerEmail)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <p style="margin: 24px 0 0 0; font-size: 13px; color: #cbd5e1;">
                          Best regards,<br />
                          <strong>Treel Warranty &amp; Customer Support</strong><br />
                          <span style="color: #64748b; font-size: 12px;">Email: hello@treel.in · Helpline: 1800 833 0233 · https://treel.in</span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 18px 32px; background-color: #090d11; border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 11px; color: #64748b; text-align: center;">
                        Treel Mobility Solutions Pvt. Ltd. | S.No.6/1B, NDA Road, Pune, Maharashtra 411023
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `;

  const text = `Warranty Registration Confirmed: ${data.registrationId}\n\n${greeting}\n\nYour Treel TPMS product warranty has been registered successfully.\n\nRegistration ID: ${data.registrationId}\nOrder ID: ${data.orderId}\nProduct: ${data.productName}\nCoverage: 12 Months\nRegistered to: ${data.customerEmail}\n\nSupport helpline: 1800 833 0233 | hello@treel.in\nTreel Mobility Solutions Pvt. Ltd.`;

  return sendEmail({
    to: data.customerEmail,
    from: "Treel <hello@treel.in>",
    subject: `Warranty Registration Confirmed: ${data.registrationId} · Treel TPMS`,
    html,
    text,
  });
}

/**
 * Sends an acknowledgement email when a customer files a warranty service claim.
 */
export async function sendWarrantyClaimConfirmationEmail(
  data: WarrantyClaimConfirmationData
): Promise<IntegrationResult<SendEmailResult>> {
  const greeting = data.customerName ? `Dear ${escapeHtml(data.customerName)},` : "Hello,";

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Warranty Claim Ticket: ${escapeHtml(data.claimId)}</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0f1419; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #faf7f2;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0f1419; padding: 32px 0;">
          <tbody>
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #141b22; border: 1px solid rgba(213, 87, 59, 0.3); border-radius: 8px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
                  <tbody>
                    <tr>
                      <td style="padding: 24px 32px; background-color: #090d11; border-bottom: 2px solid #d5573b;">
                        <span style="font-size: 20px; font-weight: 800; letter-spacing: 2px; color: #faf7f2;">TREEL</span>
                        <span style="font-size: 11px; color: #d5573b; margin-left: 8px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Warranty Claim Desk</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 36px 32px;">
                        <h2 style="font-size: 22px; color: #faf7f2; margin: 0 0 14px 0; font-weight: 700;">
                          Warranty Claim Received
                        </h2>
                        <p style="font-size: 14px; line-height: 1.6; color: #94a3b8; margin: 0 0 20px 0;">
                          ${greeting}
                        </p>
                        <p style="font-size: 14px; line-height: 1.6; color: #cbd5e1; margin: 0 0 24px 0;">
                          We have received your warranty service request. Our technical operations desk will review your claim details and contact you at earliest with troubleshooting steps or replacement processing.
                        </p>

                        <div style="background-color: #090d11; border: 1px solid rgba(213, 87, 59, 0.2); border-radius: 6px; padding: 20px; margin-bottom: 24px;">
                          <h3 style="color: #faf7f2; font-size: 13px; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 1px; font-family: monospace;">
                            Claim Summary
                          </h3>
                          <table width="100%" cellpadding="4" cellspacing="0" border="0" style="font-size: 13px; color: #cbd5e1;">
                            <tbody>
                              <tr>
                                <td style="width: 140px; color: #64748b;">Claim Ticket ID:</td>
                                <td style="color: #d5573b; font-weight: 700; font-family: monospace;">${escapeHtml(data.claimId)}</td>
                              </tr>
                              <tr>
                                <td style="color: #64748b;">Order ID:</td>
                                <td style="color: #faf7f2; font-weight: 600;">${escapeHtml(data.orderId)}</td>
                              </tr>
                              <tr>
                                <td style="color: #64748b;">Issue Type:</td>
                                <td style="color: #faf7f2;">${escapeHtml(data.claimIssueType)}</td>
                              </tr>
                              <tr>
                                <td valign="top" style="color: #64748b;">Description:</td>
                                <td style="color: #94a3b8; white-space: pre-wrap;">${escapeHtml(data.claimDescription)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <p style="margin: 24px 0 0 0; font-size: 13px; color: #cbd5e1;">
                          Best regards,<br />
                          <strong>Treel Technical Support Desk</strong><br />
                          <span style="color: #64748b; font-size: 12px;">Email: hello@treel.in · Helpline: 1800 833 0233 · https://treel.in</span>
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 18px 32px; background-color: #090d11; border-top: 1px solid rgba(255, 255, 255, 0.08); font-size: 11px; color: #64748b; text-align: center;">
                        Treel Mobility Solutions Pvt. Ltd. | S.No.6/1B, NDA Road, Pune, Maharashtra 411023
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  `;

  const text = `Warranty Claim Ticket Received: ${data.claimId}\n\n${greeting}\n\nWe have received your warranty service request.\n\nClaim Ticket ID: ${data.claimId}\nOrder ID: ${data.orderId}\nIssue: ${data.claimIssueType}\nDescription: ${data.claimDescription}\n\nOur support team will contact you at earliest.\n\nHelpline: 1800 833 0233 | hello@treel.in\nTreel Mobility Solutions Pvt. Ltd.`;

  return sendEmail({
    to: data.customerEmail,
    from: "Treel <hello@treel.in>",
    subject: `Warranty Claim Received: ${data.claimId} · Treel Support`,
    html,
    text,
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
