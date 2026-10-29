const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    value = value.trim().replace(/^['"]|['"]$/g, '');
    env[match[1]] = value;
  }
});

const url = env.SUPABASE_URL;
const key = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(url, key, { auth: { persistSession: false } });

function normalizePaymentAmount(rawAmount) {
  const num = Number(rawAmount) || 0;
  if (num >= 50000) {
    return num / 100;
  }
  return num;
}

async function testOverview() {
  const [prodsRes, checksRes, recentChecksRes, allPaysRes, recentPaysRes, blogsRes] = await Promise.all([
    supabase.from('TreelEcommerce.products').select('*', { count: 'exact', head: true }),
    supabase.from('TreelEcommerce.checkouts').select('*', { count: 'exact', head: true }),
    supabase.from('TreelEcommerce.checkouts').select('*').order('date', { ascending: false }).limit(5),
    supabase.from('TreelEcommerce.payments').select('amount', { count: 'exact' }),
    supabase.from('TreelEcommerce.payments').select('*').order('createdAt', { ascending: false }).limit(5),
    supabase.from('TreelEcommerce.blogs').select('*', { count: 'exact', head: true })
  ]);

  console.log('Products count:', prodsRes.count);
  console.log('Checkouts count:', checksRes.count);
  console.log('Payments count:', allPaysRes.count);
  console.log('Blogs count:', blogsRes.count);

  const totalRevenue = (allPaysRes.data || []).reduce((acc, p) => acc + normalizePaymentAmount(p.amount), 0);
  console.log('Calculated Total Revenue across ALL payments:', totalRevenue);

  const formattedRevenue = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(totalRevenue);
  console.log('Formatted Total Revenue:', formattedRevenue);

  console.log('\nRecent payments (top 5):');
  recentPaysRes.data.forEach(p => {
    console.log(` - ${p.payment_id} | ${p.customer_name} | Raw: ${p.amount} | Normalized: ${normalizePaymentAmount(p.amount)}`);
  });

  console.log('\nRecent checkouts (top 5):');
  recentChecksRes.data.forEach(c => {
    console.log(` - ${c._id} | ${c.firstname} ${c.lastname} | Price: ${c.price} | Status: ${c.status}`);
  });
}

testOverview();

