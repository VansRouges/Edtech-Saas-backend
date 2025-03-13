"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const assignment_1 = require("../controllers/assignment");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post("/create", auth_1.default, assignment_1.createAssignment);
router.get("/:email", auth_1.default, assignment_1.fetchAssignments);
exports.default = router;
