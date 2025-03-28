import React, { useState } from 'react';

interface ToggleProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  label?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  defaultChecked = false,
  onChange,
  className = '',
  label
}) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <div className={`flex items-center ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        className={`relative inline-flex h-5 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none ${
          checked ? 'bg-orange-500' : 'bg-gray-200'
        }`}
        aria-pressed={checked}
      >
        <span
          className={`absolute h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
            checked ? 'right-1' : 'left-1'
          }`}
        />
      </button>
      {label && (
        <span className="ml-3 text-lg">
          {label}
        </span>
      )}
    </div>
  );
};

export default Toggle;