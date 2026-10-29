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
  const { data: payments } = await supabase
    .from('TreelEcommerce.payments')
    .select('*')
    .limit(10);

  console.log('Sample payments:');
  payments.forEach(p => {
    console.log(`Payment: ${p.payment_id} | OrderID: ${p.order_id} | Amount: ${p.amount} | Name: ${p.customer_name}`);
  });

  const { data: checkouts } = await supabase
    .from('TreelEcommerce.checkouts')
    .select('_id, price, status, firstname, lastname')
    .limit(10);

  console.log('\nSample checkouts:');
  checkouts.forEach(c => {
    console.log(`Checkout: ${c._id} | Status: ${c.status} | Price: ${c.price} | Name: ${c.firstname} ${c.lastname}`);
  });
}

run();

