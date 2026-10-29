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
  const { data, count, error } = await supabase
    .from('TreelEcommerce.checkouts')
    .select('*', { count: 'exact' })
    .limit(10);

  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log('Total checkouts count:', count);
  if (data && data.length > 0) {
    console.log('Columns:', Object.keys(data[0]));
    console.log('Sample rows:');
    data.forEach(r => {
      console.log({
        _id: r._id,
        status: r.status,
        price: r.price,
        orderid: r.orderid,
        firstname: r.firstname,
        lastname: r.lastname,
        date: r.date,
        createdat: r.createdat || r.createdAt
      });
    });
  }

  // Count by status
  const { data: allStatuses, error: stErr } = await supabase
    .from('TreelEcommerce.checkouts')
    .select('status, price');
  
  if (allStatuses) {
    const counts = {};
    let sumPrice = 0;
    allStatuses.forEach(r => {
      const st = r.status || 'null';
      counts[st] = (counts[st] || 0) + 1;
      sumPrice += Number(r.price) || 0;
    });
    console.log('Status counts across all checkouts:', counts);
    console.log('Sum of checkout price:', sumPrice);
  }
}

run();

