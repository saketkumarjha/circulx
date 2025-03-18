import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function CartPage() {
  return (
    <Card className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>
      <div className="space-y-4">
        <Card className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative w-20 h-20">
              <Image src="/placeholder.svg" alt="Product" fill className="rounded-lg object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Product Name</h3>
              <p className="text-gray-600">$99.99</p>
            </div>
            <Button variant="outline" className="hover:bg-orange-500 hover:text-white">
              Remove
            </Button>
          </div>
        </Card>
        <div className="flex justify-between items-center pt-4 border-t">
          <div>
            <p className="text-gray-600">Total</p>
            <p className="text-2xl font-bold">$99.99</p>
          </div>
          <Button className="bg-green-700 hover:bg-orange-500">Proceed to Checkout</Button>
        </div>
      </div>
    </Card>
  )
}

