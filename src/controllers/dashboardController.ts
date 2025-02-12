// src/controllers/dashboardController.ts
import { Request, Response } from "express";
import { fetchDashboardDataModel } from "../models/dashboardModel";

// Controller to fetch dashboard data
export const fetchDashboardData = async (req: Request, res: Response) => {
  console.log("Request Params:", req.params); // Log params
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID is required." });
  }

  try {
    const data = await fetchDashboardDataModel(userId);
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error("Dashboard Data Fetch Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
