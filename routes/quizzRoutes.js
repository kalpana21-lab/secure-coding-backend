//C:\Users\KALPNA\Desktop\secure-coding2\backend\routes\quizzRoutes.js
import express from 'express';
import Quiz from '../models/Quiz.js';
import { protect } from '../middleware/authMiddleware.js';
import QuizSubmission from '../models/QuizSubmission.js';
// Optional: import controller logic
// import { submitQuiz } from '../controllers/quizController.js';

const router = express.Router();

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
      const userAnswer = userAnswers[q._id]; // Assumes answers keyed by question ID

      if (userAnswer === correct) {
        score++;
        feedback.push({
          question: q.questionText,
          result: '✅ Correct',
        });
      } else {
        feedback.push({
          question: q.questionText,
          result: `❌ Incorrect (Correct: ${correct})`,
        });
      }
    });

    // 📝 Optional: Save submission to DB
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