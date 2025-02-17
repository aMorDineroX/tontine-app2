import { TontineService } from '../tontine.service';
import { prismaMock } from '../../../../test/setup';

describe('TontineService', () => {
  const mockTontine = {
    id: '1',
    name: 'Test Tontine',
    amount: 1000,
    frequency: 'MONTHLY',
    membersCount: 5,
    startDate: new Date(),
    totalRounds: 5
  };

  describe('createTontine', () => {
    it('should create a new tontine', async () => {
      prismaMock.tontine.create.mockResolvedValue(mockTontine);
      const result = await TontineService.createTontine(mockTontine);
      expect(result).toEqual(mockTontine);
    });

    it('should throw an error if creation fails', async () => {
      prismaMock.tontine.create.mockRejectedValue(new Error('Creation failed'));
      await expect(TontineService.createTontine(mockTontine)).rejects.toThrow('Creation failed');
    });
  });

  describe('getTontineById', () => {
    it('should return tontine if found', async () => {
      prismaMock.tontine.findUnique.mockResolvedValue(mockTontine);
      const result = await TontineService.getTontineById('1');
      expect(result).toEqual(mockTontine);
    });

    it('should return null if tontine not found', async () => {
      prismaMock.tontine.findUnique.mockResolvedValue(null);
      const result = await TontineService.getTontineById('1');
      expect(result).toBeNull();
    });
  });
});
