import { Profile } from '@/models/profile';
import { database, ID, Query } from '../config/appwrite';
import { Request, Response, NextFunction, RequestHandler } from 'express';

const profileId = process.env.APPWRITE_PROFILE_COLLECTION_ID as string; // Ensure this is in .env
const databaseId = process.env.APPWRITE_DATABASE_ID as string; // Ensure this is in .env



// Create Profile Controller
export const createProfile: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, email, role, userId, schoolId } = req.body;
  console.log(req.body);

  if (!name || !email || !role || !userId || !schoolId) {
    res.status(400).json({ error: 'Name, email, role and schoolId are required.' });
    return  
  }

  // Validate role
  const allowedRoles: Profile['role'][] = ['admin', 'teacher', 'parent'];
  if (!allowedRoles.includes(role)) {
    res.status(400).json({ error: 'Invalid role. Allowed roles: admin, teacher, parent.' });
    return 
  }

  try {
    const profile = await database.createDocument(
        databaseId,
        profileId,
        ID.unique(),
        { name, email, role, userId, schoolId }
    );

    res.status(201).json({ success: true, profile });
    return;
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
    return;
  }
};

// Fetch Profile by Email
export const getProfileByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email } = req.params;
    
    if(!email) {
      res.status(400).json({ error: 'Email is required.' });
      return 
    } else {
         try {
            const profile = await database.listDocuments(
                databaseId,
                profileId, 
                [Query.equal("email", email)]
            );

            if (profile.documents.length === 0) {
              res.status(404).json({ error: 'Profile not found' });
              return 
            }

            res.status(200).json({ success: true, profile: profile.documents[0] });
        } catch (error: any) {
            console.error('Error fetching profile:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
 
};
