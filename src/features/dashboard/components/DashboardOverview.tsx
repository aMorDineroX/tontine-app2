import { TontineStats } from './TontineStats'
import { RecentActivities } from './RecentActivities'
import { PaymentSchedule } from './PaymentSchedule'

export function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <TontineStats />
      <RecentActivities />
      <PaymentSchedule />
    </div>
  )
}