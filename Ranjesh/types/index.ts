export interface Product {
  id: string
  name: string
  productName: string
  category: string
  description: string
  skuCode: string
  stock: number
  price: number
  status: boolean
  image?: string
  weight: string
  length: string
  width: string
  breadth: string
  availableQuantity: string
  pricePerUnit: string
  discount: string
  discountType: string
  dimensions: {
    length: number
    width: number
    height: number
  }
}

export type CategoryType = 'All' | 'Metal' | 'Wood' | 'Plastic' | 'Electronics'

export interface ProductFormData {
  productName: string
  skuCode: string
  description: string
  pricePerUnit: string
  availableQuantity: string
  discount?: string
  discountType?: string
  weight: string
  length: string
  breadth: string
  width: string
  category: string
  image?: string
  images?: string[]
}

