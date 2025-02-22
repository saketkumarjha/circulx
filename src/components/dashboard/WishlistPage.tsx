import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

export default function WishlistPage() {
  return (
    <Card className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4">
          <div className="flex gap-4">
            <div className="relative w-20 h-20">
              <Image src="/placeholder.svg" alt="Product" fill className="rounded-lg object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">Product Name</h3>
              <p className="text-gray-600 mb-2">$99.99</p>
              <div className="flex gap-2">
                <Button size="sm" className="bg-green-700 hover:bg-orange-500">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button size="sm" variant="outline" className="hover:bg-orange-500 hover:text-white">
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Card>
  )
}

