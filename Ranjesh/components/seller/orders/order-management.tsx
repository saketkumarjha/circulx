"use client"

import * as React from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'

type Order = {
  id: string
  orderDate: string
  buyerName: string
  status: "Delivered" | "Pending"
  amount: number
  payment: "Paid" | "Pending"
}

const initialData: Order[] = [
  { id: "1234", orderDate: "10 Dec 2024", buyerName: "ABC Industries", status: "Delivered", amount: 25000, payment: "Paid" },
  { id: "1235", orderDate: "09 Dec 2024", buyerName: "XYZ Pvt Ltd", status: "Delivered", amount: 45000, payment: "Paid" },
  { id: "1236", orderDate: "04 Dec 2024", buyerName: "DEF Enterprises", status: "Pending", amount: 30000, payment: "Pending" },
  { id: "1237", orderDate: "03 Dec 2024", buyerName: "A.D Industries", status: "Delivered", amount: 25000, payment: "Paid" },
  { id: "1238", orderDate: "06 Dec 2024", buyerName: "Aditya Industries", status: "Pending", amount: 30000, payment: "Pending" },
  { id: "1239", orderDate: "18 Dec 2024", buyerName: "E.S Enterprises", status: "Delivered", amount: 45000, payment: "Paid" },
  { id: "1240", orderDate: "28 Dec 2024", buyerName: "Dilip Enterprises", status: "Delivered", amount: 25000, payment: "Paid" },
  { id: "1241", orderDate: "29 Dec 2024", buyerName: "GHI Corp", status: "Pending", amount: 35000, payment: "Pending" },
  { id: "1242", orderDate: "30 Dec 2024", buyerName: "JKL Limited", status: "Delivered", amount: 28000, payment: "Paid" },
  { id: "1243", orderDate: "31 Dec 2024", buyerName: "MNO Systems", status: "Delivered", amount: 42000, payment: "Paid" },
  { id: "1244", orderDate: "01 Jan 2025", buyerName: "PQR Solutions", status: "Pending", amount: 33000, payment: "Pending" },
  { id: "1245", orderDate: "02 Jan 2025", buyerName: "STU Technologies", status: "Delivered", amount: 38000, payment: "Paid" },
  { id: "1246", orderDate: "03 Jan 2025", buyerName: "VWX Industries", status: "Pending", amount: 27000, payment: "Pending" },
  { id: "1247", orderDate: "04 Jan 2025", buyerName: "YZA Corporation", status: "Delivered", amount: 51000, payment: "Paid" },
  { id: "1248", orderDate: "05 Jan 2025", buyerName: "BCD Enterprises", status: "Delivered", amount: 44000, payment: "Paid" },
]

export function OrderManagement() {
  const [data, setData] = React.useState(initialData)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(null)
  const [selectedPayment, setSelectedPayment] = React.useState<string | null>(null)

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Order ID
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "orderDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Order Date
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "buyerName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Buyer Name
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Select
            value={status}
            onValueChange={(value) => {
              const newData = [...data]
              const index = newData.findIndex((item) => item.id === row.getValue("id"))
              newData[index] = { ...newData[index], status: value as "Delivered" | "Pending" }
              setData(newData)
              console.log(`Updating status for order ${row.getValue("id")} to ${value}`)
            }}
          >
            <SelectTrigger className={`w-[110px] h-8 ${
              status === "Delivered" 
                ? "bg-green-100 text-green-800 border-green-200" 
                : "bg-yellow-100 text-yellow-800 border-yellow-200"
            }`}>
              <SelectValue>{status}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        )
      },
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"))
        const formatted = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(amount)
        return formatted
      },
    },
    {
      accessorKey: "payment",
      header: "Payment",
      cell: ({ row }) => {
        const payment = row.getValue("payment") as string
        return (
          <Select
            value={payment}
            onValueChange={(value) => {
              const newData = [...data]
              const index = newData.findIndex((item) => item.id === row.getValue("id"))
              newData[index] = { ...newData[index], payment: value as "Paid" | "Pending" }
              setData(newData)
              console.log(`Updating payment for order ${row.getValue("id")} to ${value}`)
            }}
          >
            <SelectTrigger className={`w-[110px] h-8 ${
              payment === "Paid" 
                ? "bg-green-100 text-green-800 border-green-200" 
                : "bg-gray-100 text-gray-800 border-gray-200"
            }`}>
              <SelectValue>{payment}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <Button variant="ghost" className="h-8 w-8 p-0">
            View Details
          </Button>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  React.useEffect(() => {
    if (selectedStatus && selectedStatus !== "all") {
      table.getColumn("status")?.setFilterValue(selectedStatus)
    } else {
      table.getColumn("status")?.setFilterValue(null)
    }
    if (selectedPayment && selectedPayment !== "all") {
      table.getColumn("payment")?.setFilterValue(selectedPayment)
    } else {
      table.getColumn("payment")?.setFilterValue(null)
    }
  }, [selectedStatus, selectedPayment, table])

  const currentPage = table.getState().pagination.pageIndex + 1
  const totalPages = table.getPageCount()
  const startItem = (currentPage - 1) * table.getState().pagination.pageSize + 1
  const endItem = Math.min(currentPage * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)
  const totalItems = table.getFilteredRowModel().rows.length

  return (
    <div className="w-full px-2 py-4 sm:px-4 md:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div className="relative w-full sm:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            placeholder="Search by Buyer Name/Company Name"
            value={(table.getColumn("buyerName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("buyerName")?.setFilterValue(event.target.value)
            }
            className="pl-10 pr-4 w-full"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select
            value={selectedStatus || "all"}
            onValueChange={(value) => setSelectedStatus(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={selectedPayment || "all"}
            onValueChange={(value) => setSelectedPayment(value === "all" ? null : value)}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Filter Payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          {(selectedStatus || selectedPayment) && (
            <Button
              variant="outline"
              onClick={() => {
                setSelectedStatus("all")
                setSelectedPayment("all")
                table.getColumn("status")?.setFilterValue(null)
                table.getColumn("payment")?.setFilterValue(null)
              }}
              className="px-3 py-2 text-sm"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-2 py-3 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
        <div className="text-sm text-gray-700">
          Showing {startItem}-{endItem} of {totalItems}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

