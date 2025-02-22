import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function OrdersPage() {
  return (
    <Card className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="font-semibold">Order #12345</p>
              <p className="text-sm text-gray-600">Placed on March 15, 2024</p>
            </div>
            <Button variant="outline" className="hover:bg-orange-500 hover:text-white">
              View Details
            </Button>
          </div>
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-gray-600">
              <p>
                Status: <span className="text-green-700 font-medium">Delivered</span>
              </p>
              <p>
                Total: <span className="font-medium">$99.99</span>
              </p>
            </div>
            <Button className="bg-green-700 hover:bg-orange-500">Buy Again</Button>
          </div>
        </Card>
      </div>
    </Card>
  )
}

