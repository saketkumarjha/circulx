import { Suspense } from 'react'
import DashboardContent from './dashboard-content'

export default function SellerDashboardPage() {
  return (
    <div className="p-8">
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardContent />
      </Suspense>
    </div>
  )
}

