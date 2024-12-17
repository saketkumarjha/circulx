'use client'

import { useState } from 'react'
import ProductCard from './product-card'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const solarWaterHeaters = [
  {
    id: 1,
    title: '300 LPD ETC Ceramic Coated Supreme Solar Water Heater',
    company: 'Waaree Pvt Ltd',
    location: 'Gurugram,Haryana',
    price: 33000,
    originalPrice: 66000,
    discount: 50,
    image: '/download.jpg',
    hoverImage: '/th.jpg',
    href: '/product/1',
    rating: 4.5
  },
  {
    id: 2,
    title: '300 LPD ETC Ceramic Coated Supreme Solar Water Heater',
    company: 'Waaree Pvt Ltd',
    location: 'Gurugram,Haryana',
    price: 33000,
    originalPrice: 66000,
    discount: 50,
    image: '/th.jpg',
    hoverImage: '/download.jpg',
    href: '/product/2',
    rating: 4.2
  },
  {
    id: 3,
    title: '300 LPD ETC Ceramic Coated Supreme Solar Water Heater',
    company: 'Waaree Pvt Ltd',
    location: 'Gurugram,Haryana',
    price: 33000,
    originalPrice: 66000,
    discount: 50,
    image: '/download.jpg',
    hoverImage: '/download.jpg',
    href: '/product/3',
    rating: 4.8
  },
  {
    id: 4,
    title: '300 LPD ETC Ceramic Coated Supreme Solar Water Heater',
    company: 'Waaree Pvt Ltd',
    location: 'Gurugram,Haryana',
    price: 33000,
    originalPrice: 66000,
    discount: 50,
    image: '/download.jpg',
    hoverImage: '/download.jpg',
    href: '/product/4',
    rating: 4.0
  },
  {
    id: 5,
    title: '300 LPD ETC Ceramic Coated Supreme Solar Water Heater',
    company: 'Waaree Pvt Ltd',
    location: 'Gurugram,Haryana',
    price: 33000,
    originalPrice: 66000,
    discount: 50,
    image: '/download.jpg',
    hoverImage: '/download.jpg',
    href: '/product/5',
    rating: 4.6
  },
  {
    id: 6,
    title: '300 LPD ETC Ceramic Coated Supreme Solar Water Heater',
    company: 'Waaree Pvt Ltd',
    location: 'Gurugram,Haryana',
    price: 33000,
    originalPrice: 66000,
    discount: 50,
    image: '/download.jpg',
    hoverImage: '/download.jpg',
    href: '/product/6',
    rating: 4.3
  }
]

const solarPanels = [
  {
    id: 7,
    title: '400W Monocrystalline Solar Panel',
    company: 'SunTech Power',
    location: 'Bengaluru, Karnataka',
    price: 12000,
    originalPrice: 15000,
    discount: 20,
    image: '/th.jpg',
    hoverImage: '/download.jpg',
    href: '/product/7',
    rating: 4.7
  },
  {
    id: 8,
    title: '330W Polycrystalline Solar Panel',
    company: 'Tata Power Solar',
    location: 'Mumbai, Maharashtra',
    price: 9500,
    originalPrice: 11000,
    discount: 14,
    image: '/th.jpg',
    hoverImage: '/download.jpg',
    href: '/product/8',
    rating: 4.4
  },
  {
    id: 9,
    title: '500W Bifacial Solar Panel',
    company: 'Adani Solar',
    location: 'Ahmedabad, Gujarat',
    price: 18000,
    originalPrice: 22000,
    discount: 18,
    image: '/th.jpg',
    hoverImage: '/download.jpg',
    href: '/product/9',
    rating: 4.9
  },
  {
    id: 10,
    title: '375W PERC Solar Panel',
    company: 'Vikram Solar',
    location: 'Kolkata, West Bengal',
    price: 11500,
    originalPrice: 13500,
    discount: 15,
    image: '/th.jpg',
    hoverImage: '/download.jpg',
    href: '/product/10',
    rating: 4.6
  },
  {
    id: 11,
    title: '450W Half-Cut Cell Solar Panel',
    company: 'Waaree Energies',
    location: 'Surat, Gujarat',
    price: 14500,
    originalPrice: 17000,
    discount: 15,
    image: '/th.jpg',
    hoverImage: '/download.jpg',
    href: '/product/11',
    rating: 4.8
  },
  {
    id: 12,
    title: '360W Flexible Solar Panel',
    company: 'Luminous Power ',
    location: 'Noida, Uttar Pradesh',
    price: 16000,
    originalPrice: 20000,
    discount: 20,
    image: '/th.jpg',
    hoverImage: '/download.jpg',
    href: '/product/12',
    rating: 4.5
  }
]

function ProductCarousel({ products, title }: { products: typeof solarWaterHeaters, title: string }) {
  const [startIndex, setStartIndex] = useState(0)

  const handlePrevious = () => {
    setStartIndex((prevIndex) => (prevIndex === 0 ? products.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex === products.length - 1 ? 0 : prevIndex + 1))
  }

  const visibleProducts = [
    products[startIndex],
    products[(startIndex + 1) % products.length],
    products[(startIndex + 2) % products.length],
    products[(startIndex + 3) % products.length],
    products[(startIndex + 4) % products.length],
    products[(startIndex + 5) % products.length],
  ]

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
      <div className="relative">
        <div className="flex overflow-hidden">
          {visibleProducts.map((product) => (
            <div key={product.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 px-2">
              <ProductCard
                title={product.title}
                company={product.company}
                location={product.location}
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                image={product.image}
                hoverImage={product.hoverImage}
                href={product.href}
                rating={product.rating}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 shadow-md transition-all duration-200 focus:outline-none"
          aria-label="Previous product"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 shadow-md transition-all duration-200 focus:outline-none"
          aria-label="Next product"
        >
          <ChevronRight className="w-6 h-6 text-gray-800" />
        </button>
      </div>
    </div>
  )
}

export default function ProductGrid() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ProductCarousel products={solarWaterHeaters} title="Solar Water Heaters" />
      <ProductCarousel products={solarPanels} title="Solar Panels" />
    </div>
  )
}

