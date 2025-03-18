import permit from '../utils/permit';

export const checkUsertoPermitStudents = async (email: string, action: string, resource: string): Promise<boolean> => {
  try {
    const permitted = await permit.check(email, action, resource);
    console.log("Permitted", permitted);
    return permitted;
  } catch (error) {
    console.error(`Error syncing user ${email} to Permit.io:`, error);
    return false;
  }
};

export const checkUserToPermitAssignment = async (email: string, action: string, resource: string): Promise<boolean> => {
  try {
    const permitted = await permit.check(email, action, resource);
    console.log("Permitted", permitted);
    return permitted;
  } catch (error) {
    console.error(`Error syncing user ${email} to Permit.io:`, error);
    return false;
  }
};
