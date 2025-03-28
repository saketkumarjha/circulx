import React from 'react';

interface DividerProps {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className = '' }) => {
  return <hr className={`border-t border-gray-200 ${className}`} />;
};

export default Divider;