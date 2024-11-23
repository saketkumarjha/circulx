import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json()
    const { db } = await connectToDatabase()

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }import { NextResponse } from 'next/server'
    import { findUserByEmail, createUser, sanitizeUser } from '@/lib/auth'
    
    export async function POST(req: Request) {
      try {
        const { name, email, phone, password } = await req.json()
    
        // Check if user already exists
        const existingUser = await findUserByEmail(email)
        if (existingUser) {
          return NextResponse.json({ error: 'User already exists' }, { status: 400 })
        }
    
        // Create new user
        const userId = await createUser({ name, email, password, phone })
        const newUser = await findUserByEmail(email)
    
        if (!newUser) {
          throw new Error('Failed to create user')
        }
    
        const sanitizedUser = sanitizeUser(newUser)
    
        return NextResponse.json({ message: 'User created successfully', user: sanitizedUser }, { status: 201 })
      } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const result = await db.collection('users').insertOne({
      name,
      email,
      phone,
      password: hashedPassword,
      role: 'client', // Default role
    })

    return NextResponse.json({ message: 'User created successfully', userId: result.insertedId }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}