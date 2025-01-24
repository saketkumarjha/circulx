'use client'

import { useState, useEffect } from 'react'
import ProductCard from './product-card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import axios from 'axios'

interface Product {
  product_id: number;
  title: string;
  model?: string;
  description?: string;
  category_id?: number;
  sub_category_id?: number;
  units?: string;
  weight?: number;
  dimensions?: object;
  image_link: string;
  stock: number;
  price: number;
  discount: number;
  SKU: string;
  seller_id?: number;
  created_at?: string;
  rating: number;
  seller_name: string;
  location: string;
  category_name: string;
  sub_category_name: string;
}

function ProductCarousel({ products, title }: { products: Product[], title: string }) {
  const [startIndex, setStartIndex] = useState(0)
  const [visibleProducts, setVisibleProducts] = useState(6)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setVisibleProducts(6)
      } else if (window.innerWidth >= 1024) {
        setVisibleProducts(4)
      } else if (window.innerWidth >= 768) {
        setVisibleProducts(3)
      } else if (window.innerWidth >= 640) {
        setVisibleProducts(2)
      } else {
        setVisibleProducts(1)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handlePrevious = () => {
    setStartIndex((prevIndex) => (prevIndex === 0 ? products.length - visibleProducts : prevIndex - visibleProducts))
  }

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + visibleProducts >= products.length ? 0 : prevIndex + visibleProducts))
  }

  const currentProducts = products.slice(startIndex, startIndex + visibleProducts)

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
      <div className="relative">
        <div className="flex overflow-hidden">
          {currentProducts.map((product) => (
            <div key={product.product_id} className={`w-full px-2 ${
              visibleProducts === 1 ? 'sm:w-full' :
              visibleProducts === 2 ? 'sm:w-1/2' :
              visibleProducts === 3 ? 'sm:w-1/2 md:w-1/3' :
              visibleProducts === 4 ? 'sm:w-1/2 md:w-1/3 lg:w-1/4' :
              'sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6'
            }`}>
              <ProductCard
                title={product.title}
                company={product.seller_name}
                location={product.location}
                price={product.price}
                discount={product.discount}
                image_link={product.image_link}
                href={`/product/${product.product_id}`}
                rating={product.rating}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 shadow-md transition-all duration-200 focus:outline-none z-10"
          aria-label="Previous product"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 shadow-md transition-all duration-200 focus:outline-none z-10"
          aria-label="Next product"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      </div>
    </div>
  )
}

export default function ProductGrid() {
  const [solarWaterHeaters, setSolarWaterHeaters] = useState<Product[]>([])
  const [solarPanels, setSolarPanels] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products')
        const products: Product[] = response.data;
        
        const waterHeaters = products.filter((product) => product.sub_category_name === 'Printers')
        const panels = products.filter((product) => product.sub_category_name === 'Power Saws')

        setSolarWaterHeaters(waterHeaters)
        setSolarPanels(panels)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="w-full px-4 py-8">
      <ProductCarousel products={solarWaterHeaters} title="Printers" />
      <ProductCarousel products={solarPanels} title="Power Saws" />
    </div>
  )
}

