// src/routes/dashboardRoutes.ts
import express from "express";
import { fetchDashboardData } from "../controllers/dashboardController";

const router = express.Router();

// Route to fetch dashboard data by user ID
router.get('/:userId', (req, res, next) => {
    fetchDashboardData(req, res).then(() => {
      next();
    }).catch((err) => {
      next(err);
    });
});

export default router;
