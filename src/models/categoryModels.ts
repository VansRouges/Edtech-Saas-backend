import { database, ID, Permission, Role, Query } from '../config/appwrite';
import { DATABASE_ID, CATEGORY_COLLECTION_ID } from '../config/environment';

// Fetch a menus by restaurantId
export async function fetchCategoriesByRestaurantIdFromDB(restaurantId: string) {
    const response = await database.listDocuments(DATABASE_ID, CATEGORY_COLLECTION_ID, [
      Query.equal('restaurantId', restaurantId),
      Query.orderAsc('$createdAt'), // Order by creation date
    ]);
    return response.documents;
  }


// Delete Category Model
export const deleteCategory = async (categoryId: string) => {
  try {
    await database.deleteDocument(DATABASE_ID, CATEGORY_COLLECTION_ID, categoryId);
    return { success: true, message: "Category deleted successfully." };
  } catch (error: any) {
    console.error("Error deleting category:", error);
    throw new Error(error.message || "Failed to delete category.");
  }
};

// Edit Category Model
export const editCategory = async (
  categoryId: string, 
  name: string, 
  imageUrl: string
) => {
  try {
    const response = await database.updateDocument(
      DATABASE_ID,
      CATEGORY_COLLECTION_ID,
      categoryId,
      { name, imageUrl }
    );
    console.log("Category updated successfully:", response);
    return response;
  } catch (error: any) {
    console.error("Error updating category:", error);
    throw new Error(error.message || "Failed to update category.");
  }
};