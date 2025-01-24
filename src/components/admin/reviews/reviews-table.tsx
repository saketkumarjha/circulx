"use client"

import { useState, useMemo } from "react"
import { MoreHorizontal, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DateRangePicker } from "./date-range-picker"
import type { Review } from "@/types/reviews"
import type { DateRange } from "react-day-picker"
import { isWithinInterval, parseISO } from "date-fns"

interface ReviewsTableProps {
  reviews: Review[]
}

export function ReviewsTable({ reviews }: ReviewsTableProps) {
  const [status, setStatus] = useState<string>("all")
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter reviews based on status and date
  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      // Status filter
      if (status !== "all" && review.status !== status) return false

      // Date range filter
      if (dateRange && dateRange.from && dateRange.to) {
        const reviewDate = parseISO(review.date)
        if (!isWithinInterval(reviewDate, { start: dateRange.from, end: dateRange.to })) {
          return false
        }
      }

      return true
    })
  }, [reviews, status, dateRange])

  // Calculate pagination
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedReviews = filteredReviews.slice(startIndex, startIndex + itemsPerPage)

  // Reset filters and pagination
  const handleReset = () => {
    setStatus("all")
    setDateRange(undefined)
    setCurrentPage(1)
  }

  // Handle pagination
  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1))
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
  }

  const statusColors = {
    Pending: "bg-orange-100 text-orange-600",
    Approved: "bg-green-100 text-green-600",
    Flagged: "bg-red-100 text-red-600",
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Reviews Table</h2>
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter By</span>
          </div>

          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={(range) => {
              setDateRange(range)
              setCurrentPage(1)
            }}
          />

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Flagged">Flagged</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="text-red-500" onClick={handleReset}>
            Reset Filter
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Reviews by Buyer</TableHead>
              <TableHead>Review Date</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Seller Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedReviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>
                  <img
                    src={review.image || "/placeholder.svg"}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{review.buyerName}</p>
                    <p className="text-sm text-gray-500">{review.review}</p>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-500">{review.date}</TableCell>
                <TableCell>{review.productName}</TableCell>
                <TableCell>{review.sellerName}</TableCell>
                <TableCell>
                  <Badge className={statusColors[review.status]}>{review.status}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border-t flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredReviews.length)} of{" "}
          {filteredReviews.length} results
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrevious} disabled={currentPage === 1}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
          <Button variant="outline" size="sm" onClick={handleNext} disabled={currentPage === totalPages}>
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}

