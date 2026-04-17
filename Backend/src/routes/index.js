import express from 'express';
import authRoutes from './authRoutes.js';
import productRoutes from './productRoutes.js';

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);

// List all available routes (development only)
router.get('/routes', (req, res) => {
  const routes = [];
  
  router.stack.forEach((middleware) => {
    if (middleware.route) {
      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods),
      });
    }
  });
  
  res.json({
    success: true,
    availableRoutes: routes,
    message: 'Available API routes',
  });
});

export default router;