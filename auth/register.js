const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const users = [];

function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  return regex.test(password);
}

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!validatePassword(password)) {
    return res.status(400).json({ error: "Weak password" });
  }

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(409).json({ error: "Email exists" });
  }

  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, email, password: hashed });

  res.status(201).json({ message: "User registered" });
});

module.exports = router;
