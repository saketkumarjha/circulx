import { Star, ThumbsUp, CheckCircle, Flag } from 'lucide-react'
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
        "rounded-lg border-2 p-6",
        type === "total" && "border-yellow-200 bg-yellow-50",
        type === "pending" && "border-orange-200 bg-orange-50",
        type === "approved" && "border-blue-200 bg-blue-50",
        type === "flagged" && "border-red-200 bg-red-50"
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
        <h3 className={cn(
          "text-sm font-medium",
          type === "total" && "text-yellow-800",
          type === "pending" && "text-orange-800",
          type === "approved" && "text-blue-800",
          type === "flagged" && "text-red-800",
        )}>
          {title}
        </h3>
      </div>
      <div className="flex items-end justify-between">
        <p className={cn(
          "text-3xl font-bold",
          type === "total" && "text-yellow-900",
          type === "pending" && "text-orange-900",
          type === "approved" && "text-blue-900",
          type === "flagged" && "text-red-900",
        )}>
          {value.toLocaleString()}
        </p>
        <div className="flex items-center gap-1">
          <span className={cn(
            "text-sm font-medium",
            isPositive ? "text-green-600" : "text-red-600"
          )}>
            {changeText}
          </span>
          <span className={cn(
            "text-xs",
            type === "total" && "text-yellow-600",
            type === "pending" && "text-orange-600",
            type === "approved" && "text-blue-600",
            type === "flagged" && "text-red-600",
          )}>
            vs last month
          </span>
        </div>
      </div>
    </div>
  )
}

