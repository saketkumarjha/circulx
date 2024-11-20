'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Mail, ShoppingBag } from 'lucide-react'
import { Input } from "@/components/ui/input"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  
  const categories = [
    "Storage Tanks, Drums",
    "Oils, Grease & Lubricants",
    "Heater, Thermostat",
    "Wire Mesh & Gratings",
    "Containers",
    "Papers"
  ]

  return (
    <header className="w-full bg-white shadow-sm">
      {/* Top Navigation */}
      <div className="container mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-400 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold">Circulx</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-gray-300"
              />
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center gap-6">
            <button className="relative">
              <Mail className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </button>
            <button className="relative">
              <ShoppingBag className="w-6 h-6 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                1
              </span>
            </button>
            <Link 
              href="/login" 
              className="px-6 py-2 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="bg-[#004D40] text-white">
        <div className="container mx-auto px-8">
          <div className="flex items-center justify-center py-3">
            <span className="text-sm whitespace-nowrap mr-8">Explore by category:</span>
            <div className="flex items-center gap-8 overflow-x-auto">
              {categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/category/${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                  className="text-sm whitespace-nowrap hover:text-gray-200 transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}