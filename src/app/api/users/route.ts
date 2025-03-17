import { connectDB } from "@/lib/db" // Changed from connectDB2 to connectDB
import { User } from "@/models/user"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectDB()
    const users = await User.find().select("-password").lean()
    return NextResponse.json(users, { status: 200 })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Error fetching users" }, { status: 500 })
  }
}

