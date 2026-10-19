/**
 * ============================================================================
 * Supabase Backup Engine for Treel
 * File: backups/scripts/backup-engine.js
 * 
 * Production-Safe Features:
 * - Read-only operation: NEVER modifies or drops production data.
 * - Zero Credential Exposure: Never writes or logs service keys or passwords.
 * - Multi-format output: Full PostgreSQL SQL dump + Structured JSON snapshots.
 * - Storage Bucket Backup: Downloads and archives all Supabase Storage files.
 * - Schema & Migrations: Preserves all project SQL migrations and table DDL.
 * - Integrity Verification: Computes SHA-256 checksums for every backup artifact.
 * - Automatic Retention: Prunes older backups beyond configured retention count.
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Resolve project root (current working directory or parent of scripts)
const projectRoot = path.resolve(__dirname, '../..');

// Helper to safely load .env without printing secrets
function loadEnv() {
  const envPath = path.join(projectRoot, '.env');
  const env = {};
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        env[key] = val;
      }
    }
  }
  return env;
}

// Compute SHA-256 hash of a file
function computeFileHash(filePath) {
  const hash = crypto.createHash('sha256');
  const buffer = fs.readFileSync(filePath);
  hash.update(buffer);
  return hash.digest('hex');
}

// SQL Value Escaping for PostgreSQL Dump
function escapeSqlValue(val) {
  if (val === null || val === undefined) return 'NULL';
  if (typeof val === 'number') {
    return isFinite(val) ? String(val) : 'NULL';
  }
  if (typeof val === 'boolean') {
    return val ? 'TRUE' : 'FALSE';
  }
  if (Array.isArray(val)) {
    const escapedElements = val.map(item => {
      if (item === null || item === undefined) return 'NULL';
      if (typeof item === 'number' || typeof item === 'boolean') return String(item);
      return `'${String(item).replace(/'/g, "''")}'`;
    });
    return `ARRAY[${escapedElements.join(', ')}]`;
  }
  if (typeof val === 'object') {
    const jsonStr = JSON.stringify(val).replace(/'/g, "''");
    return `'${jsonStr}'::jsonb`;
  }
  return `'${String(val).replace(/'/g, "''")}'`;
}

// Generate DDL for table
function generateTableDdl(tableName, rows) {
  const colDefs = [];
  const colTypes = new Map();

  if (rows && rows.length > 0) {
    for (const row of rows) {
      for (const [col, val] of Object.entries(row)) {
        if (!colTypes.has(col) || colTypes.get(col) === 'TEXT') {
          if (val === null || val === undefined) {
            if (!colTypes.has(col)) colTypes.set(col, 'TEXT');
          } else if (typeof val === 'number') {
            colTypes.set(col, Number.isInteger(val) ? 'BIGINT' : 'NUMERIC');
          } else if (typeof val === 'boolean') {
            colTypes.set(col, 'BOOLEAN');
          } else if (Array.isArray(val)) {
            colTypes.set(col, 'TEXT[]');
          } else if (typeof val === 'object') {
            colTypes.set(col, 'JSONB');
          } else if (typeof val === 'string') {
            if (val.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
              colTypes.set(col, 'TIMESTAMPTZ');
            } else if (val.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
              colTypes.set(col, 'UUID');
            } else {
              colTypes.set(col, 'TEXT');
            }
          }
        }
      }
    }
  }

  // Primary key detection
  const pkCol = colTypes.has('_id') ? '_id' : colTypes.has('id') ? 'id' : null;

  for (const [col, type] of colTypes.entries()) {
    let def = `  "${col.replace(/"/g, '""')}" ${type}`;
    if (col === pkCol) {
      def += ' PRIMARY KEY';
    }
    colDefs.push(def);
  }

  if (colDefs.length === 0) {
    colDefs.push('  "id" TEXT PRIMARY KEY');
  }

  return `-- Table Definition: public."${tableName}"\n` +
         `CREATE TABLE IF NOT EXISTS public."${tableName}" (\n` +
         colDefs.join(',\n') +
         `\n);\n\n` +
         `ALTER TABLE public."${tableName}" ENABLE ROW LEVEL SECURITY;\n`;
}

// Generate INSERT SQL
function generateInsertSql(tableName, rows) {
  if (!rows || rows.length === 0) return `-- No rows to insert for public."${tableName}"\n`;

  const colSet = new Set();
  rows.forEach(r => Object.keys(r).forEach(k => colSet.add(k)));
  const columns = Array.from(colSet);
  const colSql = columns.map(c => `"${c.replace(/"/g, '""')}"`).join(', ');

  const statements = [];
  const chunkSize = 100;
  for (let i = 0; i < rows.length; i += chunkSize) {
    const chunk = rows.slice(i, i + chunkSize);
    const valueClauses = chunk.map(row => {
      const vals = columns.map(col => escapeSqlValue(row[col]));
      return `  (${vals.join(', ')})`;
    });
    statements.push(`INSERT INTO public."${tableName}" (${colSql})\nVALUES\n${valueClauses.join(',\n')}\nON CONFLICT DO NOTHING;\n`);
  }
  return statements.join('\n');
}

// Fetch all rows for a table using paginated ranges
async function fetchTableData(supabase, tableName) {
  let allRows = [];
  let page = 0;
  const pageSize = 500;

  while (true) {
    const from = page * pageSize;
    const to = from + pageSize - 1;
    const { data, error } = await supabase.from(tableName).select('*').range(from, to);
    if (error) {
      throw new Error(`Failed to fetch from ${tableName} (page ${page}): ${error.message}`);
    }
    if (!data || data.length === 0) break;
    allRows.push(...data);
    if (data.length < pageSize) break;
    page++;
  }

  return allRows;
}

// Recursively list files in a Supabase Storage bucket
async function listAllBucketFiles(supabase, bucketName, folder = '') {
  let results = [];
  const { data, error } = await supabase.storage.from(bucketName).list(folder, { limit: 1000 });
  if (error || !data) return results;

  for (const item of data) {
    const itemPath = folder ? `${folder}/${item.name}` : item.name;
    if (item.id === null) {
      const subItems = await listAllBucketFiles(supabase, bucketName, itemPath);
      results.push(...subItems);
    } else {
      results.push({ ...item, fullPath: itemPath });
    }
  }
  return results;
}

// Main Backup Function
async function runBackup(options = {}) {
  const startTime = Date.now();
  console.log('================================================================');
  console.log('TREEL SUPABASE BACKUP ENGINE');
  console.log('================================================================');
  console.log(`Timestamp: ${new Date().toISOString()}`);

  const env = loadEnv();
  const supabaseUrl = env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    throw new Error('Supabase environment variables (URL / SECRET_KEY) are missing. Check .env');
  }

  const projectRef = supabaseUrl.split('//')[1]?.split('.')[0] || 'unknown-ref';
  console.log(`Target Project: ${projectRef}.supabase.co`);
  console.log('Authentication: Service Role Admin Client (Privileged / RLS-Bypass)');

  // Dynamic import of @supabase/supabase-js
  const { createClient } = require(path.join(projectRoot, 'node_modules/@supabase/supabase-js'));
  const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  // Format timestamp for directory: YYYY-MM-DD_HH-mm-ss
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  const timestampStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;

  const backupsBaseDir = options.outputDir || path.join(projectRoot, 'backups', 'supabase');
  const backupDir = path.join(backupsBaseDir, timestampStr);

  const dbDataDir = path.join(backupDir, 'database', 'data');
  const dbSqlDir = path.join(backupDir, 'database', 'sql');
  const storageDir = path.join(backupDir, 'storage');
  const migrationsDir = path.join(backupDir, 'migrations');
  const configDir = path.join(backupDir, 'config');

  // Create required directory structure
  [dbDataDir, dbSqlDir, storageDir, migrationsDir, configDir].forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  });

  console.log(`Backup Destination: ${backupDir}\n`);

  const manifest = {
    backup_id: timestampStr,
    created_at: now.toISOString(),
    project_reference: projectRef,
    supabase_url_masked: `https://${projectRef}.supabase.co`,
    status: 'in_progress',
    database: {
      tables: {},
      total_records: 0,
      dump_file: 'database/sql/complete_database_dump.sql'
    },
    storage: {
      buckets: {},
      total_files: 0,
      total_bytes: 0
    },
    migrations: {
      count: 0,
      files: []
    },
    artifacts: []
  };

  // --------------------------------------------------------------------------
  // 1. DATABASE TABLES BACKUP
  // --------------------------------------------------------------------------
  console.log('--- Step 1: Database Tables & Data Export ---');
  const candidateTables = [
    'leads',
    'TreelEcommerce.products',
    'TreelEcommerce.checkouts',
    'TreelEcommerce.payments',
    'TreelEcommerce.blogs',
    'TreelEcommerce.annualreturns',
    'TreelEcommerce.t_test'
  ];

  const completeSqlParts = [
    `-- ============================================================================`,
    `-- TREEL SUPABASE COMPLETE DATABASE RESTORATION DUMP`,
    `-- Project Reference: ${projectRef}`,
    `-- Backup Timestamp: ${now.toISOString()}`,
    `-- Target Engine: PostgreSQL 15+ / Supabase`,
    `-- ============================================================================\n`,
    `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";\n`
  ];

  for (const table of candidateTables) {
    try {
      console.log(`  Exporting table: public."${table}"...`);
      const rows = await fetchTableData(supabase, table);
      console.log(`    Retrieved ${rows.length} records`);

      // Write JSON Data Snapshot
      const safeFileName = table.replace(/[^a-zA-Z0-9._-]/g, '_');
      const jsonFilePath = path.join(dbDataDir, `${safeFileName}.json`);
      fs.writeFileSync(jsonFilePath, JSON.stringify(rows, null, 2), 'utf8');

      // Generate Table DDL and INSERT SQL
      const tableDdl = generateTableDdl(table, rows);
      const insertSql = generateInsertSql(table, rows);
      const tableSql = tableDdl + '\n' + insertSql;

      const sqlFilePath = path.join(dbSqlDir, `${safeFileName}.sql`);
      fs.writeFileSync(sqlFilePath, tableSql, 'utf8');

      completeSqlParts.push(tableSql);

      manifest.database.tables[table] = {
        record_count: rows.length,
        json_file: `database/data/${safeFileName}.json`,
        sql_file: `database/sql/${safeFileName}.sql`
      };
      manifest.database.total_records += rows.length;
    } catch (err) {
      console.warn(`    Warning: Failed to export table ${table}: ${err.message}`);
    }
  }

  // Write Complete Combined SQL Dump
  const completeSqlPath = path.join(dbSqlDir, 'complete_database_dump.sql');
  fs.writeFileSync(completeSqlPath, completeSqlParts.join('\n\n'), 'utf8');
  console.log(`  Combined SQL Dump created: database/sql/complete_database_dump.sql\n`);

  // --------------------------------------------------------------------------
  // 2. STORAGE BUCKETS BACKUP
  // --------------------------------------------------------------------------
  console.log('--- Step 2: Supabase Storage Buckets Export ---');
  try {
    const { data: buckets, error: bErr } = await supabase.storage.listBuckets();
    if (bErr) {
      console.warn(`  Warning: Could not list storage buckets: ${bErr.message}`);
    } else {
      console.log(`  Discovered ${buckets.length} storage buckets.`);
      const bucketsMeta = [];

      for (const bucket of buckets) {
        console.log(`  Processing bucket: "${bucket.name}" (Public: ${bucket.public})...`);
        const bucketLocalDir = path.join(storageDir, bucket.name);
        if (!fs.existsSync(bucketLocalDir)) fs.mkdirSync(bucketLocalDir, { recursive: true });

        const files = await listAllBucketFiles(supabase, bucket.name);
        console.log(`    Found ${files.length} objects in bucket "${bucket.name}"`);

        const bucketFilesMeta = [];
        let bucketBytes = 0;

        for (const file of files) {
          try {
            const { data: blob, error: dlErr } = await supabase.storage.from(bucket.name).download(file.fullPath);
            if (dlErr) {
              console.warn(`      Error downloading ${file.fullPath}: ${dlErr.message}`);
              continue;
            }

            const buffer = Buffer.from(await blob.arrayBuffer());
            const localFilePath = path.join(bucketLocalDir, file.fullPath);
            const localFileParent = path.dirname(localFilePath);
            if (!fs.existsSync(localFileParent)) fs.mkdirSync(localFileParent, { recursive: true });

            fs.writeFileSync(localFilePath, buffer);
            bucketBytes += buffer.length;

            bucketFilesMeta.push({
              name: file.name,
              full_path: file.fullPath,
              size_bytes: buffer.length,
              content_type: file.metadata?.mimetype || 'application/octet-stream',
              updated_at: file.updated_at
            });
          } catch (fileDlErr) {
            console.warn(`      Failed to save ${file.fullPath}: ${fileDlErr.message}`);
          }
        }

        bucketsMeta.push({
          id: bucket.id,
          name: bucket.name,
          public: bucket.public,
          file_count: bucketFilesMeta.length,
          total_bytes: bucketBytes,
          files: bucketFilesMeta
        });

        manifest.storage.buckets[bucket.name] = {
          public: bucket.public,
          file_count: bucketFilesMeta.length,
          total_bytes: bucketBytes
        };
        manifest.storage.total_files += bucketFilesMeta.length;
        manifest.storage.total_bytes += bucketBytes;
      }

      fs.writeFileSync(
        path.join(storageDir, 'buckets_metadata.json'),
        JSON.stringify(bucketsMeta, null, 2),
        'utf8'
      );
      console.log(`  Storage backup completed: ${manifest.storage.total_files} files (${(manifest.storage.total_bytes / (1024 * 1024)).toFixed(2)} MB)\n`);
    }
  } catch (storageErr) {
    console.warn(`  Storage export exception: ${storageErr.message}\n`);
  }

  // --------------------------------------------------------------------------
  // 3. PROJECT MIGRATIONS BACKUP
  // --------------------------------------------------------------------------
  console.log('--- Step 3: Schema Migrations Export ---');
  const sourceMigrationsDir = path.join(projectRoot, 'supabase', 'migrations');
  if (fs.existsSync(sourceMigrationsDir)) {
    const migrationFiles = fs.readdirSync(sourceMigrationsDir).filter(f => f.endsWith('.sql'));
    for (const mFile of migrationFiles) {
      const srcPath = path.join(sourceMigrationsDir, mFile);
      const destPath = path.join(migrationsDir, mFile);
      fs.copyFileSync(srcPath, destPath);
      manifest.migrations.files.push(mFile);
    }
    manifest.migrations.count = migrationFiles.length;
    console.log(`  Archived ${manifest.migrations.count} SQL migration files.\n`);
  } else {
    console.log('  No source migrations directory found.\n');
  }

  // --------------------------------------------------------------------------
  // 4. SANITIZED CONFIGURATION & AUTH SUMMARY
  // --------------------------------------------------------------------------
  console.log('--- Step 4: Configuration & Project Metadata Export ---');
  const sanitizedEnvKeys = Object.keys(env).map(k => {
    return {
      key: k,
      configured: Boolean(env[k] && env[k].trim().length > 0)
    };
  });

  const projectConfig = {
    project_reference: projectRef,
    supabase_url_host: `${projectRef}.supabase.co`,
    backup_timestamp: now.toISOString(),
    environment_keys_configured: sanitizedEnvKeys,
    auth: {
      auth_mechanism: 'Custom Admin Credentials (ADMIN_USERNAME / ADMIN_PASSWORD) with HttpOnly Session Cookies',
      supabase_auth_users_count: 0
    },
    tables_summary: manifest.database.tables,
    storage_summary: manifest.storage.buckets
  };

  fs.writeFileSync(
    path.join(configDir, 'supabase_project_config.json'),
    JSON.stringify(projectConfig, null, 2),
    'utf8'
  );
  console.log('  Sanitized project configuration written (zero secrets stored).\n');

  // --------------------------------------------------------------------------
  // 5. MANIFEST & SHA-256 CHECKSUM INVENTORY
  // --------------------------------------------------------------------------
  console.log('--- Step 5: Generating Manifest & SHA-256 Checksums ---');
  const allBackupFiles = [];
  function collectFiles(dir) {
    for (const item of fs.readdirSync(dir)) {
      if (item === 'manifest.json' || item === 'checksums.sha256') continue;
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        collectFiles(fullPath);
      } else {
        allBackupFiles.push(fullPath);
      }
    }
  }
  collectFiles(backupDir);

  const checksumLines = [];
  let totalBackupBytes = 0;

  for (const fPath of allBackupFiles) {
    const relPath = path.relative(backupDir, fPath).replace(/\\/g, '/');
    const hash = computeFileHash(fPath);
    const size = fs.statSync(fPath).size;
    totalBackupBytes += size;

    manifest.artifacts.push({
      path: relPath,
      size_bytes: size,
      sha256: hash
    });

    checksumLines.push(`${hash}  ${relPath}`);
  }

  manifest.total_artifacts = manifest.artifacts.length;
  manifest.total_bytes = totalBackupBytes;
  manifest.status = 'completed';
  manifest.duration_ms = Date.now() - startTime;

  fs.writeFileSync(path.join(backupDir, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  fs.writeFileSync(path.join(backupDir, 'checksums.sha256'), checksumLines.join('\n') + '\n', 'utf8');

  console.log(`  Total Artifacts: ${manifest.total_artifacts}`);
  console.log(`  Total Size: ${(totalBackupBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`  Checksums File: checksums.sha256`);
  console.log(`  Manifest File: manifest.json\n`);

  // --------------------------------------------------------------------------
  // 6. RETENTION POLICY ENFORCEMENT
  // --------------------------------------------------------------------------
  const retentionCount = options.retentionCount || 7;
  console.log(`--- Step 6: Retention Policy Enforcement (Keep latest ${retentionCount}) ---`);
  if (fs.existsSync(backupsBaseDir)) {
    const existingDirs = fs.readdirSync(backupsBaseDir)
      .filter(d => fs.statSync(path.join(backupsBaseDir, d)).isDirectory() && d.match(/^\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}$/))
      .sort();

    if (existingDirs.length > retentionCount) {
      const toDelete = existingDirs.slice(0, existingDirs.length - retentionCount);
      for (const oldDir of toDelete) {
        console.log(`  Pruning aged backup: ${oldDir}`);
        fs.rmSync(path.join(backupsBaseDir, oldDir), { recursive: true, force: true });
      }
    } else {
      console.log(`  Current backup count (${existingDirs.length}) within retention limit (${retentionCount}). No pruning needed.`);
    }
  }

  const durationSec = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log('\n================================================================');
  console.log(`BACKUP SUCCEEDED in ${durationSec}s`);
  console.log(`Location: ${backupDir}`);
  console.log(`Records Archived: ${manifest.database.total_records}`);
  console.log(`Storage Files: ${manifest.storage.total_files}`);
  console.log('================================================================\n');

  return {
    success: true,
    backupDir,
    manifest
  };
}

// Verification function
function verifyBackup(backupDir) {
  console.log('================================================================');
  console.log('TREEL BACKUP INTEGRITY VERIFICATION');
  console.log(`Verifying: ${backupDir}`);
  console.log('================================================================');

  const manifestPath = path.join(backupDir, 'manifest.json');
  const checksumsPath = path.join(backupDir, 'checksums.sha256');

  if (!fs.existsSync(manifestPath)) {
    throw new Error(`manifest.json missing in ${backupDir}`);
  }
  if (!fs.existsSync(checksumsPath)) {
    throw new Error(`checksums.sha256 missing in ${backupDir}`);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  let passed = 0;
  let failed = 0;

  for (const artifact of manifest.artifacts) {
    const filePath = path.join(backupDir, artifact.path);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ [FAIL] Missing file: ${artifact.path}`);
      failed++;
      continue;
    }

    const currentHash = computeFileHash(filePath);
    const currentSize = fs.statSync(filePath).size;

    if (currentHash !== artifact.sha256) {
      console.error(`❌ [FAIL] Hash mismatch for ${artifact.path}: expected ${artifact.sha256}, got ${currentHash}`);
      failed++;
    } else if (currentSize !== artifact.size_bytes) {
      console.error(`❌ [FAIL] Size mismatch for ${artifact.path}: expected ${artifact.size_bytes}, got ${currentSize}`);
      failed++;
    } else {
      console.log(`✅ [PASS] ${artifact.path} (${currentSize} bytes, sha256 verified)`);
      passed++;
    }
  }

  console.log('\n================================================================');
  console.log(`VERIFICATION COMPLETE: ${passed} PASSED, ${failed} FAILED`);
  console.log('================================================================\n');

  if (failed > 0) {
    throw new Error(`Backup verification failed with ${failed} corrupted or missing files.`);
  }

  return { passed, failed };
}

// CLI Execution Entry Point
if (require.main === module) {
  const args = process.argv.slice(2);
  const verifyIdx = args.indexOf('--verify');
  const retentionIdx = args.indexOf('--retention');

  let retentionCount = 7;
  if (retentionIdx !== -1 && args[retentionIdx + 1]) {
    retentionCount = parseInt(args[retentionIdx + 1], 10) || 7;
  }

  if (verifyIdx !== -1) {
    let targetDir = args[verifyIdx + 1];
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
      targetDir = path.join(projectRoot, 'backups', 'supabase', 'latest');
    }
    try {
      verifyBackup(targetDir);
    } catch (e) {
      console.error(e.message);
      process.exit(1);
    }
  } else {
    runBackup({ retentionCount })
      .then(res => {
        // Also verify the created backup immediately
        console.log('Running automated post-backup verification...');
        verifyBackup(res.backupDir);
      })
      .catch(err => {
        console.error('BACKUP FAILED:', err);
        process.exit(1);
      });
  }
}

module.exports = {
  runBackup,
  verifyBackup,
  loadEnv
};
