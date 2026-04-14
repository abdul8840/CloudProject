import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import logger from './logger.js';
import config from '../config/env.js';

dotenv.config();

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality.',
    price: 149.99,
    category: 'Electronics',
    stock: 50,
    rating: 4.5,
    reviews: 128,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop',
  },
  {
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring and GPS.',
    price: 299.99,
    category: 'Electronics',
    stock: 30,
    rating: 4.7,
    reviews: 89,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop',
  },
  {
    name: 'Classic Denim Jacket',
    description: 'Timeless denim jacket perfect for any casual outfit. Made from premium quality cotton.',
    price: 79.99,
    category: 'Clothing',
    stock: 75,
    rating: 4.3,
    reviews: 45,
    imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300&h=200&fit=crop',
  },
  {
    name: 'Running Sneakers',
    description: 'Lightweight and comfortable running shoes with advanced cushioning technology.',
    price: 129.99,
    category: 'Sports',
    stock: 60,
    rating: 4.6,
    reviews: 203,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop',
  },
  {
    name: 'The Complete Guide to JavaScript',
    description: 'Comprehensive guide covering modern JavaScript from basics to advanced concepts.',
    price: 49.99,
    category: 'Books',
    stock: 100,
    rating: 4.8,
    reviews: 312,
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=200&fit=crop',
  },
  {
    name: 'Ergonomic Office Chair',
    description: 'Premium ergonomic chair with lumbar support and adjustable features for maximum comfort.',
    price: 399.99,
    category: 'Home',
    stock: 20,
    rating: 4.4,
    reviews: 67,
    imageUrl: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=300&h=200&fit=crop',
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Extra thick yoga mat with non-slip surface, perfect for all types of exercises.',
    price: 39.99,
    category: 'Sports',
    stock: 150,
    rating: 4.5,
    reviews: 178,
    imageUrl: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=200&fit=crop',
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours.',
    price: 29.99,
    category: 'Sports',
    stock: 200,
    rating: 4.7,
    reviews: 421,
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=200&fit=crop',
  },
  {
    name: 'Modern Table Lamp',
    description: 'Sleek and modern LED table lamp with adjustable brightness and color temperature.',
    price: 59.99,
    category: 'Home',
    stock: 45,
    rating: 4.2,
    reviews: 34,
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=200&fit=crop',
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking and long battery life.',
    price: 34.99,
    category: 'Electronics',
    stock: 120,
    rating: 4.4,
    reviews: 256,
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop',
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(config.mongodb.uri, config.mongodb.options);
    logger.info('MongoDB Connected for seeding');
    
    // Clear existing products
    await Product.deleteMany();
    logger.info('Existing products cleared');
    
    // Insert sample products
    await Product.insertMany(sampleProducts);
    logger.info(`${sampleProducts.length} products seeded successfully`);
    
    process.exit(0);
  } catch (error) {
    logger.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();