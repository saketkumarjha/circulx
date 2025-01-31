import { Star, ThumbsUp, CheckCircle, Flag } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: number
  change: number
  type: "total" | "pending" | "approved" | "flagged"
}

export function StatsCard({ title, value, change, type }: StatsCardProps) {
  const icons = {
    total: Star,
    pending: ThumbsUp,
    approved: CheckCircle,
    flagged: Flag,
  }

  const Icon = icons[type]
  const isPositive = change > 0
  const changeText = `${isPositive ? "+" : ""}${change}%`

  return (
    <div
      className={cn(
        "bg-white rounded-lg border-2 p-6",
        type === "total" && "border-yellow-400",
        type === "pending" && "border-orange-400",
        type === "approved" && "border-blue-400",
        type === "flagged" && "border-red-400",
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        <div
          className={cn(
            "p-2 rounded-lg",
            type === "total" && "bg-yellow-100 text-yellow-600",
            type === "pending" && "bg-orange-100 text-orange-600",
            type === "approved" && "bg-blue-100 text-blue-600",
            type === "flagged" && "bg-red-100 text-red-600",
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
        <div className="flex items-center gap-1">
          <span className={cn("text-sm font-medium", isPositive ? "text-green-600" : "text-red-600")}>
            {changeText}
          </span>
          <span className="text-xs text-gray-500">vs last month</span>
        </div>
      </div>
    </div>
  )
}

