import { Request, Response, NextFunction } from 'express';
import permit from '../utils/permit';

const checkPermission = (action: string, resource: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user; // Ensure your auth middleware sets `req.user`

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized. User not found' });
      }

      const isAllowed = await permit.check(user.id, action, resource);

      if (!isAllowed) {
        return res.status(403).json({ error: `Permission denied for ${action} on ${resource}` });
      }

      next();
    } catch (error) {
      console.error('Permit.io authorization error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
};

export default checkPermission;
