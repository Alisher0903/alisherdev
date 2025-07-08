import mongoose, { Document, Schema } from 'mongoose'

export interface IProject extends Document {
  name: string
  favicon: string
  imageUrl: string[]
  description: string
  sourceCodeHref: string
  liveWebsiteHref?: string
  technologies: string[]
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

const projectSchema = new Schema<IProject>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  favicon: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: [{
    type: String,
    required: true,
    trim: true
  }],
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  sourceCodeHref: {
    type: String,
    required: true,
    trim: true
  },
  liveWebsiteHref: {
    type: String,
    trim: true
  },
  technologies: [{
    type: String,
    required: true,
    trim: true
  }],
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// Index for better query performance
projectSchema.index({ featured: -1, createdAt: -1 })
projectSchema.index({ technologies: 1 })

export default mongoose.model<IProject>('Project', projectSchema)