import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Clock, Package, Truck, RotateCcw } from "lucide-react"

const stats = [
  { title: "Total Orders", value: "4250", change: "+10%", icon: ShoppingCart, color: "bg-orange-500" },
  { title: "Pending Order", value: "1,200", change: "-5%", icon: Clock, color: "bg-red-500" },
  { title: "Orders Shipped", value: "2,800", change: "+23%", icon: Package, color: "bg-blue-500" },
  { title: "Order Delivered", value: "2,250", change: "+10%", icon: Truck, color: "bg-green-500" },
  { title: "Return Requests", value: "190", change: "+13%", icon: RotateCcw, color: "bg-orange-500" },
]

export default function StatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className={`p-2 ${stat.color} rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className={`text-sm ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                  {stat.change} vs last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

