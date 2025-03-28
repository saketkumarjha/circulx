import React, { useState, useEffect } from "react";
import TextField from "../ui/TextField";
import SelectField from "../ui/SelectField";
import Checkbox from "../ui/Checkbox";

interface BillingFormProps {
  onBillingDetailsSubmit: (billingDetails: BillingDetails) => void;
}

export interface BillingDetails {
  firstName: string;
  lastName: string;
  companyName?: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  email: string;
  phoneNumber: string;
  shipToDifferentAddress: boolean;
}

const BillingForm: React.FC<BillingFormProps> = ({ onBillingDetailsSubmit }) => {
  const [billingDetails, setBillingDetails] = useState<BillingDetails>({
    firstName: "",
    lastName: "",
    companyName: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    email: "",
    phoneNumber: "",
    shipToDifferentAddress: false,
  });

  const [savedBillingDetails, setSavedBillingDetails] = useState<BillingDetails>(billingDetails);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  // Compare current billing details with saved billing details
  useEffect(() => {
    const isEqual = JSON.stringify(billingDetails) === JSON.stringify(savedBillingDetails);
    setIsSaveDisabled(isEqual);
  }, [billingDetails, savedBillingDetails]);

  const handleChange = (field: keyof BillingDetails, value: string | boolean) => {
    setBillingDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onBillingDetailsSubmit(billingDetails);
    setSavedBillingDetails(billingDetails);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-lg font-medium mb-4">
        Billing and Shipping Information
      </h2>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">User name</label>
        <div className="flex flex-col sm:flex-row gap-3">
        <TextField
            placeholder="First name"
            className="flex-1"
            value={billingDetails.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          /> 
          <TextField 
            placeholder="Last name"
            className="flex-1"
            value={billingDetails.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />        
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">
          Company Name (Optional)
        </label>
        <TextField
          placeholder=""
          value={billingDetails.companyName}
          onChange={(e) => handleChange("companyName", e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Address</label>
        <TextField
          placeholder=""
          value={billingDetails.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Country</label>
          <SelectField
            value={billingDetails.country}
            onChange={(e) => handleChange("country", e.target.value)}
            options={[
              { value: "USA", label: "USA" },
              { value: "Canada", label: "Canada" },
              { value: "UK", label: "UK" },
            ]}
            placeholder="Select a country"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Region/State
          </label>
          <SelectField
            value={billingDetails.state}
            onChange={(e) => handleChange("state", e.target.value)}
            options={[
              { value: "California", label: "California" },
              { value: "Texas", label: "Texas" },
              { value: "New York", label: "New York" },
            ]}
            placeholder="Select a state"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">City</label>
          <SelectField
            value={billingDetails.city}
            onChange={(e) => handleChange("city", e.target.value)}
            options={[
              { value: "Los Angeles", label: "Los Angeles" },
              { value: "Houston", label: "Houston" },
              { value: "New York City", label: "New York City" },
            ]}
            placeholder="Select a city"
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-1">
            <label className="block text-sm text-gray-600 mb-1">Zip Code</label>
            <TextField
            placeholder=""
            value={billingDetails.zipCode}
            onChange={(e) => handleChange("zipCode", e.target.value)}
          />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <TextField
            placeholder=""
            value={billingDetails.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Phone Number
          </label>
          <TextField
            placeholder=""
            value={billingDetails.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-4">
      <Checkbox
          label="Ship into different address"
          checked={billingDetails.shipToDifferentAddress}
          onChange={(e) => handleChange("shipToDifferentAddress", e.target.checked)}
        />
      </div>
      <div className="mt-6">
        <button
          className={`bg-orange-500 text-white px-4 py-2 rounded ${
            isSaveDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}          onClick={handleSubmit}
          disabled={isSaveDisabled}
        >
          Save Billing Details
        </button>
      </div>
    </div>
  );
};

export default BillingForm;
