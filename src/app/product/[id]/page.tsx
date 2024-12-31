'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface ProductImage {
  id: number
  src: string
  alt: string
}

interface QuantitySelectorProps {
  initialQuantity?: number
  onQuantityChange?: (quantity: number) => void
}

function QuantitySelector({ initialQuantity = 1, onQuantityChange }: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity)

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change)
    setQuantity(newQuantity)
    onQuantityChange?.(newQuantity)
  }

  return (
    <div className="flex items-center gap-3">
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => handleQuantityChange(-1)}
        disabled={quantity <= 1}
      >
        -
      </Button>
      <span className="w-8 text-center">{quantity}</span>
      <Button 
        variant="outline" 
        size="icon"
        onClick={() => handleQuantityChange(1)}
      >
        +
      </Button>
    </div>
  )
}

function ImageGallery({ images }: { images: ProductImage[] }) {
  const [selectedImage, setSelectedImage] = useState(images[0])

  return (
    <div className="space-y-4">
      <div className="aspect-square relative overflow-hidden rounded-lg">
        <Image
          src={selectedImage.src}
          alt={selectedImage.alt}
          fill
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className={`aspect-square relative overflow-hidden rounded-lg ${
              selectedImage.id === image.id ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

interface ProductDetailProps {
  params: {
    id: string
  }
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)

  const productImages: ProductImage[] = [
    { id: 1, src: '/download.jpg', alt: 'Product view 1' },
    { id: 2, src: '/download (1).png', alt: 'Product view 2' },
    { id: 3, src: '/th.jpg', alt: 'Product view 3' },
    { id: 4, src: '/audi.jpeg', alt: 'Product view 4' },
  ]

  // Here you would typically fetch the product data using the id
  // const product = fetchProduct(params.id)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Column - Images */}
        <div className="w-full lg:w-1/2">
          <ImageGallery images={productImages} />
        </div>

        {/* Right Column - Product Details */}
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Fortune Black Gold 10 inch PVC Safety Work Gumboots, Size: 6</h1>
            <p className="text-sm md:text-base text-muted-foreground">Gumboots, Size: 6</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl md:text-3xl font-bold">₹208</span>
              <span className="text-sm md:text-base text-muted-foreground">+75 GST</span>
            </div>
            <div className="text-sm md:text-base text-emerald-600">69% OFF</div>
          </div>

          <div className="space-y-4 border-t border-b py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm md:text-base font-medium">Quantity</span>
              <QuantitySelector initialQuantity={quantity} onQuantityChange={setQuantity} />
            </div>
          </div>

          <div className="space-y-4">
            <Button className="w-full" size="lg">
              Add To Cart
            </Button>
            <Button className="w-full" variant="secondary" size="lg">
              Buy Now
            </Button>
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-medium text-base md:text-lg">Offers and Coupons</h3>
              <div className="flex flex-wrap items-center gap-2 text-sm md:text-base">
                <div className="border rounded px-3 py-1 bg-blue-50 text-blue-600 border-blue-200">
                  SFS600
                </div>
                <button className="text-blue-600">Click to Copy</button>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                Get Flat 5% OFF on Safety Shoes! Minimum cart value ₹6,000
              </p>
            </div>

            <div className="border rounded-lg p-4 space-y-3">
              <h3 className="font-medium text-base md:text-lg">Delivery Details</h3>
              <div className="flex flex-wrap items-center gap-2 text-sm md:text-base">
                <MapPin className="w-4 h-4" />
                <input
                  type="text"
                  placeholder="Enter pincode"
                  className="border rounded px-2 py-1 w-full sm:w-auto"
                />
                <Button variant="link" className="h-auto p-0">
                  Check
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

