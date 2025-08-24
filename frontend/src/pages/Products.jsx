import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List, ChevronDown, Zap, Sparkles, ShoppingBag, Shirt, Home, Book, Gamepad2, Camera } from 'lucide-react'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/products/ProductCard'
import CategoryCard from '../components/products/CategoryCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  // Filter states
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || 'newest',
    page: parseInt(searchParams.get('page')) || 1
  })

  const { data, isLoading, error } = useProducts(filters)

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    setSearchParams(params)
  }, [filters, setSearchParams])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }))
  }

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sort: 'newest',
      page: 1
    })
    setSelectedCategory('all')
  }

  const categories = data?.filters?.categories || []
  const products = data?.products || []
  const pagination = data?.pagination || {}

  // Category definitions with icons and colors
  const categoryDefinitions = [
    {
      id: 'all',
      name: 'All Products',
      icon: <ShoppingBag className="w-6 h-6" />,
      color: 'from-gray-500 to-gray-600',
      textColor: 'text-gray-600 dark:text-gray-400',
      count: 1247
    },
    {
      id: 'electronics',
      name: 'Electronics',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-600 dark:text-blue-400',
      count: 324
    },
    {
      id: 'beauty',
      name: 'Beauty & Skincare',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-500',
      textColor: 'text-pink-600 dark:text-pink-400',
      count: 189
    },
    {
      id: 'groceries',
      name: 'Groceries',
      icon: <span className="text-xl">🥗</span>,
      color: 'from-green-500 to-emerald-500',
      textColor: 'text-green-600 dark:text-green-400',
      count: 456
    },
    {
      id: 'fashion',
      name: 'Fashion',
      icon: <Shirt className="w-6 h-6" />,
      color: 'from-purple-500 to-indigo-500',
      textColor: 'text-purple-600 dark:text-purple-400',
      count: 278
    },
    {
      id: 'home',
      name: 'Home & Garden',
      icon: <Home className="w-6 h-6" />,
      color: 'from-amber-500 to-orange-500',
      textColor: 'text-amber-600 dark:text-amber-400',
      count: 167
    },
    {
      id: 'books',
      name: 'Books',
      icon: <Book className="w-6 h-6" />,
      color: 'from-teal-500 to-cyan-500',
      textColor: 'text-teal-600 dark:text-teal-400',
      count: 89
    },
    {
      id: 'gaming',
      name: 'Gaming',
      icon: <Gamepad2 className="w-6 h-6" />,
      color: 'from-red-500 to-pink-500',
      textColor: 'text-red-600 dark:text-red-400',
      count: 134
    },
    {
      id: 'photography',
      name: 'Photography',
      icon: <Camera className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-500',
      textColor: 'text-indigo-600 dark:text-indigo-400',
      count: 76
    }
  ]

  // Mock category products data
  const categoryProducts = {
    electronics: [
      {
        id: 'e1',
        name: "iPhone 15 Pro Max",
        price: 1199,
        salePrice: 1099,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
        rating: 4.9,
        reviews: 2847,
        badge: "New",
        category: "Electronics",
        stock: 15
      },
      {
        id: 'e2',
        name: "MacBook Pro 16\"",
        price: 2499,
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
        rating: 4.8,
        reviews: 1523,
        badge: "Popular",
        category: "Electronics",
        stock: 8
      },
      {
        id: 'e3',
        name: "AirPods Pro 2",
        price: 249,
        salePrice: 199,
        image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop",
        rating: 4.7,
        reviews: 3421,
        badge: "Sale",
        category: "Electronics",
        stock: 23
      },
      {
        id: 'e4',
        name: "Samsung Galaxy Watch",
        price: 399,
        salePrice: 329,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        rating: 4.6,
        reviews: 892,
        category: "Electronics",
        stock: 12
      },
      {
        id: 'e5',
        name: "Sony WH-1000XM5",
        price: 399,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        rating: 4.8,
        reviews: 1654,
        badge: "Premium",
        category: "Electronics",
        stock: 18
      },
      {
        id: 'e6',
        name: "iPad Air 5th Gen",
        price: 599,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
        rating: 4.6,
        reviews: 892,
        category: "Electronics",
        stock: 7
      }
    ],
    beauty: [
      {
        id: 'b1',
        name: "Vitamin C Serum",
        price: 89,
        salePrice: 69,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
        rating: 4.8,
        reviews: 1247,
        badge: "Bestseller",
        category: "Skincare",
        stock: 34
      },
      {
        id: 'b2',
        name: "Luxury Face Cream",
        price: 149,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
        rating: 4.9,
        reviews: 892,
        badge: "Premium",
        category: "Skincare",
        stock: 16
      },
      {
        id: 'b3',
        name: "Makeup Palette",
        price: 79,
        salePrice: 59,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
        rating: 4.7,
        reviews: 2156,
        badge: "New",
        category: "Beauty",
        stock: 28
      },
      {
        id: 'b4',
        name: "Hydrating Mask Set",
        price: 45,
        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop",
        rating: 4.6,
        reviews: 743,
        category: "Skincare",
        stock: 42
      },
      {
        id: 'b5',
        name: "Anti-Aging Serum",
        price: 129,
        salePrice: 99,
        image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=400&fit=crop",
        rating: 4.7,
        reviews: 567,
        badge: "Sale",
        category: "Skincare",
        stock: 19
      },
      {
        id: 'b6',
        name: "Lipstick Collection",
        price: 65,
        image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
        rating: 4.5,
        reviews: 1234,
        category: "Beauty",
        stock: 31
      }
    ],
    groceries: [
      {
        id: 'g1',
        name: "Organic Avocados",
        price: 8.99,
        salePrice: 6.99,
        image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop",
        rating: 4.5,
        reviews: 324,
        badge: "Organic",
        category: "Produce",
        stock: 67
      },
      {
        id: 'g2',
        name: "Fresh Salmon Fillet",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=400&fit=crop",
        rating: 4.8,
        reviews: 156,
        badge: "Fresh",
        category: "Seafood",
        stock: 23
      },
      {
        id: 'g3',
        name: "Artisan Bread",
        price: 5.99,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
        rating: 4.7,
        reviews: 892,
        badge: "Artisan",
        category: "Bakery",
        stock: 45
      },
      {
        id: 'g4',
        name: "Premium Coffee Beans",
        price: 18.99,
        salePrice: 14.99,
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
        rating: 4.9,
        reviews: 1247,
        badge: "Premium",
        category: "Beverages",
        stock: 38
      },
      {
        id: 'g5',
        name: "Organic Honey",
        price: 12.99,
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop",
        rating: 4.6,
        reviews: 456,
        badge: "Organic",
        category: "Pantry",
        stock: 52
      },
      {
        id: 'g6',
        name: "Fresh Berries Mix",
        price: 9.99,
        salePrice: 7.99,
        image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=400&fit=crop",
        rating: 4.4,
        reviews: 234,
        badge: "Fresh",
        category: "Produce",
        stock: 29
      }
    ],
    fashion: [
      {
        id: 'f1',
        name: "Designer Handbag",
        price: 299,
        salePrice: 249,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
        rating: 4.7,
        reviews: 543,
        badge: "Sale",
        category: "Accessories",
        stock: 14
      },
      {
        id: 'f2',
        name: "Luxury Watch",
        price: 899,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        rating: 4.9,
        reviews: 234,
        badge: "Luxury",
        category: "Watches",
        stock: 6
      },
      {
        id: 'f3',
        name: "Cashmere Scarf",
        price: 129,
        salePrice: 99,
        image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop",
        rating: 4.6,
        reviews: 678,
        badge: "New",
        category: "Accessories",
        stock: 21
      },
      {
        id: 'f4',
        name: "Premium Sneakers",
        price: 179,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
        rating: 4.8,
        reviews: 1234,
        badge: "Popular",
        category: "Footwear",
        stock: 33
      },
      {
        id: 'f5',
        name: "Silk Dress",
        price: 249,
        salePrice: 199,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop",
        rating: 4.5,
        reviews: 456,
        badge: "Sale",
        category: "Clothing",
        stock: 18
      },
      {
        id: 'f6',
        name: "Leather Jacket",
        price: 399,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop",
        rating: 4.7,
        reviews: 789,
        badge: "Premium",
        category: "Clothing",
        stock: 11
      }
    ]
  }

  // Get current category products
  const getCurrentProducts = () => {
    if (selectedCategory === 'all') {
      // Return all products from all categories
      return Object.values(categoryProducts).flat()
    }
    return categoryProducts[selectedCategory] || []
  }

  const currentProducts = getCurrentProducts()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-full font-semibold mb-6">
            <Search className="w-5 h-5" />
            <span>Discover Amazing Products</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-gray-100 mb-4">
            Our Premium Collection
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our carefully curated selection of high-quality products designed to enhance your lifestyle
          </p>
        </motion.div>
          
        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col lg:flex-row gap-6 items-center justify-between bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 mb-8"
        >
          <div className="relative flex-1 max-w-lg group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 w-5 h-5 transition-colors duration-200" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search for amazing products..."
              className="w-full pl-12 pr-6 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 font-medium transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-2xl p-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <Grid className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <List className="w-5 h-5" />
              </motion.button>
            </div>
            
            {/* Filter Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
            </motion.button>
          </div>
        </motion.div>

        {/* Category Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
              Shop by Category
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-4">
              {categoryDefinitions.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`relative group p-4 rounded-2xl transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r ' + category.color + ' text-white shadow-lg transform scale-105'
                      : 'bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`p-2 rounded-xl transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-white/20 backdrop-blur-sm'
                        : 'bg-gray-100 dark:bg-gray-600 group-hover:bg-gray-200 dark:group-hover:bg-gray-500'
                    }`}>
                      {category.icon}
                    </div>
                    <div className="text-center">
                      <div className={`text-sm font-semibold transition-colors duration-300 ${
                        selectedCategory === category.id ? 'text-white' : category.textColor
                      }`}>
                        {category.name}
                      </div>
                      <div className={`text-xs transition-colors duration-300 ${
                        selectedCategory === category.id 
                          ? 'text-white/80' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {category.count} items
                      </div>
                    </div>
                  </div>
                  
                  {/* Selection indicator */}
                  {selectedCategory === category.id && (
                    <motion.div
                      layoutId="categoryIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl border-2 border-white/30"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={false}
            animate={{ 
              width: showFilters ? 'auto' : 0,
              opacity: showFilters ? 1 : 0
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`lg:w-72 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 space-y-8 sticky top-28">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Filters
                </h3>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="text-sm bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Clear All
                </motion.button>
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-gray-900 dark:text-gray-100">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600"
                >
                  {categoryDefinitions.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-gray-900 dark:text-gray-100">
                  Price Range
                </label>
                <div className="flex space-x-3">
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    placeholder="Min $"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600"
                  />
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    placeholder="Max $"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600"
                  />
                </div>
              </div>

              {/* Sort */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-gray-900 dark:text-gray-100">
                  Sort By
                </label>
                <select
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-600"
                >
                  <option value="newest">✨ Newest First</option>
                  <option value="oldest">📅 Oldest First</option>
                  <option value="price-asc">💰 Price: Low to High</option>
                  <option value="price-desc">💎 Price: High to Low</option>
                  <option value="rating">⭐ Highest Rated</option>
                  <option value="name-asc">🔤 Name: A to Z</option>
                  <option value="name-desc">🔤 Name: Z to A</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center justify-between mb-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  Showing {currentProducts.length} amazing products
                  {selectedCategory !== 'all' && (
                    <span className="ml-2 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm rounded-full">
                      {categoryDefinitions.find(cat => cat.id === selectedCategory)?.name}
                    </span>
                  )}
                </p>
              </div>
            </motion.div>

            {/* Category Products */}
            {currentProducts.length > 0 ? (
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                    : 'grid-cols-1'
                }`}>
                  {currentProducts.map((product, index) => {
                    // Convert to format expected by CategoryCard
                    const categoryProduct = {
                      ...product,
                      _id: product.id // CategoryCard expects _id
                    }
                    
                    // Determine color based on category
                    const getColorForCategory = (categoryName) => {
                      if (categoryName?.toLowerCase().includes('electronic')) return 'blue'
                      if (categoryName?.toLowerCase().includes('beauty') || categoryName?.toLowerCase().includes('skincare')) return 'pink'
                      if (categoryName?.toLowerCase().includes('produce') || categoryName?.toLowerCase().includes('seafood') || categoryName?.toLowerCase().includes('bakery') || categoryName?.toLowerCase().includes('beverage') || categoryName?.toLowerCase().includes('pantry')) return 'green'
                      if (categoryName?.toLowerCase().includes('fashion') || categoryName?.toLowerCase().includes('clothing') || categoryName?.toLowerCase().includes('accessories') || categoryName?.toLowerCase().includes('footwear') || categoryName?.toLowerCase().includes('watches')) return 'purple'
                      return 'blue'
                    }
                    
                    return (
                      <CategoryCard
                        key={product.id}
                        product={categoryProduct}
                        categoryColor={getColorForCategory(product.category)}
                        index={index}
                      />
                    )
                  })}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try selecting a different category or adjusting your search terms
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory('all')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg"
                >
                  View All Products
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products