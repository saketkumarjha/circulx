import { AddSellerForm } from "@/components/admin/sellers/add-seller-form"

export default function AddSellerPage() {
  return (
    <div className="container py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Add New Seller</h1>
        <AddSellerForm />
      </div>
    </div>
  )
}

