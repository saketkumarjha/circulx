"use client"

import * as React from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Filter, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

// Interface for seller data type
interface Seller {
  id: string
  name: string
  email: string
  registeredDate: Date
  totalSales: string
  status: "Approved" | "Pending" | "Rejected"
}

// Sample seller data - typically this would come from an API
const SELLERS_DATA: Seller[] = Array.from({ length: 20 }, (_, index) => ({
  id: `0000${index + 1}`.slice(-5),
  name: `Seller ${index + 1}`,
  email: `seller${index + 1}@example.com`,
  registeredDate: new Date(2023, 0, 1 + index * 15), // Spread out over 2023
  totalSales: `$${Math.floor(Math.random() * 50000 + 10000)}`,
  status: ["Approved", "Pending", "Rejected"][Math.floor(Math.random() * 3)] as Seller["status"],
}))

// Items to show per page
const ITEMS_PER_PAGE = 10

export function SellerList() {
  // State management for filters and pagination
  const [dateFilter, setDateFilter] = React.useState<Date | null>(null)
  const [status, setStatus] = React.useState("")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [filteredSellers, setFilteredSellers] = React.useState<Seller[]>(SELLERS_DATA)
  const [showFilters, setShowFilters] = React.useState(false)

  // Calculate pagination values
  const totalPages = Math.ceil(filteredSellers.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredSellers.length)
  const currentSellers = filteredSellers.slice(startIndex, endIndex)

  // Function to handle filter changes
  React.useEffect(() => {
    let filtered = [...SELLERS_DATA]

    // Apply status filter
    if (status) {
      filtered = filtered.filter((seller) => seller.status.toLowerCase() === status.toLowerCase())
    }

    // Apply date filter
    if (dateFilter) {
      filtered = filtered.filter((seller) => seller.registeredDate >= dateFilter)
    }

    setFilteredSellers(filtered)
    setCurrentPage(1) // Reset to first page when filters change
  }, [dateFilter, status])

  // Function to get badge color based on status
  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 hover:bg-green-100/80"
      case "pending":
        return "bg-red-100 text-red-800 hover:bg-red-100/80"
      case "rejected":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100/80"
    }
  }

  // Function to reset all filters
  const resetFilters = () => {
    setDateFilter(null)
    setStatus("")
    setCurrentPage(1)
  }

  // Pagination handlers
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
  }

  // Function to handle adding a new seller (placeholder for now)
  const handleAddSeller = () => {
    alert("Add Seller functionality to be implemented")
  }

  return (
    <div className="w-full">
      {/* Header section with title and buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold px-4">List of Seller</h1>

        <div className="flex flex-wrap items-center gap-4">
          <Button onClick={handleAddSeller} className="bg-green-500 hover:bg-green-600">
            <Plus className="mr-2 h-4 w-4" /> Add Seller
          </Button>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="flex items-center">
            <Filter className="mr-2 h-4 w-4 " />
            Filter by
          </Button>
        </div>
      </div>

      {/* Filter options */}
      {showFilters && (
        <div className="w-full flex justify-end">
          <div className="flex flex-wrap items-center gap-4 mb-6 ml-auto">
            <DatePicker
              selected={dateFilter}
              onChange={(date: Date | null) => setDateFilter(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select a date"
              className="w-[140px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Seller Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button variant="destructive" size="sm" className="text-xs" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>
      )}

      {/* Table section */}
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">ID</TableHead>
              <TableHead className="whitespace-nowrap">SELLER NAME</TableHead>
              <TableHead className="whitespace-nowrap">EMAIL ID</TableHead>
              <TableHead className="whitespace-nowrap">REGISTERED DATE</TableHead>
              <TableHead className="whitespace-nowrap">TOTAL SALES</TableHead>
              <TableHead className="whitespace-nowrap">STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentSellers.map((seller, index) => (
              <TableRow key={index}>
                <TableCell className="whitespace-nowrap">{seller.id}</TableCell>
                <TableCell className="whitespace-nowrap">{seller.name}</TableCell>
                <TableCell className="whitespace-nowrap">{seller.email}</TableCell>
                <TableCell className="whitespace-nowrap">{formatDate(seller.registeredDate)}</TableCell>
                <TableCell className="whitespace-nowrap">{seller.totalSales}</TableCell>
                <TableCell className="whitespace-nowrap">
                  <Badge variant="secondary" className={getStatusBadgeColor(seller.status)}>
                    {seller.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination section */}
      <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
        <p>
          Showing {startIndex + 1}-{endIndex} of {filteredSellers.length}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}