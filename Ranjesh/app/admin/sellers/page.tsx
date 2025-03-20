// Main page component that serves as the container for the seller list
// This is a server component that renders the client-side SellerList component
import { SellerList } from "@/components/admin/sellers/seller-list"

export default function SellersPage() {
  return (
    <div className="container py-6">
      <SellerList />
    </div>
  )
}

