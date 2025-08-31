//C:\Users\KALPNA\Desktop\secure-coding2\backend\models\Feedback.js
import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
  feedbackType: { type: String, enum: ['confusing', 'too_long', 'needs_rewording'], required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Feedback', feedbackSchema);