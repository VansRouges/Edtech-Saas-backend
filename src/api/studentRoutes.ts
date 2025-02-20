import express from 'express';
import { createStudent, fetchStudents } from '../controllers/studentControllers';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

// Define student-related endpoints
router.post('/create', authMiddleware, createStudent); // Create a new student
router.get('/', authMiddleware, fetchStudents); // Fetch all students

export default router; // Export the router instance