import { Sidebar } from "@/components/seller/sidebar"
import { Search, Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"

// Layout component that wraps all seller dashboard pages
export default function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
        <main>{children}</main>
      </div>
    
  )
}

