import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User'
import Project from '../models/Project'
import Skill from '../models/Skill'

dotenv.config()

const resetDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
    console.log('Connected to MongoDB')

    // Clear all collections
    await User.deleteMany({})
    await Project.deleteMany({})
    await Skill.deleteMany({})

    console.log('✅ Database cleared successfully!')

    // Create admin user
    const adminUser = new User({
      username: process.env.ADMIN_USERNAME || 'admin',
      email: process.env.ADMIN_EMAIL || 'admin@alisherdev.uz',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin'
    })

    await adminUser.save()
    console.log('✅ Admin user created!')

    process.exit(0)
  } catch (error) {
    console.error('❌ Error resetting database:', error)
    process.exit(1)
  }
}

resetDatabase()