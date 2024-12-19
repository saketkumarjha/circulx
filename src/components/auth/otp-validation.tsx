'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { verifyOTP, resendOTP } from '@/lib/auth'
import { ArrowLeft } from 'lucide-react'
import OtpInput from 'react-otp-input'

interface OTPValidationProps {
  otpId: string
  phone: string
  onSuccess: () => void
  onBack: () => void
}

export function OTPValidation({
  otpId,
  phone,
  onSuccess,
  onBack,
}: OTPValidationProps) {
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendTimer, setResendTimer] = useState(30)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await verifyOTP({
        otpId,
        otp,
        phone,
      })

      if (result.success) {
        onSuccess()
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('Failed to verify OTP. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleResendOTP() {
    try {
      const result = await resendOTP({
        phone,
      })

      if (result.success) {
        setResendTimer(30)
        const timer = setInterval(() => {
          setResendTimer((prev) => {
            if (prev <= 1) {
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError('Failed to resend OTP. Please try again.')
    }
  }

  return (
    <div className="grid grid-cols-2 h-full">
      <div className="p-8">
        <div className="space-y-6">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          <div>
          <Link href="/" className="flex items-center gap-2 mr-auto">
            <div className="w-7 h-6 bg-emerald-300 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold">Circulx</span>
          </Link>
            <h1 className="text-2xl font-bold">Verify OTP 🔒</h1>
            <p className="text-gray-600">
              Enter the OTP sent to{' '}
              <span className="font-medium">
                {phone}
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span className="w-2" />}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="w-12 h-12 text-center border rounded-md focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                )}
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? 'Verifying...' : 'Verify OTP'}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Didn't receive the OTP?{' '}
              {resendTimer > 0 ? (
                <span>Resend in {resendTimer}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-orange-500 hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </p>
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

