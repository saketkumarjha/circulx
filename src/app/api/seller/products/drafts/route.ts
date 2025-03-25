import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/prod_db"
import mongoose from "mongoose"

// Use the same Product model from the main products route
let Product: mongoose.Model<any>
try {
  Product = mongoose.model("Product")
} catch {
  // If this fails, the model should be defined in the main products route
  console.error("Product model not found. Make sure it's defined in the main products route.")
}

// POST handler to save a draft product
export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const data = await req.json()
    const { product_id, ...productData } = data

    let product

    if (product_id) {
      // Update existing draft
      product = await Product.findByIdAndUpdate(
        product_id,
        {
          ...productData,
          is_draft: true,
          updated_at: new Date(),
        },
        { new: true },
      )

      if (!product) {
        // If product doesn't exist, create a new one
        product = new Product({
          ...productData,
          is_draft: true,
          created_at: new Date(),
          updated_at: new Date(),
        })

        await product.save()
      }
    } else {
      // Create a new draft
      product = new Product({
        ...productData,
        is_draft: true,
        created_at: new Date(),
        updated_at: new Date(),
      })

      await product.save()
    }

    return NextResponse.json(product)
  } catch (error: any) {
    console.error("Error saving draft product:", error)
    return NextResponse.json({ error: "Failed to save draft product", message: error.message }, { status: 500 })
  }
}

