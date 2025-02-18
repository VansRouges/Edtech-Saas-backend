import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; 

// Extend Request type to include 'user'
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized. No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; role: string };
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;
