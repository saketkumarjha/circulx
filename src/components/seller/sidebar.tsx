"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Package2, ClipboardList, Star, UserCircle, HelpCircle, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"

// Sidebar component that provides main navigation for the seller dashboard
export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  const toggleSidebar = () => setIsOpen(!isOpen)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isOpen])

  useEffect(() => {
    // Close sidebar on route change (mobile only)
    setIsOpen(false)
  }, [pathname])

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/products", icon: Package2, label: "Product Management" },
    { href: "/orders", icon: ClipboardList, label: "Order Management" },
    { href: "/reviews", icon: Star, label: "Ratings & Reviews" },
    { href: "/profile", icon: UserCircle, label: "Profile Management" },
    { href: "/help", icon: HelpCircle, label: "Help/Support" },
  ]

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </Button>
      {/* 
        IMPROVEMENT: Added border, rounded corners, and adjusted padding
        - border: border border-gray-200
        - rounded corners: rounded-lg
        - adjusted padding: p-4 (removed py-4 from inner div)
      */}
      <div 
        ref={sidebarRef}
        className={`
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 fixed md:static inset-y-0 left-0 z-40 w-64 
          bg-[#f8fafc] transition-transform duration-300 ease-in-out
          overflow-y-auto border border-gray-200 rounded-lg p-4
        `}
      >
        <div>
          {/* 
            IMPROVEMENT: Adjusted padding and added space at the top
            - removed px-2 as it's now handled by the parent div
            - kept pt-8 to maintain space at the top
          */}
          <nav className="space-y-1 pt-8">
            {navItems.map((item) => (
              <SidebarLink 
                key={item.href}
                href={item.href}
                icon={<item.icon className="h-4 w-4" />}
                label={item.label}
                isActive={pathname === item.href}
              />
            ))}
          </nav>
        </div>
      </div>
    </>
  )
}

interface SidebarLinkProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
}

function SidebarLink({ href, icon, label, isActive }: SidebarLinkProps) {
  return (
    <Link 
      href={href}
      className={`
        flex items-center gap-3 rounded-lg px-3 py-2 
        text-sm font-medium transition-colors duration-200
        ${isActive 
          ? 'bg-blue-200 text-blue-800' 
          : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600'}
      `}
    >
      {icon}
      {label}
    </Link>
  )
}

