import { validationResult } from 'express-validator'
import Order from '../models/Order.js'
import Product from '../models/Product.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    } = req.body

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No order items'
      })
    }

    // Verify products exist and have sufficient stock
    for (const item of orderItems) {
      const product = await Product.findById(item.product)
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.name}`
        })
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}`
        })
      }
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })

    const createdOrder = await order.save()

    // Update product stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } }
      )
    }

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: createdOrder
    })
  } catch (error) {
    console.error('Create order error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while creating order'
    })
  }
}

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email')
      .populate('orderItems.product', 'name images')

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      })
    }

    // Check if user owns this order or is admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order'
      })
    }

    res.json({
      success: true,
      order
    })
  } catch (error) {
    console.error('Get order error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while fetching order'
    })
  }
}

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      })
    }

    // Check if user owns this order
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this order'
      })
    }

    order.isPaid = true
    order.paidAt = Date.now()
    order.status = 'Processing'
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer?.email_address
    }

    const updatedOrder = await order.save()

    res.json({
      success: true,
      message: 'Order updated to paid',
      order: updatedOrder
    })
  } catch (error) {
    console.error('Update order to paid error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while updating order'
    })
  }
}

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
export const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      })
    }

    order.isDelivered = true
    order.deliveredAt = Date.now()
    order.status = 'Delivered'
    
    if (req.body.trackingNumber) {
      order.trackingNumber = req.body.trackingNumber
    }

    const updatedOrder = await order.save()

    res.json({
      success: true,
      message: 'Order updated to delivered',
      order: updatedOrder
    })
  } catch (error) {
    console.error('Update order to delivered error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while updating order'
    })
  }
}

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate('orderItems.product', 'name images')

    const total = await Order.countDocuments({ user: req.user._id })

    res.json({
      success: true,
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Get my orders error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    })
  }
}

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    let query = {}

    // Filter by status
    if (req.query.status) {
      query.status = req.query.status
    }

    // Filter by payment status
    if (req.query.isPaid !== undefined) {
      query.isPaid = req.query.isPaid === 'true'
    }

    // Filter by delivery status
    if (req.query.isDelivered !== undefined) {
      query.isDelivered = req.query.isDelivered === 'true'
    }

    const orders = await Order.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)

    const total = await Order.countDocuments(query)

    res.json({
      success: true,
      orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Get orders error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while fetching orders'
    })
  }
}

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingNumber, notes } = req.body
    const order = await Order.findById(req.params.id)

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      })
    }

    order.status = status || order.status
    
    if (trackingNumber) {
      order.trackingNumber = trackingNumber
    }
    
    if (notes) {
      order.notes = notes
    }

    // Update delivery status based on status
    if (status === 'Delivered') {
      order.isDelivered = true
      order.deliveredAt = Date.now()
    }

    const updatedOrder = await order.save()

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order: updatedOrder
    })
  } catch (error) {
    console.error('Update order status error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while updating order status'
    })
  }
}