import mongoose, { Document, Model, Schema } from 'mongoose'

// Define the interface for the user document
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'client';
  createdAt: Date;
}

// Define the user schema
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'client'],
    default: 'client',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

// Define and export the User model
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

