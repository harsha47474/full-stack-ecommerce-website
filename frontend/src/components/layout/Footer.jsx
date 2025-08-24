import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart, Sparkles } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ModernShop
              </h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your premium destination for quality products and exceptional shopping experience. 
              Discover the future of online shopping.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                whileHover={{ scale: 1.2, rotate: 5 }}
                href="#" 
                className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white hover:shadow-lg transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.2, rotate: -5 }}
                href="#" 
                className="w-10 h-10 bg-gradient-to-r from-sky-500 to-sky-600 rounded-xl flex items-center justify-center text-white hover:shadow-lg transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.2, rotate: 5 }}
                href="#" 
                className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center justify-center text-white hover:shadow-lg transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-xl font-bold text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Wishlist
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-xl font-bold text-white">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-all duration-300 hover:translate-x-1 inline-block">
                  Returns
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="text-xl font-bold text-white">Contact Info</h4>
            <div className="space-y-4">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-4 group"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                  support@modernshop.com
                </span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-4 group"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors duration-300">
                  +1 (555) 123-4567
                </span>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start space-x-4 group"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mt-1">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-400 group-hover:text-white transition-colors duration-300 leading-relaxed">
                  123 Commerce St, City, State 12345
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-700/50 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <p className="text-gray-400 text-sm">
                © {currentYear} ModernShop. Made with
              </p>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <p className="text-gray-400 text-sm">
                for amazing shopping experiences.
              </p>
            </div>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-all duration-300 hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-all duration-300 hover:underline">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-all duration-300 hover:underline">
                Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer