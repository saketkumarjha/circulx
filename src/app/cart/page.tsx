import Cart from "@/components/cart/Cart"

export default function CartPage() {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>
      <Cart />
    </div>
  )
}
