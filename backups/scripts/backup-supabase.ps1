<#
.SYNOPSIS
    Automated Supabase Backup & Disaster Recovery Script for Treel.
.DESCRIPTION
    Safely archives all Supabase PostgreSQL tables, storage bucket assets,
    migrations, and metadata with SHA-256 integrity verification.
    Zero production writes. Zero secret logging.
.PARAMETER RetentionCount
    Number of recent timestamped backups to keep (default: 7).
.PARAMETER VerifyOnly
    Verifies the integrity and SHA-256 hashes of an existing backup without creating a new one.
.PARAMETER BackupDir
    Specific backup directory to verify (used with -VerifyOnly).
.EXAMPLE
    .\backups\scripts\backup-supabase.ps1
.EXAMPLE
    .\backups\scripts\backup-supabase.ps1 -RetentionCount 14
.EXAMPLE
    .\backups\scripts\backup-supabase.ps1 -VerifyOnly
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory = $false)]
    [int]$RetentionCount = 7,

    [Parameter(Mandatory = $false)]
    [switch]$VerifyOnly,

    [Parameter(Mandatory = $false)]
    [string]$BackupDir = ""
)

$ErrorActionPreference = "Stop"

# Resolve script root and project root
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path -Parent (Split-Path -Parent $ScriptDir)

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "   TREEL SUPABASE BACKUP & RECOVERY SYSTEM                     " -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "Project Root: $ProjectRoot"

# Verify node.exe is available
$NodePath = Get-Command "node" -ErrorAction SilentlyContinue
if (-not $NodePath) {
    Write-Error "Node.js is not found in PATH. Please install Node.js (v18+) to execute the backup engine."
    exit 1
}

$BackupEngineScript = Join-Path $ScriptDir "backup-engine.js"
if (-not (Test-Path $BackupEngineScript)) {
    Write-Error "Backup engine script not found at $BackupEngineScript"
    exit 1
}

# Construct arguments
$NodeArgs = @($BackupEngineScript)

if ($VerifyOnly) {
    $NodeArgs += "--verify"
    if ($BackupDir -ne "") {
        $NodeArgs += $BackupDir
    }
} else {
    $NodeArgs += "--retention"
    $NodeArgs += "$RetentionCount"
}

# Execute backup engine
try {
    Write-Host "Executing Backup Engine..." -ForegroundColor Yellow
    & node $NodeArgs

    if ($LASTEXITCODE -ne 0) {
        Write-Host "`nBackup process failed with exit code $LASTEXITCODE" -ForegroundColor Red
        exit $LASTEXITCODE
    } else {
        Write-Host "`nBackup operation finished successfully." -ForegroundColor Green
        exit 0
    }
} catch {
    Write-Host "`nExecution error: $_" -ForegroundColor Red
    exit 1
}

