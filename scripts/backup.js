/**
 * VOGUE – SOA Fashion Club | Automated SQLite & Uploads Backup Utility
 */
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const BACKUP_DIR = path.join(ROOT_DIR, 'backups');
const DB_SOURCE = path.join(ROOT_DIR, 'server', 'prisma', 'vogue_master.db');
const UPLOADS_SOURCE = path.join(ROOT_DIR, 'server', 'uploads');

if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const dbTarget = path.join(BACKUP_DIR, `vogue_db_backup_${timestamp}.db`);

console.log('📦 Starting VOGUE SOA Database Backup...');

if (fs.existsSync(DB_SOURCE)) {
  fs.copyFileSync(DB_SOURCE, dbTarget);
  console.log(`✅ SQLite Database successfully backed up to: ${dbTarget}`);
} else {
  console.warn(`⚠️ SQLite Database not found at: ${DB_SOURCE}`);
}

console.log('🎉 Backup process completed.');
