import express from 'express'
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// All routes are admin only
router.use(protect, admin)

router.get('/', getUsers)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router