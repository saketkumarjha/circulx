"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CheckoutLayout from "../checkout/CheckoutLayout";
import BillingForm, { BillingDetails } from "../checkout/BillingForm";
import OrderSummary from "../checkout/OrderSummary";
import PaymentOptions from "../checkout/PaymentOptions";
import PaymentForm from "../checkout/PaymentForm";
import AdditionalInfo from "../checkout/AdditionalInfo";
import Card from "../ui/Card";
import Button from "../ui/Button";
import type { PaymentInformation } from "../types/checkout";
import img from "../img/motor.png";
import Script from "next/script";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface CardDetails {
  nameOnCard: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}


const CheckoutPage: React.FC = () => {
  const router = useRouter();
  const [billingDetails, setBillingDetails] = useState<BillingDetails | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentInformation["method"]>("card");
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvc: ""
  });

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const handleBillingDetailsSubmit = async (details: BillingDetails) => {
    setBillingDetails(details);
  }

    const handlePaymentMethodChange = (method: PaymentInformation["method"]) => {
      setPaymentMethod(method);
    };
  
    const handleCardDetailsChange = (field: keyof CardDetails, value: string) => {
      setCardDetails((prev) => ({ ...prev, [field]: value }));
    };
  
    const handleAdditionalInfoChange = (info: string) => {
      setAdditionalInfo(info);
    };

    const handleTotalAmountChange = (amount: number) => {
      setTotalAmount(amount);
    }
  
    const handlePlaceOrder = async () => {

      if (!billingDetails) {
        alert("Please fill out the billing details.");
        return;
      }
      console.log(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
      try {
        // Step 1: Create a Razorpay order
        const paymentResponse = await fetch("/api/payments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: totalAmount, currency: "INR" }),
        });
    
        const { razorpayOrderId } = await paymentResponse.json();
        console.log(razorpayOrderId);
        // Step 2: Open Razorpay payment modal
        const options: RazorpayOptions = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
          amount: totalAmount,
          currency: "INR",
          name: "Circulx",
          description: "Order Payment",
          order_id: razorpayOrderId,
          handler: async (response: any) => {
            // Step 3: Verify payment
            const verifyResponse = await fetch("/api/payments", {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            });
    
            const verifyResult = await verifyResponse.json();
    
            if (verifyResult.success) {
              // Step 4: Create the order
              const orderResponse = await fetch("/api/orders", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  billingDetails,
                  paymentMethod,
                  additionalInfo,
                  amount: totalAmount, 
                  razorpayOrderId,
                  cartItems
                }),
              });
    
              if (!orderResponse.ok) {
                throw new Error("Failed to create order");
              }
    
              alert("Order placed successfully!");
              router.push("/order-confirmation");
            } else {
              alert("Payment verification failed. Please try again.");
            }
          },
          prefill: {
            name: billingDetails.firstName + " " + billingDetails.lastName,
            email: billingDetails.email,
            contact: billingDetails.phoneNumber,
          },
          theme: {
            color: "#F37254",
          },
        };
    
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        console.error("Error placing order:", error);
        alert("Error placing order. Please try again.");
      }
    };

  return (
    <CheckoutLayout>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        {/* Left column: Billing, Payment, and Additional Info */}
        <div className="lg:col-span-2 space-y-6">
          <BillingForm onBillingDetailsSubmit={handleBillingDetailsSubmit} />

          <Card className="p-6">
            <PaymentOptions onMethodSelect={handlePaymentMethodChange} />
            {paymentMethod === "card" && (
              <PaymentForm
                cardDetails={cardDetails}
                onCardDetailsChange={handleCardDetailsChange}
              />
            )}
          </Card>

          <AdditionalInfo onInfoChange={handleAdditionalInfoChange} />
        </div>

        {/* Right column: Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary 
            onPlaceOrder={handlePlaceOrder}
            onTotalAmountChange={handleTotalAmountChange} />

          {/* Promotional sections */}
          <div className="mt-3 space-y-3">
            {/* Xiaomi Earbuds Promo */}
            <div className="bg-yellow-100 rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 mb-2">
                    <Image
                      src={img}
                      alt="Xiaomi True Wireless Earbuds"
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-1">
                    Xiaomi True Wireless Earbuds
                  </h3>
                  <p className="text-center text-sm mb-4">
                    Escape the noise. It's time to hear the magic with Xiaomi
                    Earbuds.
                  </p>
                  <div className="text-center mb-4">
                    <span className="text-sm mr-2">Only for:</span>
                    <span className="font-bold">$299 USD</span>
                  </div>
                  <Button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => console.log("Shop now clicked")}
                  >
                    SHOP NOW →
                  </Button>
                </div>
              </div>
            </div>
            {/* Summer Sales Promo */}
            <div className="bg-blue-800 text-white rounded-lg overflow-hidden">
              <div className="p-4 text-center">
                <h3 className="text-sm font-medium mb-2">SUMMER SALES</h3>
                <p className="text-3xl font-bold mb-2">37% DISCOUNT</p>
                <p className="text-sm mb-2">
                  only for <span className="text-yellow-400">SmartPhone</span>{" "}
                  product.
                </p>
                <Button
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={() => console.log("Shop now clicked")}
                >
                  SHOP NOW →
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CheckoutLayout>
  );
};

export default CheckoutPage;
