import { connectDB } from "@/lib/db" // Changed from connectDB2 to connectDB
import { NextResponse } from "next/server"
import mongoose from "mongoose"

// Define the Product schema in a separate model file later
const productSchema = new mongoose.Schema({
  // Your product schema definition
})

const Product = mongoose.models.Product || mongoose.model("Product", productSchema)

export async function GET() {
  try {
    await connectDB()
    const products = await Product.find().lean()
    return NextResponse.json(products, { status: 200 })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const productData = await request.json()
    const newProduct = new Product(productData)
    await newProduct.save()
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error("Error posting product:", error)
    return NextResponse.json({ error: "Error posting product" }, { status: 500 })
  }
}

