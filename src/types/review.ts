export interface Review {
  id: string
  productName: string
  sku: string
  company: string
  rating: number
  text: string
  date: string
  imageUrl: string
}

export interface RatingStats {
  total: number
  average: number
  growth: number
  distribution: number[]
}

export interface ProductDetails {
  name: string
  sku: string
  category: string
  pricePerUnit: number
  availableStock: number
  description: string
  imageUrl: string
}

export interface ProductMetrics {
  totalSales: {
    value: number
    growth: number
  }
  revenue: {
    value: number
    growth: number
  }
  conversionRate: {
    value: number
    growth: number
  }
  totalViews: {
    value: number
    growth: number
  }
  averageReview: {
    value: number
    distribution: number[]
  }
}

