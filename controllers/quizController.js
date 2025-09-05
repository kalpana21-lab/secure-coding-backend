
//C:\Users\KALPNA\Desktop\secure-coding-dashboard\backend\controllers\quizController.js
const Quiz = require('../models/Quiz');
const QuizSubmission = require('../models/QuizSubmission');

const submitQuiz = async (req, res) => {
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
        feedback.push({ question: q.questionText, result: '✅ Correct' });
      } else {
        feedback.push({
          question: q.questionText,
          result: `❌ Incorrect (Correct: ${correct})`,
        });
      }
    });

    // ✅ Save submission to DB
    await QuizSubmission.create({
      quizId,
      answers: userAnswers,
      score,
    });

    res.json({
      score,
      total: quiz.questions.length,
      feedback,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
const User = require('../models/User');



module.exports = {
  submitQuiz,
};