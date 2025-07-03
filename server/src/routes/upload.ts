import express from 'express'
import { uploadSingle, uploadMultiple } from '../middleware/upload'
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth'

const router = express.Router()

// Upload single file
router.post('/single', authenticate, requireAdmin, (req: AuthRequest, res) => {
  uploadSingle(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message })
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' })
    }

    const fileUrl = `/uploads/${req.file.filename}`
    res.json({
      message: 'File uploaded successfully',
      url: fileUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    })
  })
})

// Upload multiple files
router.post('/multiple', authenticate, requireAdmin, (req: AuthRequest, res) => {
  uploadMultiple(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message })
    }

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({ message: 'No files uploaded' })
    }

    const files = req.files as Express.Multer.File[]
    const uploadedFiles = files.map(file => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size
    }))

    res.json({
      message: 'Files uploaded successfully',
      files: uploadedFiles
    })
  })
})

export default router