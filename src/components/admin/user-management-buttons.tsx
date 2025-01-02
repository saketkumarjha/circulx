'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface UserManagementButtonsProps {
  userId: string
  currentType: 'admin' | 'seller' | 'customer'
  onUpdateUserType: (userId: string, newType: 'admin' | 'seller' | 'customer') => void
}

export function UserManagementButtons({ userId, currentType, onUpdateUserType }: UserManagementButtonsProps) {
  const buttonStyles = "text-xs px-3 py-1 h-8 text-white transition-colors"
  
  return (
    <div className="flex gap-2 flex-shrink-0">
      <Button
        onClick={() => onUpdateUserType(userId, 'admin')}
        disabled={currentType === 'admin'}
        className={cn(
          buttonStyles,
          currentType === 'admin' 
            ? 'bg-emerald-200 text-emerald-800 hover:bg-emerald-300' 
            : 'bg-emerald-600 hover:bg-emerald-700'
        )}
      >
        Admin
      </Button>
      <Button
        onClick={() => onUpdateUserType(userId, 'seller')}
        disabled={currentType === 'seller'}
        className={cn(
          buttonStyles,
          currentType === 'seller'
            ? 'bg-emerald-200 text-emerald-800 hover:bg-emerald-300'
            : 'bg-emerald-600 hover:bg-emerald-700'
        )}
      >
        Seller
      </Button>
      <Button
        onClick={() => onUpdateUserType(userId, 'customer')}
        disabled={currentType === 'customer'}
        className={cn(
          buttonStyles,
          currentType === 'customer'
            ? 'bg-emerald-200 text-emerald-800 hover:bg-emerald-300'
            : 'bg-emerald-600 hover:bg-emerald-700'
        )}
      >
        Customer
      </Button>
    </div>
  )
}

