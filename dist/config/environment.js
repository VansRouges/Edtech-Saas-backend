"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MENU_BUCKET_ID = exports.MENU_COLLECTION_ID = exports.CATEGORY_COLLECTION_ID = exports.RESTAURANT_COLLECTION_ID = exports.RESTAURANT_BUCKET_ID = exports.DATABASE_ID = exports.APPWRITE_API_KEY = exports.APPWRITE_PROJECT_ID = exports.APPWRITE_ENDPOINT = void 0;
// Environment variables setup
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env
exports.APPWRITE_ENDPOINT = process.env.APPWRITE_ENDPOINT || '';
exports.APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID || '';
exports.APPWRITE_API_KEY = process.env.APPWRITE_API_KEY || '';
exports.DATABASE_ID = process.env.APPWRITE_DATABASE_ID || '';
exports.RESTAURANT_BUCKET_ID = process.env.APPWRITE_RESTAURANT_BUCKET_ID || '';
exports.RESTAURANT_COLLECTION_ID = process.env.APPWRITE_RESTAURANT_COLLECTION_ID || '';
exports.CATEGORY_COLLECTION_ID = process.env.APPWRITE_CATEGORY_COLLECTION_ID || '';
exports.MENU_COLLECTION_ID = process.env.APPWRITE_MENU_COLLECTION_ID || '';
exports.MENU_BUCKET_ID = process.env.APPWRITE_MENU_BUCKET_ID || '';
