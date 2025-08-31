// backend/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Lesson = require('./models/Lesson');


const lessons = [
  {
    title: 'Cross-Site Scripting (XSS)',
    summary: 'Learn how XSS attacks work and how to prevent them.',
    content: 'XSS allows attackers to inject malicious scripts into trusted websites...',
    quiz: [
      {
        question: 'Which tag is commonly used in XSS attacks?',
        options: ['<script>', '<div>', '<style>', '<meta>'],
        correctAnswer: 0,
      },
      {
        question: 'What’s a good defense against XSS?',
        options: ['Input sanitization', 'SQL escaping', 'Rate limiting', 'Base64 encoding'],
        correctAnswer: 0,
      },
    ],
  },
  {
    title: 'SQL Injection',
    summary: 'Understand how attackers exploit insecure SQL queries.',
    content: 'SQLi occurs when user input is improperly handled in database queries...',
    quiz: [
      {
        question: 'Which character often starts a SQL injection?',
        options: [';', '--', '#', '*'],
        correctAnswer: 1,
      },
      {
        question: 'Which method helps prevent SQLi?',
        options: ['Parameterized queries', 'Client-side validation', 'Minification', 'Caching'],
        correctAnswer: 0,
      },
    ],
  },
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  await Lesson.deleteMany({});
  await Lesson.insertMany(lessons);
  console.log('✅ Lessons seeded');
  console.log('Mongo URI:', process.env.MONGO_URI);
  mongoose.disconnect();
}).catch(err => console.error('❌ Seeding error:', err));