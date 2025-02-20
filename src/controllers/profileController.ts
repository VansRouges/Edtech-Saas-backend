import { Profile } from '@/models/profile';
import { database, ID, Query } from '../config/appwrite';
import permit from '../utils/permit'; // Ensure this is correctly configured
import { Request, Response, NextFunction, RequestHandler } from 'express';

const profileId = process.env.APPWRITE_PROFILE_COLLECTION_ID as string; // Ensure this is in .env
const databaseId = process.env.APPWRITE_DATABASE_ID as string; // Ensure this is in .env

// Function to sync user with Permit.io
const syncUserToPermit = async (userId: string, role: string, email: string, lastName: string, firstName: string) => {
  try {
    const permitted = await permit.check(email, "create", "students");
    const tenants = await permit.api.tenants.list();
    if (permitted) {
      console.log(`${email} is PERMITTED to create a document`);
    } else {
      console.log("John is NOT PERMITTED to create a document");
    }
    console.log("Permitted", permitted);
    console.log(`User ${userId} synced to Permit.io with role ${role}`);
    console.log("Tenants", tenants);
    return permitted;
  } catch (error) {
    console.error(`Error syncing user ${userId} to Permit.io:`, error);
  }
};

// Create Profile Controller
export const createProfile: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { firstName, lastName, email, role, userId } = req.body;
  console.log(req.body);

  if (  !email || !role || !userId) {
    res.status(400).json({ error: 'FirstName, lastName, email, role, and userId are required.' });
    return;
  }

  // Validate role
  const allowedRoles: Profile['role'][] = ['admin', 'teacher'];
  if (!allowedRoles.includes(role)) {
    res.status(400).json({ error: 'Invalid role. Allowed roles: admin, teacher' });
    return;
  }

  try {
    const profile = await database.createDocument(
      databaseId,
      profileId,
      ID.unique(),
      { firstName, lastName, email, role, userId }
    );

    // Sync user to Permit.io
    const check = await syncUserToPermit(userId, role, email, firstName, lastName);
    console.log('Profile created and synced:', profile);
    res.status(201).json({ success: true, profile, check });
    return;
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }
};

// Fetch Profile by Email
export const getProfileByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email } = req.params;
    
  if (!email) {
    res.status(400).json({ error: 'Email is required.' });
    return;
  } 

  try {
    const profile = await database.listDocuments(
      databaseId,
      profileId, 
      [Query.equal("email", email)]
    );

    if (profile.documents.length === 0) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }

    res.status(200).json({ success: true, profile: profile.documents[0] });
  } catch (error: any) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
