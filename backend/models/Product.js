import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true,
    maxlength: [500, 'Review comment cannot be more than 500 characters']
  }
}, {
  timestamps: true
})

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  salePrice: {
    type: Number,
    min: [0, 'Sale price cannot be negative'],
    validate: {
      validator: function(value) {
        return !value || value < this.price
      },
      message: 'Sale price must be less than regular price'
    }
  },
  images: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: {
      values: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Beauty', 'Toys', 'Automotive', 'Other'],
      message: 'Please select a valid category'
    }
  },
  brand: {
    type: String,
    required: [true, 'Product brand is required'],
    trim: true
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  weight: {
    type: Number,
    min: [0, 'Weight cannot be negative']
  },
  dimensions: {
    length: { type: Number, min: 0 },
    width: { type: Number, min: 0 },
    height: { type: Number, min: 0 }
  },
  features: [{
    type: String,
    trim: true
  }],
  specifications: {
    type: Map,
    of: String
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numReviews: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

// Indexes for better query performance
productSchema.index({ name: 'text', description: 'text', brand: 'text' })
productSchema.index({ category: 1 })
productSchema.index({ price: 1 })
productSchema.index({ rating: -1 })
productSchema.index({ createdAt: -1 })
productSchema.index({ isActive: 1 })
// Index is automatically created by unique: true

// Calculate average rating when reviews are updated
productSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.rating = 0
    this.numReviews = 0
  } else {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0)
    this.rating = Math.round((totalRating / this.reviews.length) * 10) / 10
    this.numReviews = this.reviews.length
  }
}

// Pre-save middleware to calculate rating
productSchema.pre('save', function(next) {
  if (this.isModified('reviews')) {
    this.calculateAverageRating()
  }
  next()
})

// Virtual for current price (sale price if available, otherwise regular price)
productSchema.virtual('currentPrice').get(function() {
  return this.salePrice && this.salePrice < this.price ? this.salePrice : this.price
})

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.salePrice && this.salePrice < this.price) {
    return Math.round(((this.price - this.salePrice) / this.price) * 100)
  }
  return 0
})

// Ensure virtuals are included in JSON output
productSchema.set('toJSON', { virtuals: true })

const Product = mongoose.model('Product', productSchema)

export default Product