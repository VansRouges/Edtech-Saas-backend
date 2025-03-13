"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schoolController_1 = require("../controllers/schoolController");
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
router.post('/schools', auth_1.default, schoolController_1.createSchool);
router.get('/schools/:userId', auth_1.default, schoolController_1.getSchoolByCacId);
router.put('/schools/:schoolId', auth_1.default, schoolController_1.updateSchool);
router.get('/schools', auth_1.default, schoolController_1.getAllSchools);
exports.default = router;
