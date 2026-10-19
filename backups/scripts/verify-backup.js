/**
 * ============================================================================
 * Supabase Backup Verification Utility
 * File: backups/scripts/verify-backup.js
 * 
 * Verifies that all files in a backup directory exist, match their recorded
 * file sizes, and match their SHA-256 cryptographic hashes.
 * ============================================================================
 */

const path = require('path');
const fs = require('fs');
const { verifyBackup } = require('./backup-engine');

const projectRoot = path.resolve(__dirname, '../..');

function main() {
  const args = process.argv.slice(2);
  let targetDir = args[0];

  if (!targetDir) {
    const baseDir = path.join(projectRoot, 'backups', 'supabase');
    if (fs.existsSync(baseDir)) {
      const dirs = fs.readdirSync(baseDir)
        .filter(d => fs.statSync(path.join(baseDir, d)).isDirectory() && d.match(/^\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}$/))
        .sort();
      if (dirs.length > 0) {
        targetDir = path.join(baseDir, dirs[dirs.length - 1]);
      }
    }
  }

  if (!targetDir) {
    console.error('No backup directory found to verify.');
    process.exit(1);
  }

  try {
    verifyBackup(targetDir);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

