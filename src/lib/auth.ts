import { connectToDatabase } from './mongodb'
import bcrypt from 'bcryptjs'
import { OAuth2Client } from 'google-auth-library'

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword)
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10)
}

export async function findUserByEmail(email: string) {
  const { db } = await connectToDatabase()
  return await db.collection('users').findOne({ email })
}

export async function createUser(userData: {
  name: string
  email: string
  password: string
  role?: string
}) {
  const { db } = await connectToDatabase()
  const hashedPassword = await hashPassword(userData.password)
  const result = await db.collection('users').insertOne({
    ...userData,
    password: hashedPassword,
    role: userData.role || 'client',
  })
  return result.insertedId
}

export async function verifyGoogleToken(token: string) {
  const ticket = await googleClient.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  })
  const payload = ticket.getPayload()
  if (!payload) {
    throw new Error('Invalid token')
  }
  return payload
}

export async function findOrCreateGoogleUser(googleData: {
  name: string
  email: string
  sub: string
}) {
  const { db } = await connectToDatabase()
  let user = await db.collection('users').findOne({ email: googleData.email })

  if (!user) {
    const result = await db.collection('users').insertOne({
      name: googleData.name,
      email: googleData.email,
      googleId: googleData.sub,
      role: 'client',
    })
    user = await db.collection('users').findOne({ _id: result.insertedId })
  }

  return user
}

export function sanitizeUser(user: any) {
  const { _id, password, ...sanitizedUser } = user
  return { ...sanitizedUser, id: _id }
}