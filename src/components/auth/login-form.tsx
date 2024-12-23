'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { sendOTP } from '@/lib/auth'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface LoginFormProps {
  onOTPSent: (data: { verificationId: string; phoneNumber: string }) => void
}

export function LoginForm({ onOTPSent }: LoginFormProps) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await sendOTP(phoneNumber)
      if (result.success && result.verificationId) {
        onOTPSent({ 
          verificationId: result.verificationId,
          phoneNumber
        })
      } else {
        setError(result.message || 'Failed to send OTP')
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.')
      console.error('Error in handleSubmit:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-2 h-full">
      <div className="p-8">
        <div className="space-y-6">
          <div>
            <Image
              src="/logo.png"
              alt="CirculX"
              width={120}
              height={40}
              className="mb-6"
            />
            <h1 className="text-2xl font-bold">Hi, Welcome! 👋</h1>
            <p className="text-gray-600">
              Welcome Back! Please Login Into Your Account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Enter your mobile number
              </label>
              <PhoneInput
                country={'in'}
                value={phoneNumber}
                onChange={(phone) => setPhoneNumber(`+${phone}`)}
                inputClass="w-full p-2 border rounded-md"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={isLoading || !phoneNumber}
            >
              {isLoading ? 'Sending OTP...' : 'Submit'}
            </Button>
          </form>
        </div>
      </div>
      <div className="bg-[#1a365d] p-8 flex items-center justify-center">
        <Image
          src="/login.png"
          alt="Authentication"
          width={300}
          height={300}
        />
      </div>
    </div>
  )
}

