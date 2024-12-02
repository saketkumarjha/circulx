'use client'

import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { SignInForm } from './sign-in-form'
import { SignUpForm } from './sign-up-form'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isSignIn, setIsSignIn] = useState(true)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] p-0 bg-[#F9F9F9]">
        <div className="px-6 py-8 space-y-6">
          {isSignIn ? (
            <>
              <SignInForm onSuccess={onSuccess} />
              <div className="text-center">
                <button
                  onClick={() => setIsSignIn(false)}
                  className="text-sm text-gray-600 hover:underline"
                >
                  Don't have an account? Register
                </button>
              </div>
            </>
          ) : (
            <>
              <SignUpForm onSuccess={onSuccess} />
              <div className="text-center">
                <button
                  onClick={() => setIsSignIn(true)}
                  className="text-sm text-gray-600 hover:underline"
                >
                  Already have an account? Sign in
                </button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

