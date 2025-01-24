"use client"

import { useState, useMemo } from "react"
import { MoreHorizontal, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { YearMonthPicker } from "./year-month-picker"
import type { Review } from "@/types/reviews"
import { isWithinInterval, parseISO, startOfMonth, endOfMonth, format } from "date-fns"

// Sample data with 15 products
const sampleReviews: Review[] = [
  {
    id: "review-1",
    image: "/placeholder.svg?text=1",
    buyerName: "Alice Johnson",
    review: "Great product! Exactly what I needed.",
    date: "2024-01-15T10:30:00Z",
    productName: "Wireless Earbuds",
    sellerName: "TechGadgets Inc.",
    status: "Approved",
  },
  {
    id: "review-2",
    image: "/placeholder.svg?text=2",
    buyerName: "Bob Smith",
    review: "The quality could be better. Slightly disappointed.",
    date: "2024-02-03T14:45:00Z",
    productName: "Smart Watch",
    sellerName: "WearableTech Co.",
    status: "Flagged",
  },
  {
    id: "review-3",
    image: "/placeholder.svg?text=3",
    buyerName: "Charlie Brown",
    review: "Excellent service and fast delivery!",
    date: "2024-03-22T09:15:00Z",
    productName: "Bluetooth Speaker",
    sellerName: "AudioPhiles Ltd.",
    status: "Approved",
  },
  {
    id: "review-4",
    image: "/placeholder.svg?text=4",
    buyerName: "Diana Prince",
    review: "Product works well but arrived later than expected.",
    date: "2024-04-10T16:20:00Z",
    productName: "Portable Charger",
    sellerName: "PowerUp Electronics",
    status: "Pending",
  },
  {
    id: "review-5",
    image: "/placeholder.svg?text=5",
    buyerName: "Ethan Hunt",
    review: "Amazing quality for the price. Highly recommended!",
    date: "2024-05-05T11:00:00Z",
    productName: "Noise-Cancelling Headphones",
    sellerName: "SoundMasters",
    status: "Approved",
  },
  {
    id: "review-6",
    image: "/placeholder.svg?text=6",
    buyerName: "Fiona Gallagher",
    review: "Not as described. Considering returning it.",
    date: "2024-06-18T13:30:00Z",
    productName: "Fitness Tracker",
    sellerName: "HealthTech Innovations",
    status: "Flagged",
  },
  {
    id: "review-7",
    image: "/placeholder.svg?text=7",
    buyerName: "George Costanza",
    review: "Perfect fit and great design!",
    date: "2024-07-07T10:45:00Z",
    productName: "Laptop Sleeve",
    sellerName: "TechAccessories Co.",
    status: "Approved",
  },
  {
    id: "review-8",
    image: "/placeholder.svg?text=8",
    buyerName: "Hannah Baker",
    review: "Good product but the user manual could be clearer.",
    date: "2024-08-14T15:20:00Z",
    productName: "Smart Home Hub",
    sellerName: "ConnectedLife Inc.",
    status: "Pending",
  },
  {
    id: "review-9",
    image: "/placeholder.svg?text=9",
    buyerName: "Ian Malcolm",
    review: "Exceeded my expectations. Will buy again!",
    date: "2024-09-02T09:00:00Z",
    productName: "Wireless Mouse",
    sellerName: "ErgoTech Solutions",
    status: "Approved",
  },
  {
    id: "review-10",
    image: "/placeholder.svg?text=10",
    buyerName: "Julia Roberts",
    review: "The color is slightly different from the picture.",
    date: "2024-10-20T14:10:00Z",
    productName: "Mechanical Keyboard",
    sellerName: "TypeMaster Keyboards",
    status: "Pending",
  },
  {
    id: "review-11",
    image: "/placeholder.svg?text=11",
    buyerName: "Kevin Hart",
    review: "Great value for money. Very satisfied!",
    date: "2024-11-11T11:11:00Z",
    productName: "Portable SSD",
    sellerName: "DataStore Solutions",
    status: "Approved",
  },
  {
    id: "review-12",
    image: "/placeholder.svg?text=12",
    buyerName: "Laura Palmer",
    review: "The product arrived damaged. Waiting for replacement.",
    date: "2024-12-25T08:30:00Z",
    productName: "4K Webcam",
    sellerName: "ClearView Cameras",
    status: "Flagged",
  },
  {
    id: "review-13",
    image: "/placeholder.svg?text=13",
    buyerName: "Michael Scott",
    review: "Works perfectly for my needs. Happy customer!",
    date: "2025-01-01T00:01:00Z",
    productName: "Ergonomic Office Chair",
    sellerName: "ComfortSeating Co.",
    status: "Approved",
  },
  {
    id: "review-14",
    image: "/placeholder.svg?text=14",
    buyerName: "Nancy Wheeler",
    review: "Good product but took a while to figure out how to use it.",
    date: "2025-02-14T12:00:00Z",
    productName: "Smart Thermostat",
    sellerName: "EcoTemp Systems",
    status: "Pending",
  },
  {
    id: "review-15",
    image: "/placeholder.svg?text=15",
    buyerName: "Oscar Martinez",
    review: "Excellent build quality. Feels very premium.",
    date: "2025-03-17T17:30:00Z",
    productName: "Wireless Charging Pad",
    sellerName: "PowerUp Electronics",
    status: "Approved",
  },
]

interface ReviewsTableProps {
  initialReviews?: Review[]
}

export function ReviewsTable({ initialReviews = sampleReviews }: ReviewsTableProps) {
  const [reviews] = useState<Review[]>(initialReviews)
  const [status, setStatus] = useState<string>("all")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter reviews based on status and date
  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      // Status filter
      if (status !== "all" && review.status !== status) return false

      // Date filter
      if (selectedDate) {
        const reviewDate = parseISO(review.date)
        const monthStart = startOfMonth(selectedDate)
        const monthEnd = endOfMonth(selectedDate)

        if (!isWithinInterval(reviewDate, { start: monthStart, end: monthEnd })) {
          return false
        }
      }

      return true
    })
  }, [reviews, status, selectedDate])

  // Calculate pagination
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedReviews = filteredReviews.slice(startIndex, startIndex + itemsPerPage)

  // Reset filters and pagination
  const handleReset = () => {
    setStatus("all")
    setSelectedDate(null)
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
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl font-semibold">Reviews Table</h2>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filter By</span>
            </div>

            <YearMonthPicker
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date)
                setCurrentPage(1)
              }}
              onClear={() => {
                setSelectedDate(null)
                setCurrentPage(1)
              }}
            />

            <Select
              value={status}
              onValueChange={(value) => {
                setStatus(value)
                setCurrentPage(1)
              }}
            >
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
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Reviews by Buyer</TableHead>
              <TableHead>Review Date</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Seller Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedReviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell>
                  <img
                    src="/image.png"
                    alt={`Product ${review.productName}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{review.buyerName}</p>
                    <p className="text-sm text-gray-500">{review.review}</p>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-500">{format(parseISO(review.date), "MMM d, yyyy")}</TableCell>
                <TableCell>{review.productName}</TableCell>
                <TableCell>{review.sellerName}</TableCell>
                <TableCell>
                  <Badge className={statusColors[review.status]}>{review.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="w-4 h-4" />
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
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevious}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          <div className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  )
}

