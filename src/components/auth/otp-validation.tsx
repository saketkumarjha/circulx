'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { verifyOTP } from '@/lib/auth'
import { ArrowLeft } from 'lucide-react'
import OtpInput from 'react-otp-input'

interface OTPValidationProps {
  verificationId: string
  phoneNumber: string
  onSuccess: () => void
  onBack: () => void
}

export function OTPValidation({
  verificationId,
  phoneNumber,
  onSuccess,
  onBack,
}: OTPValidationProps) {
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await verifyOTP(verificationId, otp)
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
            <Image
              src="/logo.png"
              alt="CirculX"
              width={120}
              height={40}
              className="mb-6"
            />
            <h1 className="text-2xl font-bold">Verify OTP 🔒</h1>
            <p className="text-gray-600">
              Enter the OTP sent to{' '}
              <span className="font-medium">
                {phoneNumber}
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
          </form>
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

