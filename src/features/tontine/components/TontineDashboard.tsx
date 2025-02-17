import { useEffect, useState } from 'react';
import { TontineCalendar } from './TontineCalendar';
import { TontineStats } from './TontineStats';
import { PaymentSchedule } from './PaymentSchedule';
import { MembersList } from './MembersList';
import { TontineType } from '@/types/tontine';
import { tontineApi } from '../services/tontine.service';

export function TontineDashboard() {
  const [tontines, setTontines] = useState<TontineType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTontines();
  }, []);

  const loadTontines = async () => {
    try {
      const data = await tontineApi.getTontines();
      setTontines(data);
    } catch (error) {
      console.error('Error loading tontines:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <TontineStats tontines={tontines} />
      <TontineCalendar tontines={tontines} />
      <PaymentSchedule tontines={tontines} />
      <MembersList tontines={tontines} />
    </div>
  );
}
