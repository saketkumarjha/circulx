import React from "react";
import TextField from "../ui/TextField";

interface CardDetails {
  nameOnCard: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

interface PaymentFormProps {
  cardDetails: CardDetails;
  onCardDetailsChange: (field: keyof CardDetails, value: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ cardDetails, onCardDetailsChange }) => {
  return (
    <div className="mb-6 ">
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Name on Card</label>
        <TextField
          placeholder="Enter name on card"
          value={cardDetails.nameOnCard}
          onChange={(e) => onCardDetailsChange("nameOnCard", e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Card Number</label>
        <TextField
          placeholder="Enter card number"
          value={cardDetails.cardNumber}
          onChange={(e) => onCardDetailsChange("cardNumber", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Expire Date
          </label>
          <TextField
            placeholder="MM/YY"
            value={cardDetails.expiryDate}
            onChange={(e) => onCardDetailsChange("expiryDate", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">CVC</label>
          <TextField
            placeholder="Enter CVC"
            value={cardDetails.cvc}
            onChange={(e) => onCardDetailsChange("cvc", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
