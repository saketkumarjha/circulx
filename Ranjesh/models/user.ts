import mongoose, { Document, Model, Schema } from 'mongoose'

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  type: 'admin' | 'seller' | 'customer';
  createdAt: Date;
}

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
  type: {
    type: String,
    enum: ['admin', 'seller', 'customer'],
    default: 'customer',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

