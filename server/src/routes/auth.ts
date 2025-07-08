import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import { authenticate, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username and password' })
    }

    const user = await User.findOne({ username })
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Verify token
router.get('/verify', authenticate, async (req: AuthRequest, res) => {
  res.json({
    user: {
      id: req.user!._id,
      username: req.user!.username,
      email: req.user!.email,
      role: req.user!.role
    }
  })
})

export default router