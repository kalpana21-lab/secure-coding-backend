//C:\Users\KALPNA\Desktop\secure-coding2\backend\routes\feedbackRoutes.js
import express from 'express';
import mongoose from 'mongoose';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// POST /api/feedback
router.post('/', async (req, res) => {
  try {
    const { quizId, questionId, feedbackType, timestamp } = req.body;
    const feedback = new Feedback({ quizId, questionId, feedbackType, timestamp });
    await feedback.save();
    res.status(201).json({ success: true, feedback });
  } catch (err) {
    console.error('Feedback save error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/feedback/summary?quizId=...
router.get('/summary', async (req, res) => {
  const { quizId, startDate, endDate } = req.query;

  if (!quizId) {
    return res.status(400).json({ error: 'quizId is required' });
  }

  try {
    const matchStage = {
      quizId: new mongoose.Types.ObjectId(quizId)
    };

    if (startDate || endDate) {
      matchStage.timestamp = {};
      if (startDate) matchStage.timestamp.$gte = new Date(startDate);
      if (endDate) matchStage.timestamp.$lte = new Date(endDate);
    }

    const summary = await Feedback.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: '$questionId',
          total: { $sum: 1 },
          confusingCount: {
            $sum: { $cond: [{ $eq: ['$feedbackType', 'confusing'] }, 1, 0] }
          },
          rewordingCount: {
            $sum: { $cond: [{ $eq: ['$feedbackType', 'needs rewording'] }, 1, 0] }
          }
        }
      },
      {
        $addFields: {
          healthScore: {
            $subtract: [100, {
              $multiply: [
                { $divide: [{ $add: ['$confusingCount', '$rewordingCount'] }, '$total'] },
                100
              ]
            }]
          }
        }
      },
      { $sort: { confusingCount: -1 } }
    ]);

    res.json({ summary });
  } catch (err) {
    console.error('Feedback summary error:', err);
    res.status(500).json({ error: 'Failed to fetch feedback summary' });
  }
});

export default router;