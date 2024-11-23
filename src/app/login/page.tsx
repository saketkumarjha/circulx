'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'

interface LoginProps {
  onSignupClick: () => void
}

export default function Login({ onSignupClick }: LoginProps) {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const router = useRouter()

  const handleSendOtp = async () => {
    const response = await fetch('/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [loginMethod]: loginMethod === 'email' ? email : phone }),
    })

    if (response.ok) {
      setOtpSent(true)
    } else {
      alert('Failed to send OTP. Please try again.')
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [loginMethod]: loginMethod === 'email' ? email : phone, otp }),
    })

    if (response.ok) {
      const data = await response.json()
      localStorage.setItem('user', JSON.stringify(data.user))
      router.push(data.user.role === 'admin' ? '/dashboard/admin' : '/dashboard/client')
    } else {
      alert('Invalid OTP. Please try again.')
    }
  }

  const handleGoogleLogin = async () => {
    window.location.href = '/api/auth/google'
  }

  return (
    <div className="w-full max-w-sm mx-auto">
      <h2 className="text-center text-2xl font-bold text-gray-900 mb-4">Sign in</h2>
      <div className="bg-white py-4 px-4 sm:px-6">
        <div className="flex justify-center space-x-2 mb-4">
          <button
            onClick={() => setLoginMethod('email')}
            className={`px-3 py-1 text-sm rounded-md ${loginMethod === 'email' ? 'bg-[#004D40] text-white' : 'bg-gray-200'}`}
          >
            Email
          </button>
          <button
            onClick={() => setLoginMethod('phone')}
            className={`px-3 py-1 text-sm rounded-md ${loginMethod === 'phone' ? 'bg-[#004D40] text-white' : 'bg-gray-200'}`}
          >
            Phone
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {loginMethod === 'email' ? (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-[#004D40] focus:border-[#004D40]"
              />
            </div>
          ) : (
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-[#004D40] focus:border-[#004D40]"
              />
            </div>
          )}

          {!otpSent ? (
            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#004D40] hover:bg-[#00352d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004D40]"
            >
              Send OTP
            </button>
          ) : (
            <>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                  OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-[#004D40] focus:border-[#004D40]"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#004D40] hover:bg-[#00352d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004D40]"
              >
                Sign in
              </button>
            </>
          )}
        </form>

        <div className="mt-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or
              </span>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004D40]"
            >
              <FcGoogle className="w-5 h-5 mr-2" />
              Continue with Google
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={onSignupClick}
              className="text-sm font-medium text-[#004D40] hover:underline"
            >
              Create new account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}