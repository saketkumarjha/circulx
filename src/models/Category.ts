import mongoose from "mongoose"

export interface Category {
  category_id: number
  category_name: string
  created_at?: string
}

export const categorySchema = new mongoose.Schema<Category>({
  category_id: { type: Number, required: true },
  category_name: { type: String, required: true },
  created_at: { type: String },
})

// Export the model
const CategoryModel = mongoose.models.Category || mongoose.model<Category>("Category", categorySchema)

export default CategoryModel

