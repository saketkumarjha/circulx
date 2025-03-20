"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import { Form } from "@/components/ui/form"
import { CheckboxList } from "./checkbox-list"
import { AVAILABLE_CATEGORIES, AVAILABLE_BRANDS, type CategoryAndBrand } from "@/types/profile"
import { saveCategoryAndBrand } from "@/actions/profile"

const categorySchema = z.object({
  categories: z.array(z.string()).min(1, "Select at least one category"),
  authorizedBrands: z.array(z.string()).min(1, "Select at least one brand"),
})

export function CategoryBrandForm({ initialData }: { initialData?: CategoryAndBrand }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialData?.categories || [])
  const [selectedBrands, setSelectedBrands] = useState<string[]>(initialData?.authorizedBrands || [])

  const form = useForm<CategoryAndBrand>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialData || {
      categories: [],
      authorizedBrands: [],
    },
  })

  // Update the onSubmit function to include better error handling and feedback

  async function onSubmit(data: CategoryAndBrand) {
    try {
      setIsSubmitting(true)

      const formData = new FormData()

      // Add each category and brand to the FormData
      selectedCategories.forEach((category) => {
        formData.append("categories", category)
      })

      selectedBrands.forEach((brand) => {
        formData.append("authorizedBrands", brand)
      })

      console.log("Submitting category form data:", { categories: selectedCategories, brands: selectedBrands })
      const result = await saveCategoryAndBrand(formData)

      if (result.success) {
        toast.success(result.message || "Category and brand details saved successfully")
        // Force a page reload to update the UI with the latest progress
        window.location.reload()
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

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
    form.setValue(
      "categories",
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category],
    )
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
    form.setValue(
      "authorizedBrands",
      selectedBrands.includes(brand) ? selectedBrands.filter((b) => b !== brand) : [...selectedBrands, brand],
    )
  }

  return (
    <Form {...form}>
      <form id="category-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <CheckboxList
            title="Category"
            items={[...AVAILABLE_CATEGORIES]} // Convert readonly array to mutable
            selectedItems={selectedCategories}
            onItemToggle={toggleCategory}
          />
          <CheckboxList
            title="Brands Require Authorized letter"
            items={[...AVAILABLE_BRANDS]} // Convert readonly array to mutable
            selectedItems={selectedBrands}
            onItemToggle={toggleBrand}
          />
        </div>
      </form>
    </Form>
  )
}

