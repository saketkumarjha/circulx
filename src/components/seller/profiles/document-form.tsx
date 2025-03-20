"use client"

import { useState, useEffect } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { saveDocumentDetails } from "@/actions/profile"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { DocumentUpload } from "./document-upload"
import { uploadToBlob } from "@/lib/blob-storage"

// Define the form schema
const formSchema = z.object({
  panCard: z.string().min(1, "PAN Card is required"),
  aadharCard: z.string().min(1, "Aadhar Card is required"),
})

type DocumentFormValues = z.infer<typeof formSchema>

interface DocumentFormProps {
  initialData?: any
  onSuccess?: () => void
}

export function DocumentForm({ initialData, onSuccess }: DocumentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState<"idle" | "saving" | "saved">("idle")
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null)

  // Initialize the form with default values
  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      panCard: initialData?.panCard || "",
      aadharCard: initialData?.aadharCard || "",
    },
  })

  // Watch form values for auto-save
  const formValues = form.watch()

  // Auto-save functionality
  useEffect(() => {
    // Clear previous timer
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer)
    }

    // Don't auto-save if form is pristine
    if (!form.formState.isDirty) return

    // Set a new timer for auto-save
    const timer = setTimeout(() => {
      autoSave()
    }, 3000) // Auto-save after 3 seconds of inactivity

    setAutoSaveTimer(timer)

    // Cleanup on unmount
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [formValues])

  const autoSave = async () => {
    try {
      if (!form.formState.isDirty) return

      setAutoSaveStatus("saving")

      // Get current form data
      const data = form.getValues()

      // Create FormData object
      const formData = new FormData()
      formData.append("panCard", data.panCard)
      formData.append("aadharCard", data.aadharCard)
      formData.append("isAutoSave", "true")

      // Call the server action
      await saveDocumentDetails(formData)

      setAutoSaveStatus("saved")

      // Reset after a few seconds
      setTimeout(() => {
        setAutoSaveStatus("idle")
      }, 2000)
    } catch (error) {
      console.error("Auto-save error:", error)
      setAutoSaveStatus("idle")
    }
  }

  const onSubmit = async (data: DocumentFormValues) => {
    try {
      setIsSubmitting(true)

      // Upload files to Blob storage
      let panCardUrl = data.panCard
      let aadharCardUrl = data.aadharCard

      // Only upload if the data is a base64 string (new upload)
      if (data.panCard && typeof data.panCard === "string" && data.panCard.startsWith("data:")) {
        panCardUrl = await uploadToBlob(data.panCard, "documents/pan")
      }

      if (data.aadharCard && typeof data.aadharCard === "string" && data.aadharCard.startsWith("data:")) {
        aadharCardUrl = await uploadToBlob(data.aadharCard, "documents/aadhar")
      }

      // Create FormData object
      const formData = new FormData()
      formData.append("panCard", panCardUrl)
      formData.append("aadharCard", aadharCardUrl)

      const result = await saveDocumentDetails(formData)

      if (result.success) {
        toast.success("Document details saved successfully")
        if (onSuccess) {
          onSuccess()
        } else {
          // Reload the page to refresh the data
          window.location.reload()
        }
      } else {
        toast.error(result.error || "Failed to save document details")
      }
    } catch (error) {
      console.error("Error saving document details:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form id="documents-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Document Information</h2>
            {autoSaveStatus === "saving" && (
              <span className="text-sm text-amber-600 animate-pulse">Auto-saving...</span>
            )}
            {autoSaveStatus === "saved" && <span className="text-sm text-green-600">Auto-saved</span>}
          </div>
          <p className="text-sm text-muted-foreground">Please upload the required documents for verification.</p>
        </div>

        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="panCard"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  PAN Card <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <DocumentUpload
                    label="PAN Card"
                    value={field.value}
                    onChange={field.onChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                    description="Upload a clear image or PDF of your PAN Card"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="aadharCard"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Aadhar Card <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <DocumentUpload
                    label="Aadhar Card"
                    value={field.value}
                    onChange={field.onChange}
                    accept=".jpg,.jpeg,.png,.pdf"
                    description="Upload a clear image or PDF of your Aadhar Card"
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </Form>
  )
}

