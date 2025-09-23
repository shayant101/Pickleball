import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyAccessToken } from '../utils/jwt';

const prisma = new PrismaClient();

// Extend the Request interface to include user data
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        email: string;
        name: string | null;
      };
    }
  }
}

/**
 * Authentication middleware that verifies JWT access token
 * and attaches user data to the request object
 */
export async function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        error: 'Access token is required'
      });
    }

    // Verify the token
    const decoded = verifyAccessToken(token);

    // Fetch user data from database to ensure user still exists
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true
      }
    });

    if (!user) {
      return res.status(401).json({
        error: 'User not found'
      });
    }

    // Attach user data to request object
    req.user = user;
    next();

  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({
      error: 'Invalid or expired access token'
    });
  }
}

/**
 * Optional authentication middleware that doesn't fail if no token is provided
 * but still verifies and attaches user data if a valid token is present
 */
export async function optionalAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      // No token provided, continue without user data
      return next();
    }

    // Verify the token
    const decoded = verifyAccessToken(token);

    // Fetch user data from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true
      }
    });

    if (user) {
      // Attach user data to request object if user exists
      req.user = user;
    }

    next();

  } catch (error) {
    // Token is invalid, but we don't fail - just continue without user data
    console.warn('Optional auth failed:', error);
    next();
  }
}