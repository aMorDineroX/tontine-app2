import { PaymentService } from '../payment.service';
import { prismaMock } from '../../../../test/setup';
import { NotificationService } from '@/services/notification.service';

jest.mock('@/services/notification.service');

describe('PaymentService', () => {
  const mockPayment = {
    id: '1',
    amount: 1000,
    method: 'MOBILE_MONEY',
    status: 'PENDING',
    userId: 'user1',
    tontineId: 'tontine1'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createPayment', () => {
    it('should create payment successfully', async () => {
      prismaMock.payment.create.mockResolvedValue(mockPayment);
      const result = await PaymentService.createPayment(mockPayment);
      expect(result).toEqual(mockPayment);
      expect(NotificationService.createNotification).toHaveBeenCalled();
    });

    it('should handle payment creation failure', async () => {
      prismaMock.payment.create.mockRejectedValue(new Error('Database error'));
      await expect(PaymentService.createPayment(mockPayment))
        .rejects.toThrow('Database error');
    });
  });

  describe('validatePayment', () => {
    it('should validate payment and update member status', async () => {
      const validatedPayment = { ...mockPayment, status: 'COMPLETED' };
      prismaMock.payment.update.mockResolvedValue(validatedPayment);
      
      const result = await PaymentService.validatePayment('1');
      expect(result).toEqual(validatedPayment);
      expect(NotificationService.createNotification).toHaveBeenCalled();
    });

    it('should handle non-existent payment', async () => {
      prismaMock.payment.update.mockRejectedValue(new Error('Payment not found'));
      await expect(PaymentService.validatePayment('999'))
        .rejects.toThrow('Payment not found');
    });
  });
});