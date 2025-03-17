import { connectDB } from "@/lib/db" // Changed from connectDB2 to connectDB
import CategoryModel from "@/models/Category" // Import from the model file
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectDB()
    const categories = await CategoryModel.find().lean()
    return NextResponse.json(categories, { status: 200 })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Error fetching categories" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const categoryData = await request.json()
    const newCategory = new CategoryModel(categoryData)
    await newCategory.save()
    return NextResponse.json(newCategory, { status: 201 })
  } catch (error) {
    console.error("Error posting category:", error)
    return NextResponse.json({ error: "Error posting category" }, { status: 500 })
  }
}

