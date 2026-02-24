import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';
import HTTP_STATUS from '../utils/statusCodes';

interface JwtPayload {
  id: number;
  role: 'admin' | 'user';
}

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      logger.warn('Authentication failed: No token provided');
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ 
        message: 'Unauthorized: No token provided' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    (req as any).user = {
      id: decoded.id,
      role: decoded.role
    };

    logger.info(`User authenticated: ID=${decoded.id}, Role=${decoded.role}`);
    next();
  } catch (err: any) {
    logger.error(`Authentication error: ${err.message}`);
    return res.status(HTTP_STATUS.FORBIDDEN).json({ 
      message: 'Forbidden: Invalid or expired token' 
    });
  }
};