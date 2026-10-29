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

async function testOps() {
  const { getAllMediaKitItems, saveMediaKitItem, deleteMediaKitItem } = require('../src/lib/content/mediakit-storage.ts');
  console.log('Testing operations...');
}

