'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { sendOTP } from '@/lib/auth'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { RecaptchaVerifier } from 'firebase/auth'

interface SignUpFormProps {
  onOTPSent: (data: { verificationId: string; phoneNumber: string }) => void
  onLoginClick: () => void
  recaptchaVerifier: RecaptchaVerifier | null
}

export function SignUpForm({ onOTPSent, onLoginClick, recaptchaVerifier }: SignUpFormProps) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (!recaptchaVerifier) {
      setError('RecaptchaVerifier is not initialized. Please try again.')
      setIsLoading(false)
      return
    }

    try {
      const result = await sendOTP(phoneNumber, recaptchaVerifier)
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
            <h1 className="text-2xl font-bold">Create Account 👋</h1>
            <p className="text-gray-600">
              Please fill in the details to create your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Full Name
              </label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Mobile Number
              </label>
              <PhoneInput
                country={'in'}
                value={phoneNumber}
                onChange={(phone) => setPhoneNumber(`+${phone}`)}
                inputClass="w-full p-2 border rounded-md"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={isLoading || !phoneNumber || !name}
            >
              {isLoading ? 'Sending OTP...' : 'Sign Up'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onLoginClick}
              className="text-orange-500 hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
      <div className="bg-[#1a365d] p-8 flex items-center justify-center">
        <Image
          src="/auth-illustration.svg"
          alt="Authentication"
          width={300}
          height={300}
        />
      </div>
    </div>
  )
}












































/*'use client'

import { useState } from 'react'
import { signUp } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface SignUpFormProps {
  onSuccess: (message: string) => void
  onSignIn: () => void
}

export function SignUpForm({ onSuccess, onSignIn }: SignUpFormProps) {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError('')

    const result = await signUp(formData)

    if (result.error) {
      setError(result.error)
      setIsLoading(false)
      return
    }

    onSuccess('User registered successfully. Please sign in.')
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl px-12 py-0.5 font-semibold text-white">
          Register Now
        </h1>
        <p className="text-gray-400 px-14"></p>
      </div>
      <form action={handleSubmit} className="space-y-2">
        <div>
          <p className="text-gray-50 px-1 py-1">Full Name</p>
          <Input
            id="name"
            name="name"
            required
            placeholder=""
            className="h-9 px-8 bg-white text-green-900 placeholder:text-gray-500 rounded-lg"
          />
        </div>
        <div>
          <p className="text-gray-50 px-1 py-1">Email</p>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder=""
            className="h-9 px-8 bg-white text-green-900 placeholder:text-gray-500 rounded-lg"
          />
        </div>
        <div>
          <p className="text-gray-50 px-1 py-1">Password</p>
          <Input
            id="password"
            name="password"
            type="password"
            required
            placeholder=""
            className="h-9 px-8 bg-white text-green-900 placeholder:text-gray-500 rounded-lg"
          />
        </div>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        <Button 
          type="submit" 
          className="w-full h-9 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-lg" 
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Sign up'}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200"></span>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg- px-2 text-gray-100">OR</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button
            type="button"
            variant="outline"
            className="bg-[#1a0b2e]/50 border-[#1a0b2e] hover:bg-[#1a0b2e] p-0 h-8"
          >
            <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="w-6 h-6" />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="bg-[#1a0b2e]/50 border-[#1a0b2e] hover:bg-[#1a0b2e] p-0 h-8"
          >
            <img src="https://authjs.dev/img/providers/facebook.svg" alt="Facebook" className="w-6 h-6" />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="bg-[#1a0b2e]/50 border-[#1a0b2e] hover:bg-[#1a0b2e] p-0 h-8"
          >
            <img src="https://authjs.dev/img/providers/github.svg" alt="GitHub" className="w-6 h-6" />
          </Button>
        </div>
      </form>
      <div className="text-center text-sm text-gray-100">
        Already have an account?{' '}
        <button onClick={onSignIn} className="text-gray-100 hover:text-purple-300">
          Sign in
        </button>
      </div>
      <div className="flex justify-between text-xs text-gray-100">
        <a href="#" className="hover:text-gray-400">Terms & Conditions</a>
        <a href="#" className="hover:text-gray-400">Support</a>
        <a href="#" className="hover:text-gray-400">Customer Care</a>
      </div>
    </div>
  )
}*/

