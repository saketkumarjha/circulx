import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2 space-y-4">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="aspect-square w-full rounded-lg" />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/2 space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-6 sm:h-7 md:h-8 w-3/4" />
            <Skeleton className="h-4 sm:h-5 md:h-6 w-1/2" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-6 sm:h-7 md:h-8 w-1/4" />
            <Skeleton className="h-4 sm:h-5 md:h-6 w-1/6" />
          </div>
          <div className="space-y-4 border-t border-b py-4">
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-40 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}

