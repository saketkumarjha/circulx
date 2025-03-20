"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Upload, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import * as pdfjsLib from "pdfjs-dist"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { BankDetails } from "@/types/profile"
import { ACCOUNT_TYPES } from "@/types/profile"
import { saveBankDetails } from "@/actions/profile"
import { uploadToBlob } from "@/lib/blob-storage"

const MAX_FILE_SIZE = 25 * 1024 * 1024 // 25MB

const bankSchema = z.object({
  accountHolderName: z.string().min(2, "Account holder name is required"),
  accountNumber: z
    .string()
    .min(8, "Valid account number required")
    .regex(/^\d+$/, "Account number must contain only digits"),
  ifscCode: z
    .string()
    .min(11, "IFSC code must be 11 characters")
    .max(11, "IFSC code must be 11 characters")
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format"),
  bankName: z.string().min(2, "Bank name is required"),
  branch: z.string().min(2, "Branch name is required"),
  city: z.string().min(2, "City is required"),
  accountType: z.string().min(1, "Account type is required"),
  bankLetterFile: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "File size must be less than 25MB")
    .optional(),
})

export function BankForm({ initialData }: { initialData?: BankDetails }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileType, setFileType] = useState<"image" | "pdf" | null>(null)
  const [isLoadingIfsc, setIsLoadingIfsc] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState<"idle" | "saving" | "saved">("idle")
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null)

  const form = useForm<BankDetails>({
    resolver: zodResolver(bankSchema),
    defaultValues: initialData || {
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
      bankName: "",
      branch: "",
      city: "",
      accountType: undefined,
    },
  })

  // Watch form values for auto-save
  const formValues = form.watch()
  const ifscCode = form.watch("ifscCode")

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

  // Fetch bank details when IFSC code is entered
  useEffect(() => {
    if (ifscCode && ifscCode.length === 11) {
      fetchBankDetails(ifscCode)
    }
  }, [ifscCode])

  const fetchBankDetails = async (ifsc: string) => {
    try {
      setIsLoadingIfsc(true)
      const response = await fetch(`https://ifsc.razorpay.com/${ifsc}`)

      if (response.ok) {
        const data = await response.json()
        form.setValue("bankName", data.BANK)
        form.setValue("branch", data.BRANCH)
        form.setValue("city", data.CITY)
        toast.success("Bank details fetched successfully")
      } else {
        toast.error("Invalid IFSC code")
      }
    } catch (error) {
      console.error("Error fetching bank details:", error)
      toast.error("Failed to fetch bank details")
    } finally {
      setIsLoadingIfsc(false)
    }
  }

  const autoSave = async () => {
    try {
      if (!form.formState.isDirty) return

      setAutoSaveStatus("saving")

      // Get current form data
      const data = form.getValues()

      // Create FormData object
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "bankLetterFile" && value) {
          formData.append(key, value)
        }
      })
      formData.append("isAutoSave", "true")

      // Call the server action
      await saveBankDetails(formData)

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

  async function onSubmit(data: BankDetails) {
    try {
      setIsSubmitting(true)

      const formData = new FormData()

      // Add text fields
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "bankLetterFile" && value) {
          formData.append(key, value)
        }
      })

      // Upload file to Blob storage if present
      if (data.bankLetterFile) {
        const fileUrl = await uploadToBlob(data.bankLetterFile, "documents/bank")
        formData.append("bankLetterUrl", fileUrl)
      }

      console.log("Submitting bank form data")
      const result = await saveBankDetails(formData)

      if (result.success) {
        toast.success(result.message || "Bank details saved successfully")
        // Force a page reload to update the UI with the latest progress
        window.location.reload()
      } else {
        toast.error(result.error || "Failed to save bank details")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
  }, [])

  const handleFileChange = async (file: File | undefined, onChange: (file: File) => void) => {
    if (file) {
      onChange(file)

      if (file.type === "application/pdf") {
        setFileType("pdf")
        const pdfData = await file.arrayBuffer()
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise
        const page = await pdf.getPage(1)
        const viewport = page.getViewport({ scale: 1 })
        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")
        canvas.height = viewport.height
        canvas.width = viewport.width
        await page.render({ canvasContext: context!, viewport: viewport }).promise
        setPreviewUrl(canvas.toDataURL())
      } else {
        setFileType("image")
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <Form {...form}>
      <form id="bank-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Bank Information</h2>
          {autoSaveStatus === "saving" && <span className="text-sm text-amber-600 animate-pulse">Auto-saving...</span>}
          {autoSaveStatus === "saved" && <span className="text-sm text-green-600">Auto-saved</span>}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="accountHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Account Holder Name<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., ABC Industries Pvt Ltd" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ifscCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    IFSC Code/Swift Code<span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        placeholder="e.g., ABCD0001234"
                        {...field}
                        onChange={(e) => {
                          e.target.value = e.target.value.toUpperCase()
                          field.onChange(e)
                        }}
                      />
                    </FormControl>
                    {isLoadingIfsc && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="branch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Branch<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Main Branch" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankLetterFile"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>
                    Bank Letter/Cancelled Cheque<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        id="bankLetterFile"
                        onChange={(e) => {
                          handleFileChange(e.target.files?.[0], onChange)
                        }}
                        {...field}
                      />
                      <label htmlFor="bankLetterFile" className="cursor-pointer">
                        {previewUrl ? (
                          <div className="relative w-full aspect-video">
                            <img
                              src={previewUrl || "/placeholder.svg"}
                              alt="Preview"
                              className="w-full h-full object-contain"
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                              {fileType === "pdf" ? "PDF Preview (First Page)" : "Image Preview"} - Click to change file
                            </p>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                            <p className="text-sm text-muted-foreground">Click to Upload or drag and drop</p>
                            <p className="text-xs text-muted-foreground mt-1">(Max file size 25 MB)</p>
                          </>
                        )}
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="accountNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Account Number<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 1234 5678 9012" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Bank Name<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., HDFC Bank" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    City<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Mumbai" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="accountType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Account Type<span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ACCOUNT_TYPES.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase()}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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

