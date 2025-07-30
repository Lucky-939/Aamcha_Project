require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Database connection

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Root endpoint (for testing API status)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running...' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());