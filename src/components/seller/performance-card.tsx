// Card component for displaying performance metrics
interface PerformanceCardProps {
    icon: React.ReactNode
    label: string
    value: string
    prefix?: string
  }
  
  export function PerformanceCard({ icon, label, value, prefix }: PerformanceCardProps) {
    return (
      <div className="flex items-center gap-3 rounded-lg border bg-white px-4 py-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-lg font-semibold">
            {prefix}{value}
          </p>
        </div>
      </div>
    )
  }
  
  