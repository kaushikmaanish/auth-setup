// Simple SQLite wrapper using better-sqlite3
const Database = require('better-sqlite3');
const db = new Database('data.db');

// Initialize tables
db.prepare(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT,
  credits INTEGER DEFAULT 100
)`).run();

db.prepare(`CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  message TEXT,
  seen INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`).run();

module.exports = db;
