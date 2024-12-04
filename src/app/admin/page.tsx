'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, updateUserType } from '../actions/auth'
import { Button } from '@/components/ui/button'

interface User {
  id: string;
  name: string;
  email: string;
  type: 'admin' | 'seller' | 'customer';
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchUsers() {
      try {
        const currentUser = await getCurrentUser()
        if (!currentUser || currentUser.type !== 'admin') {
          router.push('/')
          return
        }

        const response = await fetch('/api/users')
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }
        const data: User[] = await response.json()
        setUsers(data)
      } catch (err) {
        setError('Error fetching users. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [router])

  async function handleUpdateUserType(userId: string, newType: 'admin' | 'seller' | 'customer') {
    try {
      const result = await updateUserType(userId, newType)
      if ('error' in result) {
        throw new Error(result.error)
      }
      setUsers(users.map(user => 
        user.id === userId ? { ...user, type: newType } : user
      ))
    } catch (err) {
      setError('Failed to update user type. Please try again.')
      console.error(err)
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">User Management</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="mb-4 p-2 border rounded">
                <p>{user.name} - {user.email} - {user.type}</p>
                <div className="mt-2 space-x-2">
                  <Button
                    onClick={() => handleUpdateUserType(user.id, 'admin')}
                    disabled={user.type === 'admin'}
                    className="text-xs"
                  >
                    Make Admin
                  </Button>
                  <Button
                    onClick={() => handleUpdateUserType(user.id, 'seller')}
                    disabled={user.type === 'seller'}
                    className="text-xs"
                  >
                    Make Seller
                  </Button>
                  <Button
                    onClick={() => handleUpdateUserType(user.id, 'customer')}
                    disabled={user.type === 'customer'}
                    className="text-xs"
                  >
                    Make Customer
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Analytics</h2>
          <p className="text-gray-600">View site analytics and statistics</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Settings</h2>
          <p className="text-gray-600">Manage site-wide settings</p>
        </div>
      </div>
    </div>
  )
}

