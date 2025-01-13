import Image from "next/image"
import { Button } from "@/components/ui/button"
import HelpSearch from "@/components/seller/help/help-search"

export default function SellerHelpPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-8rem)]">
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight">
              Welcome to
              <br />
              Help & Support
            </h1>
            <HelpSearch />
            <Button 
              size="lg"
              className="bg-[#FF5C00] hover:bg-[#FF5C00]/90 text-white px-8 rounded-full"
            >
              Try your Luck
            </Button>
          </div>
        </div>
        <div className="relative h-[400px] lg:h-[500px]">
          <Image
            src="/image.png"
            alt="Help and Support Illustration showing two people with a question mark"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      
      <div className="mt-16 border-t pt-8">
        <h2 className="text-3xl md:text-4xl font-medium">Tutorials</h2>
        {/* Tutorial content will be added in future updates */}
      </div>
    </div>
  )
}

