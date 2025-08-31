//C:\Users\KALPNA\Desktop\secure-coding2\backend\routes\userRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { signupUser, loginUser, getUserProfile } from '../controllers/userController.js';

const router = express.Router();

// Public routes
router.post('/signup', signupUser);
router.post('/login', loginUser);

// Protected route
router.get('/profile', protect, getUserProfile);

export default router;