import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart } from 'lucide-react'
import { useWishlistStore } from '../stores/wishlistStore'
import { useCartStore } from '../stores/cartStore'
import toast from 'react-hot-toast'

const Wishlist = () => {
  const { items, removeItem, clearWishlist } = useWishlistStore()
  const { addItem: addToCart } = useCartStore()

  const handleRemoveFromWishlist = (productId, productName) => {
    removeItem(productId)
    toast.success(`${productName} removed from wishlist`)
  }

  const handleAddToCart = (product) => {
    addToCart(product)
    toast.success(`${product.name} added to cart!`)
  }

  const handleClearWishlist = () => {
    clearWishlist()
    toast.success('Wishlist cleared')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <Heart className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Save items you love for later by adding them to your wishlist.
            </p>
            <Link to="/products" className="btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            My Wishlist ({items.length} items)
          </h1>
          <button
            onClick={handleClearWishlist}
            className="text-red-600 hover:text-red-700 dark:text-red-400 font-medium"
          >
            Clear Wishlist
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="card group overflow-hidden"
            >
              <Link to={`/products/${product._id}`}>
                <div className="relative overflow-hidden">
                  <img
                    src={product.images?.[0] || '/placeholder-product.jpg'}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Sale badge */}
                  {product.salePrice && product.salePrice < product.price && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                      Sale
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-4">
                <Link to={`/products/${product._id}`}>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                    {product.name}
                  </h3>
                </Link>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    ${product.salePrice || product.price}
                  </span>
                  {product.salePrice && product.salePrice < product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.price}
                    </span>
                  )}
                </div>

                {/* Stock status */}
                <div className="mb-4">
                  {product.stock > 0 ? (
                    <span className="text-sm text-green-600 dark:text-green-400">
                      In Stock
                    </span>
                  ) : (
                    <span className="text-sm text-red-600 dark:text-red-400">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className="flex-1 btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-1"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                  
                  <button
                    onClick={() => handleRemoveFromWishlist(product._id, product.name)}
                    className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Wishlist