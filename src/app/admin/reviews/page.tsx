import { StatsCard } from "@/components/admin/reviews/stats-card"
import { ReviewsTable } from "@/components/admin/reviews/reviews-table"
import type { ReviewStats } from "@/types/reviews"

const stats: ReviewStats = {
  total: 4250,
  pending: 1200,
  approved: 2800,
  flagged: 190,
  totalGrowth: 10,
  pendingGrowth: -5,
  approvedGrowth: 23,
  flaggedGrowth: 13
}

export default function ReviewsPage() {
  return (
    <div className="p-6 max-w-[1400px] mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Reviews"
          value={stats.total}
          change={stats.totalGrowth}
          type="total"
        />
        <StatsCard
          title="Pending Reviews"
          value={stats.pending}
          change={stats.pendingGrowth}
          type="pending"
        />
        <StatsCard
          title="Approved Reviews"
          value={stats.approved}
          change={stats.approvedGrowth}
          type="approved"
        />
        <StatsCard
          title="Flagged Reviews"
          value={stats.flagged}
          change={stats.flaggedGrowth}
          type="flagged"
        />
      </div>

      <ReviewsTable />
    </div>
  )
}

