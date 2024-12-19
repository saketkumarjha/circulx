import medusaClient from "./medusa-client"
import { User, OTPResponse, VerifyOTPResponse } from "@/types/auth"

export async function sendOTP({
  phone,
  first_name,
  last_name,
  isRegistration = false,
}: {
  phone: string
  first_name?: string
  last_name?: string
  isRegistration?: boolean
}): Promise<OTPResponse> {
  try {
    if (isRegistration) {
      const { customer } = await medusaClient.customers.create({
        phone: phone,
        first_name: first_name!,
        last_name: last_name!,
      })
      
      // In a real-world scenario, you'd implement OTP sending here
      // For this example, we'll simulate it by using the customer's id as the OTP
      return {
        success: true,
        otpId: customer.id,
        message: 'OTP sent successfully',
      }
    } else {
      // For login, we'll use the generate token endpoint
      // Note: Medusa doesn't have a built-in phone authentication, so this is a simulated process
      const { customer } = await medusaClient.customers.list({ phone })
      
      if (!customer || customer.length === 0) {
        throw new Error('No customer found with this phone number')
      }
      
      // Again, in a real-world scenario, you'd implement OTP sending here
      // For this example, we'll simulate it by using the customer's id as the OTP
      return {
        success: true,
        otpId: customer[0].id,
        message: 'OTP sent successfully',
      }
    }
  } catch (error) {
    console.error('Error sending OTP:', error)
    return {
      success: false,
      message: 'Failed to send OTP',
    }
  }
}

export async function verifyOTP({
  otpId,
  otp,
  phone,
}: {
  otpId: string
  otp: string
  phone: string
}): Promise<VerifyOTPResponse> {
  try {
    // In a real-world scenario, you'd verify the OTP here
    // For this example, we'll simulate it by checking if the otpId matches the customer's id
    const { customer } = await medusaClient.customers.list({ phone })

    if (customer && customer.length > 0 && customer[0].id === otpId) {
      return {
        success: true,
        message: 'OTP verified successfully',
        user: {
          id: customer[0].id,
          phone: customer[0].phone,
          first_name: customer[0].first_name,
          last_name: customer[0].last_name,
          type: 'customer', // You'll need to implement role management
        },
      }
    } else {
      throw new Error('Invalid OTP')
    }
  } catch (error) {
    console.error('Error verifying OTP:', error)
    return {
      success: false,
      message: 'Invalid OTP',
    }
  }
}

export async function resendOTP({
  phone,
}: {
  phone: string
}): Promise<OTPResponse> {
  return sendOTP({ phone })
}

export async function signOut(): Promise<{ success: boolean; message: string }> {
  try {
    await medusaClient.auth.deleteSession()
    return { success: true, message: 'Signed out successfully' }
  } catch (error) {
    console.error('Error signing out:', error)
    return { success: false, message: 'Failed to sign out' }
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { customer } = await medusaClient.customers.retrieve()
    return {
      id: customer.id,
      phone: customer.phone,
      first_name: customer.first_name,
      last_name: customer.last_name,
      type: 'customer', // You'll need to implement role management
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

