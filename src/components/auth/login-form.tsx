'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { sendOTP } from '@/lib/auth'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface LoginFormProps {
  onOTPSent: (data: { otpId: string; phone: string }) => void
  onRegisterClick: () => void
}

export function LoginForm({ onOTPSent, onRegisterClick }: LoginFormProps) {
  const [phone, setPhone] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await sendOTP({ phone })
      if (result.success) {
        onOTPSent({ 
          otpId: result.otpId!,
          phone
        })
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-2 h-full">
      <div className="p-8">
        <div className="space-y-6">
          <div>
          <Link href="/" className="flex items-center gap-2 mr-auto">
            <div className="w-7 h-6 bg-emerald-300 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold">Circulx</span>
          </Link>
            <h1 className="text-1xl py-3 font-bold">Hi, Welcome! 👋</h1>
            <p className="text-blue-700 font-semibold">
              Please Login Into Your Account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Enter your mobile number
              </label>
              <PhoneInput
                country={'in'}
                value={phone}
                onChange={(phone) => setPhone(phone)}
                inputClass="w-full p-2 border rounded-md"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={isLoading || !phone}
            >
              {isLoading ? 'Sending OTP...' : 'Submit'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onRegisterClick}
              className="text-orange-500 hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
      <div className="bg-[#1a365d] p-8 flex items-center justify-center">
        <Image
          src="/logininmage.png"
          alt="Authentication"
          width={300}
          height={300}
        />
      </div>
    </div>
  )
}

