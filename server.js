//C:\Users\KALPNA\Desktop\secure-coding-dashboard\backend\server.js
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import quizzRoutes from './routes/quizzRoutes.js';
import lessonRoutes from './routes/lessonRoutes.js';
import authRoutes from './routes/authRoutes.js';
import analyticsRoutes from './routes/analytics.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('🚀 Secure Coding Dashboard Backend is running');
});
app.use('/api/users', userRoutes);
app.use('/api/quizzes', quizzRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/auth', authRoutes);
app.use('/analytics', analyticsRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  dbName: 'panchalkalpana079_db_user'

})
  .then(() => {

    console.log('🔐 MONGO_URI:', process.env.MONGO_URI);


    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB error:', err);
  });