import permit from '../utils/permit';

export const syncUserToPermit = async (email: string): Promise<boolean> => {
  try {
    const permitted = await permit.check(email, "create", "students");
    console.log("Permitted", permitted);
    return permitted;
  } catch (error) {
    console.error(`Error syncing user ${email} to Permit.io:`, error);
    return false;
  }
};