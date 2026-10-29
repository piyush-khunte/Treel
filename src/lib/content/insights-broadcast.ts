import { 
  TreelInsightArticle, 
  DeliveryLogEntry, 
  BroadcastStatus
} from "@/types/content";
import { isSesConfigured, sendEmail } from "@/lib/integrations/email/ses-client";
import { 
  getActiveSubscribers, 
  hasBroadcastBeenSent, 
  recordBroadcastLog 
} from "./subscriber-storage";

function escapeHtml(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export { getCanonicalSiteUrl } from "@/lib/utils/url";
import { getCanonicalSiteUrl } from "@/lib/utils/url";

export function generateInsightEmailHtml(
  article: TreelInsightArticle,
  recipient: { email: string; token?: string },
  siteUrl?: string
): string {
  const baseUrl = siteUrl || getCanonicalSiteUrl();
  const articleUrl = `${baseUrl}/insights/${article.slug}`;
  const unsubscribeUrl = recipient.token
    ? `${baseUrl}/unsubscribe?token=${recipient.token}&email=${encodeURIComponent(recipient.email)}`
    : `${baseUrl}/unsubscribe?email=${encodeURIComponent(recipient.email)}`;

  const categoryName = article.category || "Mobility Intelligence";
  const authorName = article.author || "Treel Team";
  const authorRole = article.authorRole ? ` · ${article.authorRole}` : "";
  const readTime = article.readTime || "5 min read";
  const dateFormatted = article.date || "Latest Publication";

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New on Treel Insights: ${escapeHtml(article.title)}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #0B0F14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FAF7F2;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0B0F14; padding: 32px 16px;">
      <tbody>
        <tr>
          <td align="center">
            <table width="640" cellpadding="0" cellspacing="0" border="0" style="max-width: 640px; width: 100%; background-color: #121820; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
              <tbody>
                <!-- Header / Brand Banner -->
                <tr>
                  <td style="padding: 24px 32px; background-color: #090D12; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tbody>
                        <tr>
                          <td align="left">
                            <a href="${baseUrl}" target="_blank" style="text-decoration: none;">
                              <span style="font-size: 22px; font-weight: 800; letter-spacing: 2px; color: #FAF7F2;">TREEL</span>
                            </a>
                            <span style="font-size: 11px; font-family: monospace; color: #D5573B; margin-left: 10px; letter-spacing: 1.5px; text-transform: uppercase;">
                              INSIGHTS
                            </span>
                          </td>
                          <td align="right" style="font-size: 12px; color: #94A3B8; font-family: monospace;">
                            ${escapeHtml(readTime)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                <!-- Category Badge & Date -->
                <tr>
                  <td style="padding: 32px 32px 16px 32px;">
                    <div style="display: inline-block; padding: 4px 10px; background-color: rgba(213, 87, 59, 0.15); border: 1px solid rgba(213, 87, 59, 0.35); border-radius: 4px; font-size: 11px; font-weight: 600; color: #D5573B; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px;">
                      ${escapeHtml(categoryName)}
                    </div>
                    <span style="font-size: 12px; color: #64748B; margin-left: 10px;">
                      ${escapeHtml(dateFormatted)}
                    </span>
                  </td>
                </tr>

                <!-- Article Headline -->
                <tr>
                  <td style="padding: 0 32px 16px 32px;">
                    <h1 style="margin: 0; font-size: 24px; line-height: 32px; font-weight: 700; color: #FAF7F2; letter-spacing: -0.3px;">
                      <a href="${articleUrl}" target="_blank" style="color: #FAF7F2; text-decoration: none;">
                        ${escapeHtml(article.title)}
                      </a>
                    </h1>
                  </td>
                </tr>

                <!-- Author Byline -->
                <tr>
                  <td style="padding: 0 32px 24px 32px; font-size: 13px; color: #94A3B8;">
                    By <strong style="color: #FAF7F2;">${escapeHtml(authorName)}</strong>${escapeHtml(authorRole)}
                  </td>
                </tr>

                <!-- Summary / Deck -->
                <tr>
                  <td style="padding: 0 32px 24px 32px;">
                    <div style="font-size: 15px; line-height: 24px; color: #CBD5E1; margin: 0;">
                      ${escapeHtml(article.deck || article.tldr || "")}
                    </div>
                  </td>
                </tr>

                ${
                  article.tldr
                    ? `
                <!-- Key Takeaway / Executive Summary Box -->
                <tr>
                  <td style="padding: 0 32px 28px 32px;">
                    <div style="background-color: rgba(255, 255, 255, 0.03); border-left: 3px solid #D5573B; padding: 16px 20px; border-radius: 0 8px 8px 0;">
                      <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #D5573B; margin-bottom: 6px;">
                        Executive Takeaway
                      </div>
                      <div style="font-size: 13px; line-height: 20px; color: #E2E8F0;">
                        ${escapeHtml(article.tldr)}
                      </div>
                    </div>
                  </td>
                </tr>
                `
                    : ""
                }

                <!-- Primary CTA Button -->
                <tr>
                  <td style="padding: 0 32px 36px 32px;" align="left">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tbody>
                        <tr>
                          <td align="center" style="border-radius: 6px; background-color: #D5573B;">
                            <a href="${articleUrl}" target="_blank" style="display: inline-block; padding: 14px 28px; font-size: 14px; font-weight: 600; color: #FFFFFF; text-decoration: none; border-radius: 6px; letter-spacing: 0.3px;">
                              Read Full Article &rarr;
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                <!-- Footer with Address & Unsubscribe Link -->
                <tr>
                  <td style="padding: 24px 32px; background-color: #090D12; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 12px; line-height: 18px; color: #64748B;">
                    <p style="margin: 0 0 10px 0;">
                      You are receiving this intelligence dispatch because you subscribed to Treel Mobility research and updates at <a href="${baseUrl}" style="color: #94A3B8; text-decoration: underline;">treel.in</a>.
                    </p>
                    <p style="margin: 0 0 12px 0;">
                      Treel Mobility Solutions Pvt. Ltd. &middot; S.No.6/1B, NDA Road, Pune, Maharashtra 411023, India
                    </p>
                    <p style="margin: 0;">
                      <a href="${unsubscribeUrl}" style="color: #D5573B; text-decoration: underline;">
                        Unsubscribe from these dispatches
                      </a>
                      &nbsp;&middot;&nbsp;
                      <a href="${baseUrl}/privacy" style="color: #94A3B8; text-decoration: underline;">
                        Privacy Policy
                      </a>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>`;
}

export function generateInsightEmailText(
  article: TreelInsightArticle,
  recipient: { email: string; token?: string },
  siteUrl?: string
): string {
  const baseUrl = siteUrl || getCanonicalSiteUrl();
  const articleUrl = `${baseUrl}/insights/${article.slug}`;
  const unsubscribeUrl = recipient.token
    ? `${baseUrl}/unsubscribe?token=${recipient.token}&email=${encodeURIComponent(recipient.email)}`
    : `${baseUrl}/unsubscribe?email=${encodeURIComponent(recipient.email)}`;

  return `New on Treel Insights: ${article.title}
${article.category ? `Category: ${article.category}\n` : ""}By ${article.author || "Treel Team"} (${article.date || "Latest Publication"})

${article.deck || article.tldr || ""}

${article.tldr ? `Key Takeaway:\n${article.tldr}\n\n` : ""}Read the full article:
${articleUrl}

---
You received this dispatch because you subscribed to Treel Mobility Intelligence updates.
To unsubscribe or manage your communication preferences:
${unsubscribeUrl}

Treel Mobility Solutions Pvt. Ltd., S.No.6/1B, NDA Road, Pune, Maharashtra 411023, India`;
}

export interface BroadcastOptions {
  force?: boolean;
  testEmail?: string;
  siteUrl?: string;
}

export interface BroadcastResult {
  success: boolean;
  skipped?: boolean;
  reason?: string;
  status: BroadcastStatus;
  articleSlug: string;
  recipientCount: number;
  deliveredCount: number;
  failedCount: number;
  error?: string;
  deliveryLogs: DeliveryLogEntry[];
}

/**
 * Broadcasts a publication email notification for a newly published Insight article.
 * Guarantees idempotency: will not send twice to the same article unless force=true.
 */
export async function dispatchInsightNotification(
  article: TreelInsightArticle,
  options: BroadcastOptions = {}
): Promise<BroadcastResult> {
  const isTest = Boolean(options.testEmail && options.testEmail.trim());
  const baseUrl = options.siteUrl || getCanonicalSiteUrl();

  // 1. Check idempotency (prevent duplicate notifications on edit / re-save)
  if (!options.force && !isTest) {
    const alreadySent = await hasBroadcastBeenSent(article.slug);
    if (alreadySent) {
      return {
        success: true,
        skipped: true,
        reason: "Broadcast notification has already been sent for this insight.",
        status: "sent",
        articleSlug: article.slug,
        recipientCount: 0,
        deliveredCount: 0,
        failedCount: 0,
        deliveryLogs: [],
      };
    }
  }

  // 2. Determine recipients
  let targetRecipients: { email: string; token: string }[] = [];

  if (isTest) {
    targetRecipients = [
      {
        email: options.testEmail!.trim().toLowerCase(),
        token: "test_token_preview_only",
      },
    ];
  } else {
    const activeSubscribers = await getActiveSubscribers();
    targetRecipients = activeSubscribers.map((s) => ({
      email: s.email,
      token: s.token,
    }));
  }

  if (targetRecipients.length === 0) {
    return {
      success: true,
      skipped: true,
      reason: "No active subscribers found to receive broadcast.",
      status: "sent",
      articleSlug: article.slug,
      recipientCount: 0,
      deliveredCount: 0,
      failedCount: 0,
      deliveryLogs: [],
    };
  }

  // 3. Check SES configuration & test mode
  const sesReady = isSesConfigured();
  const testMode = process.env.SES_TEST_MODE === "true" || !sesReady;
  const allowlistRaw = process.env.SES_TEST_ALLOWLIST || "";
  const allowlist = allowlistRaw
    ? allowlistRaw.split(",").map((e) => e.trim().toLowerCase())
    : [];

  const senderEmail = process.env.SES_FROM_EMAIL || process.env.FROM_EMAIL || "hello@treel.in";
  const emailSubject = `New on Treel Insights: ${article.title}`;

  const deliveryLogs: DeliveryLogEntry[] = [];
  let deliveredCount = 0;
  let failedCount = 0;

  for (const recipient of targetRecipients) {
    const html = generateInsightEmailHtml(article, recipient, baseUrl);
    const text = generateInsightEmailText(article, recipient, baseUrl);

    // If in test mode without SES, record simulation
    if (testMode) {
      deliveryLogs.push({
        email: recipient.email,
        status: "delivered",
        messageId: `simulated_msg_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      });
      deliveredCount++;
      continue;
    }

    // Check allowlist if in restricted testing mode
    if (allowlist.length > 0 && !allowlist.includes(recipient.email.toLowerCase())) {
      deliveryLogs.push({
        email: recipient.email,
        status: "skipped",
        error: "Omitted: Email address not on SES_TEST_ALLOWLIST.",
      });
      continue;
    }

    try {
      const sesResult = await sendEmail({
        from: senderEmail,
        to: recipient.email,
        subject: emailSubject,
        html,
        text,
        replyTo: "hello@treel.in",
      });

      if (sesResult.success) {
        deliveredCount++;
        deliveryLogs.push({
          email: recipient.email,
          status: "delivered",
          messageId: sesResult.data?.messageId,
        });
      } else {
        failedCount++;
        deliveryLogs.push({
          email: recipient.email,
          status: "failed",
          error: sesResult.error?.message || "SES delivery failure",
        });
      }

      // Safe rate-limiting throttle (100ms between calls)
      if (targetRecipients.length > 1) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Unexpected email dispatch error";
      failedCount++;
      deliveryLogs.push({
        email: recipient.email,
        status: "failed",
        error: errMsg,
      });
    }
  }

  const broadcastStatus: BroadcastStatus = isTest
    ? "test_mode"
    : testMode
    ? "test_mode"
    : failedCount === 0
    ? "sent"
    : deliveredCount > 0
    ? "partial"
    : "failed";

  // 4. Log broadcast record for persistence & idempotency
  if (!isTest) {
    await recordBroadcastLog({
      articleSlug: article.slug,
      articleTitle: article.title,
      articleExcerpt: article.deck || article.tldr || "",
      sentAt: new Date().toISOString(),
      recipientCount: targetRecipients.length,
      status: broadcastStatus,
      deliveredCount,
      failedCount,
      error: failedCount > 0 ? `${failedCount} deliveries failed` : undefined,
      deliveryLogs,
    });
  }

  return {
    success: deliveredCount > 0 || (isTest && targetRecipients.length > 0),
    status: broadcastStatus,
    articleSlug: article.slug,
    recipientCount: targetRecipients.length,
    deliveredCount,
    failedCount,
    deliveryLogs,
  };
}

