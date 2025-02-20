'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
// import { useRouter } from 'next/router'
import ProductCard from '@/components/layout/product-card'
import Header from '@/components/layout/Header'

interface Product {
  product_id: number;
  title: string;
  description?: string;
  category_name: string;
  price: number;
  discount: number;
  image_link: string;
  rating: number;
}

const brands = ["Usha", "Kirioskar", "Crompton Greaves", "Dharani", "Fieldking India", "Harrels"];
const priceRanges = [
  { range: "₹0.00 - ₹98.99", discount: "50%", newTag: true },
  { range: "₹100.00 - ₹198.99", discount: "50%", newTag: true },
  { range: "₹199.00 - ₹400.00", discount: "50%", newTag: true },
  { range: "₹200.00 - ₹299.99", discount: "50%", newTag: true },
  { range: "₹300.00 - ₹399.99", discount: "50%", newTag: true },
  { range: "₹400.00+", discount: "50%", newTag: true }
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedBrands, setSelectedBrands] = useState<string[]>(["All Brands"]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<[number, number][]>([[0, 100000]]);
  const [selectedMotorPower, setSelectedMotorPower] = useState<string[]>([]);
  const [selectedPowerRating, setSelectedPowerRating] = useState<string[]>([]);
  const [selectedPhases, setSelectedPhases] = useState<string[]>([]);
  const [selectedSuctionSize, setSelectedSuctionSize] = useState<string[]>([]);
  // const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      try { 
        const response = await axios.get('/api/products')
        console.log("Response:", response);
        const products: Product[] = response.data
        setProducts(products)
        setFilteredProducts(products)
        const uniqueCategories = Array.from(new Set(products.map(product => product.category_name)))
        setCategories(uniqueCategories)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = products;

    if (!selectedBrands.includes("All Brands")) {
      filtered = filtered.filter(product => selectedBrands.includes(product.category_name));
    }

    if (!selectedPriceRanges.some(range => range[0] === 0 && range[1] === 100000)) {
      filtered = filtered.filter(product => 
        selectedPriceRanges.some(range => product.price >= range[0] && product.price <= range[1])
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedBrands, selectedPriceRanges, products]);

  const handleBrandFilterChange = (brand: string) => {
    setSelectedBrands(prevBrands => {
      if (brand === "All Brands") {
        return ["All Brands"];
      } else {
        const newBrands = prevBrands.filter(b => b !== "All Brands");
        const index = newBrands.indexOf(brand);
        if (index === -1) {
          newBrands.push(brand);
        } else {
          newBrands.splice(index, 1);
        }
        return newBrands.length === 0 ? ["All Brands"] : newBrands;
      }
    });
  };

  const handlePriceFilterChange = (min: number, max: number) => {
    setSelectedPriceRanges(prevRanges => {
      if (min === 0 && max === 100000) {
        return [[0, 100000]];
      } else {
        const newRanges = prevRanges.filter(range => range[0] !== 0 || range[1] !== 100000);
        const index = newRanges.findIndex(range => range[0] === min && range[1] === max);
        if (index === -1) {
          newRanges.push([min, max]);
        } else {
          newRanges.splice(index, 1);
        }
        return newRanges.length === 0 ? [[0, 100000]] : newRanges;
      }
    });
  };

  const handleMotorPowerChange = (power: string) => {
    setSelectedMotorPower(prevPowers => {
      const index = prevPowers.indexOf(power);
      if (index === -1) {
        return [...prevPowers, power];
      } else {
        return prevPowers.filter(p => p !== power);
      }
    });
  };

  const handlePowerRatingChange = (rating: string) => {
    setSelectedPowerRating(prevRatings => {
      const index = prevRatings.indexOf(rating);
      if (index === -1) {
        return [...prevRatings, rating];
      } else {
        return prevRatings.filter(r => r !== rating);
      }
    });
  };

  const handlePhasesChange = (phase: string) => {
    setSelectedPhases(prevPhases => {
      const index = prevPhases.indexOf(phase);
      if (index === -1) {
        return [...prevPhases, phase];
      } else {
        return prevPhases.filter(p => p !== phase);
      }
    });
  };

  const handleSuctionSizeChange = (size: string) => {
    setSelectedSuctionSize(prevSizes => {
      const index = prevSizes.indexOf(size);
      if (index === -1) {
        return [...prevSizes, size];
      } else {
        return prevSizes.filter(s => s !== size);
      }
    });
  };

  return (
    <div>
      <div className="max-w-180 mx-auto p-4 mb-80">
        <div 
          className="relative w-[1440px] h-[645px] bg-cover bg-center flex justify-center mb-8 rounded-lg overflow-hidden" 
          style={{ backgroundImage: 'url(https://s3-alpha-sig.figma.com/img/84bd/a9e5/fd9b94264980eff659745ea88d1557c0?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=GXbhLG2SW53yETIxo~gMDWer8pBx~wkKJVQrTiDndO4ZRFGVaCA7MO9C4iBlKl3km7Iq-GpcwLr~sbgdqtWfA7wQAmzsDeSlcMY7bFatnfIvXKcGPYjoK5dsCjQlMVFPv-X~H60PquN9faI20VklRb1ZbJ0oopCHnJebsay3Ar661VNGl9ShCbah8Ydq8bl-yIP5zpV0qVhftz3-Og3ED-H8HjYc0lX2iDjRi9iQg3t2yKi6e2FnFanN9P9ls38sJ7wOwq2-rjSe6t-9fUcdGESjHGeynulh9eL8crMxWWW67JF21rQbPDcFuimARlJMhgTROevZRDYvL2GK07W3pQ__)' }}
        >
          <div className="inset-0 max-w-[768px] max-h-[276px] flex flex-col items-start justify-center mt-[41px] text-white text-start">
            <h1 className="text-6xl font-semibold mb-1">Find the Best Deals on <br /> Water Pumps & Motor</h1>
            <p className="text-gray-100 mb-4">Paper, Metal, Glass, and more - direct from trusted suppliers.</p>
            <button 
              
              className="bg-[#14BA6D] text-white max-w-[216px] max-h-[56px] py-2 px-6 rounded-lg"
            >
              Explore Now
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-20 pt-[60px]">
          <div className='w-[262px] h-[32px] mb-60'>
            <div className='flex gap-1 mb-4'>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXklEQVR4nOWUQQrAIAwE5/8fa5tPbS8KHopYjVWagb3JLsgQiIIBAs5ZAyriUlJLpvXddwPTv6jGlcoP/oRtp64GknHRVL0Db1FcdW07/VoZOWzqvaauA09lwfRjBTfsYIzjlbUBMQAAAABJRU5ErkJggg==" alt="horizontal-settings-mixer--v1"></img>
            <h2 className='font-semibold'>Filter</h2>
            </div>
            <div className="md:col-span-1 bg-white p-4 rounded-lg shadow text-start">
            <h3 className="font-semibold mb-4">CATEGORIES</h3>
            <ul>
              <li className="mb-2 flex items-center justify-between">
                All Brands
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedBrands.includes("All Brands")} onChange={() => handleBrandFilterChange("All Brands")} />
              </li>
              {brands.map((brand, index) => (
                <li key={index} className="mb-2 flex items-center justify-between">
                  {brand}
                  <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedBrands.includes(brand)} onChange={() => handleBrandFilterChange(brand)} />
                </li>
              ))}
            </ul>

            <h3 className="font-semibold mt-6 mb-4">PRICE</h3>
            <ul>
              <li className="mb-2 flex items-center justify-between">
                All Price
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedPriceRanges.some(range => range[0] === 0 && range[1] === 100000)} onChange={() => handlePriceFilterChange(0, 100000)} />
              </li>
              <li className="mb-2 flex items-center justify-between">
                ₹0.00 - ₹99.99
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedPriceRanges.some(range => range[0] === 0 && range[1] === 99.99)} onChange={() => handlePriceFilterChange(0, 99.99)} />
              </li>
              <li className="mb-2 flex items-center justify-between">
                ₹100.00 - ₹198.99
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedPriceRanges.some(range => range[0] === 100 && range[1] === 198.99)} onChange={() => handlePriceFilterChange(100, 198.99)} />
              </li>
              <li className="mb-2 flex items-center justify-between">
                ₹200.00 - ₹299.99
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedPriceRanges.some(range => range[0] === 200 && range[1] === 299.99)} onChange={() => handlePriceFilterChange(200, 299.99)} />
              </li>
              <li className="mb-2 flex items-center justify-between">
                ₹300.00 - ₹399.99
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedPriceRanges.some(range => range[0] === 300 && range[1] === 399.99)} onChange={() => handlePriceFilterChange(300, 399.99)} />
              </li>
              <li className="mb-2 flex items-center justify-between">
                ₹400.00+
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedPriceRanges.some(range => range[0] === 400 && range[1] === 100000)} onChange={() => handlePriceFilterChange(400, 100000)} />
              </li>
            </ul>

            <h3 className="font-semibold mt-6 mb-4">MOTOR POWER</h3>
            <ul>
              <li className="mb-2 flex items-center justify-between">
                1 HP
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedMotorPower.includes("1 HP")} onChange={() => handleMotorPowerChange("1 HP")} />
              </li>
              <li className="mb-2 flex items-center justify-between">
                1.5 HP
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedMotorPower.includes("1.5 HP")} onChange={() => handleMotorPowerChange("1.5 HP")} />
              </li>
              <li className="mb-2 flex items-center justify-between">
                2.0 HP
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedMotorPower.includes("2.0 HP")} onChange={() => handleMotorPowerChange("2.0 HP")} />
              </li>
              <li className="mb-2 flex items-center justify-between">
                3.5 HP
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedMotorPower.includes("3.5 HP")} onChange={() => handleMotorPowerChange("3.5 HP")} />
              </li>
              <li className="mb-2 flex items-center justify-between">
                4.5 HP
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedMotorPower.includes("4.5 HP")} onChange={() => handleMotorPowerChange("4.5 HP")} />
              </li>
            </ul>

            <h3 className="font-semibold mt-6 mb-4">POWER RATING</h3>
            <ul>
              <li className="mb-2 flex items-center justify-between">
                1 kW
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedPowerRating.includes("1 kW")} onChange={() => handlePowerRatingChange("1 kW")} />
              </li>
              <li className="mb-2 flex items-center justify-between">
                0.5 kW
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedPowerRating.includes("0.5 kW")} onChange={() => handlePowerRatingChange("0.5 kW")} />
              </li>
              <li className="mb-2 flex items-center justify-between">
                2.0 kW
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedPowerRating.includes("2.0 kW")} onChange={() => handlePowerRatingChange("2.0 kW")} />
              </li>
              <li className="mb-2 flex items-center justify-between">
                3.5 kW
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedPowerRating.includes("3.5 kW")} onChange={() => handlePowerRatingChange("3.5 kW")} />
              </li>
              <li className="mb-2 flex items-center justify-between">
                5 kW
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedPowerRating.includes("5 kW")} onChange={() => handlePowerRatingChange("5 kW")} />
              </li>
              <li className="mb-2 flex items-center justify-between">
                4.5 kW
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedPowerRating.includes("4.5 kW")} onChange={() => handlePowerRatingChange("4.5 kW")} />
              </li>
            </ul>

            <h3 className="font-semibold mt-6 mb-4">NUMBER OF PHASES</h3>
            <ul>
              <li className="mb-2 flex items-center justify-between">
                Single Phase
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedPhases.includes("Single Phase")} onChange={() => handlePhasesChange("Single Phase")} />
              </li>
              <li className="mb-2 flex items-center justify-between">
                Three Phase
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedPhases.includes("Three Phase")} onChange={() => handlePhasesChange("Three Phase")} />
              </li>
            </ul>

            <h3 className="font-semibold mt-6 mb-4">SUCTION SIZE</h3>
            <ul>
              <li className="mb-2 flex items-center justify-between">
                25 mm
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedSuctionSize.includes("25 mm")} onChange={() => handleSuctionSizeChange("25 mm")} />
              </li>
              <li className="mb-2 flex items-center justify-between">
                35 mm
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedSuctionSize.includes("35 mm")} onChange={() => handleSuctionSizeChange("35 mm")} />
              </li>
              <li className="mb-2 flex items-center justify-between">
                20 mm
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedSuctionSize.includes("20 mm")} onChange={() => handleSuctionSizeChange("20 mm")} />
              </li>
              <li className="mb-2 flex items-center justify-between">
                65 mm
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedSuctionSize.includes("65 mm")} onChange={() => handleSuctionSizeChange("65 mm")} />
              </li>
              <li className="mb-2 flex items-center justify-between">
                75 mm
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedSuctionSize.includes("75 mm")} onChange={() => handleSuctionSizeChange("75 mm")} />
              </li>
              <li className="mb-2 flex items-center justify-between">
                85 mm
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedSuctionSize.includes("85 mm")} onChange={() => handleSuctionSizeChange("85 mm")} />
              </li>
              <li className="mb-2 flex items-center justify-between">
                50 mm
                <input type="checkbox" className="ml-2 w-6 h-6 accent-black" checked={selectedSuctionSize.includes("50 mm")} onChange={() => handleSuctionSizeChange("50 mm")} />
              </li>
            </ul>
          </div>
          </div>
          <div className="md:col-span-3 min-h-[500px]">
            <h2 className='font-semibold text-[40px] text-start mb-5'>Water Pumps</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map(product => (
                <div key={product.product_id} className="bg-white w-[262px] h-[433px] pb-4 rounded-lg">
                  <div className="relative w-[262px] h-[349px] bg-slate-200 flex">
                    <Image 
                      src={product.image_link} 
                      alt={product.title} 
                      width={262} 
                      height={200} 
                      className="" 
                    />
                    {product.discount > 0 && <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">NEW</span>}
                  </div>
                  <h4 className="text-lg font-semibold text-start">{product.title}</h4>
                  <p className="text-gray-600 text-start">₹{product.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
