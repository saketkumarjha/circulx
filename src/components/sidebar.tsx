"use client"

import Link from "next/link"
import { LayoutDashboard, Package2, ClipboardList, Star, UserCircle, HelpCircle } from 'lucide-react'

// Sidebar component that provides main navigation for the seller dashboard
export function Sidebar() {
  return (
    <div className="h-screen w-56 bg-[#4CAF50]">
      <div className="py-4">
        {/* Logo Section */}
        <div className="px-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-semibold text-white">CirculX</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1 px-2">
          <Link 
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-white text-sm hover:bg-white/10"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link 
            href="/products"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-white text-sm hover:bg-white/10"
          >
            <Package2 className="h-4 w-4" />
            Product Management
          </Link>
          <Link 
            href="/orders"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-white text-sm hover:bg-white/10"
          >
            <ClipboardList className="h-4 w-4" />
            Order Management
          </Link>
          <Link 
            href="/reviews"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-white text-sm hover:bg-white/10"
          >
            <Star className="h-4 w-4" />
            Ratings & Reviews
          </Link>
          <Link 
            href="/profile"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-white text-sm hover:bg-white/10"
          >
            <UserCircle className="h-4 w-4" />
            Profile Management
          </Link>
          <Link 
            href="/help"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-white text-sm hover:bg-white/10"
          >
            <HelpCircle className="h-4 w-4" />
            Help/Support
          </Link>
        </nav>
      </div>
    </div>
  )
}

