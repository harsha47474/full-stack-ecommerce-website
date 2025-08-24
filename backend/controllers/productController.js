import { validationResult } from 'express-validator'
import Product from '../models/Product.js'

// @desc    Get all products with filtering, sorting, and pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 12
    const skip = (page - 1) * limit

    // Build query object
    let query = { isActive: true }

    // Search functionality
    if (req.query.search) {
      query.$text = { $search: req.query.search }
    }

    // Category filter
    if (req.query.category) {
      query.category = req.query.category
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {}
      if (req.query.minPrice) {
        query.price.$gte = parseFloat(req.query.minPrice)
      }
      if (req.query.maxPrice) {
        query.price.$lte = parseFloat(req.query.maxPrice)
      }
    }

    // Brand filter
    if (req.query.brand) {
      query.brand = new RegExp(req.query.brand, 'i')
    }

    // Rating filter
    if (req.query.minRating) {
      query.rating = { $gte: parseFloat(req.query.minRating) }
    }

    // In stock filter
    if (req.query.inStock === 'true') {
      query.stock = { $gt: 0 }
    }

    // Featured products
    if (req.query.featured === 'true') {
      query.isFeatured = true
    }

    // Build sort object
    let sort = {}
    if (req.query.sort) {
      switch (req.query.sort) {
        case 'price-asc':
          sort.price = 1
          break
        case 'price-desc':
          sort.price = -1
          break
        case 'rating':
          sort.rating = -1
          break
        case 'newest':
          sort.createdAt = -1
          break
        case 'oldest':
          sort.createdAt = 1
          break
        case 'name-asc':
          sort.name = 1
          break
        case 'name-desc':
          sort.name = -1
          break
        default:
          sort.createdAt = -1
      }
    } else {
      sort.createdAt = -1
    }

    // Execute query
    const products = await Product.find(query)
      .sort(sort)
      .limit(limit)
      .skip(skip)
      .populate('createdBy', 'name')

    // Get total count for pagination
    const total = await Product.countDocuments(query)

    // Get categories for filters
    const categories = await Product.distinct('category', { isActive: true })
    const brands = await Product.distinct('brand', { isActive: true })

    res.json({
      success: true,
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      filters: {
        categories,
        brands
      }
    })
  } catch (error) {
    console.error('Get products error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products'
    })
  }
}

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('createdBy', 'name')
      .populate('reviews.user', 'name avatar')

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    if (!product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product is not available'
      })
    }

    res.json({
      success: true,
      product
    })
  } catch (error) {
    console.error('Get product error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while fetching product'
    })
  }
}

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      })
    }

    // Generate SKU if not provided
    if (!req.body.sku) {
      const timestamp = Date.now().toString().slice(-6)
      const randomStr = Math.random().toString(36).substring(2, 5).toUpperCase()
      req.body.sku = `PRD-${timestamp}-${randomStr}`
    }

    const product = await Product.create({
      ...req.body,
      createdBy: req.user._id
    })

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product
    })
  } catch (error) {
    console.error('Create product error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while creating product'
    })
  }
}

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    res.json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct
    })
  } catch (error) {
    console.error('Update product error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while updating product'
    })
  }
}

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    // Soft delete - set isActive to false
    product.isActive = false
    await product.save()

    res.json({
      success: true,
      message: 'Product deleted successfully'
    })
  } catch (error) {
    console.error('Delete product error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while deleting product'
    })
  }
}

// @desc    Add product review
// @route   POST /api/products/:id/reviews
// @access  Private
export const addProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    // Check if user already reviewed this product
    const alreadyReviewed = product.reviews.find(
      review => review.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: 'Product already reviewed'
      })
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment
    }

    product.reviews.push(review)
    await product.save()

    res.status(201).json({
      success: true,
      message: 'Review added successfully'
    })
  } catch (error) {
    console.error('Add review error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while adding review'
    })
  }
}

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
export const getTopProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .sort({ rating: -1 })
      .limit(5)

    res.json({
      success: true,
      products
    })
  } catch (error) {
    console.error('Get top products error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error while fetching top products'
    })
  }
}