const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');

// ✅ Register User
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error in registration:', err);
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({ error: 'Email already in use.' });
        }
        return res.status(500).json({ error: 'Server error during registration.' });
      }

      res.status(201).json({ message: 'User registered successfully.' });
    });
  } catch (error) {
    console.error('Hashing error:', error);
    res.status(500).json({ error: 'Failed to process registration.' });
  }
});

// ✅ Login User
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('Login query error:', err);
      return res.status(500).json({ error: 'Server error during login.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // 🔐 Create JWT
    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    // ✅ Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Lax', // or 'Strict' for stronger CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
});

// ✅ Logout User
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
});

// ✅ Get Current Logged-in User
router.get('/me', verifyToken, (req, res) => {
  res.json({ user: req.user }); // user: { id, name } from JWT
});

module.exports = router;