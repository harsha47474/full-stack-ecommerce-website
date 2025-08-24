import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { useCartStore } from '../../stores/cartStore'
import { useWishlistStore } from '../../stores/wishlistStore'
import { useAuthStore } from '../../stores/authStore'
import toast from 'react-hot-toast'

const ProductCard = ({ product }) => {
  const { addItem: addToCart } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const { isAuthenticated } = useAuthStore()
  
  const inWishlist = isInWishlist(product._id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
    toast.success('Added to cart!')
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isAuthenticated) {
      toast.error('Please login to add to wishlist')
      return
    }
    
    if (inWishlist) {
      removeFromWishlist(product._id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(product)
      toast.success('Added to wishlist!')
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ))
  }

  const discountPercentage = product.salePrice && product.salePrice < product.price 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      <Link to={`/products/${product._id}`} className="block">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700 aspect-square">
          <img
            src={product.images?.[0] || '/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Action buttons overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full hover:bg-white transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                title="Add to Cart"
              >
                <ShoppingCart className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWishlistToggle}
                className={`backdrop-blur-sm p-3 rounded-full transition-all duration-200 shadow-lg ${
                  inWishlist
                    ? 'bg-red-500/90 text-white hover:bg-red-500'
                    : 'bg-white/90 text-gray-900 hover:bg-white'
                }`}
                title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </motion.button>
              
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-blue-500/90 backdrop-blur-sm text-white p-3 rounded-full hover:bg-blue-500 transition-all duration-200 shadow-lg cursor-pointer"
                title="Quick View"
              >
                <Eye className="w-5 h-5" />
              </motion.div>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {discountPercentage > 0 && (
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                -{discountPercentage}%
              </div>
            )}
            {product.isFeatured && (
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                Featured
              </div>
            )}
            {product.stock === 0 && (
              <div className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                Sold Out
              </div>
            )}
          </div>

          {/* Wishlist heart (top right) */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
              inWishlist
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Brand */}
          <div className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-1">
            {product.brand}
          </div>
          
          {/* Product Name */}
          <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 leading-tight">
            {product.name}
          </h3>
          
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center space-x-2 mb-3">
              <div className="flex">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {product.rating}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-500">
                ({product.numReviews || 0} reviews)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                ${product.salePrice || product.price}
              </span>
              {product.salePrice && product.salePrice < product.price && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.price}
                </span>
              )}
            </div>
            
            {/* Stock indicator */}
            <div className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${
                product.stock > 10 ? 'bg-green-500' : 
                product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              <span className={`text-xs font-medium ${
                product.stock > 10 ? 'text-green-600 dark:text-green-400' : 
                product.stock > 0 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
          </motion.button>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard