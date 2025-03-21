"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { AddressDetails } from "@/types/profile"
import { saveAddressDetails } from "@/actions/profile"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const addressSchema = z.object({
  billingAddress: z.object({
    country: z.string().min(2, "Country is required"),
    state: z.string().min(2, "State is required"),
    city: z.string().min(2, "City is required"),
    addressLine1: z.string().min(5, "Address Line 1 is required"),
    addressLine2: z.string().optional(),
    phoneNumber: z.string().min(10, "Valid phone number required"),
  }),
  pickupAddress: z.object({
    country: z.string().min(2, "Country is required"),
    state: z.string().min(2, "State is required"),
    city: z.string().min(2, "City is required"),
    addressLine1: z.string().min(5, "Address Line 1 is required"),
    addressLine2: z.string().optional(),
    phoneNumber: z.string().min(10, "Valid phone number required"),
  }),
})

export function AddressForm({ initialData }: { initialData?: AddressDetails }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<AddressDetails>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData || {
      billingAddress: {
        country: "",
        state: "",
        city: "",
        addressLine1: "",
        addressLine2: "",
        phoneNumber: "",
      },
      pickupAddress: {
        country: "",
        state: "",
        city: "",
        addressLine1: "",
        addressLine2: "",
        phoneNumber: "",
      },
    },
  })

  async function onSubmit(data: AddressDetails) {
    try {
      setIsSubmitting(true)

      const formData = new FormData()

      // Add billing address fields
      Object.entries(data.billingAddress).forEach(([key, value]) => {
        if (value) formData.append(`billingAddress.${key}`, value)
      })

      // Add pickup address fields
      Object.entries(data.pickupAddress).forEach(([key, value]) => {
        if (value) formData.append(`pickupAddress.${key}`, value)
      })

      console.log("Submitting address form data")
      const result = await saveAddressDetails(formData)

      if (result.success) {
        toast.success(result.message || "Address details saved successfully")
        // Force a page reload to update the UI with the latest progress
        window.location.reload()
      } else {
        toast.error(result.error || "Failed to save address details")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  const AddressFields = ({ prefix }: { prefix: "billingAddress" | "pickupAddress" }) => (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name={`${prefix}.country`}
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
        name={`${prefix}.state`}
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
        name={`${prefix}.city`}
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
        name={`${prefix}.addressLine1`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Address Line 1<span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="e.g., 123 Main Street" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`${prefix}.addressLine2`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address Line 2</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Apartment 4B" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`${prefix}.phoneNumber`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Phone Number<span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="e.g., 9876543210" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )

  return (
    <Form {...form}>
      <form id="addresses-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-medium mb-4">Add Billing Address</h3>
            <AddressFields prefix="billingAddress" />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Add Pickup Address</h3>
            <AddressFields prefix="pickupAddress" />
          </div>
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

