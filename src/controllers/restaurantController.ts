// src/controllers/restaurantController.ts
import { Request, Response } from 'express';
import {
  createRestaurantInDB,
  fetchRestaurantByUserIdFromDB,
} from '../models/restaurantModels';
import { database, Query } from '../config/appwrite';
import { DATABASE_ID, RESTAURANT_COLLECTION_ID } from '../config/environment';


// Fetch a restaurant by user ID
export const fetchRestaurantByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const restaurant = await fetchRestaurantByUserIdFromDB(userId);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found.' });
    }
    res.status(200).json(restaurant);
  } catch (error: any) {
    console.error('Error fetching restaurant:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new restaurant
export const createRestaurant = async (req: Request, res: Response) => {
  const restaurantData = req.body;

  try {
    const restaurant = await createRestaurantInDB(restaurantData);
    res.status(201).json({ success: true, restaurant });
  } catch (error: any) {
    console.error('Error creating restaurant:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to generate slugs
function generateSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-'); // Replace spaces with hyphens
}

// Controller to validate slug uniqueness
export const validateSlug = async (req: Request, res: Response) => {
  try {
    const { restaurantName } = req.body;

    if (!restaurantName) {
      return res.status(400).json({ message: 'Restaurant name is required.' });
    }

    const slug = generateSlug(restaurantName);

    // Check if the slug already exists in the restaurant collection
    const existingSlugs = await database.listDocuments(DATABASE_ID, RESTAURANT_COLLECTION_ID, [
      Query.equal('slug', slug),
    ]);

    if (existingSlugs.documents.length > 0) {
      return res.status(409).json({ message: 'This restaurant name is already taken. Please choose a different name.' });
    }

    return res.status(200).json({ message: 'Slug is available.', slug });
  } catch (error) {
    console.error('Error validating slug:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

