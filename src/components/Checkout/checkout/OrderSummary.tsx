import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ProductItem from "../product/ProductItem";
import PriceRow from "../product/PriceRow";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import img from "../img/motor.png";

interface OrderSummaryProps {
  onPlaceOrder: () => void;
  onTotalAmountChange: (amount: number) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ onPlaceOrder, onTotalAmountChange }) => {

  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Calculate totals
  const calculateSubTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateDiscount = () => {
    return cartItems.reduce((total, item) => total + (item.discount || 0) * item.quantity, 0);
  };

  const calculateTax = () => {
    const subTotal = calculateSubTotal();
    return subTotal * 0.05; // Assuming 5% tax
  };

  const calculateTotal = () => {
    const subTotal = calculateSubTotal();
    const discount = calculateDiscount();
    const tax = calculateTax();
    return subTotal - discount + tax;
  };

  React.useEffect(() => {
    const totalAmount = calculateTotal();
    onTotalAmountChange(totalAmount); // Pass the total amount to the parent
  }, [cartItems]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg font-medium mb-4">Order Summary</h2>

      <div className="mb-4">
      {cartItems.map((item) => (
          <ProductItem
            key={item.id}
            image={item.image_link}
            title={item.title}
            quantity={item.quantity}
            price={item.price}
          />
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <PriceRow label="Sub-total" value={calculateSubTotal()} />
        <PriceRow label="Shipping" value={0} valueText="Free" />
        <PriceRow label="Discount" value={-calculateDiscount()} />
        <PriceRow label="Tax" value={calculateTax()} />

        <div className="border-t border-gray-200 mt-3 pt-3">
          <PriceRow label="Total" value={calculateTotal()} isTotal={true} currency="USD" />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-medium mb-2">Review & Place Order</h3>
        <p className="text-sm text-gray-600 mb-4">
          Please review the order details and payment details before proceeding
          to confirm your order
        </p>

        <div className="mb-4">
          <Checkbox
            label={
              <span className="text-sm">
                I agree to the{" "}
                <a href="#" className="text-blue-500">
                  Terms & conditions
                </a>
                ,{" "}
                <a href="#" className="text-blue-500">
                  Privacy Policy
                </a>
              </span>
            }
          />
        </div>

        <div className="mb-6">
          <Checkbox
            label={
              <span className="text-sm">Sign me up to the email list</span>
            }
          />
        </div>

        <Button
          onClick={onPlaceOrder}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        >
          PLACE ORDER →
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
