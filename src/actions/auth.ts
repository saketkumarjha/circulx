"use server"

import { cookies } from "next/headers"
import { connectDB } from "@/lib/db"
import { User } from "@/models/user"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "gyuhiuhthoju2596rfyjhtfykjb"

// Simple in-memory store for login attempts (would use Redis in production)
interface LoginAttempts {
  [key: string]: {
    count: number
    lastAttempt: number
    blocked: boolean
    blockExpires: number
  }
}

const loginAttempts: LoginAttempts = {}

// Configuration
const MAX_LOGIN_ATTEMPTS = 5
const BLOCK_DURATION = 15 * 60 * 1000 // 15 minutes
const ATTEMPT_RESET_TIME = 60 * 60 * 1000 // 1 hour

// Clean up old login attempts periodically
if (typeof window === "undefined") {
  // Only run on server
  setInterval(
    () => {
      const now = Date.now()
      Object.keys(loginAttempts).forEach((key) => {
        // Remove entries older than ATTEMPT_RESET_TIME
        if (now - loginAttempts[key].lastAttempt > ATTEMPT_RESET_TIME) {
          delete loginAttempts[key]
        }
      })
    },
    60 * 60 * 1000,
  ) // Run cleanup every hour
}

export async function signIn(formData: FormData) {
  try {
    await connectDB()

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Create a unique key for tracking login attempts (email + IP would be better)
    const attemptKey = email.toLowerCase()
    const now = Date.now()

    // Initialize login attempts if not exists
    if (!loginAttempts[attemptKey]) {
      loginAttempts[attemptKey] = {
        count: 0,
        lastAttempt: now,
        blocked: false,
        blockExpires: 0,
      }
    }

    // Check if user is blocked
    if (loginAttempts[attemptKey].blocked) {
      // Check if block has expired
      if (now > loginAttempts[attemptKey].blockExpires) {
        // Reset block
        loginAttempts[attemptKey].blocked = false
        loginAttempts[attemptKey].count = 0
      } else {
        const minutesLeft = Math.ceil((loginAttempts[attemptKey].blockExpires - now) / 60000)
        return {
          error: `Too many failed attempts. Please try again in ${minutesLeft} minute${minutesLeft > 1 ? "s" : ""}.`,
        }
      }
    }

    // Update last attempt time
    loginAttempts[attemptKey].lastAttempt = now

    // Find user
    const user = await User.findOne({ email })

    if (!user) {
      // Increment failed attempts
      loginAttempts[attemptKey].count++

      // Check if should block
      if (loginAttempts[attemptKey].count >= MAX_LOGIN_ATTEMPTS) {
        loginAttempts[attemptKey].blocked = true
        loginAttempts[attemptKey].blockExpires = now + BLOCK_DURATION
      }

      return { error: "Invalid credentials" }
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      // Increment failed attempts
      loginAttempts[attemptKey].count++

      // Check if should block
      if (loginAttempts[attemptKey].count >= MAX_LOGIN_ATTEMPTS) {
        loginAttempts[attemptKey].blocked = true
        loginAttempts[attemptKey].blockExpires = now + BLOCK_DURATION
      }

      return { error: "Invalid credentials" }
    }

    // Reset login attempts on successful login
    loginAttempts[attemptKey].count = 0
    loginAttempts[attemptKey].blocked = false

    const token = jwt.sign({ userId: user._id, type: user.type }, JWT_SECRET, { expiresIn: "1d" })

    const cookieStore = await cookies()
    cookieStore.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 1, // 1 days
    })

    return {
      success: true,
      message: "Signed in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
      },
    }
  } catch (error) {
    console.error("Error in signIn:", error)
    return { error: "Something went wrong" }
  }
}

export async function signUp(formData: FormData) {
  try {
    await connectDB()

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // Validate input length to prevent DoS
    if (name.length > 100 || email.length > 100 || password.length > 100) {
      return { error: "Input fields too long" }
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return { error: "Email already exists" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      type: "customer", // Default type
    })

    return {
      success: true,
      message: "Registered successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
      },
    }
  } catch (error) {
    console.error("Error in signUp:", error)
    return { error: "Something went wrong" }
  }
}

export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
  // Don't redirect here, just return success
  return { success: true }
}

export async function getCurrentUser() {
  try {
    await connectDB()

    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")

    if (!token || !token.value) return null

    try {
      const decoded = jwt.verify(token.value, JWT_SECRET) as {
        userId: string
        type: string
      }

      const user = await User.findById(decoded.userId).select("-password")

      if (!user) return null

      // Convert MongoDB document to a plain object
      const plainUser = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        type: user.type,
      }

      return plainUser
    } catch (jwtError) {
      // If token is invalid, clear it and return null
      cookieStore.delete("auth-token")
      return null
    }
  } catch (error) {
    console.error("Error in getCurrentUser:", error)
    return null
  }
}

export async function updateUserType(userId: string, newType: "admin" | "seller" | "customer") {
  try {
    await connectDB()

    const user = await User.findByIdAndUpdate(userId, { type: newType }, { new: true })

    if (!user) {
      return { error: "User not found" }
    }

    return {
      success: true,
      message: "User type updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
      },
    }
  } catch (error) {
    console.error("Error in updateUserType:", error)
    return { error: "Something went wrong" }
  }
}

