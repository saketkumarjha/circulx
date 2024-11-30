import ProductCard from './product-card'

const products = [
  {
    id: 1,
    title: '300 LPD ETC Ceramic Coated Supreme Solar Water Heater',
    company: 'Waaree Pvt Ltd',
    location: 'Gurugram,Haryana',
    price: 33000,
    originalPrice: 66000,
    discount: 50,
    image: '/download.jpg',
    hoverImage: '/th.jpg',
    href: '/product/1',
    rating: 4.5
  },
  {
    id: 2,
    title: '300 LPD ETC Ceramic Coated Supreme Solar Water Heater',
    company: 'Waaree Pvt Ltd',
    location: 'Gurugram,Haryana',
    price: 33000,
    originalPrice: 66000,
    discount: 50,
    image: '/th.jpg',
    hoverImage: '/download.jpg',
    href: '/product/2',
    rating: 4.2
  },
  {
    id: 3,
    title: '300 LPD ETC Ceramic Coated Supreme Solar Water Heater',
    company: 'Waaree Pvt Ltd',
    location: 'Gurugram,Haryana',
    price: 33000,
    originalPrice: 66000,
    discount: 50,
    image: '/download.jpg',
    hoverImage: '/download.jpg',
    href: '/product/3',
    rating: 4.8
  },
  {
    id: 4,
    title: '300 LPD ETC Ceramic Coated Supreme Solar Water Heater',
    company: 'Waaree Pvt Ltd',
    location: 'Gurugram,Haryana',
    price: 33000,
    originalPrice: 66000,
    discount: 50,
    image: '/download.jpg',
    hoverImage: '/download.jpg',
    href: '/product/4',
    rating: 4.0
  },
  {
    id: 5,
    title: '300 LPD ETC Ceramic Coated Supreme Solar Water Heater',
    company: 'Waaree Pvt Ltd',
    location: 'Gurugram,Haryana',
    price: 33000,
    originalPrice: 66000,
    discount: 50,
    image: '/download.jpg',
    hoverImage: '/download.jpg',
    href: '/product/5',
    rating: 4.6
  },
  {
    id: 6,
    title: '300 LPD ETC Ceramic Coated Supreme Solar Water Heater',
    company: 'Waaree Pvt Ltd',
    location: 'Gurugram,Haryana',
    price: 33000,
    originalPrice: 66000,
    discount: 50,
    image: '/download.jpg',
    hoverImage: '/download.jpg',
    href: '/product/6',
    rating: 4.3
  }
]

export default function ProductGrid() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Title */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Solar Water Heaters
      </h2>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            company={product.company}
            location={product.location}
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
            image={product.image}
            hoverImage={product.hoverImage}
            href={product.href}
            rating={product.rating}
          />
        ))}
      </div>
    </div>
  )
}

