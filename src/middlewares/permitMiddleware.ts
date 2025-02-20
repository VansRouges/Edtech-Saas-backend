import permit from '../utils/permit';

export const syncUserToPermitStudents = async (email: string): Promise<boolean> => {
  try {
    const permitted = await permit.check(email, "create", "students");
    console.log("Permitted", permitted);
    return permitted;
  } catch (error) {
    console.error(`Error syncing user ${email} to Permit.io:`, error);
    return false;
  }
};

export const syncUserToPermitAssigment = async (email: string): Promise<boolean> => {
  try {
    const permitted = await permit.check(email, "create", "assignments");
    console.log("Permitted", permitted);
    return permitted;
  } catch (error) {
    console.error(`Error syncing user ${email} to Permit.io:`, error);
    return false;
  }
};