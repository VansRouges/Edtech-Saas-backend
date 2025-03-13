import express from 'express';
import { createProfile, getProfileByEmail } from '../controllers/profile';
import authMiddleware from '../middleware/auth';

const router = express.Router();

// Route for creating a profile
router.post('/profile', authMiddleware, createProfile);

// Route for getting a profile by email
router.get('/profile/:email', authMiddleware, getProfileByEmail);

export default router;
