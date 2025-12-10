import Database from 'better-sqlite3';
import path from 'path';

// Create (or open) the database file 'local.db' in the project root
// In production, you might point this to a specific volume
const dbPath = path.resolve(process.cwd(), 'local.db');

export const db = new Database(dbPath);

// Enable WAL mode for better concurrency/performance
db.pragma('journal_mode = WAL');

console.log(`🔌 Connected to SQLite database at ${dbPath}`);
