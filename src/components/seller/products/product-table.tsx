'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ChevronRight, Filter, Pencil, Plus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/components/ui/use-toast'
import { Product, CategoryType, ProductFormData } from '@/types'
import ProductForm from './product-form'

const initialProducts: Product[] = [
  {
    id: '1',
    image: '/audi.jpeg',
    category: 'Metal',
    name: 'Aluminum Sheets',
    stock: 2500,
    price: 25000,
    status: true,
    skuCode: 'ALU001',
    description: 'High-quality aluminum sheets for various applications.',
    weight: '10',
    length: '100',
    breadth: '50',
    width: '0.5',
    discountType: '',
    discount: '',
    productName: 'Aluminum Sheets',
    availableQuantity: '2500',
    pricePerUnit: '25000',
    dimensions: {
      length: 100,
      width: 0.5,
      height: 50
    }
  },
  {
    id: '2',
    image: '/login.png',
    category: 'Metal',
    name: 'Steel Pipes',
    stock: 1500,
    price: 35000,
    status: true,
    skuCode: 'STP001',
    description: 'Durable steel pipes for construction and industrial use.',
    weight: '20',
    length: '200',
    breadth: '10',
    width: '10',
    discountType: '',
    discount: '',
    productName: 'Steel Pipes',
    availableQuantity: '1500',
    pricePerUnit: '35000',
    dimensions: {
      length: 200,
      width: 10,
      height: 10
    }
  },
  {
    id: '3',
    image: '/audi.jpeg',
    category: 'Wood',
    name: 'Pine Plywood',
    stock: 800,
    price: 15000,
    status: true,
    skuCode: 'PIN001',
    description: 'Pine plywood for various woodworking projects.',
    weight: '5',
    length: '120',
    breadth: '60',
    width: '1.5',
    discountType: '',
    discount: '',
    productName: 'Pine Plywood',
    availableQuantity: '800',
    pricePerUnit: '15000',
    dimensions: {
      length: 120,
      width: 1.5,
      height: 60
    }
  },
  {
    id: '4',
    image: '/login.png',
    category: 'Wood',
    name: 'Oak Boards',
    stock: 1200,
    price: 45000,
    status: false,
    skuCode: 'OAK001',
    description: 'High-quality oak boards for furniture making.',
    weight: '15',
    length: '150',
    breadth: '75',
    width: '2',
    discountType: '',
    discount: '',
    productName: 'Oak Boards',
    availableQuantity: '1200',
    pricePerUnit: '45000',
    dimensions: {
      length: 150,
      width: 2,
      height: 75
    }
  },
  {
    id: '5',
    image: '/audi.jpeg',
    category: 'Plastic',
    name: 'PVC Pipes',
    stock: 3000,
    price: 12000,
    status: true,
    skuCode: 'PVC001',
    description: 'PVC pipes for plumbing and irrigation.',
    weight: '2',
    length: '200',
    breadth: '5',
    width: '5',
    discountType: '',
    discount: '',
    productName: 'PVC Pipes',
    availableQuantity: '3000',
    pricePerUnit: '12000',
    dimensions: {
      length: 200,
      width: 5,
      height: 5
    }
  },
]

export function ProductTable() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All')
  const [showAddForm, setShowAddForm] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  
  const categories: CategoryType[] = ['All', 'Metal', 'Wood', 'Plastic', 'Electronics']
  
  const filteredProducts = products.filter(product => 
    selectedCategory === 'All' ? true : product.category === selectedCategory
  )

  const productsPerPage = 10
  const totalProducts = filteredProducts.length
  const totalPages = Math.ceil(totalProducts / productsPerPage)
  
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  const handlePreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))
  const handleNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))

  const handleDeleteProduct = (id: string) => {
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id))
    toast({
      title: "Product deleted",
      description: "The product has been successfully deleted.",
    })
  }

  const handleUpdateProductStatus = (id: string, status: boolean) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, status } : product
      )
    )
    toast({
      title: "Product status updated",
      description: `The product status has been set to ${status ? 'active' : 'inactive'}.`,
    })
  }

  const handleAddProduct = (formData: ProductFormData) => {
    const productWithId: Product = {
      id: (products.length + 1).toString(),
      name: formData.productName,
      productName: formData.productName,
      category: formData.category,
      description: formData.description,
      skuCode: formData.skuCode,
      stock: parseInt(formData.availableQuantity),
      price: parseInt(formData.pricePerUnit),
      status: true,
      image: formData.image || '/placeholder.svg',
      weight: formData.weight,
      length: formData.length,
      width: formData.width,
      breadth: formData.breadth,
      availableQuantity: formData.availableQuantity,
      pricePerUnit: formData.pricePerUnit,
      discount: formData.discount || '',
      discountType: formData.discountType || '',
      dimensions: {
        length: parseFloat(formData.length),
        width: parseFloat(formData.width),
        height: parseFloat(formData.breadth)
      }
    }
    
    setProducts(prevProducts => [...prevProducts, productWithId])
    setShowAddForm(false)
    toast({
      title: "Product added",
      description: `${formData.productName} has been successfully added.`,
    })
  }

  return (
    <div className="w-full p-4 sm:p-6">
      
      {showAddForm ? (
        <ProductForm onSubmit={handleAddProduct} onCancel={() => setShowAddForm(false)} />
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Product Stock</h2>
            <div className="flex items-center gap-2">
              <Button onClick={() => setShowAddForm(true)} className="bg-black hover:bg-black/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Product Image</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Product Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Stock</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Price (₹)</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product) => (
                  <tr key={product.id} className="border-t">
                    <td className="px-4 py-3">
                      <Image
                        src={product.image || '/placeholder.svg'}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="rounded-lg border object-cover"
                      />
                    </td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3">{product.productName}</td>
                    <td className="px-4 py-3">{product.availableQuantity}</td>
                    <td className="px-4 py-3">₹{parseInt(product.pricePerUnit).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <Switch 
                        checked={product.status} 
                        onCheckedChange={(checked) => handleUpdateProductStatus(product.id, checked)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm">
            <div>
              Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, totalProducts)} of {totalProducts}
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </div>
        </>
      )}
      <Toaster />
    </div>
  )
}

