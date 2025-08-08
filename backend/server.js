// server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const db = require('./config/db'); // MySQL DB connection

const app = express();

// 🔧 Middleware
app.use(cors({
  origin: 'http://localhost:3000', // allow your frontend dev server
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 📂 Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🛂 Auth routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// 📋 Project form routes
const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

// 🧪 Test API
app.get('/', (req, res) => {
  res.status(200).json({ message: '✅ API is running...' });
});

app.get('/test-server', (req, res) => {
  res.send('✅ server.js is working');
});

db.query("SELECT * FROM projects", (err, results) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log(results);
});

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});