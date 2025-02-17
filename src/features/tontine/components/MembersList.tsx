import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TontineModel } from '@/types/database';

interface MembersListProps {
  tontine: TontineModel;
}

export function MembersList({ tontine }: MembersListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Liste des membres</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Rôle</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tontine.members?.map((member) => (
              <TableRow key={member.id}>
                <TableCell>{member.user.name}</TableCell>
                <TableCell>{member.position}</TableCell>
                <TableCell>{member.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
