import express from 'express'
import User from '../models/User'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Get user profile
router.get('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await User.findById(req.user!._id).select('-password')
    res.json(user)
  } catch (error) {
    console.error('Error fetching profile:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update user profile
router.put('/', authenticate, async (req: AuthRequest, res) => {
  try {
    const { username, email, currentPassword, newPassword } = req.body
    const user = await User.findById(req.user!._id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Update basic info
    if (username) user.username = username
    if (email) user.email = email

    // Update password if provided
    if (newPassword && currentPassword) {
      const isMatch = await user.comparePassword(currentPassword)
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' })
      }
      user.password = newPassword
    }

    await user.save()

    // Return user without password
    const updatedUser = await User.findById(user._id).select('-password')
    res.json(updatedUser)
  } catch (error) {
    console.error('Error updating profile:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router