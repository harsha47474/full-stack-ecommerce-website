import { motion } from 'framer-motion'
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../stores/cartStore'
import { useWishlistStore } from '../../stores/wishlistStore'
import { useAuthStore } from '../../stores/authStore'
import toast from 'react-hot-toast'

const CategoryCard = ({ product, categoryColor = "blue", index = 0 }) => {
  const { addItem: addToCart } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const { isAuthenticated } = useAuthStore()
  
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      _id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      images: [product.image]
    })
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
      removeFromWishlist(product.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist({
        _id: product.id,
        name: product.name,
        price: product.salePrice || product.price,
        images: [product.image]
      })
      toast.success('Added to wishlist!')
    }
  }

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600',
        text: 'text-blue-600 dark:text-blue-400',
        hover: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
        button: 'from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
      },
      pink: {
        bg: 'from-pink-50 to-rose-50 dark:from-gray-700 dark:to-gray-600',
        text: 'text-pink-600 dark:text-pink-400',
        hover: 'group-hover:text-pink-600 dark:group-hover:text-pink-400',
        button: 'from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700'
      },
      green: {
        bg: 'from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600',
        text: 'text-green-600 dark:text-green-400',
        hover: 'group-hover:text-green-600 dark:group-hover:text-green-400',
        button: 'from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
      },
      purple: {
        bg: 'from-purple-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600',
        text: 'text-purple-600 dark:text-purple-400',
        hover: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
        button: 'from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
      }
    }
    return colors[color] || colors.blue
  }

  const colorClasses = getColorClasses(categoryColor)
  const discountPercentage = product.salePrice && product.salePrice < product.price 
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700 hover:-translate-y-2"
    >
      <Link to={`/products/${product.id}`}>
        <div className={`relative overflow-hidden bg-gradient-to-br ${colorClasses.bg} aspect-square`}>
          <img
            src={product.image}
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
                className="bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full hover:bg-white transition-all duration-200 shadow-lg"
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
                className={`bg-gradient-to-r ${colorClasses.button} backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 shadow-lg cursor-pointer`}
                title="Quick View"
              >
                <Eye className="w-5 h-5" />
              </motion.div>
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            {discountPercentage > 0 && (
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                -{discountPercentage}%
              </div>
            )}
            {product.badge && (
              <div className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg ${
                product.badge === 'New' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                product.badge === 'Popular' || product.badge === 'Bestseller' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                product.badge === 'Premium' ? 'bg-gradient-to-r from-purple-500 to-indigo-500' :
                product.badge === 'Sale' ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                product.badge === 'Organic' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                product.badge === 'Fresh' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                product.badge === 'Artisan' ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                'bg-gradient-to-r from-gray-500 to-gray-600'
              }`}>
                {product.badge}
              </div>
            )}
          </div>

          {/* Wishlist heart (top right) */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-200 ${
              inWishlist
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category */}
          <div className={`text-xs font-semibold ${colorClasses.text} uppercase tracking-wide mb-2`}>
            {product.category}
          </div>
          
          {/* Product Name */}
          <h3 className={`font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2 ${colorClasses.hover} transition-colors duration-200 leading-tight`}>
            {product.name}
          </h3>
          
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {product.rating}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-500">
                ({product.reviews} reviews)
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between mb-4">
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
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className={`w-full bg-gradient-to-r ${colorClasses.button} text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:shadow-lg flex items-center justify-center space-x-2`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </Link>
    </motion.div>
  )
}

export default CategoryCard