//C:\Users\KALPNA\Desktop\secure-coding-dashboard\backend\routes\quizzRoutes.js

import express from 'express';
import Quiz from '../models/Quiz.js';
import QuizSubmission from '../models/QuizSubmission.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


// 🧠 Create a new quiz
router.post('/', protect, async (req, res) => {
  try {
    const { title, questions } = req.body;

    if (!title || !Array.isArray(questions)) {
      return res.status(400).json({ error: 'Invalid quiz format' });
    }

    const quiz = new Quiz({ title, questions });
    await quiz.save();

    res.status(201).json(quiz);
  } catch (err) {
    console.error('Quiz creation error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// 🎯 Submit quiz answers and calculate score
router.post('/:id/submit', protect, async (req, res) => {
  try {
    const quizId = req.params.id;
    const userAnswers = req.body.answers;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

    let score = 0;
    const feedback = [];

    quiz.questions.forEach((q) => {
      const correct = q.correctAnswer;
      const userAnswer = userAnswers[q._id];

      if (userAnswer === correct) {
        score++;
        feedback.push({
          question: q.text,
          result: '✅ Correct',
        });
      } else {
        feedback.push({
          question: q.text,
          result: `❌ Incorrect (Correct: ${correct})`,
        });
      }
    });

    await QuizSubmission.create({
      quizId,
      userId: req.user._id,
      answers: userAnswers,
      score,
      total: quiz.questions.length,
      submittedAt: new Date(),
    });

    res.json({
      score,
      total: quiz.questions.length,
      feedback,
    });
  } catch (err) {
    console.error('Quiz submission error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// 🕵️‍♀️ Get all quiz attempts for a user
router.get('/quiz-history', protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const attempts = await QuizSubmission.find({ userId })
      .populate('quizId', 'title')
      .sort({ submittedAt: -1 });

    res.json({ attempts });
  } catch (err) {
    console.error('Error fetching quiz history:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;