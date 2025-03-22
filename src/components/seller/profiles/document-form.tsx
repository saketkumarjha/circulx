"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUpload } from "./file-upload"
import { useRouter } from "next/navigation"
import { Toast } from "@/components/ui/use-toast"

interface DocumentFormProps {
  initialData?: {
    panCardUrl?: string | null
    aadharCardUrl?: string | null
  }
}

export function DocumentForm({ initialData }: DocumentFormProps) {
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
        toast({
          title: "Success",
          description: "Profile completed successfully",
        })
        
        // Redirect to profile success page
        if (response.redirect) {
          router.push("/seller/profile/success")
        }
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to complete profile",
          
        })
      }
    } catch (error) {
      console.error("Error completing profile:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>
            Upload the required documents for your seller profile
          </CardDescription>
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
              <p className="text-xs text-gray-500 mt-1">
                Upload a clear scan or photo of your PAN Card
              </p>
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
              <p className="text-xs text-gray-500 mt-1">
                Upload a clear scan or photo of your Aadhar Card
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            {isLoading ? "Processing..." : "Complete Profile"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

function toast(arg0: { title: string; description: string }) {
  throw new Error("Function not implemented.")
}
