const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_in_prod';

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'username and password required' });
    const hashed = await bcrypt.hash(password, 10);
    const insert = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
    const info = insert.run(username, hashed);
    const user = { id: info.lastInsertRowid, username };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ user, token });
  } catch (err) {
    if (err && err.code === 'SQLITE_CONSTRAINT_UNIQUE') return res.status(400).json({ error: 'username exists' });
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
}

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'username and password required' });
    const row = db.prepare('SELECT id, username, password, credits FROM users WHERE username = ?').get(username);
    if (!row) return res.status(400).json({ error: 'invalid credentials' });
    const match = await bcrypt.compare(password, row.password);
    if (!match) return res.status(400).json({ error: 'invalid credentials' });
    const user = { id: row.id, username: row.username };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ user, token, credits: row.credits });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
}

exports.authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'missing token' });
  const parts = auth.split(' ');
  if (parts.length !== 2) return res.status(401).json({ error: 'invalid token format' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'invalid token' });
  }
}
