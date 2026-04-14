import express from 'express';
import {
  getProducts,
  getProduct,
  getCategories,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/categories', protect, getCategories);
router.get('/', protect, getProducts);
router.get('/:id', protect, getProduct);

export default router;