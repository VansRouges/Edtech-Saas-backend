import { account, ID } from '../config/appwrite';
import { Request, Response } from 'express';

// Sign-up Controller
export const signUp = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name and Email and password are required.' });
  }

  try {
    const user = await account.create(ID.unique(), email, password, name);
    res.status(201).json({ success: true, user });
  } catch (error: Error | any) {
    console.error('Sign-up Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login Controller
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const session = await account.createEmailPasswordSession(email, password);
    res.cookie('sessionId', session.$id, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
    res.status(200).json({ success: true, session });
  } catch (error: Error | any) {
    console.error('Login Error:', error);
    res.status(401).json({ success: false, message: error.message });
  }
};

// Logout Controller
export const logout = async (req: Request, res: Response) => {
  try {
    await account.deleteSession("Current Session ID");
    res.clearCookie('sessionId');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error: Error | any) {
    console.error('Logout Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
