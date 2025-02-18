import express from 'express';
import { createSchool, getSchoolByCacId } from '../controllers/schoolController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/schools', authMiddleware, createSchool);
router.get('/schools/:userId', authMiddleware, getSchoolByCacId);

export default router;
