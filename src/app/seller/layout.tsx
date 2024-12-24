import { Sidebar } from "@/components/sidebar"
import { Search } from 'lucide-react'

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
        {/* Header with search */}
        <div className="border-b bg-white px-4 py-3">
          <div className="flex justify-end items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products or orders"
                className="w-[300px] pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <div className="ml-4 flex items-center gap-2">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">Olivia Rhye</p>
                <p className="text-xs text-green-600">Seller</p>
              </div>
            </div>
          </div>
        </div>
        <main>{children}</main>
      </div>
    </div>
  )
}

