import mongoose, { Document, Schema } from 'mongoose'

export interface IContact extends Document {
  name: string
  email: string
  subject: string
  message: string
  isRead: boolean
  createdAt: Date
  updatedAt: Date
}

const contactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  subject: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// Index for better query performance
contactSchema.index({ createdAt: -1 })
contactSchema.index({ isRead: 1 })

export default mongoose.model<IContact>('Contact', contactSchema)