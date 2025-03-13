"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors")); // CORS middleware
const auth_1 = __importDefault(require("./auth")); // Import auth routes
const profile_1 = __importDefault(require("./profile"));
const schoolRoutes_1 = __importDefault(require("./schoolRoutes"));
const student_1 = __importDefault(require("./student"));
const assignment_1 = __importDefault(require("./assignment"));
const errorHandler_1 = require("../utils/errorHandler"); // Custom error handler middleware
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../docs/swagger.json"));
dotenv_1.default.config(); // Load environment variables from .env file
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
// Middleware
app.use((0, cors_1.default)()); // Handle CORS
app.use(express_1.default.json()); /// Parse incoming JSON requests
app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
console.log(swagger_json_1.default);
// Routes
app.use('/api/auth', auth_1.default); // Authentication routes
app.use('/api', profile_1.default); // Profile routes mounted
app.use('/api', schoolRoutes_1.default); // School routes mounted
app.use('/api', student_1.default); // Student routes mounted
app.use('/api/assignments', assignment_1.default); // Assignment routes mounted
// Global Error Handling Middleware
app.use(errorHandler_1.errorHandler); // Handle errors globally
// Default Route
app.get('/', (req, res) => {
    res.send('Appwrite Express API');
});
// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
exports.default = app;
