import { getCurrentUser, updateUserType } from '@/actions/auth'
import { redirect } from 'next/navigation'
import { User } from '@/models/user'
import { connectDB } from '@/lib/db'
import { UserTable } from '@/components/admin/user-table'

// Helper function to serialize user data
function serializeUser(user: any, index: number) {
  return {
    id: user._id.toString(),
    sno: index + 1,
    name: user.name,
    email: user.email,
    role: user.type,
  }
}

export default async function UserManagementPage() {
  try {
    await connectDB()
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
      return redirect('/login')
    }

    if (currentUser.type !== 'admin') {
      return redirect('/')
    }

    const users = await User.find({}).select('-password')
    const serializedUsers = users.map(serializeUser)

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <UserTable users={serializedUsers} updateUserType={updateUserType} />
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error in UserManagementPage:', error)
    
  }
}

