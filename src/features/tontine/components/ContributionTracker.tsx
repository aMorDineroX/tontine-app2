import { Progress } from '@/components/ui/progress'import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TontineMemberModel } from '@/types/database'
interface ContributionTrackerProps {  member: TontineMemberModel
  totalAmount: number}
export function ContributionTracker({ member, totalAmount }: ContributionTrackerProps) {
  const progress = (member.totalContributed / totalAmount) * 100
  return (    <Card>
      <CardHeader>        <CardTitle>Suivi des contributions</CardTitle>
      </CardHeader>      <CardContent>
        <div className="space-y-4">          <div className="flex items-center justify-between">
            <div className="space-y-1">              <p className="text-sm font-medium">
                Progression des paiements              </p>
              <p className="text-xs text-muted-foreground">                {member.totalContributed.toLocaleString()} FCFA sur {totalAmount.toLocaleString()} FCFA
              </p>            </div>
            <div className="text-sm font-medium">{Math.round(progress)}%</div>          </div>
          <Progress value={progress} className="h-2" />          
          <div className="mt-4 space-y-2">            <div className="flex justify-between text-sm">
              <span>Prochain paiement:</span>              <span>{new Date(member.nextPaymentDate).toLocaleDateString()}</span>
            </div>            <div className="flex justify-between text-sm">
              <span>Statut:</span>              <span className={
                member.paymentStatus === 'UP_TO_DATE'                   ? 'text-green-500' 
                  : 'text-red-500'              }>
                {member.paymentStatus}              </span>
            </div>          </div>
        </div>      </CardContent>
    </Card>
  )
}

























import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TontineMemberModel } from '@/types/database'

interface ContributionTrackerProps {
  member: TontineMemberModel
  totalAmount: number
}

export function ContributionTracker({ member, totalAmount }: ContributionTrackerProps) {
  const progress = (member.totalContributed / totalAmount) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suivi des contributions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Progression des paiements
              </p>
              <p className="text-xs text-muted-foreground">
                {member.totalContributed.toLocaleString()} FCFA sur {totalAmount.toLocaleString()} FCFA
              </p>
            </div>
            <div className="text-sm font-medium">{Math.round(progress)}%</div>
          </div>
          <Progress value={progress} className="h-2" />
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Prochain paiement:</span>
              <span>{new Date(member.nextPaymentDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Statut:</span>
              <span className={
                member.paymentStatus === 'UP_TO_DATE' 
                  ? 'text-green-500' 
                  : 'text-red-500'
              }>
                {member.paymentStatus}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
