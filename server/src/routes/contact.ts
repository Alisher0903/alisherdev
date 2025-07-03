import express from 'express'
import Contact from '../models/Contact'
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Submit contact form (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const contact = new Contact({
      name,
      email,
      subject,
      message
    })

    await contact.save()
    res.status(201).json({ message: 'Message sent successfully' })
  } catch (error) {
    console.error('Error saving contact:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get all contacts (admin only)
router.get('/', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    const total = await Contact.countDocuments()
    const unreadCount = await Contact.countDocuments({ isRead: false })

    res.json({
      contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      unreadCount
    })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get single contact (admin only)
router.get('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' })
    }
    res.json(contact)
  } catch (error) {
    console.error('Error fetching contact:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Mark contact as read (admin only)
router.patch('/:id/read', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    )
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' })
    }
    
    res.json(contact)
  } catch (error) {
    console.error('Error updating contact:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete contact (admin only)
router.delete('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' })
    }
    
    res.json({ message: 'Contact deleted successfully' })
  } catch (error) {
    console.error('Error deleting contact:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router