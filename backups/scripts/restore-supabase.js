/**
 * ============================================================================
 * Supabase Disaster Recovery & Restore Engine for Treel
 * File: backups/scripts/restore-supabase.js
 * 
 * Safety Features:
 * - Integrity Pre-flight: Validates SHA-256 hashes against manifest before restoring.
 * - Dry Run Mode: Supports --dry-run to preview what will be restored without writing.
 * - Selective Restore: Can restore specific tables, storage buckets, or full project.
 * - Idempotent Upserts: Prevents primary key collisions and duplicates.
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const { verifyBackup, loadEnv } = require('./backup-engine');

const projectRoot = path.resolve(__dirname, '../..');

async function runRestore(backupDir, options = {}) {
  console.log('================================================================');
  console.log('TREEL SUPABASE DISASTER RECOVERY RESTORATION');
  console.log('================================================================');
  console.log(`Source Backup: ${backupDir}`);
  console.log(`Dry Run Mode: ${options.dryRun ? 'ENABLED (No changes will be written)' : 'DISABLED (Live restore)'}`);

  if (!fs.existsSync(backupDir)) {
    throw new Error(`Backup directory does not exist: ${backupDir}`);
  }

  // 1. Pre-flight Verification
  console.log('\n--- Pre-flight: Verifying Backup Integrity ---');
  verifyBackup(backupDir);

  const manifestPath = path.join(backupDir, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  const env = loadEnv();
  const supabaseUrl = env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    throw new Error('Supabase URL or Secret Key not found in .env');
  }

  const { createClient } = require(path.join(projectRoot, 'node_modules/@supabase/supabase-js'));
  const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  // 2. Restore Database Tables
  if (!options.storageOnly) {
    console.log('\n--- Restoring Database Tables ---');
    const tableKeys = Object.keys(manifest.database.tables);

    for (const tableName of tableKeys) {
      if (options.tables && !options.tables.includes(tableName)) {
        console.log(`  Skipping table public."${tableName}" (filtered out)`);
        continue;
      }

      const tableMeta = manifest.database.tables[tableName];
      const jsonPath = path.join(backupDir, tableMeta.json_file);

      if (!fs.existsSync(jsonPath)) {
        console.warn(`  Warning: JSON file missing for table ${tableName} at ${jsonPath}`);
        continue;
      }

      const rows = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      console.log(`  Table: public."${tableName}" (${rows.length} records to restore)...`);

      if (options.dryRun) {
        console.log(`    [DRY RUN] Would upsert ${rows.length} rows into public."${tableName}"`);
        continue;
      }

      if (rows.length === 0) {
        console.log(`    Table public."${tableName}" is empty. Skipping insertion.`);
        continue;
      }

      // Determine primary key
      const firstRow = rows[0];
      const pk = firstRow.hasOwnProperty('_id') ? '_id' : firstRow.hasOwnProperty('id') ? 'id' : undefined;

      const batchSize = 100;
      let restoredCount = 0;

      for (let i = 0; i < rows.length; i += batchSize) {
        const batch = rows.slice(i, i + batchSize);
        const { error } = pk
          ? await supabase.from(tableName).upsert(batch, { onConflict: pk })
          : await supabase.from(tableName).insert(batch);

        if (error) {
          throw new Error(`Failed to restore public."${tableName}" batch ${i}-${i + batch.length}: ${error.message}`);
        }
        restoredCount += batch.length;
      }
      console.log(`    Successfully restored ${restoredCount} rows into public."${tableName}"`);
    }
  }

  // 3. Restore Storage Buckets
  if (!options.dbOnly) {
    console.log('\n--- Restoring Supabase Storage Buckets ---');
    const bucketsMetaPath = path.join(backupDir, 'storage', 'buckets_metadata.json');

    if (fs.existsSync(bucketsMetaPath)) {
      const bucketsMeta = JSON.parse(fs.readFileSync(bucketsMetaPath, 'utf8'));

      for (const bucket of bucketsMeta) {
        console.log(`  Processing Storage Bucket: "${bucket.name}" (Public: ${bucket.public})...`);

        if (!options.dryRun) {
          // Ensure bucket exists or create it
          const { data: existingBuckets } = await supabase.storage.listBuckets();
          const bucketExists = (existingBuckets || []).some(b => b.name === bucket.name);

          if (!bucketExists) {
            console.log(`    Bucket "${bucket.name}" not found. Creating...`);
            const { error: createErr } = await supabase.storage.createBucket(bucket.name, {
              public: bucket.public
            });
            if (createErr) {
              console.warn(`    Warning: Could not create bucket "${bucket.name}": ${createErr.message}`);
            }
          }
        }

        const bucketDir = path.join(backupDir, 'storage', bucket.name);
        for (const file of bucket.files) {
          const filePath = path.join(bucketDir, file.full_path);
          if (!fs.existsSync(filePath)) {
            console.warn(`    Warning: Missing local file for upload: ${file.full_path}`);
            continue;
          }

          if (options.dryRun) {
            console.log(`    [DRY RUN] Would upload "${file.full_path}" (${file.size_bytes} bytes) to bucket "${bucket.name}"`);
            continue;
          }

          const fileBuffer = fs.readFileSync(filePath);
          const { error: upErr } = await supabase.storage
            .from(bucket.name)
            .upload(file.full_path, fileBuffer, {
              contentType: file.content_type,
              upsert: true
            });

          if (upErr) {
            console.warn(`    Warning: Upload failed for ${file.full_path}: ${upErr.message}`);
          } else {
            console.log(`    Uploaded: ${file.full_path} (${file.size_bytes} bytes)`);
          }
        }
      }
    } else {
      console.log('  No storage buckets metadata found in backup.');
    }
  }

  console.log('\n================================================================');
  console.log(`RESTORE OPERATION ${options.dryRun ? 'DRY-RUN SIMULATION' : ''} COMPLETE`);
  console.log('================================================================\n');
}

// CLI Execution Entry Point
if (require.main === module) {
  const args = process.argv.slice(2);
  let backupDir = null;
  const options = {
    dryRun: args.includes('--dry-run'),
    dbOnly: args.includes('--db-only'),
    storageOnly: args.includes('--storage-only'),
    tables: null
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--dir' && args[i + 1]) {
      backupDir = path.resolve(args[i + 1]);
      i++;
    } else if (args[i] === '--tables' && args[i + 1]) {
      options.tables = args[i + 1].split(',').map(s => s.trim());
      i++;
    }
  }

  if (!backupDir) {
    // Default to the latest backup in backups/supabase
    const baseDir = path.join(projectRoot, 'backups', 'supabase');
    if (fs.existsSync(baseDir)) {
      const dirs = fs.readdirSync(baseDir)
        .filter(d => fs.statSync(path.join(baseDir, d)).isDirectory() && d.match(/^\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}$/))
        .sort();
      if (dirs.length > 0) {
        backupDir = path.join(baseDir, dirs[dirs.length - 1]);
      }
    }
  }

  if (!backupDir) {
    console.error('Usage: node restore-supabase.js --dir <path-to-backup-dir> [--dry-run] [--db-only] [--storage-only] [--tables table1,table2]');
    process.exit(1);
  }

  runRestore(backupDir, options).catch(err => {
    console.error('RESTORE FAILED:', err);
    process.exit(1);
  });
}

module.exports = { runRestore };

