const db = require('../db');

exports.getNotifications = (req, res) => {
  const userId = req.user.id;
  const rows = db.prepare('SELECT id, message, seen, created_at FROM notifications WHERE user_id = ? ORDER BY created_at DESC').all(userId);
  res.json({ notifications: rows });
}

exports.getCredits = (req, res) => {
  const userId = req.user.id;
  const row = db.prepare('SELECT credits FROM users WHERE id = ?').get(userId);
  res.json({ credits: row ? row.credits : 0 });
}

exports.addNotification = (userId, message) => {
  const insert = db.prepare('INSERT INTO notifications (user_id, message) VALUES (?, ?)');
  return insert.run(userId, message);
}
