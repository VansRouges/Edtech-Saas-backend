import express from "express"
import { createAssignment, fetchAssignments } from "../controllers/assignmentController"
import authMiddleware from "../middlewares/authMiddleware"

const router = express.Router()

router.post("/assignments", authMiddleware, createAssignment)
router.get("/assignments", authMiddleware, fetchAssignments)

export default router