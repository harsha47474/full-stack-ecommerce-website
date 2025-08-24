import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
})

const shippingAddressSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  postalCode: {
    type: String,
    required: true,
    trim: true
  },
  country: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  }
})

const paymentResultSchema = new mongoose.Schema({
  id: String,
  status: String,
  update_time: String,
  email_address: String
})

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  orderItems: [orderItemSchema],
  shippingAddress: {
    type: shippingAddressSchema,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['PayPal', 'Stripe', 'Credit Card', 'Cash on Delivery']
  },
  paymentResult: paymentResultSchema,
  itemsPrice: {
    type: Number,
    required: true,
    min: 0
  },
  taxPrice: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  shippingPrice: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: {
    type: Date
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  trackingNumber: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  }
}, {
  timestamps: true
})

// Indexes for better query performance
orderSchema.index({ user: 1 })
orderSchema.index({ status: 1 })
orderSchema.index({ createdAt: -1 })
orderSchema.index({ isPaid: 1 })
orderSchema.index({ isDelivered: 1 })

// Pre-save middleware to calculate total price
orderSchema.pre('save', function(next) {
  // Calculate items price if not set
  if (!this.itemsPrice) {
    this.itemsPrice = this.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }
  
  // Calculate total price
  this.totalPrice = this.itemsPrice + this.taxPrice + this.shippingPrice
  
  next()
})

// Virtual for order number (formatted order ID)
orderSchema.virtual('orderNumber').get(function() {
  return `ORD-${this._id.toString().slice(-8).toUpperCase()}`
})

// Ensure virtuals are included in JSON output
orderSchema.set('toJSON', { virtuals: true })

const Order = mongoose.model('Order', orderSchema)

export default Order