// src/models/menuModel.ts
import { database, ID, Permission, Role, Query } from '../config/appwrite';
import { DATABASE_ID, MENU_COLLECTION_ID } from '../config/environment';

type MenuData = {
    name: string;
    amount: number;
    discountedAmount?: number;
    restaurantId: string;
    imageUrl: string;
    categories: string[]; // Categories as array of strings (IDs)
}

// Create a new menu
export async function createMenuInDB(data: MenuData) {
    return await database.createDocument(
      DATABASE_ID,
      MENU_COLLECTION_ID,
      ID.unique(),
      data,
      [
        Permission.read(Role.any()),  // Public read permission
        // Permission.write(Role.user(data.userId)),  // User write permission
      ]
    );
}

// Fetch a menus by restaurantId
export async function fetchMenuByRestaurantIdFromDB(restaurantId: string) {
  const response = await database.listDocuments(DATABASE_ID, MENU_COLLECTION_ID, [
    Query.equal('restaurantId', restaurantId),
    Query.orderAsc('$createdAt'), // Order by creation date
  ]);
  return response.documents;
}

