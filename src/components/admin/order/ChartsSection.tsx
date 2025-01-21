import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const revenueData = [
  { name: "Mon", value: 15000 },
  { name: "Tue", value: 25000 },
  { name: "Wed", value: 30000 },
  { name: "Thu", value: 28000 },
  { name: "Fri", value: 35000 },
  { name: "Sat", value: 32000 },
  { name: "Sun", value: 28000 },
]

const orderSummaryData = [
  { name: "Pending Orders", value: 1200, color: "#ff4d4f" },
  { name: "Shipped Orders", value: 2800, color: "#52c41a" },
  { name: "Delivered Orders", value: 2250, color: "#1890ff" },
]

export default function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Revenue</span>
            <Select defaultValue="28 Dec 22 - 10 Jan 23">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="28 Dec 22 - 10 Jan 23">28 Dec 22 - 10 Jan 23</SelectItem>
              </SelectContent>
            </Select>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Line type="monotone" dataKey="value" stroke="#ff4d4f" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={orderSummaryData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                {orderSummaryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

