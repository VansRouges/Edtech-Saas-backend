"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_1 = require("../controllers/student");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// Define student-related endpoints
router.post('/students', auth_1.default, student_1.createStudent); // Create a new student
router.get('/students/:email', auth_1.default, student_1.fetchStudents); // Fetch all students
exports.default = router; // Export the router instance
