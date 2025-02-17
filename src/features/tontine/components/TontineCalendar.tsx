import { useState, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TontineModel } from '@/types/database';
import { addDays, format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface TontineCalendarProps {
  tontine: TontineModel;
  payments: Array<{
    date: Date;
    amount: number;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
  }>;
}

export function TontineCalendar({ tontine, payments }: TontineCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const paymentDates = useMemo(() => {
    const dates: Record<string, { type: string; amount: number }> = {};
    
    // Calculer les dates de paiement basées sur la fréquence
    let currentDate = new Date(tontine.startDate);
    const increment = {
      'DAILY': 1,
      'WEEKLY': 7,
      'MONTHLY': 30,
    }[tontine.frequency];

    for (let i = 0; i < tontine.totalRounds; i++) {
      const dateKey = format(currentDate, 'yyyy-MM-dd');
      dates[dateKey] = { type: 'scheduled', amount: tontine.amount };
      currentDate = addDays(currentDate, increment);
    }

    // Ajouter les paiements effectués
    payments.forEach(payment => {
      const dateKey = format(payment.date, 'yyyy-MM-dd');
      dates[dateKey] = {
        type: payment.status.toLowerCase(),
        amount: payment.amount
      };
    });

    return dates;
  }, [tontine, payments]);

  const selectedDatePayments = useMemo(() => {
    const dateKey = format(selectedDate, 'yyyy-MM-dd');
    return paymentDates[dateKey];
  }, [selectedDate, paymentDates]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Calendrier des Paiements</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            locale={fr}
            modifiers={{
              payment: (date) => !!paymentDates[format(date, 'yyyy-MM-dd')],
              completed: (date) => 
                paymentDates[format(date, 'yyyy-MM-dd')]?.type === 'completed',
              failed: (date) => 
                paymentDates[format(date, 'yyyy-MM-dd')]?.type === 'failed'
            }}
            modifiersStyles={{
              payment: { fontWeight: 'bold' },
              completed: { backgroundColor: 'var(--success)' },
              failed: { backgroundColor: 'var(--error)' }
            }}
          />
          
          <div className="space-y-4">
            <h3 className="font-medium">Détails du jour sélectionné</h3>
            {selectedDatePayments ? (
              <>
                <Badge variant={selectedDatePayments.type as any}>
                  {selectedDatePayments.type}
                </Badge>
                <p className="text-lg font-bold">
                  {selectedDatePayments.amount.toLocaleString()} FCFA
                </p>
              </>
            ) : (
              <p className="text-gray-500">Aucun paiement prévu</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
