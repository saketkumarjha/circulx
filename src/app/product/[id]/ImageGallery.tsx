'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProductImage {
  id: number
  src: string
  alt: string
}

interface ImageGalleryProps {
  images: ProductImage[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="w-full space-y-4">
      <div className="relative aspect-square rounded-lg overflow-hidden border max-w-md mx-auto">
        <Image
          src={images[selectedImage].src}
          alt={images[selectedImage].alt}
          fill
          className="object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square rounded-lg overflow-hidden border ${
              selectedImage === index ? 'border-primary' : 'border-gray-200'
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

