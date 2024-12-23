"use client"

import Link from "next/link"
import { LayoutDashboard, Package2, ClipboardList, Star, HelpCircle } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="h-screen w-64 border-r bg-[#4CAF50]">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight text-white">
            CirculX
          </h2>
        </div>
        <div className="space-y-1">
          <nav className="grid gap-1 px-2">
            <Link 
              href="/seller"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-white/10 transition-all"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link 
              href="/seller/products"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-white/10 transition-all"
            >
              <Package2 className="h-4 w-4" />
              Product Management
            </Link>
            <Link 
              href="/seller/orders"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-white/10 transition-all"
            >
              <ClipboardList className="h-4 w-4" />
              Order Management
            </Link>
            <Link 
              href="/seller/reviews"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-white/10 transition-all"
            >
              <Star className="h-4 w-4" />
              Ratings & Reviews
            </Link>
            <Link 
              href="/seller/help"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-white hover:bg-white/10 transition-all"
            >
              <HelpCircle className="h-4 w-4" />
              Help/Support
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

