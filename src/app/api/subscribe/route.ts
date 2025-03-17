import { connectDB } from "@/lib/db" // Changed from connectDB2 to connectDB
import { Subscriber } from "@/models/Subscriber"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    await connectDB()
    const { email } = await request.json()

    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Check if already subscribed
    const existingSubscriber = await Subscriber.findOne({ email })
    if (existingSubscriber) {
      return NextResponse.json({ message: "Email already subscribed" }, { status: 200 })
    }

    // Create new subscriber
    const newSubscriber = new Subscriber({ email })
    await newSubscriber.save()

    return NextResponse.json({ message: "Subscribed successfully" }, { status: 201 })
  } catch (error) {
    console.error("Error in subscribe:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

