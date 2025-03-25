import { type NextRequest, NextResponse } from "next/server"
import { connectDB } from "@/lib/prod_db"
import mongoose from "mongoose"

// Define the Product schema
const productSchema = new mongoose.Schema({
  product_id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  model: String,
  description: String,
  category_id: Number,
  sub_category_id: Number,
  units: String,
  weight: Number,
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
  },
  image_link: String,
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: Number,
  SKU: { type: String, required: true },
  seller_id: Number,
  created_at: { type: Date, default: Date.now },
  rating: Number,
  updated_at: { type: Date, default: Date.now },
  seller_name: { type: String, required: true },
  location: { type: String, required: true },
  category_name: { type: String, required: true },
  sub_category_name: String,
  is_draft: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
})

// Create or get the model
let Product: mongoose.Model<any>
try {
  Product = mongoose.model("Product")
} catch {
  Product = mongoose.model("Product", productSchema)
}

// GET handler to fetch products
export async function GET(req: NextRequest) {
  try {
    await connectDB()

    // Get products
    const products = await Product.find({}).sort({ created_at: -1 })

    console.log("Fetched products:", products)

    return NextResponse.json({ products })
  } catch (error: any) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products", message: error.message }, { status: 500 })
  }
}

// POST handler to create a new product
export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const data = await req.json()
    console.log("Received product data:", data)

    // Generate a new product_id (get the highest existing product_id and increment by 1)
    const highestProduct = await Product.findOne().sort({ product_id: -1 })
    const nextProductId = highestProduct ? highestProduct.product_id + 1 : 1

    // Create a new product
    const product = new Product({
      ...data,
      product_id: nextProductId,
      created_at: new Date(),
      updated_at: new Date(),
    })

    await product.save()
    console.log("Saved product:", product)

    return NextResponse.json(product, { status: 201 })
  } catch (error: any) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product", message: error.message }, { status: 500 })
  }
}

// PUT handler to update a product
export async function PUT(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    const data = await req.json()

    // Update the product using product_id instead of _id
    const updatedProduct = await Product.findOneAndUpdate(
      { product_id: Number.parseInt(id) },
      {
        ...data,
        updated_at: new Date(),
      },
      { new: true },
    )

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(updatedProduct)
  } catch (error: any) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product", message: error.message }, { status: 500 })
  }
}

// PATCH handler to update product status
export async function PATCH(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    const data = await req.json()

    // Update only the specified fields using product_id instead of _id
    const updatedProduct = await Product.findOneAndUpdate(
      { product_id: Number.parseInt(id) },
      {
        ...data,
        updated_at: new Date(),
      },
      { new: true },
    )

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(updatedProduct)
  } catch (error: any) {
    console.error("Error updating product status:", error)
    return NextResponse.json({ error: "Failed to update product status", message: error.message }, { status: 500 })
  }
}

// DELETE handler to delete a product
export async function DELETE(req: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    // Delete the product using product_id instead of _id
    const deletedProduct = await Product.findOneAndDelete({ product_id: Number.parseInt(id) })

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error: any) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product", message: error.message }, { status: 500 })
  }
}

