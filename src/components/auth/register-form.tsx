'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Mail, ShoppingBag, User, Menu, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { sendOTP } from '@/lib/auth'
import PhoneInput from 'react-phone-input-2'

interface RegisterFormProps {
  onOTPSent: (data: { otpId: string; phone: string }) => void
  onLoginClick: () => void
}

export function RegisterForm({ onOTPSent, onLoginClick }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await sendOTP({
        phone: formData.phone,
        first_name: formData.first_name,
        last_name: formData.last_name,
        isRegistration: true,
      })

      if (result.success) {
        onOTPSent({
          otpId: result.otpId!,
          phone: formData.phone,
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
            <div className="w-5 h-6 bg-emerald-300 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-3 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold">Circulx</span>
          </Link>
            <h1 className="text-2xl font-bold">Create Account 👋</h1>
            <p className="text-gray-600">
              Please fill in the details to create your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                placeholder="Enter your first name"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                placeholder="Enter your last name"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <PhoneInput
                country={'in'}
                value={formData.phone}
                onChange={(phone) => setFormData({ ...formData, phone })}
                inputClass="w-full p-2 border rounded-md"
                //required
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onLoginClick}
              className="text-orange-500 hover:underline"
            >
              Sign in
            </button>
          </p>
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

