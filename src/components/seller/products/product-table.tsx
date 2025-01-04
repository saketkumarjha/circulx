'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Filter, Pencil, Plus, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// Define the Product interface
interface Product {
  id: string
  image: string
  category: string
  name: string
  stock: number
  price: number
  status: boolean
}

// Define the CategoryType
type CategoryType = 'Metal' | 'Wood' | 'Plastic' | 'Electronics' | 'All'

// Sample product data
const productData: Product[] = [
  {
    id: '1',
    image: '/audi.jpeg',
    category: 'Metal',
    name: 'Aluminum Sheets',
    stock: 2500,
    price: 25000,
    status: true,
  },
  {
    id: '2',
    image: '/login.png',
    category: 'Metal',
    name: 'Steel Pipes',
    stock: 1500,
    price: 35000,
    status: true,
  },
  {
    id: '3',
    image: '/audi.jpeg',
    category: 'Wood',
    name: 'Pine Plywood',
    stock: 800,
    price: 15000,
    status: true,
  },
  {
    id: '4',
    image: '/login.png',
    category: 'Wood',
    name: 'Oak Boards',
    stock: 1200,
    price: 45000,
    status: false,
  },
  {
    id: '5',
    image: '/audi.jpeg',
    category: 'Plastic',
    name: 'PVC Pipes',
    stock: 3000,
    price: 12000,
    status: true,
  },
  {
    id: '6',
    image: '/login.png',
    category: 'Plastic',
    name: 'HDPE Sheets',
    stock: 2000,
    price: 18000,
    status: true,
  },
  {
    id: '7',
    image: '/audi.jpeg',
    category: 'Electronics',
    name: 'LED Lights',
    stock: 5000,
    price: 8000,
    status: true,
  },
  {
    id: '8',
    image: '/login.png',
    category: 'Electronics',
    name: 'Circuit Boards',
    stock: 1500,
    price: 65000,
    status: false,
  },
  {
    id: '9',
    image: '/audi.jpeg',
    category: 'Metal',
    name: 'Copper Wires',
    stock: 4000,
    price: 55000,
    status: true,
  },
  {
    id: '10',
    image: '/login.png',
    category: 'Metal',
    name: 'Iron Rods',
    stock: 3000,
    price: 28000,
    status: true,
  },
  {
    id: '11',
    image: '/audi.jpeg',
    category: 'Wood',
    name: 'Maple Veneer',
    stock: 600,
    price: 75000,
    status: true,
  },
  {
    id: '12',
    image: '/OIP.jpg',
    category: 'Wood',
    name: 'Teak Wood',
    stock: 400,
    price: 95000,
    status: true,
  },
  {
    id: '13',
    image: '/login.png',
    category: 'Plastic',
    name: 'Acrylic Sheets',
    stock: 1800,
    price: 22000,
    status: false,
  },
  {
    id: '14',
    image: '/cart.png',
    category: 'Electronics',
    name: 'Solar Panels',
    stock: 1000,
    price: 120000,
    status: true,
  },
  {
    id: '15',
    image: '/audi.jpeg',
    category: 'Electronics',
    name: 'Battery Packs',
    stock: 2500,
    price: 45000,
    status: true,
  },
]

export default function ProductTable() {
  // State for current page and selected category
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All')
  
  // Filter products based on selected category
  const filteredProducts = productData.filter(product => 
    selectedCategory === 'All' ? true : product.category === selectedCategory
  )

  // Calculate pagination
  const productsPerPage = 10
  const totalProducts = filteredProducts.length
  const totalPages = Math.ceil(totalProducts / productsPerPage)
  
  // Get current page products
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  // Handle page navigation
  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  // Categories for filter
  const categories: CategoryType[] = ['All', 'Metal', 'Wood', 'Plastic', 'Electronics']

  return (
    <div className="w-full">
      {/* Header section with title and buttons */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Product Stock</h1>
        <div className="flex items-center gap-2">
          {/* Add Product button */}
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </Button>
          {/* Filter dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {categories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategory === category}
                  onCheckedChange={() => setSelectedCategory(category)}
                >
                  {category === 'All' ? 'All Products' : `${category} Products`}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Product table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[800px]">
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
            {/* Map through current products and render each row */}
            {currentProducts.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-3">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={80}
                    height={80}
                    className="rounded-lg border object-cover"
                  />
                </td>
                <td className="px-4 py-3">{product.category}</td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.stock}</td>
                <td className="px-4 py-3">₹{product.price.toLocaleString()}</td>
                <td className="px-4 py-3">
                  <Switch checked={product.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
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

      {/* Pagination section */}
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
    </div>
  )
}

