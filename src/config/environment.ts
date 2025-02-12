// Environment variables setup
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env

export const APPWRITE_ENDPOINT = process.env.APPWRITE_ENDPOINT || '';
export const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID || '';
export const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY || '';
export const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || '';
export const RESTAURANT_BUCKET_ID = process.env.APPWRITE_RESTAURANT_BUCKET_ID || '';
export const RESTAURANT_COLLECTION_ID = process.env.APPWRITE_RESTAURANT_COLLECTION_ID || '';
export const CATEGORY_COLLECTION_ID = process.env.APPWRITE_CATEGORY_COLLECTION_ID || '';
export const MENU_COLLECTION_ID = process.env.APPWRITE_MENU_COLLECTION_ID || '';
export const MENU_BUCKET_ID = process.env.APPWRITE_MENU_BUCKET_ID || '';