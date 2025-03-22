"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUpload } from "./file-upload"
import { saveBankDetails } from "@/actions/profile"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

// Define types
export type AccountType = "Savings" | "Current"

export interface BankDetails {
  accountHolderName: string
  accountNumber: string
  ifscCode: string
  bankName: string
  branch: string
  city: string
  accountType: AccountType
  bankLetterUrl: string
}

const bankSchema = z.object({
  accountHolderName: z.string().min(2, "Account holder name is required"),
  accountNumber: z.string().min(8, "Valid account number required"),
  ifscCode: z.string().min(11, "Valid IFSC code required").max(11, "IFSC code must be 11 characters"),
  bankName: z.string().min(2, "Bank name is required"),
  branch: z.string().min(2, "Branch name is required"),
  city: z.string().min(2, "City is required"),
  accountType: z.enum(["Savings", "Current"] as const),
  bankLetterUrl: z.string().optional(),
})

export function BankForm({ initialData }: { initialData?: BankDetails }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<BankDetails>({
    resolver: zodResolver(bankSchema),
    defaultValues: initialData || {
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
      bankName: "",
      branch: "",
      city: "",
      accountType: "Savings",
      bankLetterUrl: "",
    },
  })

  async function onSubmit(data: BankDetails) {
    try {
      setIsSubmitting(true)

      const formData = new FormData()

      // Add all string fields
      formData.append("accountHolderName", data.accountHolderName)
      formData.append("accountNumber", data.accountNumber)
      formData.append("ifscCode", data.ifscCode)
      formData.append("bankName", data.bankName)
      formData.append("branch", data.branch)
      formData.append("city", data.city)
      formData.append("accountType", data.accountType)

      // Always append bankLetterUrl, even if it's empty
      formData.append("bankLetterUrl", data.bankLetterUrl || "")

      const result = await saveBankDetails(formData)

      if (result.success) {
        toast.success(result.message || "Bank details saved successfully")
        router.refresh()
        setTimeout(() => {
          router.push("/seller/profile")
        }, 1000)
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="accountHolderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Account Holder Name<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="e.g., John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Account Number<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="e.g., 12345678901234" {...field} />
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
                IFSC Code<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="e.g., SBIN0001234" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Bank Name<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., State Bank of India" {...field} />
                </FormControl>
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
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Savings">Savings</SelectItem>
                  <SelectItem value="Current">Current</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bankLetterUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Letter (Optional)</FormLabel>
              <FormControl>
                <FileUpload
                  value={field.value || ""}
                  onChange={field.onChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  maxSize={5}
                  label="Upload bank letter"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

