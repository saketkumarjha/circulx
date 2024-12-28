import { StatCard } from "@/components/admin/stat-card"
import { PendingCard } from "@/components/admin/pending-card"
import { SalesChart } from "@/components/admin/sales-chart"
import { Users, Package, DollarSign, UserCheck, PackageCheck, AlertCircle } from 'lucide-react'
import { formatNumber, formatCurrency } from "@/lib/utils"

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8"> Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Sellers"
          value={formatNumber(12000)}
          change={{
            type: "increase",
            value: "8523",
            period: "Active Seller"
          }}
          icon={<Users className="w-6 h-6 text-primary" />}
        />
        <StatCard
          title="Total Products Listed"
          value={formatNumber(10293)}
          change={{
            type: "increase",
            value: "1.3%",
            period: "Up from past week"
          }}
          icon={<Package className="w-6 h-6 text-primary" />}
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(89000)}
          change={{
            type: "decrease",
            value: "4.3%",
            period: "Down from yesterday"
          }}
          icon={<DollarSign className="w-6 h-6 text-primary" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <PendingCard
          title="Sellers Pending Approval"
          value={25}
          change={{
            value: "1.3%",
            period: "Up from past week"
          }}
          icon={<UserCheck className="w-6 h-6" />}
        />
        <PendingCard
          title="Products Pending Review"
          value={10293}
          change={{
            value: "1.3%",
            period: "Up from past week"
          }}
          icon={<PackageCheck className="w-6 h-6" />}
        />
        <PendingCard
          title="Issues Pending Resolution"
          value={2040}
          change={{
            value: "1.8%",
            period: "Up from yesterday"
          }}
          icon={<AlertCircle className="w-6 h-6" />}
        />
      </div>

      <SalesChart />
    </div>
  )
}

