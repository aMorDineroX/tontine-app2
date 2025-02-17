import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { tontineSchema } from '../schemas/tontine.schema';
import { useTontineStore } from '@/store/tontine.store';
import type { TontineModel } from '@/types/models';

export function CreateTontineForm() {
  const navigate = useNavigate();
  const { createTontine } = useTontineStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TontineModel>({
    resolver: zodResolver(tontineSchema)
  });

  const onSubmit = async (data: TontineModel) => {
    try {
      await createTontine(data);
      navigate('/dashboard/tontines');
    } catch (error) {
      console.error('Failed to create tontine:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          {...register('name')}
          placeholder="Nom de la tontine"
          error={errors.name?.message}
        />
      </div>

      <div>
        <Input
          {...register('amount', { valueAsNumber: true })}
          type="number"
          placeholder="Montant"
          error={errors.amount?.message}
        />
      </div>

      <div>
        <select {...register('frequency')} className="w-full p-2 border rounded">
          <option value="DAILY">Quotidien</option>
          <option value="WEEKLY">Hebdomadaire</option>
          <option value="MONTHLY">Mensuel</option>
        </select>
        {errors.frequency && (
          <p className="text-red-500">{errors.frequency.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Création...' : 'Créer la tontine'}
      </Button>
    </form>
  );
}
