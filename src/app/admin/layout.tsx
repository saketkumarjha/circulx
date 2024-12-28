import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { Sidebar } from "@/components/admin/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      

      {/* Main content area with sidebar */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-white">
          <Sidebar />
        </aside>
        {/* Main content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}

