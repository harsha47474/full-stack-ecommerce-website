import express from 'express'
import { body } from 'express-validator'
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductReview,
  getTopProducts
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Validation rules for product creation/update
const productValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Product name must be between 1 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Description must be between 10 and 2000 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('category')
    .isIn(['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Beauty', 'Toys', 'Automotive', 'Other'])
    .withMessage('Please select a valid category'),
  body('brand')
    .trim()
    .notEmpty()
    .withMessage('Brand is required'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  body('images')
    .isArray({ min: 1 })
    .withMessage('At least one image is required')
]

// Review validation
const reviewValidation = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Comment must be between 1 and 500 characters')
]

// Public routes
router.get('/top', getTopProducts)
router.get('/', getProducts)
router.get('/:id', getProduct)

// Protected routes
router.post('/:id/reviews', protect, reviewValidation, addProductReview)

// Admin routes
router.post('/', protect, admin, productValidation, createProduct)
router.put('/:id', protect, admin, updateProduct)
router.delete('/:id', protect, admin, deleteProduct)

export default router