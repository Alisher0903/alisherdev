import express from 'express'
import Project from '../models/Project'
import Skill from '../models/Skill'
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Get dashboard stats (admin only)
router.get('/stats', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const [totalProjects, totalSkills, categories, recentProjects] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Skill.distinct('category'),
      Project.countDocuments({
        createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
      })
    ])

    res.json({
      totalProjects,
      totalSkills,
      totalCategories: categories.length,
      recentActivity: recentProjects
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router