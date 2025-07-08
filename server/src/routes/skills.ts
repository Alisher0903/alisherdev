import express from 'express'
import Skill from '../models/Skill'
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Get all skills grouped by category
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, name: 1 })
    
    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
      const category = skill.category
      if (!acc[category]) {
        acc[category] = {
          _id: category,
          name: category,
          skills: []
        }
      }
      acc[category].skills.push(skill)
      return acc
    }, {} as any)
    
    res.json(Object.values(groupedSkills))
  } catch (error) {
    console.error('Error fetching skills:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Skill.distinct('category')
    res.json(categories.sort())
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get single skill
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id)
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' })
    }
    res.json(skill)
  } catch (error) {
    console.error('Error fetching skill:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Create skill (admin only)
router.post('/', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const skill = new Skill(req.body)
    await skill.save()
    res.status(201).json(skill)
  } catch (error) {
    console.error('Error creating skill:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update skill (admin only)
router.put('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' })
    }
    
    res.json(skill)
  } catch (error) {
    console.error('Error updating skill:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete skill (admin only)
router.delete('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id)
    
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' })
    }
    
    res.json({ message: 'Skill deleted successfully' })
  } catch (error) {
    console.error('Error deleting skill:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router