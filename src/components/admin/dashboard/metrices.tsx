import { Package, Users, ShoppingCart, UserPlus, Clock } from "lucide-react"
import { MetricCard } from "./metrices-card"

interface MetricsProps {
  timeFrame: string
  getMetricValue: (baseValue: number) => number
}

export function Metrics({ timeFrame, getMetricValue }: MetricsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <MetricCard
        title="Total Revenue"
        value={`$${getMetricValue(1234567).toLocaleString()}`}
        trend="-4.3%"
        trendLabel={`Down from last ${timeFrame === "weekly" ? "week" : timeFrame === "monthly" ? "month" : "year"}`}
        trendType="negative"
        icon={Package}
        iconColor="text-green-500"
        iconBg="bg-green-50"
      />
      <MetricCard
        title="Total Sellers"
        value={getMetricValue(1200).toLocaleString()}
        trend={getMetricValue(8523).toLocaleString()}
        trendLabel="Active Seller"
        trendType="positive"
        icon={Users}
        iconColor="text-purple-500"
        iconBg="bg-purple-50"
      />
      <MetricCard
        title="Total Orders"
        value={getMetricValue(12345).toLocaleString()}
        trend="1.3%"
        trendLabel={`Up from last ${timeFrame === "weekly" ? "week" : timeFrame === "monthly" ? "month" : "year"}`}
        trendType="positive"
        icon={ShoppingCart}
        iconColor="text-yellow-500"
        iconBg="bg-yellow-50"
      />
      <MetricCard
        title="Active Product"
        value={getMetricValue(5678).toLocaleString()}
        trend="1.3%"
        trendLabel={`Up from last ${timeFrame === "weekly" ? "week" : timeFrame === "monthly" ? "month" : "year"}`}
        trendType="positive"
        icon={Package}
        iconColor="text-pink-500"
        iconBg="bg-pink-50"
      />
      <MetricCard
        title="New Buyer"
        value={getMetricValue(456).toLocaleString()}
        trend="13%"
        trendLabel={timeFrame === "annually" ? "(Last Year)" : timeFrame === "monthly" ? "(Last Month)" : "(Last Week)"}
        trendType="positive"
        icon={UserPlus}
        iconColor="text-orange-500"
        iconBg="bg-orange-50"
      />
      <MetricCard
        title="Issues Pending Resolution"
        value={getMetricValue(2040).toLocaleString()}
        trend="1.8%"
        trendLabel={`Up from last ${timeFrame === "weekly" ? "week" : timeFrame === "monthly" ? "month" : "year"}`}
        trendType="positive"
        icon={Clock}
        iconColor="text-red-500"
        iconBg="bg-red-50"
      />
    </div>
  )
}

