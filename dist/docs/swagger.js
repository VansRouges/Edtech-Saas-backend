"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MenuJollof Appwrite-Express API',
            version: '1.0.0',
            description: 'API documentation for the MenuJollof Appwrite-Express API',
        },
    },
    // Paths to files with API documentation
    apis: ['./routes/*.ts'], // Adjust this path based on your project structure
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
