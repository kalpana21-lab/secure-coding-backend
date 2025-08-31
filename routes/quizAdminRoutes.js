//C:\Users\KALPNA\Desktop\secure-coding2\backend\routes\quizAdminRoutes.js
import express from 'express';
import Quiz from '../models/Quiz.js'; // adjust path if needed

const router = express.Router();

// GET /api/quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find({}, '_id title'); // fetch only _id and title
    res.json(quizzes);
  } catch (err) {
    console.error('Error fetching quizzes:', err);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

export default router;