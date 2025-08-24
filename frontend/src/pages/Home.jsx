import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Truck, Shield, Headphones, Sparkles, Zap, Award, Users } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/products/ProductCard'
import CategoryCard from '../components/products/CategoryCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const Home = () => {
  const { data: productsData, isLoading } = useProducts({ limit: 8 })

  // Category product data
  const categoryData = {
    electronics: [
      {
        id: 1,
        name: "iPhone 15 Pro Max",
        price: 1199,
        salePrice: 1099,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
        rating: 4.9,
        reviews: 2847,
        badge: "New",
        category: "Electronics"
      },
      {
        id: 2,
        name: "MacBook Pro 16\"",
        price: 2499,
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
        rating: 4.8,
        reviews: 1523,
        badge: "Popular",
        category: "Electronics"
      },
      {
        id: 3,
        name: "AirPods Pro 2",
        price: 249,
        salePrice: 199,
        image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop",
        rating: 4.7,
        reviews: 3421,
        badge: "Sale",
        category: "Electronics"
      },
      {
        id: 4,
        name: "iPad Air 5th Gen",
        price: 599,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
        rating: 4.6,
        reviews: 892,
        category: "Electronics"
      }
    ],
    beauty: [
      {
        id: 5,
        name: "Vitamin C Serum",
        price: 89,
        salePrice: 69,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
        rating: 4.8,
        reviews: 1247,
        badge: "Bestseller",
        category: "Skincare"
      },
      {
        id: 6,
        name: "Luxury Face Cream",
        price: 149,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
        rating: 4.9,
        reviews: 892,
        badge: "Premium",
        category: "Skincare"
      },
      {
        id: 7,
        name: "Makeup Palette",
        price: 79,
        salePrice: 59,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
        rating: 4.7,
        reviews: 2156,
        badge: "New",
        category: "Beauty"
      },
      {
        id: 8,
        name: "Hydrating Mask Set",
        price: 45,
        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop",
        rating: 4.6,
        reviews: 743,
        category: "Skincare"
      }
    ],
    groceries: [
      {
        id: 9,
        name: "Organic Avocados",
        price: 8.99,
        salePrice: 6.99,
        image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop",
        rating: 4.5,
        reviews: 324,
        badge: "Organic",
        category: "Produce"
      },
      {
        id: 10,
        name: "Fresh Salmon Fillet",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=400&fit=crop",
        rating: 4.8,
        reviews: 156,
        badge: "Fresh",
        category: "Seafood"
      },
      {
        id: 11,
        name: "Artisan Bread",
        price: 5.99,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
        rating: 4.7,
        reviews: 892,
        badge: "Artisan",
        category: "Bakery"
      },
      {
        id: 12,
        name: "Premium Coffee Beans",
        price: 18.99,
        salePrice: 14.99,
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
        rating: 4.9,
        reviews: 1247,
        badge: "Premium",
        category: "Beverages"
      }
    ],
    fashion: [
      {
        id: 13,
        name: "Designer Handbag",
        price: 299,
        salePrice: 249,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
        rating: 4.7,
        reviews: 543,
        badge: "Sale",
        category: "Accessories"
      },
      {
        id: 14,
        name: "Luxury Watch",
        price: 899,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        rating: 4.9,
        reviews: 234,
        badge: "Luxury",
        category: "Watches"
      },
      {
        id: 15,
        name: "Cashmere Scarf",
        price: 129,
        salePrice: 99,
        image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop",
        rating: 4.6,
        reviews: 678,
        badge: "New",
        category: "Accessories"
      },
      {
        id: 16,
        name: "Premium Sneakers",
        price: 179,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
        rating: 4.8,
        reviews: 1234,
        badge: "Popular",
        category: "Footwear"
      }
    ]
  }

  const features = [
    {
      icon: <Truck className="w-10 h-10" />,
      title: "Free Shipping",
      description: "Free delivery on orders over $50",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Secure Payment",
      description: "100% secure & encrypted",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Headphones className="w-10 h-10" />,
      title: "24/7 Support",
      description: "Always here to help you",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: "Premium Quality",
      description: "Only the best products",
      color: "from-orange-500 to-red-500"
    }
  ]

  const stats = [
    { number: "50K+", label: "Happy Customers", icon: <Users className="w-6 h-6" /> },
    { number: "10K+", label: "Products Sold", icon: <Star className="w-6 h-6" /> },
    { number: "99%", label: "Satisfaction Rate", icon: <Award className="w-6 h-6" /> },
    { number: "24/7", label: "Support Available", icon: <Headphones className="w-6 h-6" /> }
  ]

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">New Collection Available</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 text-white leading-tight"
          >
            Shop the
            <span className="block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
              Future
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Discover premium products that blend innovation with style. 
            Experience shopping like never before with our curated collection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link
              to="/products"
              className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
            >
              <span>Start Shopping</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              to="/products"
              className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
            >
              <Zap className="w-6 h-6" />
              <span>Explore Collection</span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2 text-blue-400">
                  {stat.icon}
                </div>
                <div className="text-3xl md:text-4xl font-black text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We're committed to providing you with the best shopping experience possible
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Sections */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-purple-50/30 to-pink-50/30 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Electronics Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                    Electronics & Tech
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">Latest gadgets and innovations</p>
                </div>
              </div>
              <Link
                to="/products?category=electronics"
                className="hidden md:flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-300"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryData.electronics.map((product, index) => (
                <CategoryCard 
                  key={product.id} 
                  product={product} 
                  categoryColor="blue" 
                  index={index} 
                />
              ))}
            </div>
          </motion.div>

          {/* Skincare & Beauty Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                    Skincare & Beauty
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">Premium beauty essentials</p>
                </div>
              </div>
              <Link
                to="/products?category=beauty"
                className="hidden md:flex items-center space-x-2 text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-semibold transition-colors duration-300"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryData.beauty.map((product, index) => (
                <CategoryCard 
                  key={product.id} 
                  product={product} 
                  categoryColor="pink" 
                  index={index} 
                />
              ))}
            </div>
          </motion.div>

          {/* Groceries & Food Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">🥗</span>
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                    Fresh Groceries
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">Organic & fresh produce</p>
                </div>
              </div>
              <Link
                to="/products?category=groceries"
                className="hidden md:flex items-center space-x-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors duration-300"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryData.groceries.map((product, index) => (
                <CategoryCard 
                  key={product.id} 
                  product={product} 
                  categoryColor="green" 
                  index={index} 
                />
              ))}
            </div>
          </motion.div>

          {/* Fashion & Accessories Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">👗</span>
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
                    Fashion & Style
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">Trendy fashion & accessories</p>
                </div>
              </div>
              <Link
                to="/products?category=fashion"
                className="hidden md:flex items-center space-x-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold transition-colors duration-300"
              >
                <span>View All</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryData.fashion.map((product, index) => (
                <CategoryCard 
                  key={product.id} 
                  product={product} 
                  categoryColor="purple" 
                  index={index} 
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-full font-semibold mb-6">
              <Star className="w-5 h-5" />
              <span>Featured Collection</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              Trending Products
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover our most popular items loved by thousands of customers worldwide
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {productsData?.products?.slice(0, 8).map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link
              to="/products"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <span>View All Products</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 mb-8">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-semibold">Exclusive Offers</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Stay in the Loop
            </h2>
            <p className="text-xl text-purple-100 mb-12 max-w-2xl mx-auto">
              Get exclusive access to new products, special discounts, and insider updates
            </p>

            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-white/30 focus:outline-none font-medium"
              />
              <button
                type="submit"
                className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Subscribe
              </button>
            </motion.form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home