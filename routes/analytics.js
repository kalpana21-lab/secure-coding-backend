//C:\Users\KALPNA\Desktop\secure-coding-dashboard\backend\routes\analytics.js
import express from 'express';
import QuizSubmission from '../models/QuizSubmission.js';
import Quiz from '../models/Quiz.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /analytics/:userId — Protected route
router.get('/:userId', protect, async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    const attempts = await QuizSubmission.find({ userId })
      .populate({ path: 'quizId', select: 'title topic' })
      .sort({ submittedAt: -1 });

    const formatted = attempts.map(a => ({
      title: a.quizId.title,
      topic: a.quizId.topic,
      score: a.score,
      total: a.total,
      submittedAt: a.submittedAt
    }));

    res.json({ attempts: formatted });
  } catch (err) {
    console.error('Analytics fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

export default router;