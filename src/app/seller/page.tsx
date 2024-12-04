import { getCurrentUser } from '../actions/auth'
import { redirect } from 'next/navigation'

export default async function SellerDashboard() {
  const user = await getCurrentUser()
  
  if (!user || user.type !== 'seller') {
    redirect('/')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Seller Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Product Management</h2>
          <p className="text-gray-600">Manage your products</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Orders</h2>
          <p className="text-gray-600">View and manage customer orders</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Analytics</h2>
          <p className="text-gray-600">View your sales analytics</p>
        </div>
      </div>
    </div>
  )
}

