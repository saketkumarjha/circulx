"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { toast } from "sonner"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { saveCategoryAndBrand } from "@/actions/profile"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"

// Define types
export interface CategoryBrandDetails {
  categories: string[]
  authorizedBrands: string[]
}

// Define CheckboxListProps
interface CheckboxListProps {
  selectedValues: string[]
  onChange: (values: string[]) => void
  label: string
  options: string[]
}

// Create CheckboxList component
function CheckboxList({ selectedValues, onChange, label, options }: CheckboxListProps) {
  const handleCheckboxChange = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((item) => item !== value))
    } else {
      onChange([...selectedValues, value])
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-500">{label}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={option}
              checked={selectedValues.includes(option)}
              onCheckedChange={() => handleCheckboxChange(option)}
            />
            <label
              htmlFor={option}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

const categorySchema = z.object({
  categories: z.array(z.string()).min(1, "Select at least one category"),
  authorizedBrands: z.array(z.string()).min(1, "Select at least one brand"),
})

// Sample data - in a real app, this would come from an API
const availableCategories = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty & Personal Care",
  "Books",
  "Toys & Games",
  "Sports & Outdoors",
  "Automotive",
  "Health & Wellness",
]

const availableBrands = [
  "Apple",
  "Samsung",
  "Sony",
  "Nike",
  "Adidas",
  "Philips",
  "LG",
  "Bosch",
  "Nestle",
  "Unilever",
  "Procter & Gamble",
  "Coca-Cola",
  "PepsiCo",
]

export function CategoryBrandForm({ initialData }: { initialData?: CategoryBrandDetails }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<CategoryBrandDetails>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      categories: [],
      authorizedBrands: [],
    },
  })

  async function onSubmit(data: CategoryBrandDetails) {
    try {
      setIsSubmitting(true)

      const formData = new FormData()

      // Add each category and brand to the FormData
      data.categories.forEach((category) => {
        formData.append("categories", category)
      })

      data.authorizedBrands.forEach((brand) => {
        formData.append("authorizedBrands", brand)
      })

      const result = await saveCategoryAndBrand(formData)

      if (result.success) {
        toast.success(result.message || "Category and brand details saved successfully")
        router.refresh()
        setTimeout(() => {
          router.push("/seller/profile")
        }, 1000)
      } else {
        toast.error(result.error || "Failed to save category and brand details")
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
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Categories<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <CheckboxList
                  options={availableCategories}
                  selectedValues={field.value}
                  onChange={field.onChange}
                  label="Select categories you want to sell in"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="authorizedBrands"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Authorized Brands<span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <CheckboxList
                  options={availableBrands}
                  selectedValues={field.value}
                  onChange={field.onChange}
                  label="Select brands you are authorized to sell"
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

