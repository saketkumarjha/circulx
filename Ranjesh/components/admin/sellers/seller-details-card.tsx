import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { Seller } from "@/types/seller"

interface SellerDetailsCardProps {
  seller: Seller | null
  isOpen: boolean
  onClose: () => void
}

export function SellerDetailsCard({ seller, isOpen, onClose }: SellerDetailsCardProps) {
  if (!seller) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Seller Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">ID:</span>
            <span>{seller.id}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Name:</span>
            <span>{seller.name}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Email:</span>
            <span>{seller.email}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Address:</span>
            <span>{seller.address}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Total Sales:</span>
            <span>{seller.totalSales}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <span className="font-semibold">Status:</span>
            <span>{seller.status}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


