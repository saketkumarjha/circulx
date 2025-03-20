interface RatingDistributionProps {
    distribution: number[] // Array of percentages for 5, 4, 3, 2, 1 stars
  }
  
  export function RatingDistribution({ distribution }: RatingDistributionProps) {
    // Ensure we have 5 values, fill with 0 if not provided
    const ratings = [...(distribution || []), 0, 0, 0, 0, 0].slice(0, 5)
  
    return (
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Rating Distribution</h3>
  
        {[5, 4, 3, 2, 1].map((star, index) => (
          <div key={star} className="flex items-center gap-2">
            <div className="w-8 text-sm text-right">{star} ★</div>
            <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-yellow-400 rounded-full"
                style={{ width: `${ratings[index]}%` }}
              />
            </div>
            <div className="w-10 text-sm">{ratings[index]}%</div>
          </div>
        ))}
      </div>
    )
  }
  
  