import express from 'express'
import { body } from 'express-validator'
import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  updateOrderStatus
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Validation for order creation
const orderValidation = [
  body('orderItems')
    .isArray({ min: 1 })
    .withMessage('Order must have at least one item'),
  body('shippingAddress.fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required'),
  body('shippingAddress.address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),
  body('shippingAddress.city')
    .trim()
    .notEmpty()
    .withMessage('City is required'),
  body('shippingAddress.postalCode')
    .trim()
    .notEmpty()
    .withMessage('Postal code is required'),
  body('shippingAddress.country')
    .trim()
    .notEmpty()
    .withMessage('Country is required'),
  body('paymentMethod')
    .isIn(['PayPal', 'Stripe', 'Credit Card', 'Cash on Delivery'])
    .withMessage('Please select a valid payment method'),
  body('itemsPrice')
    .isFloat({ min: 0 })
    .withMessage('Items price must be a positive number'),
  body('totalPrice')
    .isFloat({ min: 0 })
    .withMessage('Total price must be a positive number')
]

// Protected routes
router.post('/', protect, orderValidation, createOrder)
router.get('/myorders', protect, getMyOrders)
router.get('/:id', protect, getOrderById)
router.put('/:id/pay', protect, updateOrderToPaid)

// Admin routes
router.get('/', protect, admin, getOrders)
router.put('/:id/deliver', protect, admin, updateOrderToDelivered)
router.put('/:id/status', protect, admin, updateOrderStatus)

export default router