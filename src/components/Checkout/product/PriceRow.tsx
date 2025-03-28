import React from 'react';

interface PriceRowProps {
  label: string;
  value: number;
  valueText?: string;
  isTotal?: boolean;
  currency?: string;
}

const PriceRow: React.FC<PriceRowProps> = ({ 
  label, 
  value, 
  valueText, 
  isTotal = false,
  currency = '',
}) => {
  const formattedValue = value < 0 
    ? `-$${Math.abs(value).toFixed(2)}` 
    : `$${value.toFixed(2)}`;
  
  const displayValue = valueText || formattedValue;
  
  return (
    <div className="flex items-center justify-between py-1">
      <span className={`text-sm ${isTotal ? 'font-medium' : 'text-gray-500'}`}>
        {label}
      </span>
      <span className={isTotal ? 'font-semibold' : 'font-medium'}>
        {displayValue} {isTotal && currency ? currency : ''}
      </span>
    </div>
  );
};

export default PriceRow;