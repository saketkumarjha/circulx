import { Package2, ClipboardList, CreditCard, TrendingUp } from 'lucide-react'
import { PerformanceCard } from '@/components/performance-card'
import { SalesChart } from '@/components/sales-chart'

// Main dashboard page component
export default function SellerDashboard() {
  // Sample orders data
  const orders = [
    { id: '1234', product: 'Scrap Paper', customer: 'ABC Industries', status: 'Completed', amount: '₹25,000' },
    { id: '1235', product: 'Glass Sheets', customer: 'XYZ Pvt Ltd', status: 'Completed', amount: '₹45,000' },
    { id: '1236', product: 'Aluminum Scrap', customer: 'GHI Enterprises', status: 'Pending', amount: '₹35,000' },
    { id: '1237', product: 'Scrap Paper', customer: 'JKL Industries', status: 'Completed', amount: '₹22,000' },
    { id: '1238', product: 'Aluminum Scrap', customer: 'MNO Industries', status: 'Pending', amount: '₹55,000' },
    { id: '1239', product: 'Scrap Paper', customer: 'EFG Enterprises', status: 'Completed', amount: '₹42,000' },
    { id: '1240', product: 'Aluminum Scrap', customer: 'PQR Enterprises', status: 'Completed', amount: '₹32,000' },
  ]

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Welcome, Olivia Rhye</h1>
        <p className="text-gray-600">Here's your performance summary for this Month</p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <PerformanceCard
          icon={<Package2 className="h-6 w-6" />}
          label="Products Listed"
          value="120"
        />
        <PerformanceCard
          icon={<ClipboardList className="h-6 w-6" />}
          label="Orders Pending"
          value="15"
        />
        <PerformanceCard
          icon={<CreditCard className="h-6 w-6" />}
          label="Inventory Value"
          value="2,50,000"
          prefix="₹"
        />
        <PerformanceCard
          icon={<TrendingUp className="h-6 w-6" />}
          label="Monthly Sales"
          value="1,50,000"
          prefix="₹"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Orders Section */}
        <div className="bg-white rounded-lg border">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Orders</h2>
              <div className="flex gap-2">
                <button className="text-sm text-gray-600 hover:text-gray-900">Share</button>
                <button className="text-sm text-gray-600 hover:text-gray-900">Filter</button>
                <button className="text-sm text-gray-600 hover:text-gray-900">Export</button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs uppercase text-gray-600">
                <tr>
                  <th className="px-4 py-3 text-left">Order #</th>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-left">View</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.map((order) => (
                  <tr key={order.id} className="text-sm">
                    <td className="px-4 py-3">{order.id}</td>
                    <td className="px-4 py-3">{order.product}</td>
                    <td className="px-4 py-3">{order.customer}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        order.status === 'Completed' 
                          ? 'bg-green-50 text-green-600' 
                          : 'bg-yellow-50 text-yellow-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{order.amount}</td>
                    <td className="px-4 py-3">
                      <button className="text-gray-600 hover:text-gray-900">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sales Chart Section */}
        <SalesChart />
      </div>
    </div>
  )
}

