// backend/models/Lesson.js
import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  title: String,
  summary: String,
  content: String,
  quiz: [
    {
      question: String,
      options: [String],
      correctAnswer: Number,
    }
  ]
});

const Lesson = mongoose.model('Lesson', lessonSchema);
export default Lesson;