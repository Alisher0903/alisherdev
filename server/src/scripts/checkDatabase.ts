import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User'
import Project from '../models/Project'
import Skill from '../models/Skill'

dotenv.config()

const checkDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
    console.log('✅ Connected to MongoDB')

    // Check collections
    const userCount = await User.countDocuments()
    const projectCount = await Project.countDocuments()
    const skillCount = await Skill.countDocuments()

    console.log('\n📊 Database Statistics:')
    console.log(`Users: ${userCount}`)
    console.log(`Projects: ${projectCount}`)
    console.log(`Skills: ${skillCount}`)

    // Check admin user
    const adminUser = await User.findOne({ role: 'admin' })
    if (adminUser) {
      console.log('\n👤 Admin User Found:')
      console.log(`Username: ${adminUser.username}`)
      console.log(`Email: ${adminUser.email}`)
      console.log(`Role: ${adminUser.role}`)
    } else {
      console.log('\n❌ No admin user found!')
    }

    // List all users
    const allUsers = await User.find({}, 'username email role')
    console.log('\n👥 All Users:')
    allUsers.forEach(user => {
      console.log(`- ${user.username} (${user.email}) - ${user.role}`)
    })

    process.exit(0)
  } catch (error) {
    console.error('❌ Database connection error:', error)
    process.exit(1)
  }
}

checkDatabase()