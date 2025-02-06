"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { CheckboxList } from "./checkbox-list"
import { AVAILABLE_CATEGORIES, AVAILABLE_BRANDS, type CategoryAndBrand } from "@/types/profile"

const categorySchema = z.object({
  categories: z.array(z.string()).min(1, "Select at least one category"),
  authorizedBrands: z.array(z.string()).min(1, "Select at least one brand"),
})

export function CategoryBrandForm() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  const form = useForm<CategoryAndBrand>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categories: [],
      authorizedBrands: [],
    },
  })

  function onSubmit(data: CategoryAndBrand) {
    console.log(data)
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

        <div className="flex gap-4">
          <Button variant="outline" type="button">
            Back
          </Button>
          <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white">Save Changes</Button>
        </div>
      </form>
    </Form>
  )
}

