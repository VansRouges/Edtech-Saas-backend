import { Request, Response } from 'express';
import {
    createMenuInDB,
    fetchMenuByRestaurantIdFromDB,
  } from '../models/menuModels';
import { database, ID, Permission, Role, Query } from '../config/appwrite';
import { DATABASE_ID, MENU_COLLECTION_ID } from '../config/environment';

// Create a new menu
export const fetchMenusByRestaurantId = async (req: Request, res: Response) => {
    const { restaurantId } = req.params;
  
    try {
      const menus = await fetchMenuByRestaurantIdFromDB(restaurantId);
      if (menus.length === 0) {
        return res.status(404).json({ success: false, message: 'Menus not found.' });
      }
      res.status(200).json(menus);
    } catch (error: Error | any) {
      console.error('Error fetching menus:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

// Fetch menus by restaurantId
export const createMenu = async (req: Request, res: Response) => {
    const { restaurantId, name, amount, discountedAmount, categories, imageUrl } = req.body;
  
    try {
      const menu = await createMenuInDB({
        name,
        amount,
        discountedAmount,
        categories,
        imageUrl,
        restaurantId,
      });
      res.status(201).json({ success: true, menu });
    } catch (error: Error | any) {
      console.error('Error creating restaurant:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  };

// Delete Menu Controller
export const deleteMenu = async (req: Request, res: Response) => {
  const { menuId } = req.params;

  if (!menuId) {
    return res.status(400).json({ success: false, message: 'Menu ID is required.' });
  }

  try {
    await database.deleteDocument(DATABASE_ID, MENU_COLLECTION_ID, menuId);
    res.status(200).json({ success: true, message: 'Menu deleted successfully.' });
  } catch (error: any) {
    console.error('Error deleting menu:', error.message);
    res.status(500).json({ success: false, message: 'Failed to delete menu.' });
  }
};