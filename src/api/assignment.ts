import express from "express"
import { createAssignment, fetchAssignments } from "../controllers/assignment"
import authMiddleware from "../middleware/auth"

const router = express.Router()

router.post("/create", authMiddleware, createAssignment)
router.get("/:email", authMiddleware, fetchAssignments)

export default router