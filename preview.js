// routes/preview.js
const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const Quiz = require('../models/Quiz');

router.get('/simulate/:quizId', protect, adminOnly, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId).select('-answers'); // Hide correct answers
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    res.json({ quiz });
  } catch (err) {
    console.error('Preview error:', err);
    res.status(500).json({ error: 'Failed to load preview' });
  }
});

module.exports = router;