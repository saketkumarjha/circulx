import SimpleSlider from '@/components/home/SimpleSlider'
import ProductGrid from '@/components/layout/product-grid'


export default function Home() {
  return (
    <main className="min-h-screen">
      <SimpleSlider />
      <ProductGrid />
      
      {/* Add more sections here */}
    </main>
  )
}