import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import path from 'path'
import { connectDB } from './config/database'
import authRoutes from './routes/auth'
import projectRoutes from './routes/projects'
import skillRoutes from './routes/skills'
import dashboardRoutes from './routes/dashboard'
import uploadRoutes from './routes/upload'
import categoryRoutes from './routes/categories'
import contactRoutes from './routes/contact'
import profileRoutes from './routes/profile'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet())
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3000', 'https://admin.alisherdev.uz', 'https://alisherdev.uz'],
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
app.use('/api', limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// Connect to MongoDB
connectDB()

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/profile', profileRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use(errorHandler)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app