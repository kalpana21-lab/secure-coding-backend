const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');
const dotenv = require('dotenv');

dotenv.config();



// ✅ Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/secure-coding', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const quizzes = [
  {
    lessonId: 'secure-inputs',
    title: 'Secure Input Validation',
    questions: [
      {
        prompt: 'Which method prevents SQL injection?',
        options: ['String concatenation', 'Parameterized queries', 'eval()'],
        correctOption: 'Parameterized queries'
      },
      {
        prompt: 'What should you validate on the server?',
        options: ['Only passwords', 'All user inputs', 'Nothing'],
        correctOption: 'All user inputs'
      }
    ]
  },
  {
    lessonId: 'xss-prevention',
    title: 'Cross-Site Scripting (XSS)',
    questions: [
      {
        prompt: 'Which header helps prevent reflected XSS?',
        options: ['Content-Type', 'X-XSS-Protection', 'Authorization'],
        correctOption: 'X-XSS-Protection'
      },
      {
        prompt: 'What’s the best way to escape HTML in user input?',
        options: ['innerHTML', 'textContent', 'document.write'],
        correctOption: 'textContent'
      }
    ]
  }
];

const seed = async () => {
  try {
    await Quiz.deleteMany(); // Clear existing quizzes
    await Quiz.insertMany(quizzes);
    console.log('✅ Quizzes seeded successfully');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    mongoose.connection.close();
  }
};

seed();