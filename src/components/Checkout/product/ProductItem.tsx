import React from "react";
import Image from "next/image";

interface ProductItemProps {
  image: string;
  title: string;
  quantity: number;
  price: number;
}

const ProductItem: React.FC<ProductItemProps> = ({
  image,
  title,
  quantity,
  price,
}) => {
  return (
    <div className="flex flex-col  gap-4">
      <div className="relative  flex-shrink-0">
        <Image
          src={image}
          alt={title}
          width={150}
          height={150}
          
          objectFit="contain"
          className="rounded-md"
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-sm font-medium">{title}</h3>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-gray-500 text-sm">{quantity} x</span>
          <span className="font-medium text-green-500">${price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
// import React from 'react';
// import Image from 'next/image';

// interface ProductItemProps {
//   image: string;
//   title: string;
//   quantity: number;
//   price: number;
// }

// const ProductItem: React.FC<ProductItemProps> = ({ image, title, quantity, price }) => {
//   // Fallback image in case the provided image path doesn't exist
//   const imageSrc = image || '/api/placeholder/160/160';

//   return (
//     <div className="flex items-center gap-4">
//       <div className="relative w-20 h-20 flex-shrink-0">
//         <Image
//           src={imageSrc}
//           alt={title}
//           width={80}
//           height={80}
//           className="rounded-md object-contain"
//           onError={(e) => {
//             // Replace with placeholder if image fails to load
//             const target = e.target as HTMLImageElement;
//             target.src = '/api/placeholder/160/160';
//           }}
//         />
//       </div>
//       <div className="flex-grow">
//         <h3 className="text-sm font-medium">{title}</h3>
//         <div className="flex items-center justify-between mt-1">
//           <span className="text-gray-500 text-sm">{quantity} x</span>
//           <span className="font-medium">${price}</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductItem;
