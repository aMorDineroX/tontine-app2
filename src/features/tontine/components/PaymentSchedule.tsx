import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'import {
  Table,  TableBody,
  TableCell,  TableHead,
  TableHeader,  TableRow,
} from '@/components/ui/table'import { TontineModel } from '@/types/database'
interface PaymentScheduleProps {
  tontine: TontineModel}
export function PaymentSchedule({ tontine }: PaymentScheduleProps) {
  const generateSchedule = () => {    const schedule = []
    let currentDate = new Date(tontine.startDate)    const endDate = new Date(tontine.endDate)
    while (currentDate <= endDate) {
      schedule.push({        date: new Date(currentDate),
        amount: tontine.amount,        round: schedule.length + 1,
      })
      // Increment date based on frequency      switch (tontine.frequency) {
        case 'DAILY':          currentDate.setDate(currentDate.getDate() + 1)
          break        case 'WEEKLY':
          currentDate.setDate(currentDate.getDate() + 7)          break
        case 'MONTHLY':          currentDate.setMonth(currentDate.getMonth() + 1)
          break      }
    }
    return schedule  }
  const schedule = generateSchedule()
  return (
    <Card>      <CardHeader>
        <CardTitle>Calendrier des paiements</CardTitle>      </CardHeader>
      <CardContent>        <Table>
          <TableHeader>            <TableRow>
              <TableHead>Tour</TableHead>              <TableHead>Date</TableHead>
              <TableHead>Montant</TableHead>            </TableRow>
          </TableHeader>          <TableBody>
            {schedule.map((payment) => (              <TableRow key={payment.round}>
                <TableCell>{payment.round}</TableCell>                <TableCell>{payment.date.toLocaleDateString()}</TableCell>
                <TableCell>{payment.amount.toLocaleString()} FCFA</TableCell>              </TableRow>
            ))}          </TableBody>
        </Table>      </CardContent>
    </Card>
  )
}




































import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TontineModel } from '@/types/database'

interface PaymentScheduleProps {
  tontine: TontineModel
}

export function PaymentSchedule({ tontine }: PaymentScheduleProps) {
  const generateSchedule = () => {
    const schedule = []
    let currentDate = new Date(tontine.startDate)
    const endDate = new Date(tontine.endDate)

    while (currentDate <= endDate) {
      schedule.push({
        date: new Date(currentDate),
        amount: tontine.amount,
        round: schedule.length + 1,
      })

      // Increment date based on frequency
      switch (tontine.frequency) {
        case 'DAILY':
          currentDate.setDate(currentDate.getDate() + 1)
          break
        case 'WEEKLY':
          currentDate.setDate(currentDate.getDate() + 7)
          break
        case 'MONTHLY':
          currentDate.setMonth(currentDate.getMonth() + 1)
          break
      }
    }

    return schedule
  }

  const schedule = generateSchedule()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendrier des paiements</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tour</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Montant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedule.map((payment) => (
              <TableRow key={payment.round}>
                <TableCell>{payment.round}</TableCell>
                <TableCell>{payment.date.toLocaleDateString()}</TableCell>
                <TableCell>{payment.amount.toLocaleString()} FCFA</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
