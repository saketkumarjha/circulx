"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Plus, ArrowUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"

interface Seller {
  id: string
  name: string
  tradeName: string
  email: string
  phone: string
  registeredDate: string
}

export function SellerList() {
  const [sellers, setSellers] = useState<Seller[]>([])
  const [filteredSellers, setFilteredSellers] = useState<Seller[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Seller
    direction: "ascending" | "descending"
  } | null>(null)

  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/admin/sellers")

        if (!response.ok) {
          throw new Error("Failed to fetch sellers")
        }

        const data = await response.json()
        console.log("Fetched sellers:", data)
        setSellers(data)
        setFilteredSellers(data)
      } catch (error) {
        console.error("Error fetching sellers:", error)
        toast({
          title: "Error",
          description: "Failed to fetch sellers. Please try again.",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSellers()
  }, [toast])

  useEffect(() => {
    if (searchTerm) {
      const filtered = sellers.filter(
        (seller) =>
          (seller.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (seller.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
          (seller.id?.toLowerCase() || "").includes(searchTerm.toLowerCase()),
      )
      setFilteredSellers(filtered)
    } else {
      setFilteredSellers(sellers)
    }
  }, [searchTerm, sellers])

  const handleSort = (key: keyof Seller) => {
    let direction: "ascending" | "descending" = "ascending"

    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }

    setSortConfig({ key, direction })

    const sortedSellers = [...filteredSellers].sort((a, b) => {
      if ((a[key] || "") < (b[key] || "")) {
        return direction === "ascending" ? -1 : 1
      }
      if ((a[key] || "") > (b[key] || "")) {
        return direction === "ascending" ? 1 : -1
      }
      return 0
    })

    setFilteredSellers(sortedSellers)
  }

  const handleAddSeller = () => {
    router.push("/admin/sellers/add")
  }

  const handleViewSeller = (sellerId: string) => {
    router.push(`/admin/sellers/${sellerId}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Sellers</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search sellers..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleAddSeller} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Seller
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-md shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("id")}
                >
                  <div className="flex items-center">
                    ID
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center">
                    Seller Name
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("email")}
                >
                  <div className="flex items-center">
                    Email ID
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("registeredDate")}
                >
                  <div className="flex items-center">
                    Registered Date
                    <ArrowUpDown className="ml-1 h-4 w-4" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton className="h-4 w-16" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton className="h-4 w-32" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton className="h-4 w-48" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Skeleton className="h-4 w-24" />
                    </td>
                  </tr>
                ))
              ) : filteredSellers.length > 0 ? (
                filteredSellers.map((seller) => (
                  <tr
                    key={seller.id || Math.random().toString()}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleViewSeller(seller.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {seller.id || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{seller.name || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{seller.email || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {seller.registeredDate || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                    {searchTerm ? "No sellers found matching your search." : "No sellers found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

