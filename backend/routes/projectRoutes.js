// backend/routes/projectRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../config/db');

// 🔧 Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// 📌 POST route: Submit a new project
router.post('/submit-project', upload.single('file'), (req, res) => {
  const { title, description, category, budget, deadline, skills } = req.body;
  const file_path = req.file ? `/uploads/${req.file.filename}` : null;

  const sql = `
    INSERT INTO projects 
    (title, skills, description, deadline, category, budget, file_path) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [title, skills, description, deadline, category, budget, file_path];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ Error inserting project:', err);
      return res.status(500).json({ error: 'Failed to submit project' });
    }
    return res.status(200).json({ message: '✅ Project submitted successfully!' });
  });
});

// ✅ NEW: GET route to fetch all projects
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM projects ORDER BY id DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error fetching projects:', err);
      return res.status(500).json({ error: 'Failed to fetch projects' });
    }
    // Map results to include file URL
    const projects = results.map(p => ({
      ...p,
      fileUrl: p.file_path
    }));
    return res.status(200).json(projects);
  });
});

router.get('/test', (req, res) => {
  res.send('✅ Project routes working');
});

module.exports = router;