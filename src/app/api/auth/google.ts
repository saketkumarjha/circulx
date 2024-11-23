import { NextResponse } from 'next/server'
import { OAuth2Client } from 'google-auth-library'
import { connectToDatabase } from '@/lib/mongodb'

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export async function POST(req: Request) {
  try {
    const { token } = await req.json()
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    if (!payload) {
      throw new Error('Invalid token')
    }

    const { name, email, sub } = payload

    const { db } = await connectToDatabase()

    // Check if user exists, if not create a new user
    let user = await db.collection('users').findOne({ email })

    if (!user) {
      const result = await db.collection('users').insertOne({
        name,
        email,
        googleId: sub,
        role: 'client', // Default role
      })
      user = await db.collection('users').findOne({ _id: result.insertedId })
    }

    // Create a sanitized user object
    const sanitizedUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    }

    return NextResponse.json({ user: sanitizedUser }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}