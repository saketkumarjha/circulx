"use client"

import Link from "next/link"
import { LayoutDashboard, Users,User, Package, ShoppingCart, BarChart2, HelpCircle } from 'lucide-react'
import { usePathname } from "next/navigation"

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Seller Portal', href: '/admin/sellers', icon: Users },
  { name: 'User Management', href: '/admin/users', icon: User },
  { name: 'Product Management', href: '/admin/products', icon: Package },
  { name: 'Order Management', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Report & Analytics', href: '/admin/reports', icon: BarChart2 },
  { name: 'Help/FAQs Management', href: '/admin/help', icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="h-full py-4">
      <nav className="space-y-1 px-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                ${isActive 
                  ? 'bg-emerald-600 text-white' 
                  : 'hover:bg-emerald-600 hover:text-white'
                }`}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

