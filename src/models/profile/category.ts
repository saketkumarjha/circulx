import mongoose, { Schema } from "mongoose"

export interface ICategoryBrand {
  userId: string
  categories: string[]
  authorizedBrands: string[]
  createdAt: Date
  updatedAt: Date
}

const CategoryBrandSchema = new Schema<ICategoryBrand>(
  {
    userId: { type: String, required: true, index: true },
    categories: [{ type: String, required: true }],
    authorizedBrands: [{ type: String, required: true }],
  },
  { timestamps: true },
)

export const CategoryBrand =
  mongoose.models.CategoryBrand || mongoose.model<ICategoryBrand>("CategoryBrand", CategoryBrandSchema)

