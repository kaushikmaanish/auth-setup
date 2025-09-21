const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Path module for serving build
const auth = require('./controllers/auth');
const user = require('./controllers/user');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Backend API routes
app.post('/auth/signup', auth.signup);
app.post('/auth/signin', auth.signin);

app.get('/me/notifications', auth.authMiddleware, user.getNotifications);
app.get('/me/credits', auth.authMiddleware, user.getCredits);

app.post('/me/notification', auth.authMiddleware, (req, res) => {
  const { message } = req.body;
  const inserted = user.addNotification(req.user.id, message || 'Test notification');
  res.json({ ok: true, id: inserted.lastInsertRowid });
});

// Serve React frontend build
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Catch-all route to serve index.html for React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Backend running on', PORT));
