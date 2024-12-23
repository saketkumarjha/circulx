import { Package2, ClipboardList, BarChart3, ShoppingCart, TrendingUp } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default async function DashboardContent() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline">Download Report</Button>
          <Button>Add Product</Button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package2 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-green-500">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-green-500">+23% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,345</div>
            <p className="text-xs text-green-500">+18% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-semibold">Product Management</CardTitle>
            <Package2 className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Manage your product inventory, add new products, and update existing ones</p>
            <div className="mt-4">
              <Button variant="outline" className="w-full">View Products</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-semibold">Orders</CardTitle>
            <ClipboardList className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Track and manage your orders, update order status, and handle shipping</p>
            <div className="mt-4">
              <Button variant="outline" className="w-full">View Orders</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-semibold">Analytics</CardTitle>
            <BarChart3 className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">View detailed analytics about your sales, customers, and product performance</p>
            <div className="mt-4">
              <Button variant="outline" className="w-full">View Analytics</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <Card>
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Order ID</th>
                  <th className="text-left p-4">Customer</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: '1234', customer: 'John Doe', status: 'Shipped', total: '$120.50' },
                  { id: '1235', customer: 'Jane Smith', status: 'Processing', total: '$75.20' },
                  { id: '1236', customer: 'Bob Johnson', status: 'Delivered', total: '$246.00' },
                ].map((order) => (
                  <tr key={order.id} className="border-b last:border-b-0">
                    <td className="p-4">{order.id}</td>
                    <td className="p-4">{order.customer}</td>
                    <td className="p-4">{order.status}</td>
                    <td className="p-4">{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

