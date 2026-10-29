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
  console.log('Connecting to', url);

  // 1. Check all payments
  const { data: allPayments, error: payErr } = await supabase
    .from('TreelEcommerce.payments')
    .select('*');
  
  if (payErr) {
    console.error('payErr:', payErr);
  } else {
    console.log('--- PAYMENTS ---');
    console.log('Total payment records:', allPayments.length);
    let sumPaiseNormalized = 0;
    let sumRaw = 0;
    const paymentStatuses = {};
    for (const p of allPayments) {
      const num = Number(p.amount) || 0;
      sumRaw += num;
      const normalized = num >= 50000 ? num / 100 : num;
      sumPaiseNormalized += normalized;
      const st = p.status || 'no_status';
      paymentStatuses[st] = (paymentStatuses[st] || 0) + 1;
    }
    console.log('Payment statuses count:', paymentStatuses);
    console.log('Total Revenue (paise normalized >= 50000):', sumPaiseNormalized);
    console.log('Total Revenue (raw):', sumRaw);
    console.log('All payments list:');
    allPayments.forEach(p => {
      console.log(` - ID: ${p.payment_id}, Amount: ${p.amount}, Status: ${p.status}, Customer: ${p.customer_name}, Created: ${p.createdAt}`);
    });
  }

  // 2. Check checkouts
  const { data: checkouts, error: checkErr } = await supabase
    .from('TreelEcommerce.checkouts')
    .select('_id, orderRef, status, price, date, firstname, lastname');

  if (checkErr) {
    console.error('checkErr:', checkErr);
  } else {
    console.log('\n--- CHECKOUTS ---');
    console.log('Total checkouts count:', checkouts.length);
    const checkoutStatuses = {};
    let totalCheckoutPrice = 0;
    for (const c of checkouts) {
      const st = c.status || 'no_status';
      checkoutStatuses[st] = (checkoutStatuses[st] || 0) + 1;
      totalCheckoutPrice += Number(c.price) || 0;
    }
    console.log('Checkout statuses breakdown:', checkoutStatuses);
    console.log('Total checkout price sum:', totalCheckoutPrice);
    console.log('Sample recent checkouts:', checkouts.slice(0, 10));
  }
}

run();

