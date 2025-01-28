import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts"

const sellerData = [
  { name: "Approved", value: 590, color: "#22c55e" },
  { name: "Pending", value: 342, color: "#f97316" },
  { name: "Rejected", value: 120, color: "#ef4444" },
]

export function SellerStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Seller Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sellerData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {sellerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold">1.05</div>
            <div className="text-sm text-muted-foreground">Average range</div>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {sellerData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-muted-foreground">{item.name}</span>
              </div>
              <span className="font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

