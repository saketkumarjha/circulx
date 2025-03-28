"use client";
import React, { useState } from "react";
import { PaymentInformation } from "../types/checkout";
import Image from "next/image";

interface PaymentMethod {
  id: PaymentInformation["method"];
  name: string;
  icon: string;
}

const paymentMethods: PaymentMethod[] = [
  { id: "cash", name: "Cash on Delivery", icon: "/icons/cash.svg" },
  { id: "upi", name: "UPI ID Payment", icon: "/icons/upi.svg" },
  { id: "paypal", name: "Paypal", icon: "/icons/paypal.svg" },
  { id: "amazon", name: "Amazon Pay", icon: "/icons/amazon.svg" },
  { id: "card", name: "Debit/Credit Card", icon: "/icons/card.svg" },
];

interface PaymentOptionsProps {
  onMethodSelect: (method: PaymentInformation["method"]) => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ onMethodSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("card");

  const handleMethodSelect = (id: PaymentInformation["method"]) => {
    setSelectedMethod(id);
    onMethodSelect(id);
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-2">Payment Option</h2>
      <p className="text-sm text-gray-600 mb-4">
        Choose a payment method to continue checking out. You will still have a
        chance to review and edit your order before it is final.
      </p>

      {/* Horizontal Divider at the Top */}
      <div className="w-full h-px bg-gray-200 mb-4"></div>

      {/* On mobile: Vertical stacked with each item taking full width */}
      <div className="sm:hidden">
        {paymentMethods.map((method, index) => (
          <React.Fragment key={method.id}>
            <div
              className={`w-full flex items-center justify-between p-4 cursor-pointer transition-all ${
                selectedMethod === method.id
                  ? "bg-orange-50"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handleMethodSelect(method.id)}
            >
              <div className="flex items-center">
                <div className="relative w-8 h-8 mr-3">
                  <Image
                    src={method.icon}
                    alt={method.name}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <span className="text-sm text-gray-700">{method.name}</span>
              </div>
              
              {/* Selection Circle */}
              {selectedMethod === method.id ? (
                <div className="relative h-4 w-4">
                  <div className="h-4 w-4 rounded-full bg-orange-500"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white"></div>
                </div>
              ) : (
                <div className="h-4 w-4 rounded-full border border-gray-300"></div>
              )}
            </div>
            
            {/* Horizontal Divider between items (except after the last one) */}
            {index < paymentMethods.length - 1 && (
              <div className="w-full h-px bg-gray-200"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* On larger screens: Horizontal layout with equal width columns */}
      <div className="hidden sm:flex">
        {paymentMethods.map((method, index) => (
          <React.Fragment key={method.id}>
            <div
              className={`flex-1 flex flex-col items-center justify-center p-4 cursor-pointer transition-all relative ${
                selectedMethod === method.id
                  ? "bg-orange-50"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handleMethodSelect(method.id)}
            >
              <div className="relative w-8 h-8 mb-2">
                <Image
                  src={method.icon}
                  alt={method.name}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              {/* Method Name with Increased Bottom Margin */}
              <span className="text-sm text-gray-700 text-center mb-6">
                {method.name}
              </span>

              {/* Circle at the Bottom */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                {selectedMethod === method.id ? (
                  /* Selected Circle - Filled orange circle with white inner circle */
                  <div className="relative h-4 w-4">
                    <div className="h-4 w-4 rounded-full bg-orange-500"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white"></div>
                  </div>
                ) : (
                  /* Unselected Circle - Just an outline */
                  <div className="h-4 w-4 rounded-full border border-gray-300"></div>
                )}
              </div>
            </div>

            {/* Vertical Divider between Payment Methods */}
            {index < paymentMethods.length - 1 && (
              <div className="h-16 w-px bg-gray-200 my-2"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Horizontal Divider at the Bottom */}
      <div className="w-full h-px bg-gray-200 mt-4"></div>
    </div>
  );
};

export default PaymentOptions;