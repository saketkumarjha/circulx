import mongoose, { Schema } from "mongoose"
import type { TabType } from "@/types/profile"

export interface IProfileProgress {
  userId: string
  completedSteps: TabType[]
  currentStep: TabType
  createdAt: Date
  updatedAt: Date
}

const ProfileProgressSchema = new Schema<IProfileProgress>(
  {
    userId: { type: String, required: true, index: true },
    completedSteps: [{ type: String, required: true }],
    currentStep: { type: String, required: true },
  },
  { timestamps: true },
)

export const ProfileProgress =
  mongoose.models.ProfileProgress || mongoose.model<IProfileProgress>("ProfileProgress", ProfileProgressSchema)

