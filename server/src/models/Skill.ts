import mongoose, { Document, Schema } from 'mongoose'

export interface ISkill extends Document {
  name: string
  icon: string
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  description?: string
  category: string
  createdAt: Date
  updatedAt: Date
}

const skillSchema = new Schema<ISkill>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  icon: {
    type: String,
    required: true,
    trim: true
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  category: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  }
}, {
  timestamps: true
})

// Index for better query performance
skillSchema.index({ category: 1, name: 1 })
skillSchema.index({ level: 1 })

export default mongoose.model<ISkill>('Skill', skillSchema)