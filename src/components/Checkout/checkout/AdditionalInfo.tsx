import React from "react";
import Toggle from "../ui/Toggle";
import TextField from "../ui/TextField";

interface AdditionalInfoProps {
  onInfoChange: (info: string) => void;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ onInfoChange }) => {
  const handleInfoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onInfoChange(e.target.value);
  }
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200" >
      <h2 className="text-lg font-medium mb-4">Additional Information</h2>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Toggle defaultChecked={true} />
          <label className="text-sm text-gray-600 ml-2">
            Do you want to select an Warehouse
          </label>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Toggle defaultChecked={false} />
          <label className="text-sm text-gray-600 ml-2">
            Do you want to select an Logistics
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">
          Order Notes (Optional)
        </label>
        <TextField
          placeholder="Notes about your order, e.g. special notes for delivery or address description, etc."
          multiline
          rows={4}
          onChange={handleInfoChange}
        />
      </div>
    </div>
  );
};

export default AdditionalInfo;