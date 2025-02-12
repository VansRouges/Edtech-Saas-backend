import { Request, Response } from 'express';
import { storage, ID } from '../config/appwrite'; // Ensure Appwrite client is configured
import { MENU_BUCKET_ID, APPWRITE_PROJECT_ID } from '../config/environment';

// Upload an image and return the file URL
export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  if (req.file) {
    const { originalname, buffer } = req.file;
    const file = new File([buffer], originalname, { type: req.file.mimetype });

    // Use .then().catch() for error handling without try-catch block
    storage
      .createFile(MENU_BUCKET_ID, ID.unique(), file)
      .then((imageResponse) => {
        const imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${MENU_BUCKET_ID}/files/${imageResponse.$id}/view?project=${APPWRITE_PROJECT_ID}`;
        res.status(201).send(imageUrl);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);  // Log the error
        res.status(500).json({ success: false, message: 'Image upload failed.', error: error.message });
      });
  } else {
    res.status(400).json({ success: false, message: 'No file uploaded.' });
  }
};
