"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/actions/auth"
import { AuthModal } from "./auth-modal"

interface AuthWrapperProps {
  children: React.ReactNode
  requiredRole?: "admin" | "seller" | "customer"
}

export default function AuthWrapper({ children, requiredRole }: AuthWrapperProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true)
        const currentUser = await getCurrentUser()
        setUser(currentUser)

        if (!currentUser) {
          // User is not logged in, show auth modal
          setIsAuthModalOpen(true)
        } else if (requiredRole && currentUser.type !== requiredRole) {
          // User is logged in but doesn't have the required role
          // Redirect to the appropriate dashboard
          if (currentUser.type === "admin") {
            router.push("/admin")
          } else if (currentUser.type === "seller") {
            router.push("/seller")
          } else {
            router.push("/dashboard")
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        setIsAuthModalOpen(true)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router, requiredRole])

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false)
    window.location.reload()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    )
  }

  return (
    <>
      {children}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false)
          router.push("/")
        }}
        onSuccess={handleAuthSuccess}
      />
    </>
  )
}

