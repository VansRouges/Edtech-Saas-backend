import { Request, Response } from 'express';
import { database } from '../config/appwrite'; // Import configured Appwrite SDK
import { ID } from 'appwrite';
import { DATABASE_ID, CATEGORY_COLLECTION_ID } from '../config/environment';
import { 
  fetchCategoriesByRestaurantIdFromDB, 
  deleteCategory, 
  editCategory 
} from '../models/categoryModels';

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
  const { name, imageUrl, restaurantId } = req.body;

  try {
    const category = await database.createDocument(
      DATABASE_ID,
      CATEGORY_COLLECTION_ID,
      ID.unique(),
      { name, imageUrl, restaurantId  }
    );

    res.status(201).json({ success: true, category });
  } catch (error: Error | any) {
    console.error('Create Category Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetch all categories or categories by a query
export const fetchCategoriesByRestaurantId = async (req: Request, res: Response) => {
    const { restaurantId } = req.params;

    if (!restaurantId) {
      return res.status(400).json({ success: false, message: "Restaurant ID is required." });
    }
  
    try {
      const categories = await fetchCategoriesByRestaurantIdFromDB(restaurantId);
      if (categories.length === 0) {
        return res.status(404).json({ success: false, message: 'Categories not found.' });
      }
      res.status(200).json(categories);
    } catch (error: Error | any) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

  export const deleteCategoryController = async (req: Request, res: Response) => {
    const { categoryId } = req.params;
  
    if (!categoryId) {
      return res.status(400).json({ success: false, message: "Category ID is required." });
    }
  
    try {
      const result = await deleteCategory(categoryId);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

// Controller to Edit a Category
export const editCategoryController = async (req: Request, res: Response) => {
  const { categoryId } = req.params;
  const { name, imageUrl } = req.body;

  if (!categoryId || !name || !imageUrl) {
    return res.status(400).json({
      success: false,
      message: "Category ID, name, and imageUrl are required.",
    });
  }

  try {
    const updatedCategory = await editCategory(categoryId, name, imageUrl);
    res.status(200).json({ success: true, category: updatedCategory });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};