import express from 'express';
import multer from 'multer';
import { uploadImage } from '../controllers/menuImageController';

const router = express.Router();
const upload = multer();  // Initialize Multer for in-memory file storage

// Route to upload an image
router.post('/upload', upload.single('image'), uploadImage);

export default router;
