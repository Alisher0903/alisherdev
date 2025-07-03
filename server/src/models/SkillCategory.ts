import mongoose, { Document, Schema } from 'mongoose'

export interface ISkillCategory extends Document {
  name: string
  description?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

const skillCategorySchema = new Schema<ISkillCategory>({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Index for better query performance
skillCategorySchema.index({ order: 1, name: 1 })

export default mongoose.model<ISkillCategory>('SkillCategory', skillCategorySchema)