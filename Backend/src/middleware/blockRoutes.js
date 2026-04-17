import logger from '../utils/logger.js';
import config from '../config/env.js';

/**
 * Middleware to silently block specific routes
 */
export const blockUnwantedRoutes = (req, res, next) => {
  const blockedPaths = [
    '/api/orders',
    '/favicon.ico',
    '/robots.txt',
  ];

  const isBlocked = blockedPaths.some(path => req.path.startsWith(path));

  if (isBlocked) {
    // Log only in development for debugging
    if (config.env === 'development') {
      logger.warn(`Blocked request to: ${req.path}`);
    }
    
    return res.status(404).json({
      success: false,
      message: 'Not found',
    });
  }

  next();
};