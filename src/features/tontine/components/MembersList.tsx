import { useState } from 'react'import {
  Table,  TableBody,
  TableCell,  TableHead,
  TableHeader,  TableRow,
} from '@/components/ui/table'import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'import { TontineMemberModel } from '@/types/database'
interface MembersListProps {
  members: TontineMemberModel[]}
export function MembersList({ members }: MembersListProps) {
  const [sortColumn, setSortColumn] = useState<string>('position')  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const sortedMembers = [...members].sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1    return a[sortColumn] > b[sortColumn] ? direction : -direction
  })
  const getStatusColor = (status: string) => {    switch (status) {
      case 'ACTIVE':        return 'bg-green-500'
      case 'PENDING':        return 'bg-yellow-500'
      case 'SUSPENDED':        return 'bg-red-500'
      default:        return 'bg-gray-500'
    }  }
  return (
    <Card>      <CardHeader>
        <CardTitle>Liste des membres</CardTitle>      </CardHeader>
      <CardContent>        <Table>
          <TableHeader>            <TableRow>
              <TableHead>Position</TableHead>              <TableHead>Statut</TableHead>
              <TableHead>Date d'adhésion</TableHead>              <TableHead>Paiements</TableHead>
              <TableHead>Prochain paiement</TableHead>            </TableRow>
          </TableHeader>          <TableBody>
            {sortedMembers.map((member) => (              <TableRow key={member.id}>
                <TableCell>{member.position}</TableCell>                <TableCell>
                  <Badge className={getStatusColor(member.status)}>                    {member.status}
                  </Badge>                </TableCell>
                <TableCell>                  {new Date(member.joinedAt).toLocaleDateString()}
                </TableCell>                <TableCell>
                  <Badge variant={member.paymentStatus === 'UP_TO_DATE' ? 'default' : 'destructive'}>                    {member.paymentStatus}
                  </Badge>                </TableCell>
                <TableCell>                  {new Date(member.nextPaymentDate).toLocaleDateString()}
                </TableCell>              </TableRow>
            ))}          </TableBody>
        </Table>      </CardContent>
    </Card>
  )
}








































import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TontineMemberModel } from '@/types/database'

interface MembersListProps {
  members: TontineMemberModel[]
}

export function MembersList({ members }: MembersListProps) {
  const [sortColumn, setSortColumn] = useState<string>('position')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const sortedMembers = [...members].sort((a, b) => {
    const direction = sortDirection === 'asc' ? 1 : -1
    return a[sortColumn] > b[sortColumn] ? direction : -direction
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-500'
      case 'PENDING':
        return 'bg-yellow-500'
      case 'SUSPENDED':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des membres</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Position</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date d'adhésion</TableHead>
              <TableHead>Paiements</TableHead>
              <TableHead>Prochain paiement</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.position}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(member.status)}>
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(member.joinedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Badge variant={member.paymentStatus === 'UP_TO_DATE' ? 'default' : 'destructive'}>
                    {member.paymentStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(member.nextPaymentDate).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
