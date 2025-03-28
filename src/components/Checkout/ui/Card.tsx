import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  height?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  height = "",
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-gray-200 ${className}`}
      style={{height:`${height}`}}
    >
      {children}
    </div>
  );
};

export default Card;
