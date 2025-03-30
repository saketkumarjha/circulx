"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUpload } from "./file-upload"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface DocumentFormProps {
  initialData?: {
    panCardUrl?: string | null
    aadharCardUrl?: string | null
  }
  onSuccess?: () => void
}

export function DocumentForm({ initialData, onSuccess }: DocumentFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    panCard: initialData?.panCardUrl || "",
    aadharCard: initialData?.aadharCardUrl || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formDataObj = new FormData()

      // Add form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value || "")
      })

      // Import the server action dynamically to avoid source map issues
      const { saveDocumentsAndComplete } = await import("@/actions/profile")
      const response = await saveDocumentsAndComplete(formDataObj)

      if (response.success) {
        toast.success("Profile completed successfully")

        // Call the onSuccess callback if provided
        if (onSuccess) {
          onSuccess()
        }

        // Redirect to profile success page
        if (response.redirect) {
          window.location.href = "/seller/profile"
        }
      } else {
        toast.error(response.message || "Failed to complete profile")
      }
    } catch (error) {
      console.error("Error completing profile:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>Upload the required documents for your seller profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">PAN Card</label>
              <FileUpload
                value={formData.panCard}
                onChange={(value) => setFormData({ ...formData, panCard: value || "" })}
                accept=".jpg,.jpeg,.png,.pdf"
                maxSize={5}
                label="Upload PAN Card"
              />
              <p className="text-xs text-gray-500 mt-1">Upload a clear scan or photo of your PAN Card</p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Aadhar Card</label>
              <FileUpload
                value={formData.aadharCard}
                onChange={(value) => setFormData({ ...formData, aadharCard: value || "" })}
                accept=".jpg,.jpeg,.png,.pdf"
                maxSize={5}
                label="Upload Aadhar Card"
              />
              <p className="text-xs text-gray-500 mt-1">Upload a clear scan or photo of your Aadhar Card</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button type="submit" disabled={isLoading} className="bg-orange-500 hover:bg-orange-600 text-white">
            {isLoading ? "Processing..." : "Complete Profile"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

