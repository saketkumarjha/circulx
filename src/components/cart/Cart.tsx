'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { removeItem, clearCart } from '@/store/slices/cartSlice'
import { Button } from '@/components/ui/button'

export default function Cart() {
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch()

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p>Price: ₹{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <Button variant="destructive" onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
          <Button variant="outline" onClick={handleClearCart}>
            Clear Cart
          </Button>
        </div>
      )}
    </div>
  )
}
