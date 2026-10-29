const fs = require('fs');
let envFile = fs.readFileSync('.env', 'utf8');
envFile.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    value = value.trim().replace(/^['"]|['"]$/g, '');
    process.env[match[1]] = value;
  }
});

const { createClient } = require('@supabase/supabase-js');
const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(url, key, { auth: { persistSession: false } });

// Check what getAllMediaKitItems in mediakit-storage.ts does
async function run() {
  const res = await supabase.from("TreelEcommerce.t_test").select("*").eq("testKey", "treel_mediakit");
  console.log('Supabase items count:', res.data?.length);
  const ids = res.data?.map(r => r._id);
  console.log('Supabase item IDs:', ids);
}
run();

