import express from 'express'
import Project from '../models/Project'
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ featured: -1, createdAt: -1 })
    res.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }
    res.json(project)
  } catch (error) {
    console.error('Error fetching project:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Create project (admin only)
router.post('/', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const project = new Project(req.body)
    await project.save()
    res.status(201).json(project)
  } catch (error) {
    console.error('Error creating project:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Update project (admin only)
router.put('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }
    
    res.json(project)
  } catch (error) {
    console.error('Error updating project:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Delete project (admin only)
router.delete('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }
    
    res.json({ message: 'Project deleted successfully' })
  } catch (error) {
    console.error('Error deleting project:', error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router