// Environment variables setup
import dotenv from 'dotenv';
dotenv.config();  // Load environment variables from .env

export const APPWRITE_ENDPOINT = process.env.APPWRITE_ENDPOINT || '';
export const APPWRITE_PROJECT_ID = process.env.APPWRITE_PROJECT_ID || '';
export const APPWRITE_API_KEY = process.env.APPWRITE_API_KEY || '';
export const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || '';
export const SCHOOL_COLLECTION_ID = process.env.APPWRITE_SCHOOL_COLLECTION_ID || '';
export const PROFILE_COLLECTION_ID = process.env.APPWRITE_PROFILE_COLLECTION_ID || '';