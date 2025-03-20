"use client"
import StatsSection from "./StatsSection"
import ChartsSection from "./ChartsSection"
import OrdersTable from "./OrdersTable"

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <StatsSection />
      <ChartsSection />
      <OrdersTable />
    </div>
  )
}

