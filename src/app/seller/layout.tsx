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
      <div className="flex-1">
        {/* Header with search and notification */}
        <div className="border-b bg-white px-4 py-3">
          <div className="flex justify-end items-center">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search for products or orders"
                className="w-[300px] pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                3
              </span>
            </Button>
          </div>
        </div>
        <main>{children}</main>
      </div>
    </div>
  )
}

