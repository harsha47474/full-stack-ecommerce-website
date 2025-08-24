import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../stores/cartStore'
import toast from 'react-hot-toast'

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, getTotal, getItemCount } = useCartStore()

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId, productName) => {
    removeItem(productId)
    toast.success(`${productName} removed from cart`)
  }

  const handleClearCart = () => {
    clearCart()
    toast.success('Cart cleared')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/products" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Shopping Cart ({getItemCount()} items)
          </h1>
          <button
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-700 dark:text-red-400 font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <Link to={`/products/${item._id}`}>
                    <img
                      src={item.images?.[0] || '/placeholder-product.jpg'}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg hover:opacity-75 transition-opacity"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1">
                    <Link
                      to={`/products/${item._id}`}
                      className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      ${item.salePrice || item.price} each
                    </p>
                    
                    {/* Stock Status */}
                    {item.stock > 0 ? (
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        In Stock ({item.stock} available)
                      </p>
                    ) : (
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                        Out of Stock
                      </p>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      className="p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    
                    <span className="w-12 text-center font-medium text-gray-900 dark:text-gray-100">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      className="p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      disabled={item.quantity >= item.stock}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item._id, item.name)}
                    className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="card p-6 sticky top-24"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Order Summary
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal ({getItemCount()} items)
                  </span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    ${getTotal().toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    Free
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    ${(getTotal() * 0.08).toFixed(2)}
                  </span>
                </div>

                <hr className="border-gray-200 dark:border-gray-700" />

                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-gray-900 dark:text-gray-100">Total</span>
                  <span className="text-gray-900 dark:text-gray-100">
                    ${(getTotal() * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  to="/checkout"
                  className="w-full btn-primary text-center block"
                >
                  Proceed to Checkout
                </Link>
                
                <Link
                  to="/products"
                  className="w-full btn-secondary text-center block"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Security Badge */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  🔒 Secure checkout with SSL encryption
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart