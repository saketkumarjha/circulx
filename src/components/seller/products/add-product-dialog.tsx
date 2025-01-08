'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'

interface Product {
  id: string
  image: string
  category: string
  name: string
  stock: number
  price: number
  status: boolean
}

interface AddProductDialogProps {
  isOpen: boolean
  onClose: () => void
  onAddProduct: (product: Omit<Product, 'id'>) => void
  onAddCategory: (category: string) => void
  categories: string[]
}

export function AddProductDialog({ isOpen, onClose, onAddProduct, onAddCategory, categories }: AddProductDialogProps) {
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [stock, setStock] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const finalCategory = category === 'new' ? newCategory : category
    if (category === 'new' && newCategory) {
      onAddCategory(newCategory)
    }
    const newProduct = {
      name: productName,
      category: finalCategory,
      stock: parseInt(stock),
      price: parseInt(price),
      image: image || '/placeholder.svg?height=80&width=80',
      status: true
    }
    onAddProduct(newProduct)
    toast({
      title: "Product added successfully",
      description: `${productName} has been added to the product list.`,
    })
    onClose()
    resetForm()
  }

  const resetForm = () => {
    setProductName('')
    setCategory('')
    setNewCategory('')
    setStock('')
    setPrice('')
    setImage('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Enter the details of the new product here. Click confirm when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productName" className="text-right">
                Name
              </Label>
              <Input
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                  <SelectItem value="new">Add New Category</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {category === 'new' && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newCategory" className="text-right">
                  New Category
                </Label>
                <Input
                  id="newCategory"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Input
                id="stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price (₹)
              </Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">
                Image URL
              </Label>
              <Input
                id="image"
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="col-span-3"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Confirm Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

