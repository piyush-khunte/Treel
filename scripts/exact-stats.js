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

async function run() {
  const { count: payExactCount } = await supabase
    .from('TreelEcommerce.payments')
    .select('*', { count: 'exact', head: true });
  
  const { count: checkExactCount } = await supabase
    .from('TreelEcommerce.checkouts')
    .select('*', { count: 'exact', head: true });

  console.log('payments exact count:', payExactCount);
  console.log('checkouts exact count:', checkExactCount);

  // Fetch all payments in pages of 1000 to get exact total sum
  let allPayments = [];
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from('TreelEcommerce.payments')
      .select('amount, status, payment_id, createdAt')
      .range(from, from + 999);
    if (error || !data || data.length === 0) break;
    allPayments = allPayments.concat(data);
    if (data.length < 1000) break;
    from += 1000;
  }

  console.log('Total fetched payments:', allPayments.length);
  let totalPaiseNorm = 0;
  let totalRaw = 0;
  for (const p of allPayments) {
    const num = Number(p.amount) || 0;
    totalRaw += num;
    totalPaiseNorm += (num >= 50000 ? num / 100 : num);
  }
  console.log('All payments totalPaiseNorm:', totalPaiseNorm);

  // Also check checkouts prices
  let allCheckouts = [];
  from = 0;
  while (true) {
    const { data, error } = await supabase
      .from('TreelEcommerce.checkouts')
      .select('price, status')
      .range(from, from + 999);
    if (error || !data || data.length === 0) break;
    allCheckouts = allCheckouts.concat(data);
    if (data.length < 1000) break;
    from += 1000;
  }
  console.log('Total fetched checkouts:', allCheckouts.length);
  let totalCheckoutPrice = 0;
  let totalProcessedCheckoutPrice = 0;
  for (const c of allCheckouts) {
    const num = Number(c.price) || 0;
    totalCheckoutPrice += num;
    if (c.status !== 'pending' && c.status !== 'cancelled') {
      totalProcessedCheckoutPrice += num;
    }
  }
  console.log('All checkouts total price:', totalCheckoutPrice);
  console.log('Non-pending checkouts total price:', totalProcessedCheckoutPrice);
}

run();

