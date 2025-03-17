import { connectDB } from "@/lib/db"
import SubCategoryModel from "@/models/SubCategory"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectDB()
    const subCategories = await SubCategoryModel.find().lean()
    return NextResponse.json(subCategories, { status: 200 })
  } catch (error) {
    console.error("Error fetching sub_categories:", error)
    return NextResponse.json({ error: "Error fetching sub_categories" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    await connectDB()
    const subCategoryData = await request.json()
    const newSubCategory = new SubCategoryModel(subCategoryData)
    await newSubCategory.save()
    return NextResponse.json(newSubCategory, { status: 201 })
  } catch (error) {
    console.error("Error posting sub_category:", error)
    return NextResponse.json({ error: "Error posting sub_category" }, { status: 500 })
  }
}

