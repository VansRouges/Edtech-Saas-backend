// middleware for protecting routes
import { NextFunction, Request, Response } from 'express';
import { Account } from 'appwrite';
import { client } from '../config/appwrite';  // Import Appwrite client

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessionToken = req.headers['authorization'];
    if (!sessionToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const account = new Account(client);
    await account.get();  // Validate session

    next();  // Move to the next middleware or route
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired session' });
  }
};
