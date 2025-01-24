import { StatsCard } from "@/components/admin/reviews/stats-card"
import { ReviewsTable } from "@/components/admin/reviews/reviews-table"
import type { ReviewStats, Review } from "@/types/reviews"

const stats: ReviewStats = {
  total: 4250,
  pending: 1200,
  approved: 2800,
  flagged: 190,
  totalGrowth: 10,
  pendingGrowth: -5,
  approvedGrowth: 23,
  flaggedGrowth: 13,
}

// Generate sample reviews data
const reviews: Review[] = Array.from({ length: 25 }, (_, i) => ({
  id: (i + 1).toString(),
  image: "/placeholder.svg",
  buyerName: `Buyer ${i + 1}`,
  review: ["Great quality!, Excellent, Outstanding", "Defective item!", "Amazing product, highly recommended"][i % 3],
  date: new Date(2024, 0, i + 1).toISOString(),
  productName: ["Metal Sheets (2mm)", "Glass Bottles", "Kraft Paper Rolls"][i % 3],
  sellerName: ["XYZ Metals Ltd", "ABC Glassworks", "Paper Suppliers"][i % 3],
  status: ["Pending", "Approved", "Flagged"][i % 3] as "Pending" | "Approved" | "Flagged",
}))

export default function ReviewsPage() {
  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Reviews" value={stats.total} change={stats.totalGrowth} type="total" />
        <StatsCard title="Pending Reviews" value={stats.pending} change={stats.pendingGrowth} type="pending" />
        <StatsCard title="Approved Reviews" value={stats.approved} change={stats.approvedGrowth} type="approved" />
        <StatsCard title="Flagged Reviews" value={stats.flagged} change={stats.flaggedGrowth} type="flagged" />
      </div>

      <ReviewsTable reviews={reviews} />
    </div>
  )
}

