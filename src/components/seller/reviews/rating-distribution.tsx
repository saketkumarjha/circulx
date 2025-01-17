interface RatingDistributionProps {
  distribution: number[]
}

export function RatingDistribution({ distribution }: RatingDistributionProps) {
  return (
    <div className="space-y-2">
      {distribution.map((percentage, index) => (
        <div key={5 - index} className="flex items-center gap-2">
          <span className="w-3 text-sm">{5 - index}</span>
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-in-out" 
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

