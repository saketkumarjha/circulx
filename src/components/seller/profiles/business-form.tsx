"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState, useRef } from "react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { BusinessDetails } from "../../../types/profile"
import { saveBusinessDetails } from "@/actions/profile"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Enhanced validation schema
const businessSchema = z.object({
  legalEntityName: z.string().min(2, "Legal Entity Name is required"),
  tradeName: z.string().min(2, "Trade Name is required"),
  gstin: z
    .string()
    .min(15, "GSTIN must be 15 characters")
    .max(15, "GSTIN must be 15 characters")
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GSTIN format"),
  country: z.string().min(2, "Country is required"),
  pincode: z
    .string()
    .min(6, "Pincode must be 6 digits")
    .max(6, "Pincode must be 6 digits")
    .regex(/^[1-9][0-9]{5}$/, "Invalid pincode format"),
  state: z.string().min(2, "State is required"),
  city: z.string().min(2, "City is required"),
  businessEntityType: z.string().min(1, "Business Entity Type is required"),
})

export function BusinessForm({ initialData }: { initialData?: BusinessDetails }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState<"idle" | "saving" | "saved">("idle")
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null)
  const lastSavedValuesRef = useRef<any>(initialData || {})

  const form = useForm<BusinessDetails>({
    resolver: zodResolver(businessSchema),
    defaultValues: initialData || {
      legalEntityName: "",
      tradeName: "",
      gstin: "",
      country: "",
      pincode: "",
      state: "",
      city: "",
      businessEntityType: "",
    },
  })

  // Function to handle form changes and trigger auto-save
  const handleFormChange = () => {
    if (isSubmitting) return

    // Clear any existing timer
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current)
    }

    // Set a new timer for auto-save
    autoSaveTimerRef.current = setTimeout(() => {
      const currentValues = form.getValues()

      // Check if values have changed since last save
      const hasChanged = JSON.stringify(currentValues) !== JSON.stringify(lastSavedValuesRef.current)

      if (hasChanged && form.formState.isDirty) {
        autoSave(currentValues)
      }
    }, 3000)
  }

  // Register the change handler on all form fields
  form.register("legalEntityName", { onChange: handleFormChange })
  form.register("tradeName", { onChange: handleFormChange })
  form.register("gstin", { onChange: handleFormChange })
  form.register("country", { onChange: handleFormChange })
  form.register("pincode", { onChange: handleFormChange })
  form.register("state", { onChange: handleFormChange })
  form.register("city", { onChange: handleFormChange })
  form.register("businessEntityType", { onChange: handleFormChange })

  const autoSave = async (data: BusinessDetails) => {
    try {
      setAutoSaveStatus("saving")

      // Create FormData object
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value)
      })
      formData.append("isAutoSave", "true")

      // Call the server action
      await saveBusinessDetails(formData)

      // Update last saved values
      lastSavedValuesRef.current = { ...data }

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

  // Fetch state based on pincode
  const fetchLocationByPincode = async (pincode: string) => {
    if (pincode.length === 6) {
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        const data = await response.json()

        if (data[0].Status === "Success") {
          const postOffice = data[0].PostOffice[0]
          form.setValue("state", postOffice.State)
          form.setValue("city", postOffice.District)
          form.setValue("country", "India")
        }
      } catch (error) {
        console.error("Error fetching location data:", error)
      }
    }
  }

  async function onSubmit(data: BusinessDetails) {
    try {
      setIsSubmitting(true)

      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (value) formData.append(key, value)
      })

      const result = await saveBusinessDetails(formData)

      if (result.success) {
        toast.success(result.message || "Business details saved successfully")
        // Force a page reload to update the UI with the latest progress
        window.location.reload()
      } else {
        toast.error(result.error || "Failed to save business details")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form id="business-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Business Information</h2>
          {autoSaveStatus === "saving" && <span className="text-sm text-amber-600 animate-pulse">Auto-saving...</span>}
          {autoSaveStatus === "saved" && <span className="text-sm text-green-600">Auto-saved</span>}
        </div>

        <FormField
          control={form.control}
          name="legalEntityName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Legal Entity Name<span className="text-red-500">*</span>
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
          name="tradeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Trade Name<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="e.g., Manufacturer, Supplier, Distributor" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="gstin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  GSTIN<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., 22AAAAA0000A1Z5"
                    {...field}
                    onChange={(e) => {
                      // Convert to uppercase
                      e.target.value = e.target.value.toUpperCase()
                      field.onChange(e)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Pincode<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., 400001"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      fetchLocationByPincode(e.target.value)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  State<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Maharashtra" {...field} />
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
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Country<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., India" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="businessEntityType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Business Entity Type<span className="text-red-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    handleFormChange()
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="private-limited">Private Limited</SelectItem>
                    <SelectItem value="proprietorship">Proprietorship</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="llp">Limited Liability Partnership (LLP)</SelectItem>
                    <SelectItem value="public-limited">Public Limited</SelectItem>
                    <SelectItem value="one-person-company">One Person Company</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-orange-600 hover:bg-orange-700 text-white"
          size="sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </Form>
  )
}

