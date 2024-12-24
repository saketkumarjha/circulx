import { Package2, ClipboardList, Wallet, TrendingUp } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { SalesChart } from '@/components/seller/sales-chart'

// Dashboard content component that displays the main seller dashboard interface
export default function DashboardContent() {
  // Sample orders data matching the image
  const orders = [
    { id: '1234', product: 'Scrap Paper', customer: 'ABC Industries', status: 'Completed', amount: '₹25,000' },
    { id: '1235', product: 'Glass Sheets', customer: 'XYZ Pvt Ltd', status: 'Completed', amount: '₹45,000' },
    { id: '1236', product: 'Aluminum Scrap', customer: 'GHI Enterprises', status: 'Pending', amount: '₹35,000' },
    { id: '1237', product: 'Scrap Paper', customer: 'A.P Industries', status: 'Completed', amount: '₹22,000' },
    { id: '1238', product: 'Aluminum Scrap', customer: 'Amiya Industries', status: 'Pending', amount: '₹55,000' },
    { id: '1239', product: 'Scrap Paper', customer: 'E.S Enterprises', status: 'Completed', amount: '₹42,000' },
    { id: '1240', product: 'Aluminum Scrap', customer: 'Style Enterprises', status: 'Completed', amount: '₹32,000' },
  ]

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold mb-1">Welcome, Ranjesh Roy</h1>
        <p className="text-sm text-gray-600">Here's your performance summary for this Month</p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Products Listed */}
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Package2 className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Products Listed</p>
              <p className="text-xl font-semibold">120</p>
            </div>
          </div>
        </Card>

        {/* Orders Pending */}
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <ClipboardList className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Orders Pending</p>
              <p className="text-xl font-semibold">15</p>
            </div>
          </div>
        </Card>

        {/* Inventory Value */}
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <Wallet className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Inventory Value</p>
              <p className="text-xl font-semibold">₹2,50,000</p>
            </div>
          </div>
        </Card>

        {/* Monthly Sales */}
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Monthly Sales</p>
              <p className="text-xl font-semibold">₹1,50,000</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Orders Section */}
        <div className="bg-white rounded-lg border">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="font-medium">Recent Orders</h2>
            <div className="flex items-center gap-4 text-sm">
              <button className="text-gray-600 hover:text-gray-900">Share</button>
              <button className="text-gray-600 hover:text-gray-900">Filter</button>
              <button className="text-gray-600 hover:text-gray-900">Export</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left px-4 py-2 text-xs font-medium text-gray-600">Order #</th>
                  <th className="text-left px-4 py-2 text-xs font-medium text-gray-600">Product</th>
                  <th className="text-left px-4 py-2 text-xs font-medium text-gray-600">Customer</th>
                  <th className="text-left px-4 py-2 text-xs font-medium text-gray-600">Status</th>
                  <th className="text-left px-4 py-2 text-xs font-medium text-gray-600">Amount</th>
                  <th className="text-left px-4 py-2 text-xs font-medium text-gray-600">View</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b last:border-b-0">
                    <td className="px-4 py-3 text-sm">{order.id}</td>
                    <td className="px-4 py-3 text-sm">{order.product}</td>
                    <td className="px-4 py-3 text-sm">{order.customer}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        order.status === 'Completed' 
                          ? 'bg-green-50 text-green-600' 
                          : 'bg-yellow-50 text-yellow-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{order.amount}</td>
                    <td className="px-4 py-3">
                      <button className="text-sm text-gray-600 hover:text-gray-900">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sales Trends Section */}
        <Card className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Sales Trend</h2>
            <select className="text-sm border rounded px-2 py-1">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
          <SalesChart />
          <div className="mt-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Revenue this month:</span>
              <span className="text-sm font-semibold">₹1,50,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Top Product:</span>
              <span className="text-sm font-semibold">Aluminum Scrap</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Top Product Revenue:</span>
              <span className="text-sm font-semibold">₹50,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Least Revenue Product:</span>
              <span className="text-sm font-semibold">Glass Sheets</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Least Revenue:</span>
              <span className="text-sm font-semibold">₹10,000</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

