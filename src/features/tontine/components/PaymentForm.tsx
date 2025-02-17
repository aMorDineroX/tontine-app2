import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePaymentStore } from '@/store/payment.store';
import { notificationService } from '@/lib/services/notification.service';
import { paymentSchema } from '../schemas/payment.schema';

export function PaymentForm({ tontineId }: { tontineId: string }) {
  const { createPayment, isLoading } = usePaymentStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(paymentSchema)
  });

  const onSubmit = async (data: any) => {
    try {
      await createPayment({ ...data, tontineId });
      notificationService.success('Paiement effectué avec succès');
    } catch (error) {
      notificationService.error('Échec du paiement');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register('amount', { valueAsNumber: true })}
        type="number"
        placeholder="Montant"
        error={errors.amount?.message}
      />

      <select 
        {...register('method')} 
        className="w-full p-2 border rounded"
      >
        <option value="MOBILE_MONEY">Mobile Money</option>
        <option value="BANK_TRANSFER">Virement bancaire</option>
        <option value="CASH">Espèces</option>
      </select>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Traitement...' : 'Effectuer le paiement'}
      </Button>
    </form>
  );
}