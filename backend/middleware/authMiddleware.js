import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Protect routes - require authentication
export const protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'User not found'
        })
      }

      if (!req.user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Account is deactivated'
        })
      }

      next()
    } catch (error) {
      console.error('Auth middleware error:', error)
      return res.status(401).json({
        success: false,
        message: 'Not authorized, token failed'
      })
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token'
    })
  }
}

// Admin middleware - require admin role
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next()
  } else {
    res.status(403).json({
      success: false,
      message: 'Not authorized as an admin'
    })
  }
}

// Optional auth - don't require authentication but set user if token exists
export const optionalAuth = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
    } catch (error) {
      // Token is invalid, but we don't throw an error
      req.user = null
    }
  }

  next()
}