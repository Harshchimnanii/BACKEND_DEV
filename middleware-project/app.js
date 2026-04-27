const express = require('express');
const mongoose = require('mongoose');

const logger = require('./middlewares/logger');
const sanitize = require('./middlewares/sanitize');
const verifyMFA = require('./middlewares/mfaAuth');

const User = require('./models/User');
const SoftDelete = require('./models/SoftDeleteModel');

const app = express();
app.use(express.json());
app.use(logger);
app.use(sanitize);

// MongoDB connect
mongoose.connect('mongodb://127.0.0.1:27017/test');

// Routes
app.get('/', (req, res) => {
  res.send('Server running');
});

app.get('/secure', verifyMFA, (req, res) => {
  res.send('Secure route');
});

app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  user.lastLogin = new Date();
  await user.save();
  res.send('Logged in');
});

app.delete('/delete/:id', async (req, res) => {
  await SoftDelete.findByIdAndUpdate(req.params.id, { deleted: true });
  res.send('Soft deleted');
});

app.listen(3000, () => console.log('Server started'));