# Treel Supabase Backup & Disaster Recovery Guide

> **Production Safety Notice**  
> All backup operations are non-destructive and read-only. Database records, policies, and storage assets are preserved without downtime. Never commit `.env` or raw database credentials into version control.

---

## 1. System Overview & Architecture

The Treel web platform uses **Supabase** (PostgreSQL 15+ and Supabase Storage) as its primary persistent database engine alongside custom session authentication.

- **Supabase Project Reference:** `katgzyrpmegongitocxq`
- **Supabase Host:** `katgzyrpmegongitocxq.supabase.co`
- **Application Workspaces:** `D:\Magicworks\Projects\Treel\treel-new-web`
- **Backup Location:** `backups/supabase/YYYY-MM-DD_HH-mm-ss/` (Ignored in `.gitignore`)

### Components Protected in the Backup Archive

| Component | Storage Path | Description |
| :--- | :--- | :--- |
| **Complete PostgreSQL Dump** | `database/sql/complete_database_dump.sql` | Unified, restorable SQL dump with table DDL and batched `INSERT` statements with conflict handling. |
| **Individual Table SQL Dumps** | `database/sql/<table_name>.sql` | Isolated table-by-table SQL restoration scripts. |
| **Structured JSON Snapshots** | `database/data/<table_name>.json` | Raw, parseable JSON records for data manipulation, migration, or analytical queries. |
| **Storage Bucket Binaries** | `storage/<bucket_name>/*` | Complete local replicas of all files stored in Supabase Storage (`products`, `documents`, etc.). |
| **Storage Metadata** | `storage/buckets_metadata.json` | Detailed inventory of buckets, file paths, byte sizes, MIME types, and public visibility flags. |
| **Database Migrations** | `migrations/*.sql` | Exact copies of all database migrations and schema definitions. |
| **Sanitized Configuration** | `config/supabase_project_config.json` | Project reference, environment audit, table row counts, and metadata (zero secrets). |
| **Integrity Manifest** | `manifest.json` | Metadata registry with record counts, byte counts, and cryptographic SHA-256 hashes. |
| **SHA-256 Checksums** | `checksums.sha256` | Standard checksum file for file integrity verification. |

---

## 2. Active Production Database Inventory

At the time of backup execution, the production environment contains the following verified assets:

### A. Database Tables
- `leads`: 45 CRM leads with UTM tracking, contact information, and attribution metadata.
- `TreelEcommerce.products`: 24 e-commerce product listings and configurations.
- `TreelEcommerce.checkouts`: 1,199 customer checkout and order records.
- `TreelEcommerce.payments`: 500 payment transaction records from payment gateways.
- `TreelEcommerce.blogs`: 7 published articles and research posts.
- `TreelEcommerce.annualreturns`: 5 corporate regulatory documents.
- `TreelEcommerce.t_test`: 31 sandbox verification records.
- **Total Database Records Archived:** **1,811 rows**.

### B. Storage Buckets
- `products` (Public: `true`): 2 files (~1.08 MB) — Storefront product imagery and banners.
- `documents` (Public: `true`): 9 files (~18 KB) — Corporate whitepapers and research PDFs.
- **Total Storage Assets Archived:** **11 files**.

---

## 3. Directory Layout

Every backup creates an isolated, timestamped snapshot directory:

```
treel-new-web/
└── backups/
    ├── scripts/
    │   ├── backup-engine.js        # Core Node.js multi-tier backup engine
    │   ├── backup-supabase.ps1     # Production PowerShell wrapper
    │   ├── restore-supabase.js     # Disaster recovery & restoration engine
    │   └── verify-backup.js        # Standalone SHA-256 verification utility
    ├── supabase/
    │   └── 2026-10-19_10-22-17/    # Timestamped backup directory
    │       ├── manifest.json
    │       ├── checksums.sha256
    │       ├── config/
    │       │   └── supabase_project_config.json
    │       ├── migrations/
    │       │   ├── 001_initial_schema.sql
    │       │   ├── 002_mongodb_aligned_schema.sql
    │       │   ├── 003_create_leads_table.sql
    │       │   ├── 004_create_notices_table.sql
    │       │   └── 20261006_cookie_consents.sql
    │       ├── database/
    │       │   ├── data/
    │       │   │   ├── leads.json
    │       │   │   ├── TreelEcommerce.products.json
    │       │   │   ├── TreelEcommerce.checkouts.json
    │       │   │   ├── TreelEcommerce.payments.json
    │       │   │   ├── TreelEcommerce.blogs.json
    │       │   │   ├── TreelEcommerce.annualreturns.json
    │       │   │   └── TreelEcommerce.t_test.json
    │       │   └── sql/
    │       │       ├── complete_database_dump.sql
    │       │       ├── leads.sql
    │       │       ├── TreelEcommerce.products.sql
    │       │       └── ...
    │       └── storage/
    │           ├── buckets_metadata.json
    │           ├── products/
    │           │   ├── 1791886073016_Screenshot_2026-10-13_111939.png
    │           │   └── 1791912947161_yellow.gif
    │           └── documents/
    │               ├── tmip-1000-truck-case-study.pdf
    │               └── ...
    └── SUPABASE_DISASTER_RECOVERY.md
```

---

## 4. How to Execute an On-Demand Backup

### Option A: Using PowerShell (Recommended)
Run the PowerShell wrapper from the project root:

```powershell
.\backups\scripts\backup-supabase.ps1
```

To configure backup retention (e.g., retain the last 14 backups):
```powershell
.\backups\scripts\backup-supabase.ps1 -RetentionCount 14
```

### Option B: Using Node.js
```bash
node ./backups/scripts/backup-engine.js
```

With custom retention:
```bash
node ./backups/scripts/backup-engine.js --retention 14
```

---

## 5. How to Verify Backup Integrity

Every backup automatically verifies itself upon creation. To independently verify an existing backup at any time:

### Using PowerShell:
```powershell
.\backups\scripts\backup-supabase.ps1 -VerifyOnly
```

### Using Node.js:
```bash
node ./backups/scripts/verify-backup.js
```

Or verify a specific timestamped directory:
```bash
node ./backups/scripts/verify-backup.js backups/supabase/2026-10-19_10-22-17
```

If any file is missing, altered, or truncated, the command exits with code `1` and prints the exact offending file and checksum mismatch.

---

## 6. Disaster Recovery Runbooks

### Runbook 1: Partial Table Recovery (Accidental Deletion or Bad Migration)
**Scenario:** A table (e.g., `leads` or `TreelEcommerce.checkouts`) was accidentally modified, truncated, or corrupted, but other tables remain fine.

1. **Step 1: Test with Dry-Run Mode**  
   Simulate the restoration without making any changes to production:
   ```bash
   node ./backups/scripts/restore-supabase.js --tables leads --dry-run
   ```

2. **Step 2: Execute Live Restore**  
   Restore only the targeted table:
   ```bash
   node ./backups/scripts/restore-supabase.js --tables leads
   ```
   *Note: The restore engine uses `upsert` with the table's primary key (`id` / `_id`) to avoid creating duplicates.*

---

### Runbook 2: Complete Project Recovery (New Supabase Instance or Major Outage)
**Scenario:** The Supabase project was deleted, or you need to restore into a fresh project.

1. **Step 1: Configure Environment Variables**  
   Update `.env` with the new project URL and secret service-role key:
   ```env
   SUPABASE_URL=https://<new-project-ref>.supabase.co
   SUPABASE_SECRET_KEY=<new-service-role-key>
   ```

2. **Step 2: Apply Migrations & Schemas**  
   Open the **Supabase Dashboard → SQL Editor** and execute the combined dump:
   - File: `backups/supabase/<timestamp>/database/sql/complete_database_dump.sql`  
   *This automatically enables `uuid-ossp`, creates all 7 tables with proper column types and RLS policies, and inserts all records.*

3. **Step 3: Restore Storage Buckets & Assets**  
   Run the restore script in storage-only mode:
   ```bash
   node ./backups/scripts/restore-supabase.js --storage-only
   ```
   *This automatically creates the buckets (`products`, `documents`) with matching visibility (`public: true`) and re-uploads all original files.*

---

### Runbook 3: Restoring Storage Assets Only
**Scenario:** Images or document attachments in Supabase Storage were deleted or overwritten.

1. **Test with Dry-Run:**
   ```bash
   node ./backups/scripts/restore-supabase.js --storage-only --dry-run
   ```

2. **Execute Storage Restore:**
   ```bash
   node ./backups/scripts/restore-supabase.js --storage-only
   ```

---

## 7. Automated Windows Task Scheduler Setup

To execute automatic daily backups at 02:00 AM on the host Windows machine:

### Method A: One-Line PowerShell Command (Run as Administrator)

Open an elevated PowerShell prompt and execute:

```powershell
$Action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-ExecutionPolicy Bypass -NoProfile -WindowStyle Hidden -File D:\Magicworks\Projects\Treel\treel-new-web\backups\scripts\backup-supabase.ps1 -RetentionCount 14"
$Trigger = New-ScheduledTaskTrigger -Daily -At 2:00AM
$Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
Register-ScheduledTask -TaskName "Treel-Supabase-Daily-Backup" -Action $Action -Trigger $Trigger -Settings $Settings -Description "Automated daily backup of Treel Supabase database and storage buckets"
```

### Method B: Manual Setup via Windows Task Scheduler GUI
1. Press `Win + R`, type `taskschd.msc`, and press **Enter**.
2. Click **Create Task...** in the right-hand panel.
3. Under **General**:
   - Name: `Treel-Supabase-Daily-Backup`
   - Select: `Run whether user is logged on or not`
4. Under **Triggers**:
   - Click **New...** → Set to **Daily** at **2:00:00 AM**.
5. Under **Actions**:
   - Click **New...**
   - Program/script: `powershell.exe`
   - Add arguments: `-ExecutionPolicy Bypass -NoProfile -File D:\Magicworks\Projects\Treel\treel-new-web\backups\scripts\backup-supabase.ps1`
   - Start in: `D:\Magicworks\Projects\Treel\treel-new-web`
6. Click **OK** to save.

---

## 8. Backup Retention & Pruning Policy

- The default retention policy retains the **7 most recent backups**.
- When a new backup succeeds, any timestamped backup directory older than the retention threshold is automatically pruned from disk.
- To increase retention, pass `-RetentionCount <number>` (e.g., `-RetentionCount 30` for 30 daily snapshots).

---

## 9. Security & Compliance Checklist

- [x] **Zero Production Mutation:** Backup scripts execute strictly read-only queries (`SELECT`, `download`, `listBuckets`).
- [x] **Zero Secret Exposure:** Credentials from `.env` are consumed in-memory. Manifests, SQL files, logs, and docs contain zero passwords or service-role keys.
- [x] **Git Ignored:** `.gitignore` explicitly prevents `backups/supabase/` and `*.dump` from being committed to Git repositories.
- [x] **Cryptographic Verification:** Every individual artifact is verified using SHA-256 hashes against `manifest.json` and `checksums.sha256`.

