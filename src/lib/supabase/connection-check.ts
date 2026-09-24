import { createClient } from '@supabase/supabase-js';

declare global {
  // Prevent duplicate execution during dev server initialization
  var __supabase_dev_check_executed__: boolean | undefined;
}

/**
 * Performs a safe, read-only Supabase connectivity check on dev server startup.
 * Never modifies any data. Never prints secret keys, passwords, or connection strings.
 */
export async function checkSupabaseDevConnection(): Promise<void> {
  // Ensure check runs only once during development server startup
  if (global.__supabase_dev_check_executed__) {
    return;
  }
  global.__supabase_dev_check_executed__ = true;

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const isMissingOrPlaceholder =
    !url ||
    !key ||
    url.trim().length === 0 ||
    key.trim().length === 0 ||
    url.includes('placeholder-treel.supabase.co') ||
    key.includes('placeholder-key') ||
    key.includes('placeholder-anon-key');

  if (isMissingOrPlaceholder) {
    console.log('\n✗ Supabase connection failed');
    console.log('  Reason: Missing Supabase environment configuration\n');
    return;
  }

  try {
    const supabase = createClient(url, key, {
      auth: { persistSession: false },
    });

    // Harmless, read-only query retrieving 1 record ID from known table
    const { error, status } = await supabase
      .from('TreelEcommerce.products')
      .select('_id')
      .limit(1);

    if (error) {
      console.log('\n✗ Supabase connection failed');
      const safeReason = error.message
        ? sanitizeMessage(error.message)
        : `Database query returned status ${status}`;
      console.log(`  Reason: Database query failed (${safeReason})\n`);
      return;
    }

    console.log('\n✓ Supabase connected');
    console.log('  Database: reachable');
    console.log('  Read-only check: passed\n');
  } catch (err: unknown) {
    const rawMessage = err instanceof Error ? err.message : 'Unknown network error';
    console.log('\n✗ Supabase connection failed');
    console.log(`  Reason: ${sanitizeMessage(rawMessage)}\n`);
  }
}

/**
 * Strips any potential sensitive tokens, URLs, or keys from error messages.
 */
function sanitizeMessage(msg: string): string {
  return msg
    .replace(/https?:\/\/[^\s]+/gi, '[REDACTED_URL]')
    .replace(/eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/g, '[REDACTED_JWT]')
    .replace(/(key|secret|password|token)=[^\s&]+/gi, '$1=[REDACTED]');
}
