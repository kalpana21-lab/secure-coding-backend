import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  prompt: String,
  options: [String],
  correctAnswer: String,
});

const quizSchema = new mongoose.Schema({
  lessonId: String,
  title: String,
  questions: [questionSchema],
});

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;