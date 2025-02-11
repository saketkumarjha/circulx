import { getCurrentUser } from '../../actions/auth'
import { redirect } from 'next/navigation'

export default async function CustomerDashboard() {
  const user = await getCurrentUser()

  if (!user || user.type !== 'customer') {
    redirect('/')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Customer Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">My Orders</h2>
          <p className="text-gray-600">View your order history and status</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Profile</h2>
          <p className="text-gray-600">Update your account information</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Wishlist</h2>
          <p className="text-gray-600">View and manage your saved items</p>
        </div>
      </div>
    </div>
  )
}

