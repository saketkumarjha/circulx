'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const slides = [
  {
    id: 1,
    title: "Delivery Within",
    subtitle: "24 HOURS",
    description: "At No Extra Cost",
    image: "/placeholder.svg?height=400&width=800&text=Delivery+Within+24+Hours",
  },
  {
    id: 2,
    title: "Special Offers",
    subtitle: "UP TO 50% OFF",
    description: "Limited Time Only",
    image: "/placeholder.svg?height=400&width=800&text=Special+Offers+Up+To+50%+Off",
  },
  {
    id: 3,
    title: "New Arrivals",
    subtitle: "SHOP NOW",
    description: "Fresh Stock Available",
    image: "/placeholder.svg?height=400&width=800&text=New+Arrivals+Shop+Now",
  },
]

export default function SimpleSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-[400px] overflow-hidden bg-yellow-300">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="w-1/2">
              <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
              <div className="text-6xl font-bold mb-4">{slide.subtitle}</div>
              <p className="text-xl">👍 {slide.description}</p>
            </div>
            <div className="w-1/2">
              <Image
                src={slide.image}
                alt={slide.title}
                width={800}
                height={400}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${
              currentSlide === index ? 'bg-[#004D40]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}