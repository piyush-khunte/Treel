export async function register() {
  // Only execute on server startup in development mode
  if (process.env.NEXT_RUNTIME === 'nodejs' && process.env.NODE_ENV === 'development') {
    const { checkSupabaseDevConnection } = await import('@/lib/supabase/connection-check');
    await checkSupabaseDevConnection();
  }
}
