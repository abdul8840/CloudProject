import Product from '../models/Product.js';
import { AppError } from '../middleware/errorHandler.js';
import logger from '../utils/logger.js';

/**
 * @desc    Get all products
 * @route   GET /api/v1/products
 * @access  Private
 */
export const getProducts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      minPrice,
      maxPrice,
      search,
      sort = '-createdAt',
    } = req.query;
    
    // Build query
    const query = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    // Execute query with pagination
    const products = await Product.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();
    
    // Get total count
    const count = await Product.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: Number(page),
          totalPages: Math.ceil(count / limit),
          totalProducts: count,
          limit: Number(limit),
        },
      },
    });
  } catch (error) {
    logger.error(`Get products error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Get single product
 * @route   GET /api/v1/products/:id
 * @access  Private
 */
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return next(new AppError('Product not found', 404));
    }
    
    res.status(200).json({
      success: true,
      data: { product },
    });
  } catch (error) {
    logger.error(`Get product error: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Get product categories
 * @route   GET /api/v1/products/categories
 * @access  Private
 */
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct('category');
    
    res.status(200).json({
      success: true,
      data: { categories },
    });
  } catch (error) {
    logger.error(`Get categories error: ${error.message}`);
    next(error);
  }
};