// src/routes/authRoutes.ts
import express from 'express';
import { signUp, login, logout } from '../controllers/authControllers';

const router = express.Router();

// Define auth-related endpoints
router.post('/signup', (req, res, next) => { // Signup route
    signUp(req, res).then(() => {
      next();
    }).catch((err) => {
      next(err);
    });
});
router.post('/login', (req, res, next) => { // Login route
    login(req, res).then(() => {
      next();
    }).catch((err) => {
      next(err);
    });
});
router.post('/logout', logout); // Logout route

export default router; // Export the router instance
