// src/models/dashboardModel.ts
import { database, Query } from "../config/appwrite";
import { DATABASE_ID, RESTAURANT_COLLECTION_ID, CATEGORY_COLLECTION_ID, MENU_COLLECTION_ID } from "../config/environment";

// Function to fetch dashboard data
export const fetchDashboardDataModel = async (userId: string) => {
  // 1. Fetch Restaurant Data
  const restaurantResponse = await database.listDocuments(DATABASE_ID, RESTAURANT_COLLECTION_ID, [
    Query.orderAsc("$createdAt"),
    Query.equal("userId", userId),
    Query.limit(1),
  ]);

  if (restaurantResponse.documents.length === 0) {
    throw new Error("No restaurant found for this user.");
  }

  const restaurant = restaurantResponse.documents[0];
  const restaurantId = restaurant.$id;

  // 2. Fetch Categories Data
  const categoryResponse = await database.listDocuments(DATABASE_ID, CATEGORY_COLLECTION_ID, [
    Query.orderAsc("$createdAt"),
    Query.equal("restaurantId", restaurantId),
  ]);

  // 3. Fetch Menus Data
  const menuResponse = await database.listDocuments(DATABASE_ID, MENU_COLLECTION_ID, [
    Query.orderAsc("$createdAt"),
    Query.equal("restaurantId", restaurantId),
  ]);

  return {
    restaurant,
    categories: categoryResponse.documents,
    menus: menuResponse.documents,
  };
};
