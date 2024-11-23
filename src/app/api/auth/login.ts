import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { email, phone, otp } = await req.json()
    const { db } = await connectToDatabase()

    // Find user by email or phone
    const user = await db.collection('users').findOne(email ? { email } : { phone })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // For this example, we're not implementing actual OTP verification
    // In a real application, you would verify the OTP here

    // Create a sanitized user object (without the password)
    const sanitizedUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    }

    return NextResponse.json({ user: sanitizedUser }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}