import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Heart, ShoppingCart, Truck, Shield, ArrowLeft } from 'lucide-react'
import { useProduct } from '../hooks/useProducts'
import { useCartStore } from '../stores/cartStore'
import { useWishlistStore } from '../stores/wishlistStore'
import { useAuthStore } from '../stores/authStore'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import toast from 'react-hot-toast'

const ProductDetail = () => {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  
  const { data: product, isLoading, error } = useProduct(id)
  const { addItem: addToCart } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const { isAuthenticated } = useAuthStore()
  
  const inWishlist = product ? isInWishlist(product._id) : false

  const handleAddToCart = () => {
    if (!product) return
    addToCart(product, quantity)
    toast.success(`Added ${quantity} ${product.name} to cart!`)
  }

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add to wishlist')
      return
    }
    
    if (!product) return
    
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
        className={`w-5 h-5 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Product not found
          </h2>
          <Link to="/products" className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <Link to="/" className="hover:text-primary-600 dark:hover:text-primary-400">
            Home
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary-600 dark:hover:text-primary-400">
            Products
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-100">{product.name}</span>
        </div>

        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-white dark:bg-gray-800 rounded-xl overflow-hidden"
            >
              <img
                src={product.images?.[selectedImage] || '/placeholder-product.jpg'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index
                        ? 'border-primary-600'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">{product.brand}</p>
            </div>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  ({product.numReviews} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                ${product.salePrice || product.price}
              </span>
              {product.salePrice && product.salePrice < product.price && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.price}
                  </span>
                  <span className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded text-sm font-semibold">
                    {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div>
              {product.stock > 0 ? (
                <p className="text-green-600 dark:text-green-400 font-medium">
                  ✓ In Stock ({product.stock} available)
                </p>
              ) : (
                <p className="text-red-600 dark:text-red-400 font-medium">
                  ✗ Out of Stock
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Key Features
                </h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-400 flex items-center">
                      <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            {product.stock > 0 && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Quantity:
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="input-field w-20"
                  >
                    {Array.from({ length: Math.min(product.stock, 10) }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAddToCart}
                    className="flex-1 btn-primary flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleWishlistToggle}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      inWishlist
                        ? 'border-red-500 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'
                        : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-red-500 hover:text-red-600'
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${inWishlist ? 'fill-current' : ''}`} />
                  </motion.button>
                </div>
              </div>
            )}

            {/* Shipping Info */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-3">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Truck className="w-5 h-5" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Shield className="w-5 h-5" />
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Specifications
            </h2>
            <div className="card p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {key}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductDetail