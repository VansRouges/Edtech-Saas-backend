"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profile_1 = require("../controllers/profile");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// Route for creating a profile
router.post('/profile', auth_1.default, profile_1.createProfile);
// Route for getting a profile by email
router.get('/profile/:email', auth_1.default, profile_1.getProfileByEmail);
exports.default = router;
