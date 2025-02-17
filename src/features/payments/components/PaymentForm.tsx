import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { paymentSchema } from '../schemas/payment.schema'
import { Button } from '@/components/ui/button'

export function PaymentForm() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(paymentSchema)
  })

  return (
    <form className="space-y-4">
      <select {...register('method')}>
        <option value="mobile_money">Mobile Money</option>
        <option value="bank_transfer">Virement bancaire</option>
      </select>
      <Button type="submit">Effectuer le paiement</Button>
    </form>
  )
}
