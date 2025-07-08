import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User'

dotenv.config()

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
    console.log('Connected to MongoDB')

    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: 'admin' })
    if (existingAdmin) {
      console.log('Admin user already exists')
      process.exit(0)
    }

    // Create admin user
    const adminUser = new User({
      username: process.env.ADMIN_USERNAME || 'admin',
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin'
    })

    await adminUser.save()
    console.log('✅ Admin user created successfully!')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
    process.exit(1)
  }
}

createAdmin()