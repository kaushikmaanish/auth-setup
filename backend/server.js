const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./controllers/auth');
const user = require('./controllers/user');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Auth endpoints
app.post('/auth/signup', auth.signup);
app.post('/auth/signin', auth.signin);

// Protected endpoints
app.get('/me/notifications', auth.authMiddleware, user.getNotifications);
app.get('/me/credits', auth.authMiddleware, user.getCredits);

// quick route to create a demo notification (for testing)
app.post('/me/notification', auth.authMiddleware, (req, res) => {
  const { message } = req.body;
  const inserted = user.addNotification(req.user.id, message || 'Test notification');
  res.json({ ok: true, id: inserted.lastInsertRowid });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Backend running on', PORT));
