"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight } from "lucide-react"

const ordersData = [
  {
    id: "00001",
    buyer: "Christine Brooks",
    seller: "ABC Metals",
    date: "04 Sep 2019",
    total: "$12,000",
    status: "Delivered",
    payment: "Paid",
  },
  {
    id: "00002",
    buyer: "John Smith",
    seller: "XYZ Corp",
    date: "05 Sep 2019",
    total: "$8,500",
    status: "Pending",
    payment: "Unpaid",
  },
  {
    id: "00003",
    buyer: "Sarah Johnson",
    seller: "Metal Works",
    date: "06 Sep 2019",
    total: "$15,000",
    status: "Shipped",
    payment: "Paid",
  },
  {
    id: "00004",
    buyer: "Michael Brown",
    seller: "Steel Inc",
    date: "07 Sep 2019",
    total: "$9,200",
    status: "Delivered",
    payment: "Paid",
  },
  {
    id: "00005",
    buyer: "Emily Davis",
    seller: "Iron Co",
    date: "08 Sep 2019",
    total: "$11,500",
    status: "Shipped",
    payment: "Paid",
  },
  {
    id: "00006",
    buyer: "David Wilson",
    seller: "Metal Corp",
    date: "09 Sep 2019",
    total: "$7,800",
    status: "Pending",
    payment: "Unpaid",
  },
  {
    id: "00007",
    buyer: "Lisa Anderson",
    seller: "Steel Works",
    date: "10 Sep 2019",
    total: "$13,200",
    status: "Delivered",
    payment: "Paid",
  },
  {
    id: "00008",
    buyer: "Robert Taylor",
    seller: "Iron Industries",
    date: "11 Sep 2019",
    total: "$10,500",
    status: "Shipped",
    payment: "Paid",
  },
]

export default function OrdersTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(ordersData.length / itemsPerPage)

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return ordersData.slice(startIndex, endIndex)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>List of Orders</CardTitle>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select defaultValue="date">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="status">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="w-full sm:w-auto">
            Reset Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>BUYER NAME</TableHead>
                <TableHead>SELLER NAME</TableHead>
                <TableHead>ORDER DATE</TableHead>
                <TableHead>TOTAL ORDER</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>PAYMENT STATUS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getCurrentPageData().map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.buyer}</TableCell>
                  <TableCell>{order.seller}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.payment === "Paid" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.payment}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

