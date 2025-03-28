import React, { ReactNode } from "react";

interface CheckoutLayoutProps {
  children: ReactNode;
}

const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto pt-[72px] pl-[36px]">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold mb-1">Check Out Page</h1>
        <p className="text-gray-500 text-sm">
          Lorem Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci
        </p>
      </div>
      {/* <div className="border-t border-b border-gray-200 py-1 mb-6"></div> */}

      {children}
    </div>
  );
};

export default CheckoutLayout;
