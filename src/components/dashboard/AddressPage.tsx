import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function AddressPage() {
  return (
    <Card className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Addresses</h1>
        <Button className="bg-green-700 hover:bg-orange-500">
          <Plus className="w-4 h-4 mr-2" />
          Add New Address
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Home</h3>
          <p className="text-gray-600 text-sm mb-4">
            123 Main Street, Apartment 4B
            <br />
            New York, NY 10001
            <br />
            United States
          </p>
          <div className="flex gap-2">
            <Button variant="outline" className="hover:bg-orange-500 hover:text-white">
              Edit
            </Button>
            <Button variant="outline" className="hover:bg-orange-500 hover:text-white">
              Delete
            </Button>
          </div>
        </Card>
      </div>
    </Card>
  )
}

