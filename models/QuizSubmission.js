//C:\Users\KALPNA\Desktop\secure-coding-dashboard\backend\models\QuizSubmission.js
import mongoose from 'mongoose';

const quizSubmissionSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  answers: {
    type: Map,
    of: String, // You can change to Boolean or Number based on your quiz format
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields automatically
});

// Optional: Indexes for faster querying
quizSubmissionSchema.index({ userId: 1 });
quizSubmissionSchema.index({ quizId: 1 });

const QuizSubmission = mongoose.model('QuizSubmission', quizSubmissionSchema);
export default QuizSubmission;