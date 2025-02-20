import express from "express"
import { createAssignment, fetchAssignments } from "../controllers/assignmentController"
import authMiddleware from "../middlewares/authMiddleware"

const router = express.Router()

router.post("/create", authMiddleware, createAssignment)
router.get("/", authMiddleware, fetchAssignments)

export default router