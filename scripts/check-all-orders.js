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
  // Fetch all checkouts
  let allCheckouts = [];
  let from = 0;
  const step = 500;
  while (true) {
    const { data, error } = await supabase
      .from('TreelEcommerce.checkouts')
      .select('_id, date, status, price, firstname, lastname, phone')
      .order('date', { ascending: false })
      .range(from, from + step - 1);
    if (error) {
      console.error(error);
      break;
    }
    if (!data || data.length === 0) break;
    allCheckouts = allCheckouts.concat(data);
    if (data.length < step) break;
    from += step;
  }

  console.log('Fetched total checkouts:', allCheckouts.length);
  console.log('Top 20 most recent checkouts:');
  allCheckouts.slice(0, 20).forEach((c, i) => {
    console.log(`${i + 1}. ID: ${c._id} | Date: ${c.date} | Status: ${c.status} | Price: ${c.price} | Name: ${c.firstname} ${c.lastname} | Phone: ${c.phone}`);
  });

  // Check how many have TRL-ORD or TRL-COD
  const trlOrders = allCheckouts.filter(c => (c._id || '').startsWith('TRL-'));
  console.log('\nCheckouts with TRL- prefix:', trlOrders.length);
  trlOrders.forEach(c => {
    console.log(` - ${c._id} | ${c.date} | ${c.status} | ₹${c.price} | ${c.firstname} ${c.lastname}`);
  });

  // Check how many have valid non-empty names or real orders vs old dummy/imported data
  const statusCounts = {};
  let totalRevenueAll = 0;
  let totalRevenueCompleted = 0;
  let totalRevenueProcessing = 0;
  let totalRevenueTrl = 0;

  for (const c of allCheckouts) {
    const st = (c.status || 'unknown').toLowerCase();
    statusCounts[st] = (statusCounts[st] || 0) + 1;
    const price = Number(c.price) || 0;
    totalRevenueAll += price;
    if (st === 'completed' || st === 'delivered' || st === 'paid' || st === 'processing') {
      totalRevenueCompleted += price;
    }
    if (st === 'processing') {
      totalRevenueProcessing += price;
    }
    if ((c._id || '').startsWith('TRL-')) {
      totalRevenueTrl += price;
    }
  }

  console.log('\nStatus counts:', statusCounts);
  console.log('Total Price of ALL 1199 checkouts: ₹', totalRevenueAll);
  console.log('Total Price of completed/processing checkouts: ₹', totalRevenueCompleted);
  console.log('Total Price of TRL- orders: ₹', totalRevenueTrl);
}

run();

