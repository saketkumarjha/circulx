'use client'

import { useRouter } from 'next/navigation'
import { Checkbox } from "@/components/ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface User {
  id: string
  sno: number
  name: string
  email: string
  role: string
}

interface UserTableProps {
  users: User[]
  updateUserType: (userId: string, newType: 'admin' | 'seller' | 'customer') => Promise<any>
}

export function UserTable({ users, updateUserType }: UserTableProps) {
  const router = useRouter()

  const handleRoleChange = async (userId: string, newRole: 'admin' | 'seller' | 'customer') => {
    try {
      await updateUserType(userId, newRole)
      router.refresh()
    } catch (error) {
      console.error('Error updating user role:', error)
    }
  }

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead className="w-[80px] font-medium">S.No</TableHead>
            <TableHead className="font-medium">Name</TableHead>
            <TableHead className="font-medium">Current Role</TableHead>
            <TableHead className="w-[100px] text-center font-medium">Admin</TableHead>
            <TableHead className="w-[100px] text-center font-medium">Seller</TableHead>
            <TableHead className="w-[100px] text-center font-medium">Customer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.sno}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </div>
              </TableCell>
              <TableCell className="capitalize">{user.role}</TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <Checkbox
                    checked={user.role === 'admin'}
                    onCheckedChange={(checked) => {
                      if (checked) handleRoleChange(user.id, 'admin')
                    }}
                    className="border-emerald-600 data-[state=checked]:bg-emerald-600"
                  />
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <Checkbox
                    checked={user.role === 'seller'}
                    onCheckedChange={(checked) => {
                      if (checked) handleRoleChange(user.id, 'seller')
                    }}
                    className="border-emerald-600 data-[state=checked]:bg-emerald-600"
                  />
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <Checkbox
                    checked={user.role === 'customer'}
                    onCheckedChange={(checked) => {
                      if (checked) handleRoleChange(user.id, 'customer')
                    }}
                    className="border-emerald-600 data-[state=checked]:bg-emerald-600"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

