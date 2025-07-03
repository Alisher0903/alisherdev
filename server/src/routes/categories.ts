import express from 'express'
import SkillCategory from '../models/SkillCategory'
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await SkillCategory.find().sort({ order: 1, name: 1 })
    res.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get single category
router.get('/:id', async (req, res) => {
  try {
    const category = await SkillCategory.findById(req.params.id)
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.json(category)
  } catch (error) {
    console.error('Error fetching category:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Create category (admin only)
router.post('/', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const category = new SkillCategory(req.body)
    await category.save()
    res.status(201).json(category)
  } catch (error) {
    console.error('Error creating category:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update category (admin only)
router.put('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const category = await SkillCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    
    res.json(category)
  } catch (error) {
    console.error('Error updating category:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete category (admin only)
router.delete('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const category = await SkillCategory.findByIdAndDelete(req.params.id)
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    
    res.json({ message: 'Category deleted successfully' })
  } catch (error) {
    console.error('Error deleting category:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router