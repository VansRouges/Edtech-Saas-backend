// src/models/restaurantModel.ts
import { database, ID, Permission, Role, Query } from '../config/appwrite';
import { DATABASE_ID, RESTAURANT_COLLECTION_ID } from '../config/environment';

type RestaurantInfo = {
  description: string;
  address: string;
  userId: string;
  imageUrl: string;
  restaurantName: string,
  phoneNumber: string, 
  fullName: string, 
  userName: string, 
  email: string, 
  slug: string,
  facebookHandle?: string, 
  twitterHandle?: string,
  instagramHandle?: string,
}

// Create a new restaurant
export async function createRestaurantInDB(data: RestaurantInfo) {
  return await database.createDocument(
    DATABASE_ID,
    RESTAURANT_COLLECTION_ID,
    ID.unique(),
    data,
    [
      Permission.read(Role.any()),  // Public read permission
      // Permission.write(Role.user(data.userId)),  // User write permission
    ]
  );
}

// Fetch a restaurant by user ID
export async function fetchRestaurantByUserIdFromDB(userId: string) {
  const response = await database.listDocuments(DATABASE_ID, RESTAURANT_COLLECTION_ID, [
    Query.equal('userId', userId),
    Query.orderAsc('$createdAt'), // Order by creation date
    Query.limit(1),
  ]);
  return response.documents[0] || null;
}
