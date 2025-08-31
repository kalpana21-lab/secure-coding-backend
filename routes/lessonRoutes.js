//C:\Users\KALPNA\Desktop\secure-coding-dashboard\backend\routes\lessonRoutes.js
import express from 'express';
import { getLessons } from '../controllers/lessonController.js';

const router = express.Router();

router.get('/', getLessons);

export default router;