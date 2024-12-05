import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'kakaran.db');

export function initializeDatabase() {
  const db = new Database(dbPath);

  // Create inventory table
  db.exec(`
    CREATE TABLE IF NOT EXISTS inventory (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      current_stock INTEGER NOT NULL DEFAULT 0,
      min_stock INTEGER NOT NULL DEFAULT 0,
      unit TEXT NOT NULL,
      unit_price REAL NOT NULL,
      last_restocked TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create inventory_movements table
  db.exec(`
    CREATE TABLE IF NOT EXISTS inventory_movements (
      id TEXT PRIMARY KEY,
      item_id TEXT NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('in', 'out')),
      quantity INTEGER NOT NULL,
      date TEXT NOT NULL,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (item_id) REFERENCES inventory(id)
    )
  `);

  return db;
}

export function getDatabase() {
  return new Database(dbPath);
}