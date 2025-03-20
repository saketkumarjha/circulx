'use client'

import { useState } from 'react'
import { Plus, Upload, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ProductFormData } from '@/types'

const formSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  skuCode: z.string().min(1, "SKU code is required"),
  description: z.string().min(1, "Description is required"),
  pricePerUnit: z.string().regex(/^\d+$/, "Only numbers are allowed").min(1, "Price is required"),
  availableQuantity: z.string().regex(/^\d+$/, "Only numbers are allowed").min(1, "Quantity is required"),
  discount: z.string().regex(/^\d*$/, "Only numbers are allowed").optional(),
  discountType: z.string().optional(),
  weight: z.string().regex(/^\d+$/, "Only numbers are allowed").min(1, "Weight is required"),
  length: z.string().regex(/^\d+$/, "Only numbers are allowed").min(1, "Length is required"),
  breadth: z.string().regex(/^\d+$/, "Only numbers are allowed").min(1, "Breadth is required"),
  width: z.string().regex(/^\d+$/, "Only numbers are allowed").min(1, "Width is required"),
  category: z.string().min(1, "Category is required"),
})

type FormData = z.infer<typeof formSchema>

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void
  onCancel: () => void
}

export default function ProductForm({ onSubmit, onCancel }: ProductFormProps) {
  const [images, setImages] = useState<string[]>([])
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [newCategory, setNewCategory] = useState('')
  const [categories, setCategories] = useState<string[]>(['Metal', 'Wood', 'Plastic', 'Electronics'])
  const [showCategoryInput, setShowCategoryInput] = useState(false)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && images.length < 4) {
      Array.from(files).forEach(file => {
        if (images.length < 4) {
          const reader = new FileReader()
          reader.onloadend = () => {
            setImages(prev => [...prev, reader.result as string])
          }
          reader.readAsDataURL(file)
        }
      })
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    if (selectedImageIndex >= index) {
      setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))
    }
  }

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories(prev => [...prev, newCategory.trim()])
      setValue('category', newCategory.trim())
      setNewCategory('')
      setShowCategoryInput(false)
    }
  }

  const onFormSubmit = (data: FormData) => {
    onSubmit({ ...data, image: images[0], images })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Edit/Add Product</h2>
          <p className="text-muted-foreground mt-1">A description body text comes here</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onCancel}>
            Delete
          </Button>
          <Button variant="outline">
            Save Draft
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">General Information</h3>
              <div className="space-y-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="productName" className="text-base">
                    Product Name*
                  </Label>
                  <Input 
                    {...register("productName")}
                    id="productName"
                    placeholder="ABC Industries Pvt Ltd"
                    className="bg-white h-10"
                  />
                  {errors.productName && <p className="text-red-500 text-sm">{errors.productName.message}</p>}
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="skuCode" className="text-base">
                    SKU Code*
                  </Label>
                  <Input 
                    {...register("skuCode")}
                    id="skuCode"
                    placeholder="TSH-FFF-M"
                    className="mt-1.5 bg-white h-10"
                  />
                  {errors.skuCode && <p className="text-red-500 text-sm">{errors.skuCode.message}</p>}
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="description" className="text-base">
                    Product Description*
                  </Label>
                  <Textarea 
                    {...register("description")}
                    id="description"
                    placeholder="Enter product description"
                    className="mt-1.5 min-h-[100px] bg-white h-10"
                  />
                  {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Upload Img</h3>
              <div className="space-y-4">
                {images.length > 0 ? (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-4">
                      <div className="relative w-full aspect-video">
                        <img
                          src={images[selectedImageIndex]}
                          alt={`Product preview ${selectedImageIndex + 1}`}
                          className="object-contain w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 h-[80px]">
                      {images.map((img, index) => (
                        <div
                          key={index}
                          className="relative w-[80px] h-[80px]"
                        >
                          <div 
                            className={`relative w-full h-full cursor-pointer ${
                              selectedImageIndex === index ? 'ring-2 ring-[#10b981]' : 'ring-1 ring-gray-200'
                            }`}
                            onClick={() => setSelectedImageIndex(index)}
                          >
                            <img
                              src={img}
                              alt={`Thumbnail ${index + 1}`}
                              className="object-cover w-full h-full"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation()
                                removeImage(index)
                              }}
                              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {images.length < 4 && (
                        <label
                          htmlFor="imageUpload"
                          className="w-[80px] h-[80px] border-2 border-dashed rounded flex items-center justify-center cursor-pointer hover:border-[#10b981] transition-colors"
                        >
                          <Plus className="w-6 h-6 text-[#10b981]" />
                        </label>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg">
                      <label
                        htmlFor="imageUpload"
                        className="cursor-pointer flex flex-col items-center justify-center h-[200px]"
                      >
                        <Upload className="h-6 w-6 text-[#10b981] mb-2" />
                        <span className="text-[#10b981] font-medium text-sm">Click to Upload</span>
                        <span className="text-xs text-muted-foreground">or drag and drop</span>
                        <span className="text-xs text-muted-foreground">(Max file size: 25 MB)</span>
                      </label>
                    </div>
                    <label
                      htmlFor="imageUpload"
                      className="block w-[80px] h-[80px] mx-auto border-2 border-dashed rounded flex items-center justify-center cursor-pointer hover:border-[#10b981] transition-colors"
                    >
                      <Plus className="w-6 h-6 text-[#10b981]" />
                    </label>
                  </div>
                )}
                <input
                  type="file"
                  id="imageUpload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">Pricing & Inventory</h2>
              <div className="space-y-4">
                <div className="grid gap-1.5">
                  <Label htmlFor="pricePerUnit" className="text-base">
                    Price Per Unit*
                  </Label>
                  <Input 
                    {...register("pricePerUnit")}
                    id="pricePerUnit"
                    placeholder="Enter price per unit"
                    className="bg-white h-10"
                    type="number"
                    min="0"
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault()
                      }
                    }}
                  />
                  {errors.pricePerUnit && <p className="text-red-500 text-sm">{errors.pricePerUnit.message}</p>}
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="availableQuantity" className="text-base">
                    Available Quantity*
                  </Label>
                  <Input 
                    {...register("availableQuantity")}
                    id="availableQuantity"
                    placeholder="Enter available quantity"
                    className="bg-white h-10"
                    type="number"
                    min="0"
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault()
                      }
                    }}
                  />
                  {errors.availableQuantity && <p className="text-red-500 text-sm">{errors.availableQuantity.message}</p>}
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="discount" className="text-base">
                    Discount
                  </Label>
                  <Input 
                    {...register("discount")}
                    id="discount"
                    placeholder="Enter discount"
                    className="bg-white h-10"
                    type="number"
                    min="0"
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault()
                      }
                    }}
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="discountType" className="text-base">
                    Discount Type
                  </Label>
                  <Select onValueChange={(value) => register("discountType").onChange({ target: { value } })}>
                    <SelectTrigger className="bg-white h-10">
                      <SelectValue placeholder="Select discount type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
                <div className="space-y-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor="weight" className="text-base">
                      Item Weight (in Kg)*
                    </Label>
                    <Input 
                      {...register("weight")}
                      id="weight"
                      placeholder="Enter item weight"
                      className="bg-white h-10"
                      type="number"
                      min="0"
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault()
                        }
                      }}
                    />
                    {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-1.5">
                      <Label htmlFor="length">Length*</Label>
                      <Input 
                        {...register("length")}
                        id="length"
                        placeholder="Length"
                        className="mt-1.5 bg-white h-10"
                        type="number"
                        min="0"
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault()
                          }
                        }}
                      />
                      {errors.length && <p className="text-red-500 text-sm">{errors.length.message}</p>}
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="breadth">Breadth*</Label>
                      <Input 
                        {...register("breadth")}
                        id="breadth"
                        placeholder="Breadth"
                        className="mt-1.5 bg-white h-10"
                        type="number"
                        min="0"
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault()
                          }
                        }}
                      />
                      {errors.breadth && <p className="text-red-500 text-sm">{errors.breadth.message}</p>}
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="width">Width*</Label>
                      <Input 
                        {...register("width")}
                        id="width"
                        placeholder="Width"
                        className="mt-1.5 bg-white h-10"
                        type="number"
                        min="0"
                        onKeyPress={(e) => {
                          if (!/[0-9]/.test(e.key)) {
                            e.preventDefault()
                          }
                        }}
                      />
                      {errors.width && <p className="text-red-500 text-sm">{errors.width.message}</p>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Category</h2>
                <div className="space-y-4">
                  <div className="grid gap-1.5">
                    <Label htmlFor="category" className="text-base">
                      Add Category
                    </Label>
                    {showCategoryInput ? (
                      <div className="flex gap-2">
                        <Input
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          placeholder="Enter new category"
                          className="bg-white h-10"
                        />
                        <Button 
                          type="button"
                          onClick={handleAddCategory}
                          className="bg-[#10b981] hover:bg-[#10b981]/90 text-white"
                        >
                          Add
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Select 
                          onValueChange={(value) => {
                            if (value === "add_new") {
                              setShowCategoryInput(true)
                            } else {
                              setValue("category", value)
                            }
                          }}
                        >
                          <SelectTrigger className="bg-white h-10">
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                            <SelectItem value="add_new">+ Add New Category</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-[#10b981] hover:bg-[#10b981]/90 text-white">
            Confirm Product
          </Button>
        </div>
      </form>
    </div>
  )
}

