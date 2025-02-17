import { useMemo } from 'react';
import { TontineType } from '@/types/tontine';
import { Card } from '@/components/ui/card';

interface TontineStatsProps {
  tontines: TontineType[];
}

export function TontineStats({ tontines }: TontineStatsProps) {
  const stats = useMemo(() => {
    return {
      total: tontines.length,
      active: tontines.filter(t => t.status === 'ACTIVE').length,
      totalAmount: tontines.reduce((sum, t) => sum + t.amount, 0),
      averageAmount: tontines.length > 0 
        ? tontines.reduce((sum, t) => sum + t.amount, 0) / tontines.length 
        : 0
    };
  }, [tontines]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">Total Tontines</h3>
        <p className="text-2xl font-bold">{stats.total}</p>
      </Card>
      
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">Tontines Actives</h3>
        <p className="text-2xl font-bold">{stats.active}</p>
      </Card>
      
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">Montant Total</h3>
        <p className="text-2xl font-bold">{stats.totalAmount.toLocaleString()} FCFA</p>
      </Card>
      
      <Card className="p-4">
        <h3 className="text-sm font-medium text-gray-500">Montant Moyen</h3>
        <p className="text-2xl font-bold">{stats.averageAmount.toLocaleString()} FCFA</p>
      </Card>
    </div>
  );
}
