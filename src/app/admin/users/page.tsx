import { getCurrentUser, updateUserType } from '@/app/actions/auth'
import { redirect } from 'next/navigation'
import { User } from '@/models/user'
import { connectDB } from '@/lib/db'
import { UserManagementButtons } from '@/components/admin/user-management-buttons'

// Helper function to serialize user data
function serializeUser(user: any) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    type: user.type,
  }
}

export default async function UserManagementPage() {
  try {
    const currentUser = await getCurrentUser()
    
    if (!currentUser) {
      console.log('User not authenticated, redirecting to login')
      redirect('/login')
    }

    if (currentUser.type !== 'admin') {
      console.log('User is not an admin, redirecting to home')
      redirect('/')
    }

    await connectDB()
    const users = await User.find({}).select('-password')

    // Serialize users
    const serializedUsers = users.map(serializeUser)

    async function handleUpdateUserType(userId: string, newType: 'admin' | 'seller' | 'customer') {
      'use server'
      const result = await updateUserType(userId, newType)
      if (result.error) {
        console.error(result.error)
      }
      redirect('/admin/users')
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>
        <div className="bg-white rounded-lg shadow">
          <ul className="divide-y divide-gray-200">
            {serializedUsers.map((user) => (
              <li 
                key={user.id} 
                className="p-4 flex items-center justify-between gap-4 transition-all duration-200 hover:scale-[1.02] hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <p className="truncate">
                    <span className="font-medium">{user.name}</span>
                    {' - '}
                    <span className="text-gray-600">{user.email}</span>
                    {' - '}
                    <span className="text-gray-500">{user.type}</span>
                  </p>
                </div>
                <UserManagementButtons
                  userId={user.id}
                  currentType={user.type}
                  onUpdateUserType={handleUpdateUserType}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error in UserManagementPage:', error)
    redirect('/admin/users')
  }
}

